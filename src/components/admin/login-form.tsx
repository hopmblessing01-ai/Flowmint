"use client";

import { useActionState } from "react";
import { loginAction, setupAdminAction } from "@/app/admin/actions";

const field =
  "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-600/30 focus:border-blue-500 focus:ring-4";

export function LoginForm({ mode }: { mode: "setup" | "login" }) {
  const action = mode === "setup" ? setupAdminAction : loginAction;
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <label className="block text-sm font-semibold text-slate-800">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={mode === "setup" ? 8 : undefined}
          autoComplete={mode === "setup" ? "new-password" : "current-password"}
          className={field}
        />
      </label>
      {mode === "setup" ? (
        <label className="block text-sm font-semibold text-slate-800">
          Confirm password
          <input
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={field}
          />
        </label>
      ) : null}
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-blue-700 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {pending ? "Please wait…" : mode === "setup" ? "Create password and sign in" : "Sign in"}
      </button>
    </form>
  );
}
