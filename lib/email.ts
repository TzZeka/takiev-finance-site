import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "office@takiev.bg";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: "Takiev Finance Website <noreply@takiev.bg>",
      to: [CONTACT_EMAIL],
      replyTo: data.email,
      subject: `Ново запитване от ${data.name}`,
      html: `
        <h2>Ново запитване за консултация</h2>
        <p><strong>Име:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Телефон:</strong> ${data.phone}</p>` : ""}
        ${data.company ? `<p><strong>Компания:</strong> ${data.company}</p>` : ""}
        <p><strong>Съобщение:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
