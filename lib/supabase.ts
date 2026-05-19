import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

type LeadRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  address: string | null;
  city: string | null;
  zip: string | null;
  filter_type: string | null;
  message: string | null;
  source_page: string | null;
  created_at: string;
};

type LeadInsert = {
  id?: string;
  name: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  city?: string | null;
  zip?: string | null;
  filter_type?: string | null;
  message?: string | null;
  source_page?: string | null;
  created_at?: string;
};

type BookingRow = {
  id: string;
  lead_id: string;
  scheduled_date: string | null;
  status: "pending" | "confirmed" | "completed" | "canceled";
  notes: string | null;
  total: number;
  created_at: string;
};

type BookingInsert = {
  id?: string;
  lead_id: string;
  scheduled_date?: string | null;
  status?: BookingRow["status"];
  notes?: string | null;
  total?: number;
  created_at?: string;
};

type CityRow = {
  slug: string;
  name: string;
  county: string;
  tier: number;
  lat: number | null;
  lng: number | null;
  population: number | null;
  neighborhoods: string[] | null;
  zips: string[] | null;
  content_overrides: Json | null;
};

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadInsert>;
        Relationships: [];
      };
      bookings: {
        Row: BookingRow;
        Insert: BookingInsert;
        Update: Partial<BookingInsert>;
        Relationships: [
          {
            foreignKeyName: "bookings_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      cities: {
        Row: CityRow;
        Insert: CityRow;
        Update: Partial<CityRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

let browserClient: SupabaseClient<Database> | null = null;

export function getBrowserSupabase(): SupabaseClient<Database> {
  if (browserClient) return browserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase public env vars are not set");
  browserClient = createClient<Database>(url, key);
  return browserClient;
}

export function getServerSupabase(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server env vars are not set");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
