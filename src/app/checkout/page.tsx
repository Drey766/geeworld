"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { brand } from "@/config/brand";
import { formatPrice, KENYA_COUNTIES, getShippingFee } from "@/lib/utils";
import { CheckoutForm } from "@/types";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    county: "Nairobi",
    town: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const shipping = getShippingFee(form.county);
  const total = subtotal + shipping;

  function update<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, items, subtotal, shipping, total }),
      });
      if (!res.ok) throw new Error("Order failed");
      setConfirmed(true);
      clearCart();
    } catch {
      setError("Something went wrong placing your order. Please try again or DM us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <div className="container-site section-padding text-center">
        <p className="text-2xl font-display tracking-wide">{brand.copy.orderConfirmed}</p>
        <button onClick={() => router.push("/shop")} className="btn-primary mt-6">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <p className="text-brand-light text-lg">{brand.copy.emptyCart}</p>
        <button onClick={() => router.push("/shop")} className="btn-primary mt-6">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="container-site pt-6 pb-10">
      <h1 className="font-display text-3xl tracking-wide mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input required className="input" value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className="label">Phone Number (for M-Pesa)</label>
            <input
              required
              type="tel"
              placeholder="07XXXXXXXX"
              className="input"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="label">County</label>
            <select className="input" value={form.county} onChange={(e) => update("county", e.target.value)}>
              {KENYA_COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Town</label>
            <input required className="input" value={form.town} onChange={(e) => update("town", e.target.value)} />
          </div>
          <div>
            <label className="label">Delivery Address</label>
            <textarea
              required
              rows={3}
              className="input"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Sending M-Pesa prompt..." : `Pay ${formatPrice(total)} with M-Pesa`}
          </button>
        </div>

        <div className="card p-5 h-fit">
          <h2 className="font-display text-xl tracking-wide mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selected_size}`} className="flex justify-between text-sm">
                <span className="text-brand-light">
                  {item.product.name} ({item.selected_size}) x{item.quantity}
                </span>
                <span className="text-brand-white shrink-0 ml-2">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-mid mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-brand-light">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-brand-light">
              <span>Delivery</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-brand-primary pt-2 border-t border-brand-mid">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
