import type { StructureResolver } from 'sanity/structure'
import {
  Calculator,
  Receipt,
  Scale,
  Building2,
  FileText,
  Users,
  Video,
  Home,
  Briefcase,
  MessageSquare,
  UserCircle
} from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Съдържание')
    .items([
      // Services Page Section
      S.listItem()
        .title('Страница Услуги')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Табове на страница Услуги')
            .items([
              // Accounting Services Tab
              S.listItem()
                .title('Счетоводни услуги')
                .icon(Calculator)
                .child(
                  S.document()
                    .schemaType('accountingServicesContent')
                    .documentId('accountingServicesContent')
                    .title('Счетоводни услуги - Съдържание')
                ),

              // Tax Consultation Tab
              S.listItem()
                .title('Данъчни консултации')
                .icon(Receipt)
                .child(
                  S.document()
                    .schemaType('taxConsultationContent')
                    .documentId('taxConsultationContent')
                    .title('Данъчни консултации - Съдържание')
                ),

              // Legal Services Tab
              S.listItem()
                .title('Правни услуги')
                .icon(Scale)
                .child(
                  S.document()
                    .schemaType('legalServicesContent')
                    .documentId('legalServicesContent')
                    .title('Правни услуги - Съдържание')
                ),

              // Company Registration Tab
              S.listItem()
                .title('Регистрация на фирми')
                .icon(Building2)
                .child(
                  S.document()
                    .schemaType('companyRegistrationContent')
                    .documentId('companyRegistrationContent')
                    .title('Регистрация на фирми - Съдържание')
                ),
            ])
        ),

      S.divider(),

      // Homepage Content
      S.listItem()
        .title('Начална страница')
        .icon(Home)
        .child(
          S.document()
            .schemaType('homeContent')
            .documentId('homeContent')
            .title('Съдържание на началната страница')
        ),

      S.divider(),

      // Blog Section
      S.listItem()
        .title('Блог')
        .icon(FileText)
        .child(
          S.list()
            .title('Блог')
            .items([
              S.documentTypeListItem('blogPost').title('Статии'),
              S.documentTypeListItem('author').title('Автори'),
            ])
        ),

      // Videos
      S.documentTypeListItem('video').title('Видео').icon(Video),

      S.divider(),

      // Testimonials & Clients
      S.listItem()
        .title('Клиенти и отзиви')
        .icon(Users)
        .child(
          S.list()
            .title('Клиенти и отзиви')
            .items([
              S.documentTypeListItem('testimonial').title('Отзиви').icon(MessageSquare),
              S.documentTypeListItem('client').title('Партньори / Клиенти').icon(UserCircle),
            ])
        ),

      S.divider(),

      // Individual Services (legacy, can be hidden or kept for individual service pages)
      S.documentTypeListItem('service').title('Индивидуални услуги (страници)').icon(Briefcase),
    ])
