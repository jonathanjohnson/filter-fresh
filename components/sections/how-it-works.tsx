const STEPS = [
  { n: 1, title: "Book online", body: "Pick a date. We confirm by text within an hour." },
  { n: 2, title: "We come to you", body: "We pull, disassemble, and deep-clean your filter on-site." },
  { n: 3, title: "Reinstall & report", body: "Filter back in, system pressure-tested, photos sent to you." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t bg-secondary/30">
      <div className="container py-16">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-lg border bg-card p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
