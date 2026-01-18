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
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: "Takiev Finance Website <noreply@takiev.bg>",
      to: [CONTACT_EMAIL],
      replyTo: data.email,
      subject: `[${data.subject}] Ново запитване от ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #19BFB7, #40514E); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Ново запитване от сайта</h1>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #40514E;">Тема:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  ${data.subject}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #40514E;">Име:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  ${data.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #40514E;">Email:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:${data.email}" style="color: #19BFB7;">${data.email}</a>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #40514E;">Телефон:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="tel:${data.phone}" style="color: #19BFB7;">${data.phone}</a>
                </td>
              </tr>
              ` : ""}
              ${data.company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #40514E;">Фирма:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  ${data.company}
                </td>
              </tr>
              ` : ""}
            </table>

            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e0e0e0;">
              <strong style="color: #40514E; display: block; margin-bottom: 10px;">Съобщение:</strong>
              <p style="margin: 0; white-space: pre-wrap;">${data.message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>Това съобщение е изпратено от контактната форма на <a href="https://takiev.bg" style="color: #19BFB7;">takiev.bg</a></p>
          </div>
        </body>
        </html>
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
