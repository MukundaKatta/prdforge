"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!email) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    }
  }

  return (
    <>
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-stone-500" />
          PRDforge
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-stone-100 via-stone-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700">
            Prosumer
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Cursor, but for product managers.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Synthesize customer calls. Draft PRDs. Ship roadmaps. The AI workbench PMs
            have been waiting for.
          </p>

          {!submitted ? (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                required
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <p id="waitlist" className="mt-12 text-sm font-medium text-stone-700">
              Thanks. We will ping you the day we launch.
            </p>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-stone-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See it in action
            </h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-3xl grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-600">
                  12 customer calls
                </div>
                <div className="space-y-2 text-sm">
                  <div className="rounded-lg bg-stone-50 p-3">
                    &ldquo;We&rsquo;d pay double for multi-currency.&rdquo;
                  </div>
                  <div className="rounded-lg bg-stone-50 p-3">
                    &ldquo;Invoices are manual and it kills us.&rdquo;
                  </div>
                  <div className="rounded-lg bg-stone-50 p-3">
                    &ldquo;Currency conversion is a dealbreaker.&rdquo;
                  </div>
                  <div className="rounded-lg bg-stone-50 p-3 text-neutral-400">
                    +9 more calls&hellip;
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Synthesized PRD
                </div>
                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <strong>Problem</strong>: International customers can&rsquo;t invoice in
                    their currency; this is the #1 churn reason (cited in 8 of 12 calls).
                  </div>
                  <div>
                    <strong>Scope</strong>: Multi-currency invoicing + auto-conversion on
                    payment.
                  </div>
                  <div>
                    <strong>RICE</strong>:{" "}
                    <span className="font-semibold text-stone-900">4.2</span> — ship next.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you get
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🎧</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Listens to every call
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Drops transcripts in. Patterns, requests, and pain points pop out.
              </p>
            </div>
            <div>
              <div className="text-3xl">📝</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Writes your PRD
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                From theme to full doc in minutes. You edit. It ships.
              </p>
            </div>
            <div>
              <div className="text-3xl">📅</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Prioritizes automatically
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                RICE, ICE, or bring your own framework. The math is done for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-stone-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-sm font-bold text-stone-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Bring your materials
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Calls, docs, Figma, Notion. Drop them in. We structure the chaos.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-sm font-bold text-stone-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Draft in minutes</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                What used to take a week of wrestling is now 20 minutes of editing.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-sm font-bold text-stone-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Ship with confidence
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Every decision tracked, every tradeoff documented, every stakeholder
                aligned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we
          open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-stone-600 px-7 py-3.5 font-medium text-white transition hover:bg-stone-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-stone-500" />
            PRDforge
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}
