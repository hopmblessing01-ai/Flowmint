import { siteName } from "@/lib/site-seo";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type SubmitResult = { ok: boolean; error?: string };

/** Web3Forms — delivers to the inbox registered on the access key. That inbox must be blessing@flowmint.uk. */
export async function submitViaWeb3Forms(
  payload: ContactPayload,
  accessKey: string,
): Promise<SubmitResult> {
  const companyBlock = payload.company
    ? `\nCompany: ${payload.company}`
    : "";

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[${siteName}] Contact from ${payload.name}`,
      from_name: payload.name,
      name: payload.name,
      email: payload.email,
      replyto: payload.email,
      message: `${payload.message}${companyBlock}`,
      botcheck: false,
    }),
  });

  let data: { success?: boolean; message?: string };
  try {
    data = (await res.json()) as { success?: boolean; message?: string };
  } catch {
    return { ok: false, error: "Server error. Please try again or email us directly." };
  }

  if (data.success) return { ok: true };
  return {
    ok: false,
    error: data.message ?? "Could not send your message. Please try again or email us directly.",
  };
}

/** Resend via /api/contact — backup if Web3Forms key is not set. */
export async function submitViaApi(payload: ContactPayload): Promise<SubmitResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: { ok?: boolean; error?: string };
  try {
    data = (await res.json()) as { ok?: boolean; error?: string };
  } catch {
    return { ok: false, error: "Server error. Please try again or email us directly." };
  }

  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error ?? "Something went wrong." };
  }
  return { ok: true };
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<SubmitResult> {
  const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  if (web3Key) {
    return submitViaWeb3Forms(payload, web3Key);
  }

  return submitViaApi(payload);
}
