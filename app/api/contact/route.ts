// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message, company } = await req.json();

    // Honeypot (ignore bots quietly)
    if (company) return Response.json({ ok: true });

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;

    if (!apiKey || !to || !from) {
      return new Response(
        JSON.stringify({ ok: false, error: "Server not configured: missing RESEND_API_KEY, CONTACT_TO, or CONTACT_FROM" }),
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const recipients = to
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    // Resend SDK returns { data, error }
    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: email, // this is the correct key
      subject: `Portfolio contact — ${name}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
          <p>${String(message).replace(/\n/g, "<br/>")}</p>
          <hr/>
          <p><strong>${name}</strong> &lt;${email}&gt;</p>
        </div>
      `,
    });

    if (error) {
      // Return Resend’s message to the client (helps debugging)
      return new Response(JSON.stringify({ ok: false, error: error.message || "Resend error" }), { status: 502 });
    }

    return Response.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    console.error("contact error", e);
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Failed to send" }), { status: 500 });
  }
}
