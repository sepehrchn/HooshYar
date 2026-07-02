import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Testing Grok API connection...");

  if (!process.env.GROK_API_KEY) {
    return NextResponse.json({
      success: false,
      error: "GROK_API_KEY not set in .env.local",
    });
  }

  console.log("API Key found, first 10 chars:", process.env.GROK_API_KEY.substring(0, 10));

  try {
    const openai = new OpenAI({
      apiKey: process.env.GROK_API_KEY,
      baseURL: "https://api.x.ai/v1",
    });

    console.log("OpenAI client created, testing with simple message...");

    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, I am Grok!' in one sentence.",
        },
      ],
      max_tokens: 50,
    });

    const response = completion.choices[0]?.message?.content || "";

    console.log("Success! Response:", response);

    return NextResponse.json({
      success: true,
      response: response,
      model: "grok-beta",
    });
  } catch (error: any) {
    console.error("=== Test API Error ===");
    console.error("Error message:", error?.message);
    console.error("Error status:", error?.status);
    console.error("Error code:", error?.code);
    console.error("Error type:", error?.type);
    console.error("Full error:", JSON.stringify(error, null, 2));
    console.error("=====================");

    return NextResponse.json({
      success: false,
      error: error?.message || "Unknown error",
      details: {
        status: error?.status,
        code: error?.code,
        type: error?.type,
      },
    });
  }
}
