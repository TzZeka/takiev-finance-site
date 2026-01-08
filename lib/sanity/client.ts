import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";
import { SanityImage } from "@/types";

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Helper function to get image URL
export function getImageUrl(source: SanityImage): string {
  return urlFor(source).url();
}
