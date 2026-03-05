import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail, sendAutoReplyEmail } from "@/lib/email";
import { writeClient } from "@/lib/sanity/writeClient";

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

    // Remove honeypot from data before processing
    const { honeypot, ...emailData } = validatedData;

    // Save submission to Sanity (graceful degradation — don't fail if Sanity is unavailable)
    let sanityDocId: string | null = null;
    try {
      const doc = await writeClient.create({
        _type: "contactSubmission",
        name: emailData.name,
        email: emailData.email,
        phone: emailData.phone,
        company: emailData.company,
        subject: emailData.subject,
        message: emailData.message,
        submittedAt: new Date().toISOString(),
        status: "нов",
        emailSent: false,
      });
      sanityDocId = doc._id;
    } catch (sanityError) {
      console.warn("Sanity write failed — continuing without saving:", sanityError);
    }

    // Send email to office
    const result = await sendContactEmail(emailData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Грешка при изпращане на email" },
        { status: 500 }
      );
    }

    // Update emailSent flag in Sanity (non-blocking)
    if (sanityDocId) {
      writeClient
        .patch(sanityDocId)
        .set({ emailSent: true })
        .commit()
        .catch((err) => {
          console.warn("Failed to update emailSent in Sanity:", err);
        });
    }

    // Send auto-reply to the user (non-blocking)
    sendAutoReplyEmail(emailData).catch((err) => {
      console.error("Failed to send auto-reply:", err);
    });

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
