"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatPhone } from "@/lib/utils";
import {
  CADENCES,
  CADENCE_LABELS,
  FILTER_LABELS,
  FILTER_TYPES,
  ISSUES,
  ISSUE_LABELS,
  LAST_CLEANED,
  LAST_CLEANED_LABELS,
  ONE_TIME_PRICE,
  POOL_SIZES,
  POOL_SIZE_LABELS,
  TIME_LABELS,
  TIME_PREFERENCES,
  priceForCadence,
} from "@/lib/booking";
import { trackBookingStep, trackBookingSubmit } from "@/lib/analytics";

/* -------------------------------------------------------------------------- */
/* Types & storage                                                            */
/* -------------------------------------------------------------------------- */

type FilterType = (typeof FILTER_TYPES)[number];
type PoolSize = (typeof POOL_SIZES)[number];
type LastCleaned = (typeof LAST_CLEANED)[number];
type Issue = (typeof ISSUES)[number];
type TimePref = (typeof TIME_PREFERENCES)[number];
type Cadence = (typeof CADENCES)[number];

type BookingState = {
  zip: string;
  citySlug: string | null;
  cityName: string | null;
  filterType: FilterType | null;
  poolSize: PoolSize | null;
  lastCleaned: LastCleaned | null;
  issues: Issue[];
  name: string;
  phone: string;
  email: string;
  address: string;
  accessNotes: string;
  dateStart: string;
  dateEnd: string;
  timePreference: TimePref | null;
  cadence: Cadence | null;
};

const INITIAL: BookingState = {
  zip: "",
  citySlug: null,
  cityName: null,
  filterType: null,
  poolSize: null,
  lastCleaned: null,
  issues: [],
  name: "",
  phone: "",
  email: "",
  address: "",
  accessNotes: "",
  dateStart: defaultDateOffset(2),
  dateEnd: defaultDateOffset(9),
  timePreference: null,
  cadence: null,
};

const STORAGE_KEY = "ff-booking-v1";
const STORAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Persisted = { state: BookingState; step: number; savedAt: number };

function defaultDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function loadFromStorage(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Persisted;
    if (Date.now() - parsed.savedAt > STORAGE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(state: BookingState, step: number): void {
  if (typeof window === "undefined") return;
  try {
    const payload: Persisted = { state, step, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / privacy mode errors
  }
}

function clearStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BookingFlow() {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<BookingState>(INITIAL);
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<{
    bookingId: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setState(saved.state);
      setStep(saved.step);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(state, step);
  }, [state, step, hydrated]);

  const update = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  };

  function goToStep(next: number) {
    trackBookingStep(step, { next_step: next });
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function submitBooking() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/booking/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          zip: state.zip,
          citySlug: state.citySlug ?? "",
          cityName: state.cityName ?? "",
          filterType: state.filterType,
          poolSize: state.poolSize,
          lastCleaned: state.lastCleaned,
          issues: state.issues.length > 0 ? state.issues : ["none"],
          name: state.name,
          phone: state.phone,
          email: state.email,
          address: state.address,
          accessNotes: state.accessNotes,
          dateStart: state.dateStart,
          dateEnd: state.dateEnd,
          timePreference: state.timePreference,
          cadence: state.cadence,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      trackBookingSubmit({
        city: state.cityName ?? undefined,
        cadence: state.cadence ?? undefined,
        value: body.price,
        currency: "USD",
      });
      clearStorage();
      setCompleted({ bookingId: body.booking_id, price: body.price });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (completed) {
    return <ThankYou bookingId={completed.bookingId} price={completed.price} />;
  }

  const price = state.cadence ? priceForCadence(state.cadence) : ONE_TIME_PRICE;

  return (
    <div className="space-y-6">
      <Stepper step={step} />
      <div className="rounded-lg border bg-card p-6 md:p-8">
        {step === 1 && (
          <StepZip
            state={state}
            update={update}
            onPass={(citySlug, cityName) => {
              update("citySlug", citySlug);
              update("cityName", cityName);
              goToStep(2);
            }}
          />
        )}
        {step === 2 && (
          <StepPool
            state={state}
            update={update}
            onBack={() => goToStep(1)}
            onNext={() => goToStep(3)}
          />
        )}
        {step === 3 && (
          <StepContact
            state={state}
            update={update}
            onBack={() => goToStep(2)}
            onNext={() => goToStep(4)}
          />
        )}
        {step === 4 && (
          <StepSchedule
            state={state}
            update={update}
            onBack={() => goToStep(3)}
            onNext={() => goToStep(5)}
          />
        )}
        {step === 5 && (
          <StepConfirm
            state={state}
            price={price}
            submitting={submitting}
            error={submitError}
            onBack={() => goToStep(4)}
            onSubmit={submitBooking}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stepper                                                                    */
/* -------------------------------------------------------------------------- */

function Stepper({ step }: { step: number }) {
  const labels = ["Area", "Pool", "Contact", "Schedule", "Confirm"];
  return (
    <ol className="flex items-center justify-between gap-1 text-xs sm:text-sm">
      {labels.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <li
            key={label}
            className={cn(
              "flex flex-1 items-center gap-2 rounded-md border px-2 py-2 sm:px-3",
              active && "border-primary bg-primary/5 text-foreground",
              done && "border-fresh-600 text-fresh-700",
              !active && !done && "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "inline-flex h-6 w-6 flex-none items-center justify-center rounded-full font-display text-xs font-bold",
                active && "bg-primary text-primary-foreground",
                done && "bg-fresh-600 text-primary-foreground",
                !active && !done && "bg-secondary text-muted-foreground"
              )}
            >
              {done ? "✓" : n}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* Step 1: ZIP                                                                */
/* -------------------------------------------------------------------------- */

function StepZip({
  state,
  update,
  onPass,
}: {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
  onPass: (citySlug: string, cityName: string) => void;
}) {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<
    "idle" | "saving" | "ok" | "error"
  >("idle");
  const [outOfArea, setOutOfArea] = useState(false);

  async function check() {
    setError(null);
    if (!/^\d{5}$/.test(state.zip)) {
      setError("Enter a 5-digit ZIP.");
      return;
    }
    setChecking(true);
    try {
      const res = await fetch("/api/booking/check-zip", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ zip: state.zip }),
      });
      const body = await res.json();
      if (body.in_service_area) {
        setOutOfArea(false);
        onPass(body.city_slug, body.city_name);
      } else {
        setOutOfArea(true);
      }
    } catch {
      setError("Could not check that ZIP. Try again, or call us.");
    } finally {
      setChecking(false);
    }
  }

  async function joinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setWaitlistStatus("saving");
    try {
      const res = await fetch("/api/booking/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail, zip: state.zip }),
      });
      if (!res.ok) throw new Error();
      setWaitlistStatus("ok");
    } catch {
      setWaitlistStatus("error");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Are we in your area?</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We serve Temecula through every city in San Diego County. Drop your ZIP and we
        will check.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <Label htmlFor="zip">ZIP code</Label>
          <Input
            id="zip"
            inputMode="numeric"
            maxLength={5}
            autoComplete="postal-code"
            value={state.zip}
            onChange={(e) => {
              update("zip", e.target.value.replace(/\D/g, ""));
              setOutOfArea(false);
              setError(null);
            }}
            placeholder="92591"
            className="mt-2 text-lg tabular-nums"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            size="lg"
            onClick={check}
            disabled={checking || state.zip.length !== 5}
            className="w-full sm:w-auto"
          >
            {checking ? "Checking..." : "Check ZIP"}
          </Button>
        </div>
      </div>
      {error && (
        <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {outOfArea && (
        <div className="mt-6 rounded-lg border border-warning/40 bg-warning/10 p-5">
          <div className="font-semibold">
            We do not service {state.zip} yet
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            We are growing the route map quarterly. Leave an email and we will write
            when we hit your ZIP. No marketing in the meantime.
          </p>
          {waitlistStatus === "ok" ? (
            <div className="mt-3 text-sm text-fresh-700 font-semibold">
              Got it. We will be in touch when we get there.
            </div>
          ) : (
            <form onSubmit={joinWaitlist} className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
              />
              <Button type="submit" disabled={waitlistStatus === "saving"}>
                {waitlistStatus === "saving" ? "Saving..." : "Notify me"}
              </Button>
            </form>
          )}
          {waitlistStatus === "error" && (
            <div className="mt-2 text-xs text-destructive">
              Could not save. Try again or email hello@filterfresh.example.com.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Step 2: Pool details                                                       */
/* -------------------------------------------------------------------------- */

function StepPool({
  state,
  update,
  onBack,
  onNext,
}: {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const ready =
    state.filterType !== null &&
    state.poolSize !== null &&
    state.lastCleaned !== null &&
    state.issues.length > 0;

  function toggleIssue(i: Issue) {
    const has = state.issues.includes(i);
    if (i === "none") {
      update("issues", has ? [] : ["none"]);
      return;
    }
    const next = (has ? state.issues.filter((x) => x !== i) : [...state.issues, i]).filter(
      (x) => x !== "none"
    );
    update("issues", next);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tell us about the filter</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A few quick questions so we arrive with the right approach.
        </p>
      </div>

      <RadioGroup
        legend="Filter type"
        value={state.filterType}
        onChange={(v) => update("filterType", v)}
        options={FILTER_TYPES.map((v) => ({ value: v, label: FILTER_LABELS[v] }))}
      />

      <RadioGroup
        legend="Approximate pool size"
        value={state.poolSize}
        onChange={(v) => update("poolSize", v)}
        options={POOL_SIZES.map((v) => ({ value: v, label: POOL_SIZE_LABELS[v] }))}
      />

      <RadioGroup
        legend="When was your filter last cleaned?"
        value={state.lastCleaned}
        onChange={(v) => update("lastCleaned", v)}
        options={LAST_CLEANED.map((v) => ({ value: v, label: LAST_CLEANED_LABELS[v] }))}
      />

      <fieldset>
        <legend className="text-sm font-medium">
          Anything going on right now? (pick all that apply)
        </legend>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {ISSUES.map((i) => {
            const active = state.issues.includes(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => toggleIssue(i)}
                  className={cn(
                    "w-full rounded-md border p-3 text-left text-sm transition-colors",
                    active
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-input bg-background hover:bg-secondary"
                  )}
                >
                  {ISSUE_LABELS[i]}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!ready} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Step 3: Contact and address                                                */
/* -------------------------------------------------------------------------- */

function StepContact({
  state,
  update,
  onBack,
  onNext,
}: {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const ready =
    state.name.trim().length >= 2 &&
    state.phone.replace(/\D/g, "").length >= 10 &&
    state.address.trim().length >= 4;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Where should we go?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your number is the fastest way for us to confirm. Email is optional but gets
          you a receipt and inspection report.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          autoComplete="name"
          value={state.name}
          onChange={(v) => update("name", v)}
          required
        />
        <Field
          id="phone"
          label="Mobile phone"
          autoComplete="tel"
          inputMode="tel"
          value={state.phone}
          onChange={(v) => update("phone", formatPhone(v))}
          required
        />
        <Field
          id="email"
          label="Email (optional)"
          type="email"
          autoComplete="email"
          value={state.email}
          onChange={(v) => update("email", v)}
          className="sm:col-span-2"
        />
        <Field
          id="address"
          label="Service address"
          autoComplete="street-address"
          value={state.address}
          onChange={(v) => update("address", v)}
          required
          className="sm:col-span-2"
        />
      </div>

      <div>
        <Label htmlFor="accessNotes">Gate code or access notes (optional)</Label>
        <Textarea
          id="accessNotes"
          placeholder="Gate code, side gate, dog in yard, equipment pad on the north side, etc."
          value={state.accessNotes}
          onChange={(e) => update("accessNotes", e.target.value)}
          className="mt-2"
        />
      </div>

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!ready} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Step 4: Scheduling                                                         */
/* -------------------------------------------------------------------------- */

function StepSchedule({
  state,
  update,
  onBack,
  onNext,
}: {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const ready =
    state.dateStart &&
    state.dateEnd &&
    state.dateEnd >= state.dateStart &&
    state.timePreference !== null &&
    state.cadence !== null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pick a window</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We will text you within 2 hours to confirm a specific time inside the window
          you pick.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="dateStart">Earliest date</Label>
          <Input
            id="dateStart"
            type="date"
            value={state.dateStart}
            min={defaultDateOffset(0)}
            onChange={(e) => update("dateStart", e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="dateEnd">Latest date</Label>
          <Input
            id="dateEnd"
            type="date"
            value={state.dateEnd}
            min={state.dateStart}
            onChange={(e) => update("dateEnd", e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <RadioGroup
        legend="Time of day"
        value={state.timePreference}
        onChange={(v) => update("timePreference", v)}
        options={TIME_PREFERENCES.map((v) => ({ value: v, label: TIME_LABELS[v] }))}
      />

      <RadioGroup
        legend="One-time or recurring?"
        value={state.cadence}
        onChange={(v) => update("cadence", v)}
        options={CADENCES.map((v) => ({ value: v, label: CADENCE_LABELS[v] }))}
      />

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!ready} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Step 5: Confirmation                                                       */
/* -------------------------------------------------------------------------- */

function StepConfirm({
  state,
  price,
  submitting,
  error,
  onBack,
  onSubmit,
}: {
  state: BookingState;
  price: number;
  submitting: boolean;
  error: string | null;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const rows = useMemo(
    () => [
      { label: "Service area", value: `${state.cityName ?? ""} ${state.zip}` },
      { label: "Filter type", value: state.filterType ? FILTER_LABELS[state.filterType] : "" },
      { label: "Pool size", value: state.poolSize ? POOL_SIZE_LABELS[state.poolSize] : "" },
      {
        label: "Last cleaned",
        value: state.lastCleaned ? LAST_CLEANED_LABELS[state.lastCleaned] : "",
      },
      {
        label: "Issues",
        value: state.issues.length
          ? state.issues.map((i) => ISSUE_LABELS[i]).join(", ")
          : "None mentioned",
      },
      { label: "Name", value: state.name },
      { label: "Phone", value: state.phone },
      ...(state.email ? [{ label: "Email", value: state.email }] : []),
      { label: "Address", value: state.address },
      ...(state.accessNotes ? [{ label: "Access notes", value: state.accessNotes }] : []),
      { label: "Window", value: `${state.dateStart} to ${state.dateEnd}` },
      {
        label: "Time of day",
        value: state.timePreference ? TIME_LABELS[state.timePreference] : "",
      },
      { label: "Cadence", value: state.cadence ? CADENCE_LABELS[state.cadence] : "" },
    ],
    [state]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">One look before you send</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything below goes to the operator and to your phone (and email if you
          added one).
        </p>
      </div>

      <dl className="overflow-hidden rounded-lg border bg-background">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[140px_1fr] border-b last:border-b-0 sm:grid-cols-[200px_1fr]"
          >
            <dt className="bg-secondary/40 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {r.label}
            </dt>
            <dd className="px-4 py-3 text-sm">{r.value || <span className="text-muted-foreground">Not set</span>}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between rounded-lg border bg-card p-5 shadow-pop">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Total at completion
          </div>
          <div className="font-display text-3xl font-bold tabular-nums">${price}</div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          Card on file or tap to pay when finished.
          <br />
          No deposit, no charge until the job is done.
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button type="button" size="lg" onClick={onSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : `Send my booking (${`$${price}`})`}
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Thank-you                                                                  */
/* -------------------------------------------------------------------------- */

function ThankYou({ bookingId, price }: { bookingId: string; price: number }) {
  return (
    <div className="rounded-lg border bg-card p-8 text-center shadow-pop md:p-12">
      <span className="ff-stamp">Booking received</span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
        We will text you within 2 hours.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        That is the standard during business hours. After-hours bookings get a reply
        first thing the next morning. Your total at completion is{" "}
        <span className="font-semibold text-foreground">${price}</span>.
      </p>
      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs">
        <span className="text-muted-foreground">Booking ID</span>
        <span className="font-mono">{bookingId.slice(0, 8)}</span>
      </div>
      <div className="mt-8">
        <Link href="/" className={buttonVariants({ size: "lg", variant: "outline" })}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Form helpers                                                               */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  required,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "numeric" | "email" | "text";
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2"
      />
    </div>
  );
}

function RadioGroup<T extends string>({
  legend,
  value,
  onChange,
  options,
}: {
  legend: string;
  value: T | null;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  "w-full rounded-md border p-3 text-left text-sm transition-colors",
                  active
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-input bg-background hover:bg-secondary"
                )}
              >
                {opt.label}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function NavRow({
  onBack,
  onNext,
  nextDisabled,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
      <Button type="button" variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button type="button" size="lg" onClick={onNext} disabled={nextDisabled}>
        Continue
      </Button>
    </div>
  );
}

