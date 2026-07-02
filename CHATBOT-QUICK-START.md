# 🚀 AI Chatbot - Ready to Launch!

## ✅ What's Already Done

1. ✅ Google Generative AI SDK installed (`@google/generative-ai`)
2. ✅ API route created (`/app/api/chat/route.ts`)
3. ✅ Chatbot widget updated to call the API
4. ✅ Knowledge base ready (`/content/knowledge/HOOSH-YAR-knowledge.txt`)
5. ✅ `.env.local` template created
6. ✅ `.gitignore` configured to protect your API key

## 🔑 NEXT: Add Your Gemini API Key

**You need to do this NOW before testing:**

### Step 1: Get Your API Key (2 minutes)

1. Go to: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Click **"Create API key in new project"** (or select existing project)
5. **Copy the key** — it looks like: `AIzaSyC...` (long string)

### Step 2: Add to .env.local (30 seconds)

1. Open the file **`.env.local`** in your project root
2. Replace `your_api_key_here` with your actual key:

   ```env
   GEMINI_API_KEY=AIzaSyC_YOUR_ACTUAL_KEY_HERE
   ```

3. Save the file

⚠️ **Important:** Never commit this file to Git! (It's already in `.gitignore`)

---

## 🧪 Test Your Chatbot

### 1. Start Dev Server

```bash
npm run dev
```

### 2. Open Your Browser

Go to: **http://localhost:3000**

### 3. Test the Chatbot

Click the chatbot button (bottom-right) and try these messages:

**English:**
- "What services do you offer?"
- "How much does a website cost?"
- "Can you build AI chatbots?"
- "Tell me about your process"

**Persian (فارسی):**
- "خدمات شما چیه؟"
- "قیمت یک وب‌سایت چنده؟"
- "می‌تونید ربات هوش مصنوعی بسازید؟"
- "روند کارتون چطوره؟"

### 4. What to Check

✅ Bot responds in the same language you write in  
✅ Responses are based on your knowledge base  
✅ Typing indicator shows while waiting  
✅ Works in both FA and EN locales  
✅ Error handling works (try disconnecting internet)  

---

## 🐛 Troubleshooting

### Error: "API key not configured"

**Fix:** 
- Make sure you added `GEMINI_API_KEY=...` to `.env.local`
- Restart your dev server after adding the key
- Check for typos in the key

### Error: "Failed to process message"

**Check:**
1. Your internet connection
2. API key is valid (test at https://aistudio.google.com/app/apikey)
3. Browser console (F12) for detailed errors
4. Terminal/console where dev server is running

### Bot responds in wrong language

**This is normal!** The bot auto-detects the language you write in, not the site locale.
- Write in English → Bot responds in English
- Write in Persian → Bot responds in Persian

### Knowledge base not loading

**Check:**
- File exists at `/content/knowledge/HOOSH-YAR-knowledge.txt`
- File is readable (not empty)
- Check server logs for "Error reading knowledge base"

---

## 📊 Cost & Limits

**Gemini 1.5 Flash (Free Tier):**
- ✅ 15 requests per minute
- ✅ 1 million tokens per day  
- ✅ 1,500 requests per day

**This is enough for:**
- 100-1,000+ chatbot messages per day
- Testing and development
- Most small to medium websites

**Paid tier (if you exceed):**
- ~$0.0007 per message
- 1,000 messages = ~$0.70/month

---

## 📝 Next Steps After Testing

### 1. Update Contact Info

Open `/content/knowledge/HOOSH-YAR-knowledge.txt` and replace:
- `[placeholder@hooshyar.com]` → your real email
- `[@hooshyar]` → your Telegram handle  
- `[+98 XXX XXX XXXX]` → your WhatsApp
- Update Instagram, Bale, website URL

### 2. Review & Customize

- Check pricing ranges in knowledge base
- Add your specific portfolio examples
- Adjust services to match what you offer

### 3. Deploy to Production

When ready to deploy:

**a) Add API key to Vercel:**
- Go to Vercel dashboard → Your project → Settings → Environment Variables
- Add: `GEMINI_API_KEY` = your key
- Apply to: Production, Preview, Development

**b) Push to GitHub:**
```bash
git add .
git commit -m "Connect chatbot to Gemini AI"
git push origin main
```

**c) Test on production URL**

---

## 🎉 You're Ready!

Just add your Gemini API key to `.env.local` and start the dev server!

```bash
# Add key to .env.local first, then:
npm run dev
```

**Need help?** Check:
- `/docs/chatbot-gemini-setup.md` (detailed guide)
- `/docs/chatbot-completed-summary.md` (summary)
- Google AI Studio: https://aistudio.google.com/

---

**Last Updated:** July 2, 2026
