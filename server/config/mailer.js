import { Resend } from "resend";

let resend = null;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (resend) return resend;
  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function sendContactNotification(submission) {
  const client = getResendClient();
  if (!client) return; // no key configured yet — submission is already saved to DB

  try {
    await client.emails.send({
      from: "Design Factory Group <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      subject: `New enquiry from ${submission.name}`,
      text: `Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone || "—"}

Message:
${submission.message}`,
    });
  } catch (err) {
    console.error("Email notification failed:", err.message);
  }
}