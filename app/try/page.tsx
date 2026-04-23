"use client";

import { useState } from "react";

interface PrdSection {
  heading: string;
  content: string;
}

function extractKeywords(notes: string): string[] {
  const words = notes
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3);
  const freq = new Map<string, number>();
  for (const w of words) {
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  const stopwords = new Set([
    "that", "this", "they", "them", "their", "there", "then", "than",
    "have", "been", "were", "with", "will", "would", "could", "should",
    "from", "about", "some", "into", "also", "very", "just", "more",
    "when", "what", "which", "where", "want", "like", "need", "said",
    "really", "because", "think", "going", "these", "those", "other",
  ]);
  return [...freq.entries()]
    .filter(([w]) => !stopwords.has(w))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);
}

function generatePrd(notes: string): PrdSection[] {
  const keywords = extractKeywords(notes);
  const topTheme = keywords[0] || "the topic";
  const secondTheme = keywords[1] || "related workflows";

  return [
    {
      heading: "Problem",
      content: `Users repeatedly mention "${topTheme}" as a core pain point. Current workflows around ${secondTheme} are manual, error-prone, and time-consuming. This is blocking adoption and driving churn.`,
    },
    {
      heading: "Users",
      content: `Primary: teams and individuals who deal with ${topTheme} daily. Secondary: managers who need visibility into ${secondTheme} outcomes.`,
    },
    {
      heading: "Jobs to be done",
      content: `1. Quickly process and organize ${topTheme} inputs.\n2. Reduce manual effort around ${secondTheme}.\n3. Get actionable insights without switching tools.`,
    },
    {
      heading: "Solution",
      content: `Introduce a streamlined flow that automates ${topTheme} handling and surfaces key patterns from ${secondTheme}. Keywords detected: ${keywords.join(", ")}.`,
    },
    {
      heading: "Risks",
      content: `• Scope creep if we try to cover all of ${secondTheme} in v1.\n• Data quality depends on how structured the input ${topTheme} data is.\n• Need to validate with at least 5 users before committing to the full build.`,
    },
  ];
}

export default function TryPage() {
  const [notes, setNotes] = useState("");
  const [prd, setPrd] = useState<PrdSection[] | null>(null);

  function handleSubmit() {
    if (!notes.trim()) return;
    setPrd(generatePrd(notes));
  }

  function handleReset() {
    setNotes("");
    setPrd(null);
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
          <a href="/" className="hover:opacity-70">
            Home
          </a>
          <a
            href="/#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-stone-600">
            Try it
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Paste your call notes
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">
            Drop in raw customer-call notes and get a mocked PRD outline instantly. No
            sign-up required.
          </p>
        </div>

        {!prd ? (
          <div className="mt-12">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={`Example:\n"Users keep asking for multi-currency invoicing. Three customers said currency conversion is a dealbreaker. The invoicing flow is too manual — one customer said it takes 2 hours per week. We also heard requests for better reporting dashboards and automated reminders."`}
              rows={8}
              className="w-full rounded-2xl border border-neutral-300 bg-white p-5 text-base leading-relaxed placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!notes.trim()}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate PRD outline
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            {prd.map((section) => (
              <div
                key={section.heading}
                className="rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-600">
                  {section.heading}
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-neutral-700">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Try again
              </button>
              <a
                href="/#waitlist"
                className="rounded-full bg-stone-600 px-7 py-3.5 font-medium text-white transition hover:bg-stone-700"
              >
                Join the waitlist for the real thing
              </a>
            </div>
          </div>
        )}
      </main>

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
