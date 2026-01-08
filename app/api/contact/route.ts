import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Send email
    const result = await sendContactEmail(validatedData);

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
