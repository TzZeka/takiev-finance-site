"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFlying, setIsFlying] = useState(false);

  const mailControls = useAnimation();
  const planeControls = useAnimation();

  const handleBtnHoverStart = () => {
    if (isFlying || isSubmitting) return;
    mailControls.start({ opacity: 0, x: 5, y: -8, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } });
    planeControls.start({ opacity: 1, x: 0, y: 0, rotate: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } });
  };

  const handleBtnHoverEnd = () => {
    if (isFlying || isSubmitting) return;
    mailControls.start({ opacity: 1, x: 0, y: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } });
    planeControls.start({ opacity: 0, x: -5, y: 8, rotate: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } });
  };

  const handleBtnClick = async () => {
    if (isFlying || isSubmitting) return;
    setIsFlying(true);
    await planeControls.start({ x: -5, y: 3, rotate: -12, transition: { duration: 0.14, ease: "easeOut" } });
    await planeControls.start({ x: 70, y: -70, rotate: 20, opacity: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.6, 1] } });
    planeControls.set({ x: -5, y: 8, opacity: 0, rotate: 0 });
    mailControls.set({ opacity: 1, x: 0, y: 0 });
    setIsFlying(false);
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      honeypot: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Грешка при изпращане на формата");

      setIsSuccess(true);
      form.reset();

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Възникна грешка. Моля, опитайте отново."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Благодарим Ви!
        </h3>
        <p className="text-green-700">
          Вашето запитване е изпратено успешно. Ще се свържем с Вас скоро.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Име *</FormLabel>
                <FormControl>
                  <Input placeholder="Вашето име" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input placeholder="+359 ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Компания</FormLabel>
                <FormControl>
                  <Input placeholder="Име на компанията" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тема *</FormLabel>
              <FormControl>
                <Input placeholder="Тема на запитването" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Съобщение *</FormLabel>
              <FormControl>
                <Textarea placeholder="Как можем да Ви помогнем?" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot — hidden from users, visible to bots */}
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <FormItem
              className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden"
              aria-hidden="true"
            >
              <FormLabel>Leave this empty</FormLabel>
              <FormControl>
                <Input tabIndex={-1} autoComplete="off" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Terms consent */}
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <input
                    type="checkbox"
                    id="terms-cf"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer"
                  />
                </FormControl>
                <label
                  htmlFor="terms-cf"
                  className="text-sm text-slate-700 font-medium leading-relaxed cursor-pointer select-none"
                >
                  Запознат съм и приемам{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Общите условия
                  </a>
                  {" "}и{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Политиката за поверителност
                  </a>
                  .{" "}
                  <span className="text-slate-500 text-xs">(Задължително)</span>
                </label>
              </div>
              <FormMessage className="ml-7 text-xs" />
            </FormItem>
          )}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            onHoverStart={handleBtnHoverStart}
            onHoverEnd={handleBtnHoverEnd}
            onClick={handleBtnClick}
            className="flex items-center gap-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none overflow-hidden"
          >
            {isSubmitting && !isFlying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Изпращане...
              </>
            ) : (
              <>
                Изпрати запитване
                <span className="relative w-4 h-4 flex-shrink-0">
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    animate={mailControls}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    animate={planeControls}
                    initial={{ opacity: 0, x: -5, y: 8 }}
                  >
                    <PaperPlaneIcon className="w-4 h-4" />
                  </motion.span>
                </span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </Form>
  );
}
