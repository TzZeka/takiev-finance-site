import { createClient } from "@sanity/client";
import { sanityConfig } from "./config";

export const writeClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
