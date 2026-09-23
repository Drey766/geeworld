import { NextRequest, NextResponse } from "next/server";
import { brand } from "@/config/brand";

// Normalizes Kenyan phone numbers to the 2547XXXXXXXX / 2541XXXXXXXX format
// Daraja and WhatsApp Cloud API both require.
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") || digits.startsWith("1")) return `254${digits}`;
  return digits;
}

async function getMpesaToken() {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) return null;

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const res = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token as string;
}

async function triggerStkPush(phone: string, amount: number, orderId: string) {
  const token = await getMpesaToken();
  const shortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  if (!token || !shortCode || !passkey || !callbackUrl) {
    return { skipped: true };
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

  // Daraja limits AccountReference to 12 chars and TransactionDesc to 13 chars
  const accountRef = orderId.slice(0, 12);
  const transactionDesc = "Order".slice(0, 13);

  const res = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount), // Daraja requires an integer amount
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: transactionDesc,
    }),
  });

  if (!res.ok) return { error: true };
  return await res.json();
}

async function sendWhatsAppNotification(message: string) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const owner = process.env.OWNER_WHATSAPP_NUMBER;
  if (!token || !phoneId || !owner) return { skipped: true };

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: owner,
        type: "text",
        text: { body: message },
      }),
    });
    return await res.json();
  } catch {
    return { error: true };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { form, items, subtotal, shipping, total } = body;

    if (!form?.name || !form?.phone || !items?.length) {
      return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
    }

    const orderId = `GW-${Date.now()}`;
    const phone = normalizePhone(form.phone);

    const itemLines = items
      .map(
        (i: any) =>
          `• ${i.product.name} (${i.product.category} — ${i.product.color}, Size ${i.selected_size}) x${i.quantity} — KSh ${i.product.price.toLocaleString()}`
      )
      .join("\n");

    const message = `🛍️ NEW ORDER — ${brand.name}

Order ID: ${orderId}

👤 Customer:
Name: ${form.name}
Phone: ${form.phone}
County: ${form.county}, ${form.town}
Address: ${form.address}

Items:
${itemLines}

💰 Subtotal: KSh ${subtotal.toLocaleString()}
🚚 Delivery: KSh ${shipping.toLocaleString()}
💳 Total: KSh ${total.toLocaleString()}
📱 Payment: M-Pesa STK Push sent to ${form.phone}

${brand.copy.footerTagline}
Call/DM: ${brand.phone}`;

    const [stkResult, waResult] = await Promise.all([
      triggerStkPush(phone, total, orderId),
      sendWhatsAppNotification(message),
    ]);

    return NextResponse.json({ success: true, orderId, stkResult, waResult });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
