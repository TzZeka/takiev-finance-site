import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас - Takiev Finance",
  description:
    "Такиев Финанс предлага професионални счетоводни услуги и данъчни консултации. Опитен екип с богата практика в различни бизнес сектори.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
