# 🧪 Test Your Grok Chatbot NOW

## Quick Test (Takes 1 minute)

### Step 1: Stop Any Running Server
```bash
# Press Ctrl+C in the terminal where dev server is running
# Or run this to kill all:
pkill -f "next dev"
```

### Step 2: Clean Build
```bash
rm -rf .next
```

### Step 3: Start Fresh
```bash
npm run dev
```

Wait for: `✓ Ready in ...ms`

### Step 4: Open Browser

Go to: **http://localhost:3000**

(If port 3000 is busy, check terminal output for the actual port)

### Step 5: Test Chatbot

1. Click the chatbot button (bottom-right corner with robot icon)
2. Send a message: **"Hello"**
3. Wait for response (should take 2-3 seconds)

### Expected Result

**If working:**
- You'll see a response from Grok
- Response will be in English (matching your message)
- No error messages

**If not working:**
1. Press **F12** (opens developer console)
2. Click **Console** tab
3. Look for red error messages
4. Share the error with me

---

## Alternative: Test API Directly

If the chatbot UI isn't working, test the API directly:

### Open a new terminal window:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","locale":"en"}'
```

**Expected response:**
```json
{
  "reply": "Hello! I'm the Hoosh Yar assistant..."
}
```

**If you see error:**
```json
{
  "error": "...",
  "reply": "Something went wrong..."
}
```

Then check the terminal where dev server is running for detailed error logs.

---

## Common Issues

### Port 3000 in use
- Server will use port 3001 automatically
- Check terminal output for actual port
- Go to that URL instead

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API key errors
```bash
node test-api-key.js
```

Should show: `✅ Key format looks correct!`

If not, check `.env.local` file.

---

## What to Check

1. **Terminal (where npm run dev runs):**
   - Look for any red error messages
   - Look for "POST /api/chat 500" or "POST /api/chat 200"

2. **Browser Console (F12):**
   - Look for "Chat error" messages
   - Look for network errors

3. **API Key:**
   ```bash
   cat .env.local
   ```
   Should show: `GROK_API_KEY=gsk_...`

---

## Share With Me If It Fails

1. **Error from browser console** (F12 → Console tab)
2. **Error from terminal** (where dev server runs)
3. **Output of:** `node test-api-key.js`

---

**Start testing now:** `npm run dev`
