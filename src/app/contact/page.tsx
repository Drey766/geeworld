"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Truck, ChevronDown } from "lucide-react";
import faqsData from "@/data/faqs.json";
import { FAQ } from "@/types";
import { brand } from "@/config/brand";

const faqs = faqsData as FAQ[];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container-site pt-6 pb-16">
      <p className="section-tag">{brand.sections.visitStore}</p>
      <h1 className="font-display text-3xl tracking-wide mb-8">Come find your fit</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="card p-5 space-y-4">
            <div className="flex gap-3">
              <MapPin size={20} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-white font-semibold">Location</p>
                <p className="text-brand-muted text-sm">{brand.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={20} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-white font-semibold">Hours</p>
                <p className="text-brand-muted text-sm">{brand.hours}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={20} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-white font-semibold">Call / WhatsApp</p>
                <p className="text-brand-muted text-sm">{brand.phone}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Truck size={20} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-white font-semibold">Delivery</p>
                <p className="text-brand-muted text-sm">
                  {brand.deliveryArea} — order online or by call/DM and we'll get your fit to you wherever you are in Kenya.
                </p>
              </div>
            </div>
            <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h2 className="font-display text-xl tracking-wide mb-3">Frequently Asked</h2>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <div key={faq.id} className="card">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="flex items-center justify-between w-full text-left p-4 min-h-[44px]"
                  >
                    <span className="text-sm text-brand-white font-medium pr-3">{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === faq.id && <p className="text-brand-muted text-sm px-4 pb-4">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5 h-fit">
          <h2 className="font-display text-xl tracking-wide mb-4">Send a Message</h2>
          {sent ? (
            <p className="text-brand-primary">Thanks — we'll get back to you shortly. ✨</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  required
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  required
                  type="tel"
                  className="input"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  required
                  rows={4}
                  className="input"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
