import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import blogPost from './blogPost'
import author from './author'
import testimonial from './testimonial'
import client from './client'
import video from './video'
import homeContent from './homeContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    service,
    blogPost,
    author,
    testimonial,
    client,
    video,
    homeContent,
  ],
}
