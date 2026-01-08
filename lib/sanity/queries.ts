import { client } from "./client";
import type {
  Service,
  BlogPost,
  Testimonial,
  Client,
  Video,
  HomeContent,
} from "@/types";

// Services
export async function getAllServices(): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      category,
      excerpt,
      description,
      packages,
      pricing,
      icon,
      order
    }`
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      category,
      excerpt,
      description,
      packages,
      pricing,
      icon,
      order
    }`,
    { slug }
  );
}

export async function getServicesByCategory(
  category: string
): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service" && category == $category] | order(order asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      category,
      excerpt,
      description,
      packages,
      pricing,
      icon,
      order
    }`,
    { category }
  );
}

// Blog Posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      author-> {
        _id,
        _type,
        name,
        slug,
        image,
        bio
      },
      publishedAt,
      mainImage,
      excerpt,
      body,
      nulaBgUrl,
      tags,
      featured
    }`
  );
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...${limit}] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      author-> {
        _id,
        _type,
        name,
        slug,
        image,
        bio
      },
      publishedAt,
      mainImage,
      excerpt,
      body,
      nulaBgUrl,
      tags,
      featured
    }`
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      author-> {
        _id,
        _type,
        name,
        slug,
        image,
        bio
      },
      publishedAt,
      mainImage,
      excerpt,
      body,
      nulaBgUrl,
      tags,
      featured
    }`,
    { slug }
  );
}

// Testimonials
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      _type,
      _createdAt,
      clientName,
      clientCompany,
      clientRole,
      content,
      rating,
      avatar,
      featured
    }`
  );
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      _id,
      _type,
      _createdAt,
      clientName,
      clientCompany,
      clientRole,
      content,
      rating,
      avatar,
      featured
    }`
  );
}

// Clients
export async function getAllClients(): Promise<Client[]> {
  return client.fetch(
    `*[_type == "client"] | order(order asc) {
      _id,
      _type,
      _createdAt,
      name,
      logo,
      website,
      sector,
      order
    }`
  );
}

// Videos
export async function getAllVideos(): Promise<Video[]> {
  return client.fetch(
    `*[_type == "video"] | order(order asc) {
      _id,
      _type,
      _createdAt,
      title,
      platform,
      url,
      videoId,
      thumbnail,
      description,
      publishedAt,
      featured,
      order
    }`
  );
}

export async function getFeaturedVideos(limit: number = 3): Promise<Video[]> {
  return client.fetch(
    `*[_type == "video" && featured == true] | order(order asc) [0...${limit}] {
      _id,
      _type,
      _createdAt,
      title,
      platform,
      url,
      videoId,
      thumbnail,
      description,
      publishedAt,
      featured,
      order
    }`
  );
}

// Home Content
export async function getHomeContent(): Promise<HomeContent | null> {
  return client.fetch(
    `*[_type == "homeContent"][0] {
      _id,
      _type,
      _createdAt,
      heroVideo,
      heroVideoUrl,
      motto,
      messages,
      ctaText,
      ctaButtonText
    }`
  );
}
