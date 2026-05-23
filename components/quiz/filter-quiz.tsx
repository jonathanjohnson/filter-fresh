"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Arrow, FilterIcon, type FilterType } from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/logo";

type AnswerId = string;
type Answer = { id: AnswerId; label: string; hint: string; visual: "cartridge" | "de" | "sand" | "photo"; implies?: FilterType };
type Question = {
  id: string;
  q: string;
  helper: string;
  opts: Answer[];
  /** Skip this question if the running guess already matches one of these types. */
  skipIfGuess?: FilterType[];
};

const QUESTIONS: Question[] = [
  {
    id: "shape",
    q: "What shape is your filter housing?",
    helper:
      "The shape of the housing is usually enough to identify the type. Walk to your equipment pad and have a look.",
    opts: [
      {
        id: "tall",
        label: "Tall vertical cylinder, 25 to 35 inches high",
        hint: "Likely cartridge or DE",
        visual: "cartridge",
      },
      {
        id: "round",
        label: "Round tank with a multi-position valve on top",
        hint: "Likely sand",
        visual: "sand",
        implies: "sand",
      },
      {
        id: "unsure",
        label: "I'm not sure — let me send a photo",
        hint: "We'll identify it for you",
        visual: "photo",
        implies: "unknown" as unknown as FilterType,
      },
    ],
  },
  {
    id: "lid",
    q: "How does the lid open?",
    helper:
      "Two designs. Cartridge filters use a thick rubber clamp band or a screw-on top. DE filters typically have a metal clamp ring with a tensioning bolt.",
    skipIfGuess: ["sand"],
    opts: [
      {
        id: "clampband",
        label: "Wide rubber or plastic clamp around the middle of the tank",
        hint: "Cartridge filter, almost certainly",
        visual: "cartridge",
        implies: "cartridge",
      },
      {
        id: "metalring",
        label: "Metal ring with a small bolt at the side, near the top",
        hint: "DE filter",
        visual: "de",
        implies: "de",
      },
      {
        id: "screwtop",
        label: "Screws on like a big lid",
        hint: "Older cartridge or small spa filter",
        visual: "cartridge",
        implies: "cartridge",
      },
    ],
  },
  {
    id: "powder",
    q: "Do you ever add a fine white or off-white powder through the skimmer?",
    helper:
      "DE owners add a fresh charge of diatomaceous earth after every backwash. Cartridge owners never do.",
    skipIfGuess: ["sand"],
    opts: [
      {
        id: "yes",
        label: "Yes, after every backwash",
        hint: "DE filter, confirmed",
        visual: "de",
        implies: "de",
      },
      {
        id: "no",
        label: "No, never",
        hint: "Cartridge filter, confirmed",
        visual: "cartridge",
        implies: "cartridge",
      },
      {
        id: "dontknow",
        label: "I don't know — somebody else handles it",
        hint: "We'll confirm on the visit",
        visual: "photo",
      },
    ],
  },
];

type ResultType = FilterType | "unknown";

const RESULT_COPY: Record<ResultType, { title: string; body: string; cadence: string }> = {
  cartridge: {
    title: "You have a cartridge filter.",
    body: "Most common system in California pools. Soak, hand rinse, inspect, pressure test — same flat $75 visit.",
    cadence: "Clean every 3 to 4 months",
  },
  de: {
    title: "You have a DE filter.",
    body: "Best filtration of the three. Grids come out by hand, get cleaned and recharged with fresh DE. Same flat $75.",
    cadence: "Clean every 4 to 6 months",
  },
  sand: {
    title: "You have a sand filter.",
    body: "Lowest weekly maintenance. We backwash, do a chemical cleanse, and rebed with #20 silica when it's time. Same flat $75.",
    cadence: "Backwash on +8 PSI · annual chemical clean",
  },
  unknown: {
    title: "We'll identify it together.",
    body: "Text a photo of the housing to (760) 555-0175 and we'll tell you the type before we roll out. Same flat $75 either way.",
    cadence: "Photo identification is free",
  },
};

function inferType(answers: Record<string, Answer>): ResultType {
  // Most-recent answer wins if it has an `implies`.
  const ordered = QUESTIONS.map((q) => answers[q.id]).filter(Boolean);
  for (let i = ordered.length - 1; i >= 0; i--) {
    const a = ordered[i];
    if (a.implies) {
      return a.implies as ResultType;
    }
  }
  return "unknown";
}

export function FilterQuiz() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [selectedId, setSelectedId] = useState<AnswerId | null>(null);
  const [done, setDone] = useState(false);

  const runningGuess: ResultType = useMemo(() => inferType(answers), [answers]);

  // Filter the question list to skip questions that don't apply to the current guess.
  const visible = useMemo(
    () =>
      QUESTIONS.filter(
        (q, i) =>
          i === 0 ||
          !q.skipIfGuess?.includes(runningGuess as FilterType)
      ),
    [runningGuess]
  );

  const current = visible[stepIdx];
  const total = visible.length;

  function selectAnswer(opt: Answer) {
    setSelectedId(opt.id);
  }

  function next() {
    if (!current || !selectedId) return;
    const opt = current.opts.find((o) => o.id === selectedId);
    if (!opt) return;
    const nextAnswers = { ...answers, [current.id]: opt };
    setAnswers(nextAnswers);
    setSelectedId(null);

    const nextVisible = QUESTIONS.filter(
      (q, i) =>
        i === 0 ||
        !q.skipIfGuess?.includes(inferType(nextAnswers) as FilterType)
    );
    if (stepIdx + 1 >= nextVisible.length) {
      setDone(true);
    } else {
      setStepIdx(stepIdx + 1);
    }
  }

  function back() {
    if (stepIdx === 0) return;
    setSelectedId(null);
    setStepIdx(stepIdx - 1);
  }

  function reset() {
    setStepIdx(0);
    setAnswers({});
    setSelectedId(null);
    setDone(false);
  }

  const progress = ((done ? total : stepIdx + 1) / (total + 1)) * 100;

  if (done) {
    const result = inferType(answers);
    const copy = RESULT_COPY[result];
    const bookType = result === "unknown" ? "" : result;
    return (
      <QuizShell progress={100} step={total} total={total} onClose>
        <div className="px-8 py-9 md:px-12">
          <div className="ff-eyebrow">Result</div>
          <h2 className="ff-h1 mt-3" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            {copy.title}
          </h2>
          <p className="ff-body-lg mt-4 max-w-[520px]">{copy.body}</p>
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-ff-brand-tint p-5">
            {result !== "unknown" && (
              <FilterIcon type={result} size={56} className="text-ff-brand-deep" />
            )}
            <div>
              <div className="ff-mono text-xs text-ff-brand-deep">{copy.cadence}</div>
              <div className="font-serif text-2xl italic text-ff-ink">$75 flat</div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={bookType ? `/book?type=${bookType}` : "/book"}
              className="ff-btn ff-btn--primary ff-btn--lg"
            >
              Book my filter clean <Arrow size={16} />
            </Link>
            <button type="button" onClick={reset} className="ff-btn ff-btn--ghost">
              Retake the quiz
            </button>
          </div>
        </div>
      </QuizShell>
    );
  }

  return (
    <QuizShell progress={progress} step={stepIdx + 1} total={total}>
      <div className="px-8 py-9 md:px-12">
        <h2 className="ff-h2" style={{ fontSize: 28 }}>
          {current.q}
        </h2>
        <p className="mt-1.5 text-sm text-ff-ink-3">{current.helper}</p>

        <div className="mt-7 flex flex-col gap-2.5">
          {current.opts.map((o) => {
            const active = selectedId === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => selectAnswer(o)}
                className="flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-150"
                style={{
                  background: active ? "var(--ff-brand-soft)" : "var(--ff-paper)",
                  borderColor: active ? "var(--ff-brand)" : "var(--ff-line)",
                }}
              >
                <div
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-[10px]"
                  style={{ background: active ? "var(--ff-paper)" : "var(--ff-brand-tint)" }}
                >
                  {o.visual === "cartridge" && (
                    <FilterIcon type="cartridge" size={42} className="text-ff-brand-deep" />
                  )}
                  {o.visual === "de" && (
                    <FilterIcon type="de" size={42} className="text-ff-brand-deep" />
                  )}
                  {o.visual === "sand" && (
                    <FilterIcon type="sand" size={42} className="text-ff-brand-deep" />
                  )}
                  {o.visual === "photo" && (
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 42 42"
                      fill="none"
                      stroke="var(--ff-brand-deep)"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <rect x="6" y="10" width="30" height="22" rx="3" />
                      <circle cx="21" cy="22" r="6" />
                      <path d="M14 10l2-4h10l2 4" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-ff-ink">{o.label}</div>
                  <div className="mt-0.5 text-[13px] text-ff-ink-3">{o.hint}</div>
                </div>
                <div
                  className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border-2 text-[11px] text-white"
                  style={{
                    borderColor: active ? "var(--ff-brand)" : "var(--ff-line)",
                    background: active ? "var(--ff-brand)" : "transparent",
                  }}
                >
                  {active && "✓"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {stepIdx > 0 && (
              <button type="button" onClick={back} className="ff-btn ff-btn--text">
                ← Back
              </button>
            )}
            <Link href="/book" className="ff-btn ff-btn--text text-ff-ink-3">
              Skip quiz · pick manually
            </Link>
          </div>
          <button
            type="button"
            onClick={next}
            disabled={!selectedId}
            className="ff-btn ff-btn--primary"
          >
            {stepIdx + 1 === total ? "See result" : "Next question"} <Arrow />
          </button>
        </div>
      </div>
    </QuizShell>
  );
}

function QuizShell({
  progress,
  step,
  total,
  onClose,
  children,
}: {
  progress: number;
  step: number;
  total: number;
  onClose?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto overflow-hidden rounded-[24px] border border-ff-line bg-ff-paper"
      style={{ maxWidth: 720, boxShadow: "var(--ff-shadow-lg)" }}
    >
      <div className="flex items-center justify-between border-b border-ff-line-2 px-7 py-5">
        <div className="flex items-center gap-2.5">
          <LogoMark size={24} />
          <span className="text-xs text-ff-ink-3">Filter type quiz · 30 seconds</span>
        </div>
        {onClose && (
          <Link
            href="/"
            aria-label="Close quiz"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ff-line bg-white text-ff-ink-2 hover:bg-ff-bg"
          >
            ×
          </Link>
        )}
      </div>
      <div className="border-b border-ff-line-2 px-7 py-3">
        <div className="h-1 overflow-hidden rounded bg-ff-line-2">
          <div
            className="h-full bg-ff-brand transition-[width] duration-300 ease-pool"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-ff-ink-3">
          <span>
            Question {Math.min(step, total)} of {total}
          </span>
          <span>Answer to see your filter type</span>
        </div>
      </div>
      {children}
    </div>
  );
}
