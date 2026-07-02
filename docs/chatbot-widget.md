# Chatbot Widget — Implementation Complete

> Date: 2026-07-02
> Status: ✅ Complete — UI only, ready for AI integration
> Last Updated: 2026-07-02 12:05 — Added robot icon, right positioning, and motion effects

---

## Overview

A floating chatbot widget with full bilingual support (FA/EN), glassmorphism design matching the site's visual identity, robot mascot icon, and engaging motion effects. The UI is complete and ready for AI backend integration.

---

## Features

### 🎯 Trigger Button
- **Position**: Fixed at bottom-right (right: 32px, bottom: 32px)
- **Size**: 56px circular
- **Design**: 
  - Glass background with 12px blur
  - Animated gradient border (cyan→violet→magenta, 4s loop)
  - Robot mascot icon (40px, circular crop from `/images/chatbot.png`)
- **Motion Effects**:
  - **Idle bob**: Gentle 6px up and back movement, 3s ease-in-out infinite loop (starts after 0.3s entrance delay)
  - **Radar ping**: Semi-transparent cyan ring expands from button edge (scale 1→1.8x, opacity 0.5→0, 4s loop)
  - **Orbiting particles**: Two 4px dots orbit the button
    - Cyan dot: 8s clockwise orbit
    - Magenta dot: 11s counterclockwise orbit
    - Both at 0.7 opacity with glow shadows
    - 80px orbital radius
- **Interactions**:
  - Hover: scale 1.08x, border glow brightens
  - Click: opens/closes chat panel
  - Shows ✕ overlay when open
- **Animation**: Fade + slide up from bottom, delayed 1.5s after page load
- **Accessibility**: All motion effects pause with `prefers-reduced-motion`

### 💬 Chat Panel
- **Size**: 
  - Desktop: 380px × 560px
  - Mobile: 100vw × 70vh (slides up from bottom)
- **Position**: Fixed at bottom-right (bottom: 100px, right: 32px)
- **Design**:
  - Dark glass background (rgba(5,6,15,0.92)) with 24px blur
  - Border with violet shadow glow
  - 20px border radius
- **Animation**: 
  - Open: scale 0.92→1 + fade in (0.3s ease)
  - Close: reverse (0.2s ease)

### 📋 Panel Header
- Robot mascot icon (32px) + gradient brand text
- Online status indicator (pulsing cyan dot)
- Close button (✕)

### 🤝 Welcome State
Shown when no messages exist:
- Robot mascot icon (48px) with violet glow ring
- Bilingual greeting:
  - FA: "سلام! من دستیار هوش‌یار هستم. چطور می‌تونم کمکتون کنم؟"
  - EN: "Hi! I'm the Hoosh Yar assistant. How can I help you today?"
- 3 quick-reply chips:
  - FA: "خدمات هوش‌یار چیه؟" | "قیمت‌ها چطوره؟" | "می‌خوام پروژه بدم"
  - EN: "What services do you offer?" | "How does pricing work?" | "I want to start a project"

### 💭 Message Bubbles
**Bot messages**:
- Glass background (rgba(255,255,255,0.06))
- Robot avatar (24px) beside each message
- Aligned right in RTL / left in LTR
- Border radius: 16px 16px 16px 4px (or reversed)

**User messages**:
- Gradient background (cyan→violet, 12% opacity)
- Border: 1px solid violet (25% opacity)
- Aligned left in RTL / right in LTR
- Border radius: 16px 16px 4px 16px (or reversed)

**Typing indicator**:
- 3 pulsing cyan dots
- Shows during 400ms delay before bot response
- Inside a bot-style bubble with robot avatar (24px)

### ⌨️ Input Area
- Text field:
  - Glass background with focus glow (cyan)
  - RTL/LTR direction follows locale
  - Placeholder text in both languages
- Send button:
  - 36px circular gradient button (cyan→magenta)
  - White arrow icon (rotated for RTL)
  - Disabled when input is empty
- Submit on Enter key or button click

---

## Placeholder Responses

Currently returns hardcoded response to all messages:

**FA**: "ممنون از پیامتون. به زودی این بخش به هوش مصنوعی متصل می‌شه. تا اون موقع، از فرم تماس استفاده کنید."

**EN**: "Thanks for your message. This section will be connected to AI soon. In the meantime, please use the contact form."

**Response delay**: 400ms with typing indicator

---

## Accessibility

✅ **Keyboard support**:
- Focus trap when panel is open
- Escape key closes panel
- Enter key submits message
- Tab navigation through all interactive elements

✅ **ARIA labels**:
- Trigger button: "باز کردن چت" / "Open chat"
- Close button: "بستن" / "Close"
- Send button: "ارسال" / "Send"

✅ **Reduced motion**:
- All animations disabled with `prefers-reduced-motion: reduce`

✅ **Mobile responsive**:
- Full viewport width on mobile
- 70% viewport height
- Slides up from bottom
- Touch-friendly button sizes

---

## RTL Support

Full bidirectional layout support:
- Message bubbles align correctly (bot right/user left in RTL)
- Input field direction follows locale
- Send arrow icon rotates for RTL
- Brand text gradient direction aware
- Quick-reply chips maintain proper spacing

---

## Performance

✅ **Zero impact on page load**:
- Component is client-side only (`"use client"`)
- Entrance delayed 1.5s after page load
- No API calls or external dependencies
- No scroll hijacking or existing logic interference

✅ **Optimized rendering**:
- Auto-scroll to bottom on new messages
- Efficient state management with React hooks
- Framer Motion animations with `AnimatePresence`
- Proper cleanup of event listeners

---

## File Structure

```
components/chatbot/
├── chatbot-widget.tsx    # Main component (592 lines)
└── index.ts              # Export file
```

**Modified files**:
- `app/[locale]/layout.tsx` — Added `<ChatbotWidget locale={locale} />`

---

## Integration Points (for future AI connection)

The component is structured for easy AI integration:

### 1. Replace placeholder response function
Current:
```typescript
const PLACEHOLDER_RESPONSES = {
  fa: "ممنون از پیامتون...",
  en: "Thanks for your message..."
};
```

Replace with API call:
```typescript
const handleSendMessage = async (text: string) => {
  // Add user message
  setMessages(prev => [...prev, userMessage]);
  setIsTyping(true);
  
  // Call AI API
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    body: JSON.stringify({ message: text, locale }),
  });
  const data = await response.json();
  
  // Add bot response
  setMessages(prev => [...prev, { ...botMessage, text: data.response }]);
  setIsTyping(false);
};
```

### 2. Add conversation persistence
- Store messages in localStorage/sessionStorage
- Restore conversation on page reload
- Clear conversation on user request

### 3. Add streaming responses
- Use Server-Sent Events (SSE) or WebSockets
- Stream bot responses word-by-word
- Update typing indicator to show "typing..." with animated text

### 4. Add conversation context
- Send previous messages as context
- Maintain conversation history
- Handle multi-turn conversations

---

## Testing Checklist

- [x] Dev server starts successfully
- [x] Page loads without errors
- [x] TypeScript compilation passes (no new errors)
- [x] Component properly integrated in layout
- [ ] Visual: Trigger button appears after 1.5s
- [ ] Visual: Animated gradient border on trigger
- [ ] Visual: Panel opens/closes smoothly
- [ ] Visual: Welcome state displays correctly
- [ ] Visual: Quick-reply chips work
- [ ] Visual: Message bubbles render correctly
- [ ] Visual: Typing indicator animates
- [ ] Visual: RTL layout (Farsi) correct
- [ ] Visual: LTR layout (English) correct
- [ ] Interaction: Click trigger opens panel
- [ ] Interaction: Click close button closes panel
- [ ] Interaction: Escape key closes panel
- [ ] Interaction: Enter key sends message
- [ ] Interaction: Send button works
- [ ] Interaction: Quick-reply chips send messages
- [ ] Interaction: Auto-scroll on new messages
- [ ] Mobile: 100vw × 70vh on small screens
- [ ] Mobile: Slides from bottom
- [ ] Mobile: Touch interactions work
- [ ] A11y: Focus trap works
- [ ] A11y: Keyboard navigation works
- [ ] A11y: Reduced motion respected

---

## Design System Compliance

✅ **Colors**: All colors use existing design tokens  
✅ **Fonts**: Vazirmatn (FA), Space Grotesk (EN)  
✅ **Animations**: Consistent timing (0.3s/0.2s), respects reduced-motion  
✅ **Glass effects**: Matches site glassmorphism (backdrop-blur, rgba backgrounds)  
✅ **Gradients**: Brand beam gradient (cyan→violet→magenta)  
✅ **RTL support**: Full bidirectional layout awareness  
✅ **Responsive**: Mobile-first approach, proper breakpoints  
✅ **No conflicts**: Does not touch scroll, nav, or existing components  

---

## Next Steps (AI Integration)

1. **Create API endpoint**: `/app/api/chatbot/route.ts`
2. **Connect to AI service**: OpenAI, Anthropic, or custom LLM
3. **Add conversation memory**: Store context in database or session
4. **Implement streaming**: Real-time response streaming
5. **Add features**:
   - Conversation history
   - Clear conversation button
   - Export conversation
   - Suggested follow-up questions
   - Rich message types (images, links, cards)
   - File upload support
   - Voice input/output

---

*Chatbot widget UI complete. Ready for AI backend integration.*
