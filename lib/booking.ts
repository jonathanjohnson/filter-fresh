import { z } from "zod";

export const ONE_TIME_PRICE = 75;
export const RECURRING_PRICE = 65;

export const FILTER_TYPES = ["cartridge", "de", "sand", "unknown"] as const;
export const POOL_SIZES = ["under_15k", "15_25k", "over_25k", "unknown"] as const;
export const LAST_CLEANED = [
  "0_3_months",
  "3_6_months",
  "6_12_months",
  "over_1_year",
  "never",
] as const;
export const ISSUES = ["high_psi", "cloudy", "short_cycles", "none"] as const;
export const TIME_PREFERENCES = ["morning", "midday", "afternoon", "flexible"] as const;
export const CADENCES = ["one_time", "quarterly"] as const;

export const ISSUE_LABELS: Record<(typeof ISSUES)[number], string> = {
  high_psi: "High PSI on the gauge",
  cloudy: "Cloudy water",
  short_cycles: "Short filter cycles",
  none: "Nothing wrong, due for service",
};
export const FILTER_LABELS: Record<(typeof FILTER_TYPES)[number], string> = {
  cartridge: "Cartridge",
  de: "DE (diatomaceous earth)",
  sand: "Sand",
  unknown: "Not sure",
};
export const POOL_SIZE_LABELS: Record<(typeof POOL_SIZES)[number], string> = {
  under_15k: "Under 15,000 gallons",
  "15_25k": "15,000 to 25,000 gallons",
  over_25k: "Over 25,000 gallons",
  unknown: "Not sure",
};
export const LAST_CLEANED_LABELS: Record<(typeof LAST_CLEANED)[number], string> = {
  "0_3_months": "Within the last 3 months",
  "3_6_months": "3 to 6 months ago",
  "6_12_months": "6 to 12 months ago",
  over_1_year: "More than a year ago",
  never: "Never, or I don't know",
};
export const TIME_LABELS: Record<(typeof TIME_PREFERENCES)[number], string> = {
  morning: "Morning (8 to 11 am)",
  midday: "Midday (11 am to 2 pm)",
  afternoon: "Afternoon (2 to 5 pm)",
  flexible: "Flexible, any time of day",
};
export const CADENCE_LABELS: Record<(typeof CADENCES)[number], string> = {
  one_time: `One-time visit, $${ONE_TIME_PRICE}`,
  quarterly: `Quarterly schedule, $${RECURRING_PRICE} per visit`,
};

export const submitBookingSchema = z.object({
  zip: z.string().regex(/^\d{5}$/),
  citySlug: z.string().min(1),
  cityName: z.string().min(1),

  filterType: z.enum(FILTER_TYPES),
  poolSize: z.enum(POOL_SIZES),
  lastCleaned: z.enum(LAST_CLEANED),
  issues: z.array(z.enum(ISSUES)).min(1),

  name: z.string().min(2).max(120),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(4).max(240),
  accessNotes: z.string().max(500).optional().or(z.literal("")),

  dateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timePreference: z.enum(TIME_PREFERENCES),
  cadence: z.enum(CADENCES),
});

export type SubmitBookingInput = z.infer<typeof submitBookingSchema>;

export function priceForCadence(cadence: (typeof CADENCES)[number]): number {
  return cadence === "quarterly" ? RECURRING_PRICE : ONE_TIME_PRICE;
}
