type SendResult = { sent: boolean; reason?: string };

export async function sendBookingConfirmationEmail(args: {
  to: string;
  name: string;
  city: string;
  price: number;
  dateRange: string;
  bookingId: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "Filter Fresh <bookings@filterfresh.example.com>";
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY not set" };
  if (!args.to) return { sent: false, reason: "no recipient email" };

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#0F1411">
      <h1 style="font-size:22px;margin:0 0 8px">Got your booking, ${escapeHtml(args.name)}.</h1>
      <p style="color:#5C6B61;margin:0 0 16px">
        We will text you within 2 hours during business hours to confirm a time inside the window you picked.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#5C6B61">City</td><td style="text-align:right">${escapeHtml(args.city)}</td></tr>
        <tr><td style="padding:8px 0;color:#5C6B61">Window</td><td style="text-align:right">${escapeHtml(args.dateRange)}</td></tr>
        <tr><td style="padding:8px 0;color:#5C6B61">Total</td><td style="text-align:right;font-weight:600">$${args.price}</td></tr>
        <tr><td style="padding:8px 0;color:#5C6B61">Booking ID</td><td style="text-align:right;font-family:monospace">${escapeHtml(args.bookingId)}</td></tr>
      </table>
      <p style="margin-top:24px;color:#5C6B61;font-size:13px">
        Reply to this email if anything has changed. No charges happen until the job is done.
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: args.to,
        subject: "Your Filter Fresh booking",
        html,
      }),
    });
    if (!res.ok) {
      return { sent: false, reason: `resend ${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : "resend error" };
  }
}

export async function sendOperatorSms(message: string): Promise<SendResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.OPERATOR_PHONE;
  if (!sid || !token || !from || !to) {
    return { sent: false, reason: "Twilio env vars not set" };
  }
  const body = new URLSearchParams({ From: from, To: to, Body: message });
  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        },
        body: body.toString(),
      }
    );
    if (!res.ok) {
      return { sent: false, reason: `twilio ${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : "twilio error" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
