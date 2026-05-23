import type { Metadata } from "next";
import { FilterQuiz } from "@/components/quiz/filter-quiz";

export const metadata: Metadata = {
  title: "Filter type quiz — 30 seconds",
  description:
    "Three quick questions and we'll tell you whether your pool has a cartridge, DE, or sand filter. Same flat $75 for any of them.",
  alternates: { canonical: "/quiz" },
  robots: { index: false, follow: true },
};

export default function QuizPage() {
  return (
    <section className="bg-ff-bg px-[clamp(22px,4vw,64px)] py-[clamp(48px,7vw,80px)]">
      <FilterQuiz />
    </section>
  );
}
