import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-white/80 mb-4">
              Избери своя доверен бизнес партньор. Експертно счетоводно
              обслужване на Вашия бизнес.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Бързи връзки</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/za-nas"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  За нас
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/video"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Видео
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/uslugi"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Счетоводни услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Данъчни консултации
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Правни услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Регистрация на фирми
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:office@takiev.bg"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  office@takiev.bg
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+359123456789"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  +359 123 456 789
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  София, България
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/60">
            &copy; {currentYear} Takiev Finance. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}
