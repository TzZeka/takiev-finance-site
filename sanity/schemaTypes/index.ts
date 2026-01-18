import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import blogPost from './blogPost'
import author from './author'
import testimonial from './testimonial'
import client from './client'
import video from './video'
import homeContent from './homeContent'
import accountingServicesContent from './accountingServicesContent'
import taxConsultationContent from './taxConsultationContent'
import legalServicesContent from './legalServicesContent'
import companyRegistrationContent from './companyRegistrationContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Services Page Content
    accountingServicesContent,
    taxConsultationContent,
    legalServicesContent,
    companyRegistrationContent,

    // Other Content Types
    service,
    blogPost,
    author,
    testimonial,
    client,
    video,
    homeContent,
  ],
}
