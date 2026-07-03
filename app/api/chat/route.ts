import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import {saveChatSession} from "@/lib/kv";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0]!.trim() : 'unknown';
  const country = req.headers.get('x-vercel-ip-country') || '';
  return `${ip}:${country}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 20;

  const entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return { allowed: true, remaining: maxRequests - entry.count };
}

function sanitizeMessage(message: string): string {
  const stripped = message.replace(/<[^>]*>/g, '');
  return stripped.slice(0, 500);
}

export async function POST(req: Request) {
  let locale = "en";

  const rateLimitKey = getRateLimitKey(req);
  const { allowed } = checkRateLimit(rateLimitKey);

  if (!allowed) {
    return Response.json({ error: "too_many_requests" }, { status: 429 });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { reply: locale === "fa"
        ? "سرویس چت در حالت نگهداری است."
        : "Chat service temporarily unavailable.",
        error: "service_unavailable" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { message, locale: requestLocale, sessionId } = body;
    locale = requestLocale || "en";

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 });
    }

    const sanitizedMessage = sanitizeMessage(message);

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
          content: sanitizedMessage,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content ?? "";

    if (sessionId && typeof sessionId === "string" && sanitizedMessage && reply) {
      saveChatSession(sessionId, locale, sanitizedMessage, reply).catch(error => {
        console.error("Chat logging failed:", error);
      });
    }

    return Response.json({
      reply,
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
