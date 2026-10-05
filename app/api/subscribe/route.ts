import { NextResponse } from "next/server";
import { isValidEmail, readBody } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await readBody(req);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // TODO: Connect an email provider before launch. This stub accepts every valid
  // address and stores nothing. Example for Mailchimp (set the env vars in Vercel):
  //
  //   const dc = process.env.MAILCHIMP_API_KEY!.split("-")[1];
  //   const res = await fetch(
  //     `https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email_address: email, status: "pending" }), // double opt-in
  //     },
  //   );
  //   if (!res.ok && (await res.json()).title !== "Member Exists") {
  //     return NextResponse.json({ ok: false, error: "We couldn't subscribe you right now. Please try again." }, { status: 502 });
  //   }

  return NextResponse.json({
    ok: true,
    message: "Thanks for joining. Look out for your first email this week.",
  });
}
