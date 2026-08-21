"use client";

import { useId, useState, type FormEvent } from "react";

import { apiFetch } from "@/lib/api-client";

type Status = "idle" | "submitting" | "success" | "error";

export const TestimonialForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [rating, setRating] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nameId = useId();
  const roleId = useId();
  const messageId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    // Capture the form element now — `event.currentTarget` is nulled out by
    // React once this handler yields at the `await` below, so it can't be
    // read again afterwards.
    const formEl = event.currentTarget;
    const form = new FormData(formEl);

    try {
      await apiFetch("/api/testimonials", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          role: form.get("role") || undefined,
          message: form.get("message"),
          rating,
        }),
      });
      setStatus("success");
      formEl.reset();
      setRating(5);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong — please try again in a moment.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 text-center"
      >
        <p className="font-semibold text-foreground">Thanks for the kind words!</p>
        <p className="mt-2 text-sm text-foreground/60">
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8"
    >
      <h3 className="text-lg font-semibold text-foreground">Leave a testimonial</h3>

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
            className="rounded-xl border border-foreground/15 bg-transparent px-4 py-2.5 text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-foreground/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={roleId} className="text-sm text-foreground/70">
            Role / company <span className="text-foreground/40">(optional)</span>
          </label>
          <input
            id={roleId}
            name="role"
            type="text"
            maxLength={150}
            className="rounded-xl border border-foreground/15 bg-transparent px-4 py-2.5 text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-foreground/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="text-sm text-foreground/70">
          Your testimonial
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          maxLength={1000}
          rows={4}
          className="resize-none rounded-xl border border-foreground/15 bg-transparent px-4 py-2.5 text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-foreground/40"
        />
      </div>

      <fieldset className="flex items-center gap-2">
        <legend className="mb-2 text-sm text-foreground/70">Rating</legend>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`${value} star${value === 1 ? "" : "s"}`}
            aria-pressed={rating === value}
            onClick={() => setRating(value)}
            className="text-2xl text-foreground/25 transition-colors duration-[var(--duration-fast)] ease-entrance aria-pressed:text-foreground"
          >
            ★
          </button>
        ))}
      </fieldset>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-foreground px-6 py-2.5 font-medium text-background transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-foreground/85 disabled:opacity-50"
      >
        {status === "submitting" ? "Submitting…" : "Submit testimonial"}
      </button>
    </form>
  );
};
