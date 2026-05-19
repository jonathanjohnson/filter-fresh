import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(10).max(20),
  address: z.string().max(240).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  zip: z.string().regex(/^\d{5}$/).optional().or(z.literal("")),
  filter_type: z.enum(["cartridge", "de", "sand", "unknown"]).optional(),
  message: z.string().max(1000).optional().or(z.literal("")),
  source_page: z.string().max(240).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
