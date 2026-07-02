# Chatbot Setup Guide — Google Gemini Integration

This guide will walk you through connecting your Hoosh Yar chatbot to Google Gemini API.

---

## Prerequisites

✅ You have the chatbot UI already working (it shows placeholder responses)  
✅ You have a Google account  
✅ You're familiar with your project structure  

---

## Step 1: Get Your Gemini API Key

1. **Go to Google AI Studio:**  
   👉 https://aistudio.google.com/app/apikey

2. **Sign in** with your Google account

3. **Create API Key:**
   - Click **"Create API Key"** button
   - Choose **"Create API key in new project"** (or select an existing project)
   - Copy the key — it looks like: `AIzaSy...` (long string)

4. **Important:** Keep this key private — never share it publicly or commit it to GitHub!

---

## Step 2: Add Environment Variable to Your Project

1. **Create `.env.local` file** in your project root (same folder as `package.json`):

   ```bash
   # In terminal, from your project root:
   touch .env.local
   ```

2. **Open `.env.local`** and add your API key:

   ```env
   GEMINI_API_KEY=AIzaSy_YOUR_ACTUAL_KEY_HERE
   ```

   Replace `AIzaSy_YOUR_ACTUAL_KEY_HERE` with the key you copied from Google AI Studio.

3. **Verify `.gitignore` includes `.env.local`:**

   Open `.gitignore` and make sure this line exists:
   ```
   .env.local
   ```

   If it's not there, add it. This prevents your API key from being committed to Git.

---

## Step 3: Verify Knowledge Base File

The knowledge base file has been created at:
```
/content/knowledge/HOOSH-YAR-knowledge.txt
```

**Action items:**
1. Open `/content/knowledge/HOOSH-YAR-knowledge.txt`
2. Replace all placeholder contact info:
   - `[placeholder@hooshyar.com]` → Your real email
   - `[@hooshyar]` → Your real Telegram handle
   - `[+98 XXX XXX XXXX]` → Your real WhatsApp number
   - `[@hooshyar.ai]` → Your real Instagram handle
   - Update Bale handle if needed
3. Update the website URL if you have a custom domain
4. Review pricing ranges and adjust to your actual pricing
5. Update portfolio examples if you have specific projects to showcase

---

## Step 4: Install Required Dependencies

Your project needs the Google Generative AI SDK:

```bash
npm install @google/generative-ai
```

---

## Step 5: Create the API Route

You'll create a Next.js API route that:
- Receives the user's message and locale
- Reads the knowledge base file
- Calls Gemini API
- Returns the AI response

**Create this file:** `/app/api/chat/route.ts`

Here's the complete code:

```typescript
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
    const knowledgePath = join(process.cwd(), "content", "knowledge", "HOOSH-YAR-knowledge.txt");
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
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Load knowledge base
    const knowledgeBase = await getKnowledgeBase();

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
          parts: [{ text: "I understand. I will answer questions about Hoosh Yar using only the knowledge base provided, responding in the user's language with a helpful and professional tone." }],
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
        reply: locale === "fa" 
          ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
          : "Something went wrong. Please use the contact form."
      },
      { status: 500 }
    );
  }
}
```

---

## Step 6: Update the Chatbot Widget

Now you need to modify the chatbot widget to call the API instead of showing placeholder responses.

**File to edit:** `/components/chatbot/chatbot-widget.tsx`

**Find this section** (around line 115):

```typescript
const handleSendMessage = (text: string) => {
  if (!text.trim()) return;

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    text: text.trim(),
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  // Simulate bot response after 400ms
  setTimeout(() => {
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: PLACEHOLDER_RESPONSES[locale],
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  }, 400);
};
```

**Replace with this:**

```typescript
const handleSendMessage = async (text: string) => {
  if (!text.trim()) return;

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    text: text.trim(),
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  try {
    // Call the API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text.trim(),
        locale: locale,
      }),
    });

    const data = await response.json();

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.reply || data.error || PLACEHOLDER_RESPONSES[locale],
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Chat error:", error);
    
    // Fallback error message
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: locale === "fa" 
        ? "مشکلی پیش اومد. لطفاً از فرم تماس استفاده کنید."
        : "Something went wrong. Please use the contact form.",
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};
```

---

## Step 7: Test Your Chatbot

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open your site:**  
   http://localhost:3000

3. **Open the chatbot** (click the trigger button)

4. **Test messages:**
   - English: "What services do you offer?"
   - Persian: "قیمت‌ها چطوره؟"
   - Edge case: "Tell me about RAG"

5. **Check the console** (F12 in browser) for any errors

---

## Step 8: Deploy to Production

Once everything works locally:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Connect chatbot to Gemini API"
   git push origin main
   ```

2. **Add environment variable to Vercel:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to **Settings → Environment Variables**
   - Add `GEMINI_API_KEY` with your API key value
   - Apply to **Production**, **Preview**, and **Development** environments

3. **Redeploy** (or wait for auto-deploy from Git push)

4. **Test on production URL**

---

## Troubleshooting

### Error: "GEMINI_API_KEY is not set"
- Make sure `.env.local` exists in your project root
- Verify the key is spelled correctly: `GEMINI_API_KEY=AIzaSy...`
- Restart your dev server after creating `.env.local`
- On Vercel, check that the env var is set in Settings → Environment Variables

### Error: "Failed to process message"
- Check your API key is valid at https://aistudio.google.com/app/apikey
- Check your internet connection
- Check browser console (F12) for detailed error messages
- Check Vercel logs if in production

### Bot responds in wrong language
- The bot should auto-detect the user's language
- If it doesn't work, check that you're passing `locale` correctly in the API call
- The knowledge base includes instructions to "respond in the same language the user writes in"

### Knowledge base not loading
- Verify the file exists at `/content/knowledge/HOOSH-YAR-knowledge.txt`
- Check file permissions (should be readable)
- Check server logs for "Error reading knowledge base" message

### API costs too high
- Gemini 1.5 Flash has a free tier (15 requests per minute, 1 million tokens per day)
- Check usage at https://aistudio.google.com/app/apikey
- Consider adding rate limiting to your API route if needed

---

## Cost Estimates

**Gemini 1.5 Flash (recommended):**
- Free tier: 15 RPM, 1M tokens/day, 1500 RPD
- Beyond free tier: $0.075 per 1M input tokens, $0.30 per 1M output tokens

**Typical usage:**
- Knowledge base: ~8,000 tokens per request (loaded as context)
- User message: ~50-200 tokens
- Bot response: ~100-400 tokens
- **Total per message:** ~8,000-9,000 tokens (~$0.0007 per message)

**Monthly estimates:**
- 100 messages: ~$0.07 (within free tier)
- 1,000 messages: ~$0.70
- 10,000 messages: ~$7.00

Most small to medium sites will stay within the free tier.

---

## Next Steps

Once your chatbot is working:

1. **Monitor conversations:**
   - Check if users are getting helpful responses
   - Look for common questions you can add to the knowledge base

2. **Improve the knowledge base:**
   - Add more FAQs based on real questions
   - Update pricing and services as they change
   - Add new case studies and examples

3. **Consider advanced features:**
   - Conversation history (save messages to database)
   - Conversation export
   - Analytics (track common questions)
   - Human handoff (escalate to email/contact form)
   - Suggested follow-up questions

4. **Optimize costs:**
   - Cache common questions
   - Rate limiting (prevent spam)
   - Shorter system prompts (reduce token usage)

---

## Support

If you run into issues:
1. Check this guide's troubleshooting section
2. Check the Gemini API docs: https://ai.google.dev/tutorials/node_quickstart
3. Check Next.js API routes docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Last Updated:** July 2, 2026
