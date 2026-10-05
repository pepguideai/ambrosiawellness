import { NextResponse } from "next/server";
import { isValidEmail, readBody } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await readBody(req);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > 200) errors.name = "Please use a shorter name.";
  if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write a little more about what you're looking for.";
  else if (message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", errors },
      { status: 400 },
    );
  }

  // TODO: Deliver inquiries somewhere before launch. This stub stores and sends nothing.
  // Options: send an email via Resend/Postmark/SendGrid, or create a contact in your CRM.
  //   await resend.emails.send({ from, to: process.env.CONTACT_INBOX, replyTo: email, subject: `Consultation inquiry from ${name}`, text: message });

  return NextResponse.json({
    ok: true,
    message: `Thanks, ${name}. We've received your message and will reply by email.`,
  });
}
