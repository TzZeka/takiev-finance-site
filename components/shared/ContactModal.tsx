"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
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

const contactFormSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().email("Невалиден email адрес"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2, "Темата трябва да е поне 2 символа"),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
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

  // Simple body scroll lock - only when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    }

    return () => {
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen]);

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
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal positioning wrapper */}
      <div className="min-h-full flex items-center justify-center p-4">
        {/* Modal content */}
        <div className="relative w-full max-w-5xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-white/10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 z-10"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Благодарим Ви!
                </h3>
                <p className="text-white/70 text-lg">
                  Вашето запитване е изпратено успешно. Ще се свържем с Вас възможно най-скоро.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side - Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Свържете се с нас
                    </h2>
                    <p className="text-white/60 text-sm md:text-base">
                      Попълнете формата и ще се свържем с Вас възможно най-скоро
                    </p>
                  </div>

                  {/* Contact Info - visible on all screens */}
                  <div className="flex flex-wrap lg:flex-col gap-4">
                    <a href="tel:+359123456789" className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">+359 123 456 789</span>
                    </a>

                    <a href="mailto:office@takiev.bg" className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">office@takiev.bg</span>
                    </a>

                    <div className="flex items-center gap-3 text-white/80">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">София, България</span>
                    </div>
                  </div>

                  {/* Trust Badge - hidden on mobile */}
                  <div className="hidden lg:block p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-white/70 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      100% Поверителност
                    </p>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Two column grid for form fields on desktop */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm">Име *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Вашето име"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                                  {...field}
                                />
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
                              <FormLabel className="text-white text-sm">Email *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="email@example.com"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm">Телефон</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+359 ..."
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                                  {...field}
                                />
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
                              <FormLabel className="text-white text-sm">Фирма</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Име на фирмата"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                                  {...field}
                                />
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
                            <FormLabel className="text-white text-sm">Тема *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Тема на запитването"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                                {...field}
                              />
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
                            <FormLabel className="text-white text-sm">Съобщение *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Как можем да Ви помогнем?"
                                rows={3}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
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
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
