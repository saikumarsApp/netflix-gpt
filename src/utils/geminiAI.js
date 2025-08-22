import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.REACT_APP_GEMINI_KEY);
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Explain how AI works in a few words",
});
