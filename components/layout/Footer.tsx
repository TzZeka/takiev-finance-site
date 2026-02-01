import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#19BFB7] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#40514E] rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="flex flex-col">
                <span className="text-sm text-white/50">ЕИК: 206666484</span>
                <div className="h-px w-full bg-gradient-to-r from-[#19BFB7] to-transparent mt-1" />
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Избери своя доверен бизнес партньор. Експертно счетоводно
              обслужване на Вашия бизнес.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/n.takiev"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-[#19BFB7] rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-[#19BFB7]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/company/takiev-finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-[#19BFB7] rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-[#19BFB7]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/@nikolaytakiev6221"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-[#19BFB7] rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-[#19BFB7]"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@n.takiev"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-[#19BFB7] rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-[#19BFB7]"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="text-[#19BFB7]">—</span>
              <span className="ml-2">Бързи връзки</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/za-nas"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  За нас
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/video"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Видео
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="text-[#19BFB7]">—</span>
              <span className="ml-2">Услуги</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/uslugi/schetovodni-uslugi"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Счетоводни услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/danachni-konsultacii"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Данъчни консултации
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/pravni-uslugi"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Правни услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/registraciq-na-firmi"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Регистрация на фирми
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Sites */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="text-[#19BFB7]">—</span>
              <span className="ml-2">Полезни сайтове</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://nula.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Nula.bg
                  <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.portalschetovodstvo.bg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Портал Счетоводство
                  <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://nap.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-white/70 hover:text-[#19BFB7] transition-colors flex items-center"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#19BFB7] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  НАП
                  <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="text-[#19BFB7]">—</span>
              <span className="ml-2">Контакти</span>
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-start space-x-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#19BFB7] transition-all duration-300">
                  <Mail className="h-4 w-4 text-[#19BFB7] flex-shrink-0" />
                </div>
                <a
                  href="mailto:office@takiev.bg"
                  className="text-sm text-white/70 hover:text-[#19BFB7] transition-colors pt-1"
                >
                  office@takiev.bg
                </a>
              </li>
              <li className="group flex items-start space-x-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#19BFB7] transition-all duration-300">
                  <Phone className="h-4 w-4 text-[#19BFB7] flex-shrink-0" />
                </div>
                <a
                  href="tel:+359123456789"
                  className="text-sm text-white/70 hover:text-[#19BFB7] transition-colors pt-1"
                >
                  +359 123 456 789
                </a>
              </li>
              <li className="group flex items-start space-x-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#19BFB7] transition-all duration-300">
                  <MapPin className="h-4 w-4 text-[#19BFB7] flex-shrink-0" />
                </div>
                <span className="text-sm text-white/70 pt-1">
                  София, България
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/50">
              &copy; 2021-{currentYear} Takiev Finance. Всички права запазени.
            </p>
            <div className="flex items-center space-x-6 text-xs text-white/50">
              <Link href="/privacy" className="hover:text-[#19BFB7] transition-colors">
                Политика за поверителност
              </Link>
              <Link href="/terms" className="hover:text-[#19BFB7] transition-colors">
                Условия за ползване
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
