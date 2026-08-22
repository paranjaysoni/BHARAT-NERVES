import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.list();
    console.log(response);
  } catch (error) {
    console.error("Gemini SDK Error:", error.message || error);
  }
}

main();
