"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, CheckCircle, Mail, Phone, MapPin, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const hasLetters = (val: string) => /[a-zA-Zа-яА-ЯёЁ]/.test(val);

const contactFormSchema = z.object({
  name: z.string()
    .min(5, "Името трябва да е поне 5 символа")
    .regex(/^[^\d]+$/, "Името не може да съдържа цифри"),
  email: z.string().email("Невалиден email адрес"),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[+\d\s()-]*$/.test(val), "Телефонът може да съдържа само цифри"),
  company: z.string().optional(),
  subject: z.string()
    .min(2, "Темата трябва да е поне 2 символа")
    .refine((val) => hasLetters(val), "Темата трябва да съдържа букви"),
  message: z.string()
    .min(10, "Съобщението трябва да е поне 10 символа")
    .refine((val) => hasLetters(val), "Съобщението трябва да съдържа букви"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

const inputClass =
  "bg-slate-900/80 border-white/[0.08] text-white placeholder:text-white/40 h-9 sm:h-10 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:border-white/[0.12] focus:ring-0 focus:-translate-y-px focus:placeholder:text-transparent rounded-xl transition-transform duration-150 ease-out will-change-transform pr-9";

const textareaClass =
  "bg-slate-900/80 border-white/[0.08] text-white placeholder:text-white/40 resize-none text-sm min-h-[80px] sm:min-h-[100px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:border-white/[0.12] focus:ring-0 focus:-translate-y-px focus:placeholder:text-transparent rounded-xl transition-transform duration-150 ease-out will-change-transform pr-9";

function ContactCard({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.02)_inset] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2),0_1px_2px_rgba(255,255,255,0.04)_inset] hover:bg-white/[0.05] transition-all duration-300 group/card">
      <div className="p-2 bg-white/[0.06] rounded-lg flex-shrink-0 group-hover/card:bg-white/[0.1] transition-colors">
        <Icon className="h-4 w-4 text-teal-400/80" />
      </div>
      <div className="min-w-0">
        <span className="text-[10px] text-white/30 uppercase tracking-widest block">{label}</span>
        <p className="text-sm text-white/70 group-hover/card:text-white/90 transition-colors leading-snug">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}

export function ContactModal({ isOpen, onClose, defaultSubject = "" }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: defaultSubject,
      message: "",
      honeypot: "",
    },
  });

  // Update subject when defaultSubject changes
  useEffect(() => {
    if (defaultSubject) {
      form.setValue("subject", defaultSubject);
    }
  }, [defaultSubject, form]);

  // Body scroll lock - prevents background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto-focus first input after modal animation
      setTimeout(() => {
        form.setFocus("name");
      }, 150);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, form]);

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Грешка при изпращане на формата");
      }

      setIsSuccess(true);
      form.reset();

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 sm:inset-3 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:max-h-[95vh] flex flex-col bg-slate-950/80 backdrop-blur-2xl sm:rounded-2xl shadow-2xl border-0 sm:border border-white/[0.08] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="none" viewBox="0 0 800 600" fill="none">
            <path d="M-50 80 C150 40, 300 120, 450 80 S700 40, 850 80" stroke="rgba(45,212,191,0.8)" strokeWidth="1.5" />
            <path d="M-50 180 C100 140, 250 220, 400 180 S650 140, 850 180" stroke="rgba(99,102,241,0.6)" strokeWidth="1" />
            <path d="M-50 300 C200 260, 350 340, 500 300 S750 260, 850 300" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
            <path d="M-50 420 C120 380, 280 460, 430 420 S680 380, 850 420" stroke="rgba(99,102,241,0.4)" strokeWidth="1" />
            <path d="M-50 520 C180 480, 320 560, 480 520 S720 480, 850 520" stroke="rgba(45,212,191,0.3)" strokeWidth="1.5" />
          </svg>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-teal-500/[0.03] rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/[0.03] rounded-full blur-[100px]" />
        </div>

        {/* Header */}
        <div className="relative flex-shrink-0 flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              Свържете се с нас
            </h2>
            <p className="text-white/35 text-xs sm:text-sm mt-0.5 hidden sm:block">
              Ще се свържем с Вас възможно най-скоро
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-200"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-y-auto overscroll-contain">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full mb-4 sm:mb-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                Благодарим Ви!
              </h3>
              <p className="text-white/70 text-sm sm:text-base text-center max-w-sm">
                Вашето запитване е изпратено успешно. Ще се свържем с Вас възможно най-скоро.
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid lg:grid-cols-[280px_1fr] gap-4 lg:gap-5">
                {/* Contact Info Container */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 sm:p-5 space-y-3">
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">Контакти</h3>
                  <div className="space-y-2">
                    <ContactCard icon={Phone} label="Телефон" value="+359 89 908 0016" href="tel:+359899080016" />
                    <ContactCard icon={Mail} label="Имейл" value="office@takiev.bg" href="mailto:office@takiev.bg" />
                    <ContactCard icon={MapPin} label="Адрес" value={'бул. „Ал. Стамболийски" 30Б, 1000 София'} />
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                    <p className="text-xs text-white/40 flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-400/60 flex-shrink-0" />
                      100% Поверителност
                    </p>
                  </div>
                </div>

                {/* Form Container */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 sm:p-5">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3">
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80 text-xs sm:text-sm">Име <span className="italic text-white/25 text-[10px]">(Задължително)</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="Вашето име" className={inputClass} {...field} onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("name"); }} />
                                  {field.value && (
                                    <button type="button" onClick={() => { field.onChange(""); form.clearErrors("name"); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors" aria-label="Изчисти">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-400/90" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80 text-xs sm:text-sm">Email <span className="italic text-white/25 text-[10px]">(Задължително)</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input type="email" placeholder="email@example.com" className={inputClass} {...field} onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("email"); }} />
                                  {field.value && (
                                    <button type="button" onClick={() => { field.onChange(""); form.clearErrors("email"); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors" aria-label="Изчисти">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-400/90" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80 text-xs sm:text-sm">Телефон</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="+359 ..." className={inputClass} {...field} onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("phone"); }} />
                                  {field.value && (
                                    <button type="button" onClick={() => { field.onChange(""); form.clearErrors("phone"); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors" aria-label="Изчисти">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-400/90" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80 text-xs sm:text-sm">Фирма</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="Име на фирмата" className={inputClass} {...field} onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("company"); }} />
                                  {field.value && (
                                    <button type="button" onClick={() => { field.onChange(""); form.clearErrors("company"); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors" aria-label="Изчисти">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-400/90" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80 text-xs sm:text-sm">Тема <span className="italic text-white/25 text-[10px]">(Задължително)</span></FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="Тема на запитването" className={inputClass} {...field} onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("subject"); }} />
                                {field.value && (
                                  <button type="button" onClick={() => { field.onChange(""); form.clearErrors("subject"); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors" aria-label="Изчисти">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-400/90" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80 text-xs sm:text-sm">Съобщение <span className="italic text-white/25 text-[10px]">(Задължително)</span></FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Textarea placeholder="Как можем да Ви помогнем?" rows={3} className={textareaClass} {...field} onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("message"); }} />
                                {field.value && (
                                  <button type="button" onClick={() => { field.onChange(""); form.clearErrors("message"); }} className="absolute right-2.5 top-3 text-white/20 hover:text-white/50 transition-colors" aria-label="Изчисти">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-400/90" />
                          </FormItem>
                        )}
                      />

                      {/* Honeypot field */}
                      <FormField
                        control={form.control}
                        name="honeypot"
                        render={({ field }) => (
                          <FormItem className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                            <FormLabel>Leave this empty</FormLabel>
                            <FormControl>
                              <Input tabIndex={-1} autoComplete="off" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {error && (
                        <div className="bg-rose-500/10 border border-rose-400/20 rounded-xl p-2.5 sm:p-3 text-rose-300/90 text-xs sm:text-sm">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-11 text-sm sm:text-base font-semibold rounded-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            Изпращане...
                          </>
                        ) : (
                          "Изпрати запитване"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
