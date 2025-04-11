import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, message, service, situation } = body;

    const response = await resend.emails.send({
      from: "contact@easyfwd.nl", // this should be an email from your domain, that needs to be verified in resend (still trying)
      to: "omeruyghur3@gmail.com", // this should be your email,for testing purpose i have put my own email
      replyTo: email,
      subject: `Nieuw bericht van ${firstName} ${lastName}`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #29B6D1;">Nieuw contactformulier ingediend</h2>
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${service}</p>
        <p><strong>Situatie:</strong> ${situation}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message}</p>
      </div>
      `,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
