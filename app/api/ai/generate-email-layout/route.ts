// app/api/ai/generate-email-layout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnyEmailElement, EmailDesign } from "@/lib/types/email-editor.types";

// Initialize Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

// Function to fetch an image from Unsplash
async function getUnsplashImage(query: string): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.warn("Unsplash Access Key not found. Falling back to placeholder images.");
    return null;
  }
  
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    
    if (!response.ok) {
      console.error("Failed to fetch from Unsplash:", response.statusText);
      return null;
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    return null;
  } catch (error) {
    console.error("Error calling Unsplash API:", error);
    return null;
  }
}

// Recursive function to find and replace image placeholders
async function replaceImagePlaceholders(elements: AnyEmailElement[], userPrompt: string): Promise<AnyEmailElement[]> {
  for (const el of elements) {
    if (el.type === 'image' && el.props.src && el.props.src.includes('placehold.co')) {
      const searchQuery = el.name.toLowerCase().includes('logo') ? 'logo' : (el.props.alt || userPrompt);
      const realImageUrl = await getUnsplashImage(searchQuery);
      if (realImageUrl) {
        el.props.src = realImageUrl;
      }
    } else if (el.type === 'columns' && el.columns) { // Check if el.columns exists
      for (const col of el.columns) {
        col.elements = await replaceImagePlaceholders(col.elements, userPrompt);
      }
    }
  }
  return elements;
}


export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- PROMPT ENGINEERING UPDATE V2 ---
    const instructionPrompt = `
      Based on the following user request, generate a JSON object for an email layout.
      You MUST strictly follow the provided TypeScript types and structure rules.
      Your primary task is to creatively fulfill the user's request for content within the JSON structure.

      USER REQUEST: "${prompt}"

      **CRITICAL RULES:**
      1.  **CONTENT IS KING:** You MUST generate relevant text for all text elements (like headers and descriptions) based on the USER REQUEST. Do not leave them empty or with generic placeholders. The "props.content" field for text elements must be populated with creative and relevant HTML.
      2.  **HEADER IMAGE SIZING:** For any main hero or header image, its style object MUST include **"width": "auto"** and **"height": "auto"**. This is mandatory for responsiveness.
      3.  **LOGO SIZING:** For logos, use a smaller fixed width, like "width": "150px", and "height": "auto".
      4.  **JSON ONLY:** Your entire output must be ONLY the raw JSON object. Do not include markdown formatting like \`\`\`json, comments, or any other text.

      TYPESCRIPT TYPES & JSON STRUCTURE RULES:
      /*
        - A root JSON object with "globalStyle" and "elements" keys.
        - "elements" is an array of element objects.
        - Each element object MUST have: "id" (use a placeholder like "id_..."), "type", "name", "props", and "style".
        - Allowed "type" values: "columns", "text", "image", "button", "divider", "spacer", "social".
        - "columns" elements MUST have a "columns" property which is an array of column objects. Each column object has an "id", "widthFactor" (e.g., 0.5), and an "elements" array.
        - "image" element "props" should have "src" (use placeholder URLs from https://placehold.co), and an "alt" text that describes the image based on the user request.
        - "button" element "props" should have "text" and "href".
        - All "style" objects should contain valid CSS properties in camelCase, with string values.
      */

      EXAMPLE of a full response based on a request for "a welcome email for a new user named Jane":
      {
        "globalStyle": { "contentWidth": "600px", "backgroundColor": "#f4f4f4", "fontFamily": "Arial, sans-serif" },
        "elements": [
          {
            "id": "id_1", "type": "columns", "name": "Header Image Row", "props": {}, "style": { "paddingBottom": "20px" },
            "columns": [
              { "id": "col_1", "widthFactor": 1, "elements": [
                  { "id": "id_hero", "type": "image", "name": "Welcome Banner", "props": { "src": "https://placehold.co/600x300?text=Welcome+Aboard!", "alt": "A welcoming image with abstract shapes and friendly colors" }, "style": { "width": "100%", "height": "auto" } }
              ]}
            ]
          },
          {
            "id": "id_3", "type": "columns", "name": "Content Row", "props": {}, "style": { "backgroundColor": "#FFFFFF", "paddingLeft": "20px", "paddingRight": "20px" },
            "columns": [
              { "id": "col_2", "widthFactor": 1, "elements": [
                  { "id": "id_4", "type": "text", "name": "Welcome Header", "props": { "content": "<h1>Welcome, Jane!</h1>" }, "style": { "textAlign": "center", "color": "#2c3e50", "paddingTop": "20px" } },
                  { "id": "id_5", "type": "text", "name": "Welcome Description", "props": { "content": "<p>We are so excited to have you join our community. Get ready to explore amazing events and connect with new people. Here are a few things you can do to get started.</p>" }, "style": { "textAlign": "center", "color": "#555555", "paddingTop": "10px", "paddingBottom": "20px", "lineHeight": "1.6" } }
              ]}
            ]
          }
        ]
      }

      Now, generate the JSON object for the user's request.
    `;

    // --- Step 1: Generate the JSON layout from Gemini ---
    const result = await model.generateContent(instructionPrompt);
    const response = await result.response;
    let text = response.text();

    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
    if (!jsonMatch || !jsonMatch[1] && !jsonMatch[2]) {
        throw new Error("AI did not return a valid JSON object.");
    }

    text = jsonMatch[1] || jsonMatch[2];
    let emailDesign: EmailDesign = JSON.parse(text);

    // --- Step 2: Replace placeholder images with real images from Unsplash ---
    if (emailDesign.elements && emailDesign.elements.length > 0) {
      emailDesign.elements = await replaceImagePlaceholders(emailDesign.elements, prompt);
    }
    
    return NextResponse.json(emailDesign);

  } catch (error: any) {
    console.error("Error in generate-email-layout API:", error);
    return NextResponse.json({ error: error.message || "Failed to generate email layout" }, { status: 500 });
  }
}
