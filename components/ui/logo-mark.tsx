"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/Hoosh_Yar_Logo.jpeg";

function LogoFallback() {
  return (
    <svg
      className="relative h-7 w-7 text-cyan-primary"
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M14 28c-4-1-6.5-4.6-5.4-8.9 1-4 4.7-6 8.2-5.2 1.6-4.9 8.2-7 12.3-3.4 2.2 1.9 3 4.4 2.6 6.9 4.6.2 8 3.7 8 8.1 0 4.8-3.8 8.5-8.8 8.5H17.7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 28l7-7 6 6 6-10M23 21v15M29 27v9M16 28v8"
        stroke="url(#logo-gradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="28" r="2.4" fill="#3FE8F4" />
      <circle cx="23" cy="21" r="2.4" fill="#5B7FFF" />
      <circle cx="29" cy="27" r="2.4" fill="#9D5CFF" />
      <circle cx="35" cy="17" r="2.4" fill="#E63CD8" />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="12"
          y1="18"
          x2="38"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3FE8F4" />
          <stop offset="0.48" stopColor="#9D5CFF" />
          <stop offset="1" stopColor="#E63CD8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoMark({
  className,
  label = "Hoosh Yar",
}: {
  className?: string;
  label?: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-label={label}
    >
      <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-glass-border bg-glass-bg shadow-cyan-glow backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="absolute inset-1 rounded-full bg-brand-beam opacity-20 blur-sm"
        />
        {!imageError ? (
          <Image
            src={LOGO_SRC}
            alt=""
            width={44}
            height={44}
            className="relative h-full w-full rounded-full object-cover"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <LogoFallback />
        )}
      </div>
      <div className="leading-none">
        <p className="font-heading text-base font-bold tracking-[-0.03em] text-text-primary">
          Hoosh Yar
        </p>
        <p className="mt-1 font-persian text-xs text-text-muted">هوش‌یار</p>
      </div>
    </div>
  );
}
