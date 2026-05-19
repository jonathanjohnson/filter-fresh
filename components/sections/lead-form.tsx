"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatPhone } from "@/lib/utils";

type Props = { sourcePage?: string; defaultCity?: string };

export function LeadForm({ sourcePage, defaultCity }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.source_page = sourcePage ?? "/";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setPhone("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <div className="text-lg font-semibold">Got it — we'll text you shortly.</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Most confirmations go out within an hour during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" autoComplete="street-address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={defaultCity ?? ""} autoComplete="address-level2" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP</Label>
          <Input id="zip" name="zip" inputMode="numeric" maxLength={5} autoComplete="postal-code" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="filter_type">Filter type</Label>
          <Select id="filter_type" name="filter_type" defaultValue="unknown">
            <option value="cartridge">Cartridge</option>
            <option value="de">DE</option>
            <option value="sand">Sand</option>
            <option value="unknown">Not sure</option>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message">Anything else?</Label>
          <Textarea id="message" name="message" placeholder="Gate code, dog, preferred days, etc." />
        </div>
      </div>
      {status === "error" && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {errorMsg ?? "Something went wrong"}
        </div>
      )}
      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Request $75 cleaning"}
      </Button>
    </form>
  );
}
