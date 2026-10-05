"use client";

import { useId, useRef, useState } from "react";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please write a little more about what you're looking for.";
  return e;
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  function focusFirstError(errs: Errors) {
    const first = (["name", "email", "message"] as const).find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("idle");
      focusFirstError(errs);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
        errors?: Errors;
      };
      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      setMessage(data.message ?? "Thanks. We'll be in touch.");
      setFields({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "mt-2 w-full border bg-ivory px-4 py-3 text-[17px] text-ink placeholder:text-muted aria-[invalid=true]:border-2";

  const field = (key: keyof Fields, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="block text-[15px] font-semibold text-ink">
        {label}
      </label>
      {el}
      {errors[key] && (
        <p id={`${id}-${key}-error`} className="mt-2 text-[15px] font-semibold text-oxblood">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const a11y = (key: keyof Fields) => ({
    id: `${id}-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
    className: `${inputClass} border-oxblood`,
    value: fields[key],
    onChange: update(key),
    required: true,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {field("name", "Name", <input type="text" autoComplete="name" {...a11y("name")} />)}
      {field("email", "Email", <input type="email" autoComplete="email" {...a11y("email")} />)}
      {field(
        "message",
        "Message",
        <textarea
          rows={7}
          placeholder="Tell us a little about where you are now and what you'd like help with."
          {...a11y("message")}
        />,
      )}
      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-12 bg-oxblood px-7 font-semibold text-ivory hover:bg-oxblood-dark disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
        <p role="status" aria-live="polite" className="mt-4 min-h-[1.6em] text-[16px] font-semibold text-oxblood">
          {(status === "success" || status === "error") && message}
        </p>
      </div>
    </form>
  );
}
