"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence, useInView, useReducedMotion, useAnimation } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Calculator,
  Euro,
  Scale,
  Building2,
  Loader2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// ── PaperPlane icon ────────────────────────────────────────────────────────────
function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

// ── Animated error message ─────────────────────────────────────────────────────
function ErrorMsg({ message, indent = false }: { message?: string; indent?: boolean }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={"text-rose-400 text-[12px] mt-1" + (indent ? " ml-7" : "")}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

// ── Validation schema ──────────────────────────────────────────────────────────
const hasLetters = (val: string) => /[a-zA-Zа-яА-ЯёЁ]/.test(val);

const schema = z.object({
  name: z
    .string()
    .min(3, "Името трябва да е поне 3 символа")
    .regex(/^[^\d]+$/, "Името не може да съдържа цифри"),
  email: z.string().email("Невалиден email адрес"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d]+$/.test(val),
      "Телефонът може да съдържа само цифри и +"
    ),
  company: z.string().optional(),
  subject: z
    .string()
    .min(6, "Темата трябва да е поне 6 символа")
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

type FormValues = z.infer<typeof schema>;

// Field order that matches visual top-to-bottom layout
const FIELD_ORDER: Array<keyof FormValues> = [
  "name", "email", "phone", "subject", "message", "termsAccepted",
];

// ── Animation variants ─────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.9 },
  },
};

const itemVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// ── Static data ────────────────────────────────────────────────────────────────
const services = [
  { href: "/uslugi/schetovodni-uslugi", label: "Счетоводни услуги", icon: Calculator },
  { href: "/uslugi/danachni-konsultacii", label: "Данъчни консултации", icon: Euro },
  { href: "/uslugi/pravni-uslugi", label: "Правни услуги", icon: Scale },
  { href: "/uslugi/registraciq-na-firmi", label: "Регистрация на фирми", icon: Building2 },
];

const whyPoints = [
  "Бърз отговор в рамките на 1 работен ден",
  "Индивидуален подход",
  "Прозрачни цени",
];

// ── Style helpers ──────────────────────────────────────────────────────────────
const leftLabelCls = "block text-xs uppercase tracking-[0.16em] text-slate-700 font-bold mb-1";
const rightLabelCls = "block text-xs uppercase tracking-[0.14em] text-white mb-1.5";
const inputCls =
  "w-full bg-transparent border-0 border-b border-white/30 focus:border-primary/70 text-white text-[15px] placeholder:text-white/40 py-3 outline-none ring-0 focus:ring-0 transition-colors duration-200 appearance-none";

// ── Component ──────────────────────────────────────────────────────────────────
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isFlying, setIsFlying] = useState(false);

  const mailControls = useAnimation();
  const planeControls = useAnimation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    shouldFocusError: false, // we handle focus/scroll manually
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

  // ── Phone input: strip anything that isn't a digit or + ─────────────────────
  const { onChange: phoneOnChange, ...phoneRest } = register("phone");

  // ── Smart scroll to first invalid field ─────────────────────────────────────
  const onInvalid = (errs: FieldErrors<FormValues>) => {
    const firstErrorField = FIELD_ORDER.find((f) => errs[f]);
    if (!firstErrorField) return;

    let el: HTMLElement | null = null;
    if (firstErrorField === "termsAccepted") {
      el = document.getElementById("terms-cs");
    } else {
      el = document.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
    }

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el!.focus(), 350);
    }
  };

  // ── Button hover handlers ────────────────────────────────────────────────────
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
    await planeControls.start({
      x: -5, y: 3, rotate: -12,
      transition: { duration: 0.14, ease: "easeOut" },
    });
    await planeControls.start({
      x: 70, y: -70, rotate: 20, opacity: 0,
      transition: { duration: 0.38, ease: [0.4, 0, 0.6, 1] },
    });
    planeControls.set({ x: -5, y: 8, opacity: 0, rotate: 0 });
    mailControls.set({ opacity: 1, x: 0, y: 0 });
    setIsFlying(false);
  };

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Грешка при изпращане на формата");
      setIsSuccess(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Възникна грешка. Моля, опитайте отново."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const shouldAnimate = isInView || !!prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        className="space-y-5"
      >
        {/* Accent top line */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />

        {/* ── BLOCK 1: Main glass panel ── */}
        <motion.div
          variants={itemVariants}
          className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.10] rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">

            {/* ──── LEFT COLUMN — white ──── */}
            <div className="bg-white p-7 md:p-9 flex flex-col gap-7 border-b lg:border-b-0 lg:border-r border-slate-200">

              {/* Address + Hours */}
              <div className="space-y-4">
                <a
                  href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group/map"
                >
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className={leftLabelCls}>Адрес</p>
                    <p className="text-[15px] text-slate-600 group-hover/map:text-slate-900 transition-colors leading-snug">
                      бул. „Ал. Стамболийски" 30Б
                      <br />
                      <span className="text-slate-400 text-sm">1000 София</span>
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className={leftLabelCls}>Работно Време</p>
                    <p className="text-[15px] text-slate-600 leading-snug">
                      Пон–Пет: 9:00–18:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Why us */}
              <div>
                <p className={leftLabelCls + " mb-3"}>Защо да изберете нас</p>
                <div className="space-y-3">
                  {whyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-[7px] flex-shrink-0" />
                      <span className="text-[15px] text-slate-600 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services 2×2 */}
              <div>
                <p className={leftLabelCls + " mb-3"}>Нашите услуги</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {services.map((svc) => {
                    const Icon = svc.icon;
                    return (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="group/svc flex items-center gap-2 text-slate-500 hover:text-primary transition-colors duration-200"
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0 text-primary/60 group-hover/svc:text-primary transition-colors" />
                        <span className="text-sm leading-snug group-hover/svc:underline underline-offset-2">
                          {svc.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Large CTA — email + phone */}
              <div className="mt-auto">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
                  Свържете се сега
                </p>
                <a
                  href="mailto:office@takiev.bg"
                  className="block text-2xl font-bold text-slate-800 hover:text-primary transition-colors duration-200"
                >
                  office@takiev.bg
                </a>
                <a
                  href="tel:+359899080016"
                  className="block text-2xl font-bold text-slate-800 hover:text-primary transition-colors duration-200 mt-1"
                >
                  +359 89 908 0016
                </a>
              </div>
            </div>

            {/* ──── RIGHT COLUMN — dark glass, form ──── */}
            <div className="p-7 md:p-9">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center min-h-[400px] text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Благодарим Ви!
                    </h3>
                    <p className="text-white/55 text-[15px] max-w-xs leading-relaxed">
                      Вашето запитване е получено. Ще се свържем с Вас в рамките
                      на 1 работен ден.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 flex items-center gap-2 text-sm text-primary/70 hover:text-primary transition-colors duration-200 group"
                    >
                      Изпрати ново запитване
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <form
                      onSubmit={handleSubmit(onSubmit, onInvalid)}
                      className="relative space-y-5"
                    >
                      {/* Honeypot */}
                      <div
                        className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden"
                        aria-hidden="true"
                      >
                        <input
                          {...register("honeypot")}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Section heading */}
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">
                          Форма за контакт
                        </p>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                          Изпратете запитване
                        </h2>
                      </div>

                      {/* Name */}
                      <div>
                        <label className={rightLabelCls}>Иmе *</label>
                        <input
                          {...register("name")}
                          placeholder="Вашето ime..."
                          className={inputCls}
                        />
                        <ErrorMsg message={errors.name?.message} />
                      </div>

                      {/* Email */}
                      <div>
                        <label className={rightLabelCls}>Имейл *</label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="email@example.com"
                          className={inputCls}
                        />
                        <ErrorMsg message={errors.email?.message} />
                      </div>

                      {/* Phone + Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={rightLabelCls}>Телефон</label>
                          <input
                            {...phoneRest}
                            onChange={(e) => {
                              // Strip any character that isn't a digit or +
                              e.target.value = e.target.value.replace(/[^\d+]/g, "");
                              phoneOnChange(e);
                            }}
                            inputMode="tel"
                            placeholder="+359..."
                            className={inputCls}
                          />
                          <ErrorMsg message={errors.phone?.message} />
                        </div>
                        <div>
                          <label className={rightLabelCls}>Фирма</label>
                          <input
                            {...register("company")}
                            placeholder="Наименование на фирмата"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className={rightLabelCls}>Тема *</label>
                        <input
                          {...register("subject")}
                          placeholder="Тема на запитването"
                          className={inputCls}
                        />
                        <ErrorMsg message={errors.subject?.message} />
                      </div>

                      {/* Message */}
                      <div>
                        <label className={rightLabelCls}>Съобщение *</label>
                        <textarea
                          {...register("message")}
                          placeholder="Как можем да Ви помогнем?"
                          rows={4}
                          className={inputCls + " resize-none leading-relaxed"}
                        />
                        <ErrorMsg message={errors.message?.message} />
                      </div>

                      {/* Terms */}
                      <div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="terms-cs"
                            {...register("termsAccepted")}
                            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer"
                          />
                          <label
                            htmlFor="terms-cs"
                            className="text-sm text-white/55 leading-relaxed cursor-pointer select-none"
                          >
                            Запознат съм и приемам{" "}
                            <a
                              href="/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline underline-offset-2 hover:text-primary/80"
                            >
                              Общите условия
                            </a>{" "}
                            и{" "}
                            <a
                              href="/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline underline-offset-2 hover:text-primary/80"
                            >
                              Политиката за поверителност
                            </a>
                            .{" "}
                            <span className="text-white/30">(Задължително)</span>
                          </label>
                        </div>
                        <ErrorMsg message={errors.termsAccepted?.message} indent />
                      </div>

                      {/* Server error */}
                      <AnimatePresence>
                        {serverError && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-400 text-sm"
                          >
                            {serverError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <div className="flex justify-end pt-1">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          onHoverStart={handleBtnHoverStart}
                          onHoverEnd={handleBtnHoverEnd}
                          onClick={handleBtnClick}
                          className="flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none overflow-hidden"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── BLOCK 2: Map ── */}
        <div className="border border-white/[0.10] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(25,191,183,0.10)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.283956399353!2d23.319877890847863!3d42.697707877149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa855eff40e335%3A0xa7cffc05e42a4e56!2sTakiev%20Finance%20EOOD!5e0!3m2!1sbg!2sbg!4v1768080298879!5m2!1sbg!2sbg&style=feature:all|element:geometry|color:0x40514E&style=feature:all|element:labels.text.fill|color:0x19BFB7&style=feature:all|element:labels.text.stroke|color:0x2c3e3b&style=feature:water|element:geometry|color:0x2c3e3b"
            width="100%"
            height="400"
            style={{
              border: 0,
              display: "block",
              filter: "grayscale(15%) contrast(1.05)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Takiev Finance Location"
          />
        </div>
      </motion.div>
    </section>
  );
}
