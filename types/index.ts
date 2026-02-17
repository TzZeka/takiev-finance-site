export * from "./sanity";
export * from "./blog";
export * from "./service";

import { SanityImage, Slug } from "./sanity";

// Testimonial Type
export interface Testimonial {
  _id: string;
  _type: "testimonial";
  _createdAt: string;
  clientName: string;
  clientCompany: string;
  clientRole: string;
  content: string;
  rating: number;
  avatar?: SanityImage;
  featured?: boolean;
}

// Client Type
export interface Client {
  _id: string;
  _type: "client";
  _createdAt: string;
  name: string;
  logo: SanityImage;
  website?: string;
  sector: string;
  order?: number;
}

// Video Type
export interface Video {
  _id: string;
  _type: "video";
  _createdAt: string;
  title: string;
  platform: "youtube" | "tiktok";
  url: string;
  videoId: string;
  thumbnail?: SanityImage;
  description?: string;
  publishedAt: string;
  featured?: boolean;
  order?: number;
}

// Home Content Type
export interface HomeContent {
  _id: string;
  _type: "homeContent";
  _createdAt: string;
  heroVideo?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  heroVideoUrl?: string;
  motto: string;
  messages: Array<{
    _key: string;
    icon: string;
    title: string;
    description: string;
    image?: SanityImage;
  }>;
  ctaText?: string;
  ctaButtonText?: string;
}
