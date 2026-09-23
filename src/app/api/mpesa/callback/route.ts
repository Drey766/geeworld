import { NextRequest, NextResponse } from "next/server";

// Daraja calls this URL after the customer accepts/rejects/times out on the
// STK push prompt. We don't persist orders (no database), so this just
// acknowledges receipt — extend here if order tracking is added later.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const callback = body?.Body?.stkCallback;

    if (callback) {
      const resultCode = callback.ResultCode;
      const merchantRequestId = callback.MerchantRequestID;
      const checkoutRequestId = callback.CheckoutRequestID;

      if (resultCode === 0) {
        const items = callback.CallbackMetadata?.Item || [];
        const amount = items.find((i: any) => i.Name === "Amount")?.Value;
        const mpesaReceipt = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
        console.log("M-Pesa payment successful", {
          merchantRequestId,
          checkoutRequestId,
          amount,
          mpesaReceipt,
        });
      } else {
        console.log("M-Pesa payment not completed", { merchantRequestId, checkoutRequestId, resultCode });
      }
    }

    // Daraja requires a 200 response with this exact shape to stop retries.
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch {
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
