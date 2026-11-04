"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full shadow-sm">
      <div className="w-full border-b border-blue-950/20 bg-[#0c1e3d] text-[11px] text-blue-100 sm:text-xs">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-1 px-4 py-2 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span className="font-medium tracking-wide text-white/95">
            Reliable automation & systems for teams that outgrow spreadsheets
          </span>
          <span className="text-blue-200/90 tabular-nums">
            Mon–Fri · 9:00–18:00 · Response within one business day
          </span>
        </div>
      </div>

      <div className="w-full border-b border-slate-200/95 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo-img.png"
              alt="Flowmint logo"
              width={170}
              height={42}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-800 lg:px-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="btn-shine relative hidden overflow-hidden rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-blue-800 sm:inline-flex sm:px-5 sm:text-sm"
            >
              <span className="relative z-[1]">Start a project</span>
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-slate-100 px-4 py-4 lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-0.5 sm:px-6 lg:px-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-shine relative mt-3 inline-flex h-11 items-center justify-center overflow-hidden rounded-lg bg-blue-700 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-[1]">Start a project</span>
              </Link>
            </nav>
          </div>
        ) : null}
      </div>

      <div
        aria-hidden
        className="h-1 w-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-700"
      />
    </header>
  );
}
