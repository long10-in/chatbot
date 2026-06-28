import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const g = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

try {
  const { text } = await generateText({
    model: g("gemini-2.0-flash"),
    prompt: "Say hi in Vietnamese, one word.",
  });
  console.log("OK:", text);
} catch (e) {
  console.log("ERR:", e.message, e.statusCode || "", JSON.stringify(e.data || "").slice(0, 400));
}
