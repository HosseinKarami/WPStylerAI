import OpenAI from 'openai';
import fs from "fs";

export async function ocr({
  filePath,
  apiKey = process.env.OPENROUTER_API_KEY,
  model = "google/gemini-2.0-flash-exp:free",
}: {
  filePath: string;
  apiKey?: string;
  model?: "google/gemini-2.0-flash-exp:free";
}) {
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  let finalMarkdown = await getThemeJson({ openai, model, filePath });

  return finalMarkdown;
}

async function getThemeJson({
  openai,
  model,
  filePath,
}: {
  openai: OpenAI;
  model: string;
  filePath: string;
}) {
  const systemPrompt = `
  Be strictly accurate and ensure every color in the attached image is included in the extracted palette. Follow these rules:
  
  1. Extract the color palette from the image and return it as a JSON object matching the format of the "settings.color.palette" array in a WordPress theme.json file.
  2. Each color must have these keys: "slug", "color" (hexadecimal), and "name".
  3. Use best practices for naming conventions. If a section title is present, prefix it to the color name.
  4. Ensure no colors are missed, duplicated, or misrepresented. Critically review the output to include all unique HEX codes from the image.
  5. Return only the JSON object and no additional text.
  
  **Example JSON format (do not directly copy these colors):**
  [
    {
      "slug": "white",
      "color": "#FFFFFF",
      "name": "White"
    },
    {
      "slug": "black",
      "color": "#000000",
      "name": "Black"
    },
    {
      "slug": "primary",
      "color": "#2D2DC7",
      "name": "Primary"
    }
  ]
  `;

  const finalImageUrl = isRemoteFile(filePath)
    ? filePath
    : `data:image/jpeg;base64,${encodeImage(filePath)}`;

  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: finalImageUrl,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
}

function encodeImage(imagePath: string) {
  const imageFile = fs.readFileSync(imagePath);
  return Buffer.from(imageFile).toString("base64");
}

function isRemoteFile(filePath: string): boolean {
  return filePath.startsWith("http://") || filePath.startsWith("https://");
}
