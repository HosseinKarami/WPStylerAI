import { ocr } from "../src/index";

async function main() {
  let json = await ocr({
    filePath: "./test/color-palette.png",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  console.log(json);
}

main();
