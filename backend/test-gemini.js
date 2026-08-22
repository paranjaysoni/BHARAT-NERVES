import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API Key present:", !!apiKey);
  console.log("Model:", process.env.GEMINI_MODEL);
  
  if (!apiKey) {
    console.error("No API key");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
      contents: "Hello, what is your name?",
    });
    console.log("Success! Response:", response.text);
  } catch (error) {
    console.error("Gemini SDK Error:", error.message || error);
    process.exit(1);
  }
}

main();
