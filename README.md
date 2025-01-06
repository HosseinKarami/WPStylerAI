<div align="center">
  <div>
    <h1 align="center">WPStylerAI</h1>
  </div>
  <p>An npm library to convert images into WordPress <code>theme.json</code> color palettes using AI.</p>


  <a href="https://www.npmjs.com/package/wp-styler-ai"><img src="https://img.shields.io/npm/v/wp-styler-ai" alt="Current version"></a>
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
    apiKey: process.env.TOGETHER_API_KEY, // Together AI API key
  });

  console.log(json);
}

main();
```

This script processes an image and outputs a WordPress `theme.json` color palette.

## How It Works

`wp-styler-ai` uses the Together AI Llama Vision model to perform OCR (Optical Character Recognition) on an image. The extracted data is converted into a WordPress-compatible `theme.json` color palette.

The default Together AI model used is `Llama-3.2-90B-Vision`. You can switch to a free or smaller model for faster performance or lower costs by modifying the `model` option.

## Roadmap

- [x] Support for local image OCR
- [x] Generate WordPress `theme.json` color palettes
- [ ] Add support for typography

## Credits

This project was inspired by [Llama OCR](https://github.com/Nutlope/llama-ocr).

