declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;

export function track(eventName: string, params: AnalyticsEventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // analytics never blocks user flow
  }
  try {
    window.fbq?.("trackCustom", eventName, params);
  } catch {
    // analytics never blocks user flow
  }
}

export function trackBookingStep(step: number, params: AnalyticsEventParams = {}): void {
  track("booking_step_complete", { step, ...params });
}

export function trackBookingSubmit(params: AnalyticsEventParams = {}): void {
  track("booking_submit", params);
  if (typeof window !== "undefined") {
    try {
      window.fbq?.("track", "Lead", params);
    } catch {
      // no-op
    }
  }
}
