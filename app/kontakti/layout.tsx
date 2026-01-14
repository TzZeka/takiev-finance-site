import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти - Takiev Finance",
  description:
    "Свържете се с нас за професионална консултация по счетоводство и данъци. Очакваме Вашето запитване.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
