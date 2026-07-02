import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// Initialize Grok API (OpenAI-compatible)
const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// Read knowledge base file
async function getKnowledgeBase() {
  try {
    const knowledgePath = join(
      process.cwd(),
      "content",
      "knowledge",
      "HOOSH-YAR-knowledge.txt"
    );
    const knowledgeContent = await readFile(knowledgePath, "utf-8");
    return knowledgeContent;
  } catch (error) {
    console.error("Error reading knowledge base:", error);
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, locale } = await request.json();

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required", reply: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROK_API_KEY) {
      console.error("GROK_API_KEY is not set");
      return NextResponse.json(
        {
          error: "API key not configured",
          reply:
            locale === "fa"
              ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
              : "Something went wrong. Please use the contact form.",
        },
        { status: 500 }
      );
    }

    // Load knowledge base
    const knowledgeBase = await getKnowledgeBase();

    if (!knowledgeBase) {
      console.error("Knowledge base is empty or failed to load");
      return NextResponse.json(
        {
          error: "Knowledge base not available",
          reply:
            locale === "fa"
              ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
              : "Something went wrong. Please use the contact form.",
        },
        { status: 500 }
      );
    }

    // System prompt
    const systemPrompt = `You are the AI assistant for Hoosh Yar (هوش‌یار), a digital studio specializing in AI services, automation, and web development.

**Instructions:**
- Use ONLY the information in the knowledge base below to answer questions
- Respond in the same language the user writes in (Persian or English)
- Be concise, warm, and helpful (2-4 sentences unless detail is requested)
- Never invent information not in the knowledge base
- If you don't know something, direct the user to the contact form or email
- Match the tone: professional but friendly, knowledgeable but not overly technical

**Knowledge Base:**
${knowledgeBase}

Now respond to the user's message.`;

    // Call Grok API
    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ reply: response });
  } catch (error: any) {
    console.error("=== Chat API Error ===");
    console.error("Error message:", error?.message);
    console.error("Error name:", error?.name);
    console.error("Error status:", error?.status);
    console.error("Error response:", error?.response?.data);
    console.error("Full error:", error);
    console.error("======================");

    const errorReply =
      locale === "fa"
        ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
        : "Something went wrong. Please use the contact form.";

    return NextResponse.json(
      {
        error: error?.message || "Failed to process message",
        reply: errorReply,
      },
      { status: 500 }
    );
  }
}
