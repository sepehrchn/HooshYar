"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/types/locale";

const ChatbotWidget = dynamic(
  () => import("@/components/chatbot").then(mod => ({ default: mod.ChatbotWidget })),
  { ssr: false }
);

export function ChatbotWidgetLazy({ locale }: { locale: Locale }) {
  return <ChatbotWidget locale={locale} />;
}