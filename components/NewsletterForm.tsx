"use client";

import { useId, useState } from "react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({
  layout = "inline",
  buttonLabel = "Subscribe",
}: {
  layout?: "inline" | "stacked";
  buttonLabel?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus({ state: "success", message: data.message ?? "You're on the list." });
      setEmail("");
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  const isError = status.state === "error";
  const stacked = layout === "stacked";

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="block text-[15px] font-semibold text-ink">
        Email address
      </label>
      <div className={`mt-2 flex gap-3 ${stacked ? "flex-col" : "flex-col sm:flex-row"}`}>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (isError) setStatus({ state: "idle" });
          }}
          aria-invalid={isError || undefined}
          aria-describedby={`${id}-status`}
          placeholder="you@example.com"
          className="min-h-12 w-full flex-1 border border-oxblood bg-ivory px-4 text-[17px] text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="min-h-12 shrink-0 bg-oxblood px-6 font-semibold text-ivory hover:bg-oxblood-dark disabled:opacity-70"
        >
          {status.state === "submitting" ? "Subscribing…" : buttonLabel}
        </button>
      </div>
      <p id={`${id}-status`} role="status" aria-live="polite" className="mt-3 min-h-[1.6em] text-[15px]">
        {status.state === "success" && (
          <span className="font-semibold text-oxblood">{status.message}</span>
        )}
        {isError && <span className="font-semibold text-oxblood">{status.message}</span>}
      </p>
    </form>
  );
}
