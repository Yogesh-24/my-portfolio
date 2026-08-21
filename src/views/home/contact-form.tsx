"use client";

import { useId, useState, type FormEvent } from "react";

import { apiFetch } from "@/lib/api-client";

type Status = "idle" | "submitting" | "success" | "error";

export const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formEl = event.currentTarget;
    const form = new FormData(formEl);

    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });

      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong — please try again in a moment.");
    }
  };

  if (status === "success") {
    return (
        <div
         role="status"
         className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 text-center"
        >
        <div>
          <p className="font-semibold text-foreground">Message sent!</p>
          <p className="mt-2 text-sm text-foreground/60">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8"
    >

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="text-sm text-foreground/70">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            maxLength={100}
            className="h-11 rounded-xl border border-foreground/15 bg-transparent px-4 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-foreground/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className="text-sm text-foreground/70">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            className="h-11 rounded-xl border border-foreground/15 bg-transparent px-4 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-foreground/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="text-sm text-foreground/70">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          maxLength={2000}
          rows={4}
          className="min-h-[148px] resize-none rounded-xl border border-foreground/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-foreground/40"
        />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-foreground/85 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};