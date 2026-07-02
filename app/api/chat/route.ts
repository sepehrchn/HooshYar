import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
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

    // Call Gemini API
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I will answer questions about Hoosh Yar using only the knowledge base provided, responding in the user's language with a helpful and professional tone.",
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ reply: response });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Failed to process message",
        reply:
          locale === "fa"
            ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
            : "Something went wrong. Please use the contact form.",
      },
      { status: 500 }
    );
  }
}
