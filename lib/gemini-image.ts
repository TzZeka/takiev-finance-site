import { GoogleGenAI } from "@google/genai";

const MASTER_PROMPT = `You are an expert Editorial Photographer and Art Director for a premium financial magazine. Your goal is to create a high-end, cinematic blog header image that visually represents a specific article topic.

Visual Identity & Style Constraints (STRICT):

Setting: A clean, minimalist, and organized professional office desk.

Lighting: Warm, golden-hour natural sunlight coming from a side window. Soft, elegant shadows.

Color Palette: Earthy tones, oak wood, creamy whites, and professional slate greys.

Photography Style: Realistic stock photography, shallow depth of field (creamy bokeh background), focus on foreground objects.

Camera Angle: You MUST vary the angle for each request (e.g., occasional top-down flat lay, 45-degree side view, or eye-level close-up) to ensure the blog feels dynamic.

The Subject:
The image must intelligently and metaphorically illustrate the following article title: "[INSERT_ARTICLE_TITLE]"

Composition Instructions:

Contextual Objects: Based on the title, choose 2-3 relevant physical objects to place on the desk (e.g., a globe for international topics, house keys for real estate, a high-end calculator for taxes, a sleek pen and leather notebook for legal contracts).

Technology: Include a partial view of a modern laptop or tablet screen showing a clean, unreadable business interface or blurred charts.

Human Touch: The scene should look like someone just stepped away—maybe a pair of glasses or a ceramic coffee mug is present. No people should be visible in the shot.

Negative Constraints (CRITICAL):

NO TEXT: Do not render any words, letters, or gibberish text on paper, screens, or objects.

NO ILLUSTRATIONS: Must be a realistic photograph, not a 3D render or a drawing.

NO CLUTTER: Keep the composition breathable and high-end.

Analyze the following article title and choose the most relevant business objects to place on the desk. Vary the camera angle (sometimes top-down, sometimes side-view) to keep the blog dynamic. Create a unique, cinematic scene based on the title above. Do not include any text or words inside the image. Ensure it looks like a real photo, not a drawing.`;

export async function generateBlogBanner(
  title: string,
  _excerpt: string,
  _tags: string[]
): Promise<{ data: Buffer; mimeType: string }> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_AI_API_KEY not configured");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = MASTER_PROMPT.replace("[INSERT_ARTICLE_TITLE]", title);

  const response = await ai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: "16:9",
      outputMimeType: "image/jpeg",
    },
  });

  const base64Data = response.generatedImages?.[0]?.image?.imageBytes;
  if (!base64Data) throw new Error("Imagen 3 returned no image data");

  return {
    data: Buffer.from(base64Data, "base64"),
    mimeType: "image/jpeg",
  };
}
