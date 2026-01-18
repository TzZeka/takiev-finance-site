import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Check honeypot - if filled, it's likely a bot
    if (validatedData.honeypot) {
      // Silently reject but return success to not alert the bot
      return NextResponse.json(
        { message: "Запитването е изпратено успешно" },
        { status: 200 }
      );
    }

    // Remove honeypot from data before sending email
    const { honeypot, ...emailData } = validatedData;

    // Send email
    const result = await sendContactEmail(emailData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Грешка при изпращане на email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Запитването е изпратено успешно" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Невалидни данни", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Възникна грешка при обработка на запитването" },
      { status: 500 }
    );
  }
}
