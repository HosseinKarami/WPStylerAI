import Together from "together-ai";
import fs from "fs";

export async function ocr({
  filePath,
  apiKey = process.env.TOGETHER_API_KEY,
  model = "Llama-3.2-90B-Vision",
}: {
  filePath: string;
  apiKey?: string;
  model?: "Llama-3.2-90B-Vision" | "Llama-3.2-11B-Vision" | "free";
}) {
  const visionLLM =
    model === "free"
      ? "meta-llama/Llama-Vision-Free"
      : `meta-llama/${model}-Instruct-Turbo`;

  const together = new Together({
    apiKey,
  });

  let finalMarkdown = await getThemeJson({ together, visionLLM, filePath });

  return finalMarkdown;
}

async function getThemeJson({
  together,
  visionLLM,
  filePath,
}: {
  together: Together;
  visionLLM: string;
  filePath: string;
}) {
  const systemPrompt = `Be STRICTLY accurate to not miss any palette color. You have a history of missing some colors, make sure you don't miss that:
Extract the color palette from the attached image and represent it as a JSON object, following the format of the settings.color.palette array in a WordPress theme.json file. Each color in the JSON should have "slug", "color" (in hexadecimal format), and "name" keys. Follow best naming convention practices. Do self critic, and make sure you have all the HEX codes listed in the picture in your pallete, and colors match. If not, fix it. Do not return any text other than the JSON object.
Also if the colors have a title in their section, add it as a prefix before the color name. Don't shift color names for any reason. do not replicate colors.
Reference theme.json format (example - do not directly use these colors):
json
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

  const output = await together.chat.completions.create({
    model: visionLLM,
    messages: [
      {
        role: "user",
        // @ts-expect-error
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

  return output.choices[0].message.content;
}

function encodeImage(imagePath: string) {
  const imageFile = fs.readFileSync(imagePath);
  return Buffer.from(imageFile).toString("base64");
}

function isRemoteFile(filePath: string): boolean {
  return filePath.startsWith("http://") || filePath.startsWith("https://");
}
