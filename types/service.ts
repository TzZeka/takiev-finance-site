import { PortableTextBlock } from "@portabletext/types";
import { Slug } from "./sanity";

export interface ServicePackage {
  _key: string;
  name: string;
  description: string;
  price?: string;
  features: string[];
}

export interface Service {
  _id: string;
  _type: "service";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  category: "Счетоводни" | "Данъчни" | "Правни" | "Регистрация";
  excerpt: string;
  description: PortableTextBlock[];
  packages?: ServicePackage[];
  pricing?: string;
  icon?: string;
  order?: number;
}
