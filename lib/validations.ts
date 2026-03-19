/**
 * Shared Zod validation schemas.
 * Single source of truth — used by ContactForm and ContactModal.
 */
import * as z from "zod";

const hasLetters = (val: string) => /[a-zA-Zа-яА-ЯёЁ]/.test(val);

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(5, "Името трябва да е поне 5 символа")
    .regex(/^[^\d]+$/, "Името не може да съдържа цифри"),
  email: z.string().email("Невалиден email адрес"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s()-]*$/.test(val),
      "Телефонът може да съдържа само цифри"
    ),
  company: z.string().optional(),
  subject: z
    .string()
    .min(2, "Темата трябва да е поне 2 символа")
    .refine((val) => hasLetters(val), "Темата трябва да съдържа букви"),
  message: z
    .string()
    .min(10, "Съобщението трябва да е поне 10 символа")
    .refine((val) => hasLetters(val), "Съобщението трябва да съдържа букви"),
  honeypot: z.string().max(0, "Spam detected").optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Необходимо е да приемете условията",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
