# ⚠️ IMPORTANT: Get the Correct Gemini API Key

## The Problem

Your current API key in `.env.local` is in the wrong format.

**This is NOT a valid Google Gemini API key!**

Valid Gemini API keys:
- Start with `AIzaSy`
- Are much longer (around 39 characters)
- Look like: `AIzaSyABC123...` (example)

The key you have appears to be from a different service.

---

## How to Get the CORRECT Gemini API Key

### Step 1: Go to Google AI Studio

Open this link: **https://aistudio.google.com/app/apikey**

### Step 2: Sign In

Sign in with your Google account (Gmail)

### Step 3: Create API Key

You'll see a page with "API keys" at the top.

Click the **"Create API Key"** button (blue button)

### Step 4: Choose Project

You'll see two options:
- **"Create API key in new project"** ← Choose this if you don't have a project
- **"Create API key in existing project"** ← Choose this if you already have a Google Cloud project

Click one of them.

### Step 5: Copy the Key

A popup will show your API key. It should look like:
```
AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

**Copy this entire key!**

### Step 6: Update .env.local

Open `.env.local` in your project and replace the current key:

**Before:**
```env
GEMINI_API_KEY=YOUR_OLD_INVALID_KEY
```

**After:**
```env
GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```
(Use your actual key, not this example!)

### Step 7: Restart Dev Server

Stop your dev server (Ctrl+C) and start it again:

```bash
npm run dev
```

### Step 8: Test

Open http://localhost:3000 and test the chatbot again!

---

## Verification Checklist

✅ API key starts with `AIzaSy`  
✅ API key is around 39 characters long  
✅ Copied from https://aistudio.google.com/app/apikey  
✅ Pasted into `.env.local` file  
✅ Dev server restarted  

---

## Still Having Issues?

### Error: "API key not valid"

This means the key format is correct but Google rejected it. Possible reasons:
1. You copied it wrong (extra spaces, missing characters)
2. The key was deleted in Google AI Studio
3. The key hasn't activated yet (wait 1-2 minutes and try again)

**Solution:** Go back to Google AI Studio and create a new key

### Error: "Quota exceeded"

Free tier limits:
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day

**Solution:** Wait a few minutes or upgrade to paid tier

### Can't Access Google AI Studio

You need:
- A Google account (Gmail)
- Internet connection
- May need to agree to terms of service

**Alternative:** Ask someone else to create the key for you and share it securely

---

## Security Reminder

⚠️ **Never share your API key publicly!**
- Don't commit `.env.local` to Git (it's already in `.gitignore`)
- Don't paste it in Discord, Slack, or forums
- Don't include it in screenshots
- If leaked, delete it in Google AI Studio immediately

---

## What This Key Does

- Lets your chatbot call Google Gemini AI
- Charges usage to your Google account (free tier included)
- Tracks your API usage and quotas
- Can be deleted/regenerated anytime in Google AI Studio

---

**Once you have the correct key (starting with `AIzaSy`), the chatbot will work!**
