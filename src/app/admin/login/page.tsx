import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { adminIsConfigured, isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const needsSetup = !adminIsConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071428] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Flowmint</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          {needsSetup ? "Create admin access" : "Admin"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {needsSetup
            ? "Choose a password. It is saved on this computer, and you will use it whenever you sign in to add projects and blog posts."
            : "Sign in to add projects and blog posts."}
        </p>
        <LoginForm mode={needsSetup ? "setup" : "login"} />
      </div>
    </main>
  );
}
