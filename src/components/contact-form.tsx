"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/contact-form-submit";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError(null);

    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email,
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    try {
      const result = await submitContactForm(payload);
      if (!result.ok) {
        setError(result.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please try again or email us directly.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-slate-200/90 bg-white p-6 text-left shadow-lg sm:p-8"
    >
      <h3 className="text-lg font-semibold text-slate-900">Send a message</h3>
      <p className="mt-1 text-sm text-slate-600">
        We typically reply within one business day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name *
          </span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:bg-white focus:ring-2"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email *
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:bg-white focus:ring-2"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Company
          </span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:bg-white focus:ring-2"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            How can we help? *
          </span>
          <textarea
            required
            name="message"
            rows={4}
            minLength={10}
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:bg-white focus:ring-2"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <p className="mt-4 text-sm font-medium text-emerald-700">
          Thanks - we’ve received your message. We’ll reply within one business day.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-shine relative mt-6 inline-flex h-11 items-center justify-center overflow-hidden rounded-lg bg-blue-700 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="relative z-[1]">
          {status === "loading" ? "Sending…" : "Send message"}
        </span>
      </button>
    </form>
  );
}
