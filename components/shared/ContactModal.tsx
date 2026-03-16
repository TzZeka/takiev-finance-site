"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, Mail, Phone, MapPin, XCircle } from "lucide-react";
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
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Необходимо е да приемете условията",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

/* ── light-theme input classes (white form column) ── */
const inputClass =
  "autofill-light bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-9 sm:h-10 text-base sm:text-sm shadow-none focus:border-primary/50 focus:ring-0 focus:placeholder:text-transparent rounded-xl transition-all duration-150 pr-9";

const textareaClass =
  "autofill-light bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 resize-none text-base sm:text-sm min-h-[90px] sm:min-h-[110px] shadow-none focus:border-primary/50 focus:ring-0 focus:placeholder:text-transparent rounded-xl transition-all duration-150 pr-9";

/* ── info card (left dark column) ── */
function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  target,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  target?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-primary/20 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 group/card">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 block">{label}</span>
        <p className="text-[13px] text-white/70 group-hover/card:text-white/90 transition-colors leading-snug truncate">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href} target={target} className="block">{inner}</a> : inner;
}

export function ContactModal({ isOpen, onClose, defaultSubject = "" }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [closeAngle, setCloseAngle] = useState(0);

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
      termsAccepted: false,
    },
  });

  useEffect(() => {
    if (defaultSubject) form.setValue("subject", defaultSubject);
  }, [defaultSubject, form]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => form.setFocus("name"), 200);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, form]);

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
      setTimeout(() => { setIsSuccess(false); onClose(); }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Възникна грешка. Моля, опитайте отново.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ═══════════════════════════════════════════════════════════════
              SIDE PANEL — wider, white form column
              Mobile:  full-screen, slides in from right
              lg+:     max-w-[760px] right panel, two columns
          ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.3, ease: [0.36, 0, 0.66, -0.4] } }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed inset-y-0 right-0 z-[101] w-full lg:max-w-[760px] flex overflow-hidden"
          >
            {/* ── LEFT INFO COLUMN (lg+ only) — dark ── */}
            <div
              className="hidden lg:flex flex-col w-[280px] flex-shrink-0 border-r border-white/[0.05] overflow-y-auto"
              style={{ background: "#0e2019" }}
            >
              {/* Logo */}
              <div className="p-7 pb-6 border-b border-white/[0.05]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 relative flex-shrink-0">
                    <Image src="/icon.svg" alt="Takiev Finance" fill className="object-contain" />
                  </div>
                  <div>
                    <span
                      className="block text-base font-bold text-white leading-tight"
                      style={{ fontFamily: "'Berkslund', serif" }}
                    >
                      Takiev Finance
                    </span>
                    <span
                      className="text-[9px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#147d6c] to-[#1effff] bg-clip-text text-transparent opacity-70"
                      style={{ fontFamily: "'Avenir', sans-serif" }}
                    >
                      Accounting & Tax Company
                    </span>
                  </div>
                </div>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Ще се свържем с вас в рамките на един работен ден.
                </p>
              </div>

              {/* Contact info */}
              <div className="flex-1 p-5 space-y-2.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 mb-3">Контакти</p>
                <InfoCard icon={Phone} label="Телефон" value="+359 89 908 0016" href="tel:+359899080016" />
                <InfoCard icon={Mail} label="Имейл" value="office@takiev.bg" href="mailto:office@takiev.bg" />
                <InfoCard
                  icon={MapPin}
                  label="Адрес"
                  value="София център, бул. „Александър Стамболийски“ 30Б,"
                  href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                  target="_blank"
                />
              </div>

              {/* Confidentiality badge */}
              <div className="p-5 pt-0">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/[0.06] border border-primary/10">
                  <CheckCircle className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                  <span className="text-[11px] text-white/35">100% поверителност</span>
                </div>
              </div>
            </div>

            {/* ── FORM COLUMN — white background ── */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
              {/* Panel header */}
              <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-200/80">
                {/* Mobile: logo */}
                <div className="lg:hidden flex items-center gap-2.5">
                  <div className="w-7 h-7 relative flex-shrink-0">
                    <Image src="/icon.svg" alt="Takiev Finance" fill className="object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Свържете се с нас</span>
                </div>
                {/* Desktop: heading */}
                <div className="hidden lg:block">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Изпратете запитване</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Ще отговорим максимално бързо</p>
                </div>
                <button
                  onClick={onClose}
                  onMouseEnter={() => setCloseAngle((a) => a + 360)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 flex-shrink-0"
                  aria-label="Затвори"
                >
                  <motion.span
                    animate={{ rotate: closeAngle }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Благодарим Ви!</h3>
                    <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                      Вашето запитване е получено. Ще се свържем с Вас възможно най-скоро.
                    </p>
                  </div>
                ) : (
                  <div className="p-5">
                    {/* Mobile-only compact contact strip */}
                    <div className="lg:hidden flex flex-wrap gap-x-4 gap-y-1 mb-5 pb-4 border-b border-slate-200/70">
                      <a href="tel:+359899080016" className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-primary transition-colors">
                        <Phone className="w-3 h-3" /> +359 89 908 0016
                      </a>
                      <a href="mailto:office@takiev.bg" className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-primary transition-colors">
                        <Mail className="w-3 h-3" /> office@takiev.bg
                      </a>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 text-xs">
                                  Име <span className="text-slate-400 font-normal italic text-[10px]">(задължително)</span>
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="Вашето ime" className={inputClass} {...field}
                                      onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("name"); }}
                                    />
                                    {field.value && (
                                      <button type="button" onClick={() => { field.onChange(""); form.clearErrors("name"); }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Изчисти">
                                        <XCircle className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 text-xs">
                                  Email <span className="text-slate-400 font-normal italic text-[10px]">(задължително)</span>
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input type="email" placeholder="email@example.com" className={inputClass} {...field}
                                      onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("email"); }}
                                    />
                                    {field.value && (
                                      <button type="button" onClick={() => { field.onChange(""); form.clearErrors("email"); }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Изчисти">
                                        <XCircle className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 text-xs">Телефон</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="+359 ..." className={inputClass} {...field}
                                      onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("phone"); }}
                                    />
                                    {field.value && (
                                      <button type="button" onClick={() => { field.onChange(""); form.clearErrors("phone"); }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Изчисти">
                                        <XCircle className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 text-xs">Фирма</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="Ime на фирмата" className={inputClass} {...field}
                                      onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("company"); }}
                                    />
                                    {field.value && (
                                      <button type="button" onClick={() => { field.onChange(""); form.clearErrors("company"); }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Изчисти">
                                        <XCircle className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-500" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 text-xs">
                                Тема <span className="text-slate-400 font-normal italic text-[10px]">(задължително)</span>
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="Тема на запитването" className={inputClass} {...field}
                                    onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("subject"); }}
                                  />
                                  {field.value && (
                                    <button type="button" onClick={() => { field.onChange(""); form.clearErrors("subject"); }}
                                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Изчисти">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 text-xs">
                                Съобщение <span className="text-slate-400 font-normal italic text-[10px]">(задължително)</span>
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Textarea placeholder="Как можем да Ви помогнем?" rows={4} className={textareaClass} {...field}
                                    onChange={(e) => { field.onChange(e); if (!e.target.value) form.clearErrors("message"); }}
                                  />
                                  {field.value && (
                                    <button type="button" onClick={() => { field.onChange(""); form.clearErrors("message"); }}
                                      className="absolute right-2.5 top-3 text-slate-300 hover:text-slate-500 transition-colors" aria-label="Изчисти">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="text-[11px] mt-0.5 leading-tight text-rose-500" />
                            </FormItem>
                          )}
                        />

                        {/* Honeypot */}
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
                                    id="terms-modal"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer"
                                  />
                                </FormControl>
                                <label htmlFor="terms-modal" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                                  Запознат съм и приемам{" "}
                                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
                                    Общите условия
                                  </a>
                                  {" "}и{" "}
                                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
                                    Политиката за поверителност
                                  </a>
                                  .{" "}
                                  <span className="text-slate-400">(Задължително)</span>
                                </label>
                              </div>
                              <FormMessage className="ml-7 text-[11px] text-rose-500" />
                            </FormItem>
                          )}
                        />

                        {error && (
                          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-600 text-xs">
                            {error}
                          </div>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none overflow-hidden"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Изпращане...
                            </>
                          ) : (
                            <>
                              <span className="relative overflow-hidden inline-flex flex-col" style={{ height: "1.15em" }}>
                                <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                                  Изпрати запитване
                                </span>
                                <span aria-hidden className="absolute inset-x-0 top-full block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                                  Изпрати запитване
                                </span>
                              </span>
                              <Mail className="w-4 h-4 flex-shrink-0" />
                            </>
                          )}
                        </button>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
