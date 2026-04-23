import { client } from "./client";
import type {
  Service,
  BlogPost,
  NewsItem,
  Testimonial,
  Client,
  Video,
  HomeContent,
  TeamMember,
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
      aiSummary,
      body,
      nulaBgUrl,
      tags,
      featured,
      readingTime,
      accentColor
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
      aiSummary,
      body,
      nulaBgUrl,
      tags,
      featured,
      readingTime,
      accentColor
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
      aiSummary,
      body,
      nulaBgUrl,
      tags,
      featured,
      readingTime,
      accentColor
    }`,
    { slug }
  );
}

export async function getRelatedBlogPosts(
  currentPostId: string,
  tags: string[],
  limit: number = 3
): Promise<BlogPost[]> {
  // If there are tags, find posts with matching tags
  // Otherwise, just get recent posts
  if (tags.length > 0) {
    return client.fetch(
      `*[_type == "blogPost" && _id != $currentPostId && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc) [0...${limit}] {
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
        tags,
        featured
      }`,
      { currentPostId, tags }
    );
  }

  // Fallback: get recent posts excluding current
  return client.fetch(
    `*[_type == "blogPost" && _id != $currentPostId] | order(publishedAt desc) [0...${limit}] {
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
      tags,
      featured
    }`,
    { currentPostId }
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
      cardImage,
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

// Firm News
export async function getAllNews(): Promise<NewsItem[]> {
  return client.fetch(
    `*[_type == "news"] | order(priority asc, publishedAt desc) {
      _id,
      _type,
      _createdAt,
      title,
      summary,
      publishedAt,
      tag,
      priority
    }`
  );
}

// External News Articles (НАП / НОИ)
export async function getNewsArticles(): Promise<import('@/types/novini').SanityNewsArticle[]> {
  return client.fetch(
    `*[_type == "newsArticle"] | order(publishedAt desc) [0...20] {
      _id,
      source,
      url,
      title,
      slug,
      publishedAt,
      articleBody,
      manualSummary,
      aiTitle,
      aiSummary,
      keyPoints,
      extractedDates,
      affectedEntities,
      actionRequired,
      actionDescription,
      aiProcessedAt
    }`
  )
}

export async function getNewsArticleBySlug(
  slug: string
): Promise<import('@/types/novini').SanityNewsArticle | null> {
  return client.fetch(
    `*[_type == "newsArticle" && slug.current == $slug][0] {
      _id,
      source,
      url,
      title,
      slug,
      publishedAt,
      articleBody,
      manualSummary,
      aiTitle,
      aiSummary,
      keyPoints,
      extractedDates,
      affectedEntities,
      actionRequired,
      actionDescription,
      aiProcessedAt
    }`,
    { slug }
  )
}

export async function getAllNewsArticleSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    `*[_type == "newsArticle" && defined(slug.current)] {
      slug
    }`
  )
}

// Lightweight fetch for cross-linking from news pages
export async function getRecentBlogPostsForLinking(limit: number = 3): Promise<{
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  tags: string[]
}[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags
    }`,
    { limit }
  )
}

// Lightweight fetch for blog dashboard — no AI processing triggered
export async function getNewsArticlesForDashboard(): Promise<{
  _id: string
  source: 'nap' | 'noi'
  title: string
  slug?: { current: string }
  url: string
  publishedAt: string
}[]> {
  return client.fetch(
    `*[_type == "newsArticle"] | order(publishedAt desc) [0...5] {
      _id,
      source,
      title,
      slug,
      url,
      publishedAt
    }`
  )
}

// Team Members — leaders first, then by order
export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(roleType asc, order asc) {
      _id,
      _type,
      _createdAt,
      name,
      role,
      roleType,
      education,
      image,
      bio,
      order
    }`
  );
}
