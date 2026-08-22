import { GoogleGenAI } from "@google/genai";

let genai: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (genai) return genai;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    genai = new GoogleGenAI({ apiKey });
    return genai;
  } catch (err) {
    console.error("Failed to initialize Google GenAI SDK", err);
    return null;
  }
}

/**
 * Executes an LLM generation if GEMINI_API_KEY is configured.
 * Otherwise, falls back to the provided fallback value.
 */
export async function generateWithGeminiFallback<T>(
  prompt: string,
  fallbackValue: T,
  parser: (response: string) => T = (text) => text as unknown as T
): Promise<T> {
  const ai = getGenAI();
  if (!ai) {
    return fallbackValue;
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    if (response.text) {
      return parser(response.text);
    }
    return fallbackValue;
  } catch (error) {
    console.error("Gemini API call failed", error);
    return fallbackValue;
  }
}
