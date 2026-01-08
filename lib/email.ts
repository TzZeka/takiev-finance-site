import { Resend } from "resend";

// Allow build without RESEND_API_KEY for development/preview
const API_KEY = process.env.RESEND_API_KEY || "dummy_key_for_build";

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === "production") {
  console.warn("Warning: RESEND_API_KEY is not defined. Email functionality will not work.");
}

export const resend = new Resend(API_KEY);

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
