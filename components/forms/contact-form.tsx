"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import type { Locale } from "@/types/locale";

type Status = "idle" | "submitting" | "success" | "error";

const labels = {
  en: {
    name: "Name",
    email: "Email",
    service: "Service",
    message: "Project details",
    submit: "Send request",
    submitting: "Sending...",
    success:
      "Request received. Email delivery is placeholder until provider keys are configured.",
    error: "Please complete all required fields with a valid email.",
    services: [
      "AI Services",
      "Automation",
      "Web Development",
      "Custom / Not sure",
    ],
  },
  fa: {
    name: "نام",
    email: "ایمیل",
    service: "خدمت مورد نیاز",
    message: "جزئیات پروژه",
    submit: "ارسال درخواست",
    submitting: "در حال ارسال...",
    success:
      "درخواست دریافت شد. ارسال ایمیل تا زمان تنظیم کلیدهای سرویس‌دهنده به‌صورت جایگزین است.",
    error: "لطفاً همه فیلدهای ضروری را با ایمیل معتبر تکمیل کنید.",
    services: [
      "خدمات هوش مصنوعی",
      "اتوماسیون",
      "توسعه وب",
      "اختصاصی / هنوز مطمئن نیستم",
    ],
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, locale }),
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label={copy.name} name="name" required />
      <Field label={copy.email} name="email" type="email" required />
      <label className="grid gap-2 text-sm font-medium text-text-primary">
        {copy.service}
        <select
          name="service"
          className="rounded-2xl border border-glass-border bg-bg-void/70 px-4 py-3 text-text-primary outline-none transition focus:border-cyan-primary focus:shadow-cyan-glow motion-reduce:transition-none"
          required
          defaultValue=""
        >
          <option value="" disabled>
            {copy.service}
          </option>
          {copy.services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-text-primary">
        {copy.message}
        <textarea
          name="message"
          rows={6}
          required
          minLength={20}
          className="resize-y rounded-2xl border border-glass-border bg-bg-void/70 px-4 py-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-cyan-primary focus:shadow-cyan-glow motion-reduce:transition-none"
        />
      </label>
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? copy.submitting : copy.submit}
      </Button>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" ? (
          <p className="rounded-2xl border border-cyan-primary/30 bg-cyan-primary/10 p-4 text-sm text-text-primary">
            {copy.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-2xl border border-magenta-glow/30 bg-magenta-glow/10 p-4 text-sm text-text-primary">
            {copy.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-text-primary">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-2xl border border-glass-border bg-bg-void/70 px-4 py-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-cyan-primary focus:shadow-cyan-glow motion-reduce:transition-none"
      />
    </label>
  );
}
