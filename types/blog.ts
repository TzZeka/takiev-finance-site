import { PortableTextBlock } from "@portabletext/types";
import { SanityImage, Slug } from "./sanity";

export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug: Slug;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  author?: Author;
  publishedAt: string;
  mainImage?: SanityImage;
  excerpt: string;
  body: PortableTextBlock[];
  nulaBgUrl?: string;
  tags: string[];
  featured?: boolean;
}
