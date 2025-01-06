<div align="center">
  <div>
    <h1 align="center">WPStylerAI</h1>
  </div>
  <p>An npm library for WordPress theme creators: Easily convert image-based color palettes into <code>theme.json</code> structures using this Node.js library powered by AI through the <a href="https://openrouter.ai/" target="_blank" rel="noreferrer">OpenRouter API</a> and <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer">Google: Gemini Flash 2.0 Experimental</a>.</p>



  <a href="https://www.npmjs.com/package/wp-styler-ai" target="_blank" rel="noreferrer"><img src="https://img.shields.io/npm/v/wp-styler-ai" alt="Current version"></a>
</div>



---

## Installation

To install `wp-styler-ai`, run the following command:

```bash
npm install wp-styler-ai
```

## Usage

Here's a quick example of how to use `wp-styler-ai`:

```typescript
import { ocr } from "wp-styler-ai";

async function main() {
  const json = await ocr({
    filePath: "./test/color-palette.png", // Path to your image
    apiKey: process.env.OPENROUTER_API_KEY, // OpenRouter API key
  });

  console.log(json);
}

main();
```

This script processes an image and outputs a WordPress `theme.json` color palette.

## How It Works

`wp-styler-ai` uses Google's Gemini Flash 2.0 Experimental model via the OpenRouter API to perform Optical Character Recognition (OCR) on an image. The extracted color data is then formatted into a WordPress `theme.json` color palette.

The default model used is `google/gemini-2.0-flash-exp:free`.


## Roadmap

- [x] Support for local image OCR
- [x] Generate WordPress `theme.json` color palettes
- [ ] Add support for typography

## Credits

This project was inspired by [Llama OCR](https://github.com/Nutlope/llama-ocr).

