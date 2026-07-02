import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, locale } = await req.json();

    const knowledge = fs.readFileSync(
      path.join(process.cwd(), "content/knowledge/HOOSH-YAR-knowledge.txt"),
      "utf-8"
    );

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are the AI assistant for Hoosh Yar. Use only the information below to answer questions. Respond in the same language the user writes in. Be concise, warm, and helpful. Never invent information not in the knowledge base.\n\n${knowledge}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      {
        reply: locale === "fa"
          ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
          : "Something went wrong. Please use the contact form.",
        error: "failed",
      },
      { status: 500 }
    );
  }
}
