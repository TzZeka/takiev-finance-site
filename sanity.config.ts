import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Takiev Finance",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oy6qgfzp",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [structureTool(), visionTool()],

  schema,
});
