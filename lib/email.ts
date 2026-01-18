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

// Auto-reply email to the person who submitted the form
export async function sendAutoReplyEmail(data: ContactFormData) {
  try {
    const { error } = await resend.emails.send({
      from: "Takiev Finance <onboarding@resend.dev>",
      to: [data.email],
      subject: "Благодарим Ви за запитването | Takiev Finance",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <img src="https://takiev-finance-site.vercel.app/firm-logo/logo.png" alt="Takiev Finance" style="max-width: 200px; height: auto; margin-bottom: 10px;" />
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">Счетоводна Кантора</p>
          </div>

          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
            <h2 style="color: #1e293b; margin-top: 0;">Здравейте, ${data.name}!</h2>

            <p style="color: #475569;">
              Благодарим Ви, че се свързахте с нас. Вашето запитване беше получено успешно.
            </p>

            <div style="background: #f8fafc; border-left: 4px solid #19BFB7; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;"><strong>Тема:</strong> ${data.subject}</p>
            </div>

            <p style="color: #475569;">
              Нашият екип ще прегледа Вашето запитване и ще се свърже с Вас възможно най-скоро,
              обикновено в рамките на <strong>24 работни часа</strong>.
            </p>

            <p style="color: #475569;">
              Междувременно, ако имате допълнителни въпроси, не се колебайте да ни потърсите.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #475569; margin-bottom: 5px;">С уважение,</p>
              <p style="color: #1e293b; font-weight: bold; margin: 0;">Екипът на Takiev Finance</p>
            </div>
          </div>

          <div style="background: #1e293b; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 10px 0;">
              <a href="mailto:office@takiev.bg" style="color: #19BFB7; text-decoration: none;">office@takiev.bg</a>
              &nbsp;|&nbsp;
              <a href="https://takiev.bg" style="color: #19BFB7; text-decoration: none;">takiev.bg</a>
            </p>
            <p style="color: #64748b; font-size: 11px; margin: 0;">
              Това е автоматично генерирано съобщение. Моля, не отговаряйте на този имейл.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending auto-reply email:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending auto-reply email:", error);
    return { success: false, error };
  }
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: "Takiev Finance <onboarding@resend.dev>",
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
          <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 25px; border-radius: 8px 8px 0 0; text-align: center;">
            <img src="https://takiev-finance-site.vercel.app/firm-logo/logo.png" alt="Takiev Finance" style="max-width: 180px; height: auto; margin-bottom: 15px;" />
            <h1 style="color: #19BFB7; margin: 0; font-size: 20px;">Ново запитване от сайта</h1>
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
