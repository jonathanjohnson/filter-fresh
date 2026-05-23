import { describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import seed from "../supabase/seed/zips.json";
import { sanitizeZip, validateZip } from "../lib/zip-validation";
import type { Database } from "../lib/supabase";

type SeedRow = {
  zip: string;
  city: string;
  county: string;
  region: string;
  in_service_area: boolean;
};

/**
 * Tiny in-memory mock that supports the chain validateZip actually calls:
 *   client.from("zips").select(<cols>).eq("zip", <z>).limit(1)
 * Returns { data, error } shaped like the real PostgREST response.
 */
function makeMockClient(rows: SeedRow[]): SupabaseClient<Database> {
  const byZip = new Map(rows.map((r) => [r.zip, r]));
  return {
    from(table: string) {
      if (table !== "zips") {
        throw new Error(`Mock does not support table ${table}`);
      }
      return {
        select(_cols: string) {
          return {
            eq(_col: string, value: string) {
              const row = byZip.get(value);
              return {
                limit(_n: number) {
                  return Promise.resolve({
                    data: row ? [row] : [],
                    error: null,
                  });
                },
              };
            },
          };
        },
      };
    },
  } as unknown as SupabaseClient<Database>;
}

const client = makeMockClient(seed as SeedRow[]);

const IN_AREA_FIXTURES: Array<[string, string]> = [
  ["92592", "Temecula"],
  ["92562", "Murrieta"],
  ["92009", "Carlsbad"],
  ["92024", "Encinitas"],
  ["92127", "San Diego"],
  ["92064", "Poway"],
  ["91913", "Chula Vista"],
  ["92118", "Coronado"],
  ["92028", "Fallbrook"],
  ["92154", "San Diego"],
];

const OUT_OF_AREA_FIXTURES = [
  "90210", // Beverly Hills
  "92201", // Indio
  "92501", // Riverside
  "92880", // Eastvale
  "92543", // Hemet
  "92262", // Palm Springs
  "10001", // New York
];

const INVALID_FORMAT_FIXTURES = [
  "",
  "1234",
  "123456",
  "abcde",
  "abc12",
  "00000",
];

describe("validateZip — in-service-area", () => {
  for (const [zip, city] of IN_AREA_FIXTURES) {
    it(`${zip} resolves to ${city}`, async () => {
      const result = await validateZip(zip, client);
      expect(result).toEqual({
        status: "in_service_area",
        zip,
        city,
        county: expect.any(String),
        region: expect.any(String),
      });
    });
  }
});

describe("validateZip — out-of-service-area", () => {
  for (const zip of OUT_OF_AREA_FIXTURES) {
    it(`${zip} returns out_of_service_area`, async () => {
      const result = await validateZip(zip, client);
      expect(result).toEqual({ status: "out_of_service_area", zip });
    });
  }
});

describe("validateZip — input sanitization", () => {
  const SANITIZE_INPUTS = [
    "92592 ",
    " 92592",
    "92592.0",
    "92-592",
  ];
  for (const raw of SANITIZE_INPUTS) {
    it(`${JSON.stringify(raw)} resolves to in_service_area for Temecula`, async () => {
      const result = await validateZip(raw, client);
      expect(result).toMatchObject({
        status: "in_service_area",
        zip: "92592",
        city: "Temecula",
      });
    });
  }
});

describe("validateZip — invalid format", () => {
  for (const raw of INVALID_FORMAT_FIXTURES) {
    it(`${JSON.stringify(raw)} returns invalid_format`, async () => {
      const result = await validateZip(raw, client);
      expect(result).toEqual({ status: "invalid_format" });
    });
  }
});

describe("validateZip — edge cases", () => {
  it("null input does not throw", async () => {
    const result = await validateZip(null, client);
    expect(result).toEqual({ status: "invalid_format" });
  });

  it("undefined input does not throw", async () => {
    const result = await validateZip(undefined, client);
    expect(result).toEqual({ status: "invalid_format" });
  });

  it("whitespace-only string returns invalid_format", async () => {
    const result = await validateZip("   ", client);
    expect(result).toEqual({ status: "invalid_format" });
  });

  it("10 parallel calls return consistent results (no race)", async () => {
    const results = await Promise.all(
      Array.from({ length: 10 }, () => validateZip("92592", client))
    );
    for (const r of results) {
      expect(r).toEqual({
        status: "in_service_area",
        zip: "92592",
        city: "Temecula",
        county: "Riverside",
        region: "Temecula Valley",
      });
    }
    // All results must be deeply equal to each other.
    const first = JSON.stringify(results[0]);
    for (const r of results) {
      expect(JSON.stringify(r)).toBe(first);
    }
  });
});

describe("sanitizeZip helper", () => {
  it("strips trailing whitespace", () => {
    expect(sanitizeZip("92592 ")).toBe("92592");
  });
  it("strips leading whitespace", () => {
    expect(sanitizeZip(" 92592")).toBe("92592");
  });
  it("drops decimal tail (Excel/CSV style)", () => {
    expect(sanitizeZip("92592.0")).toBe("92592");
    expect(sanitizeZip("92592.5")).toBe("92592");
  });
  it("strips inner non-digits", () => {
    expect(sanitizeZip("92-592")).toBe("92592");
  });
  it("rejects too short", () => {
    expect(sanitizeZip("1234")).toBeNull();
  });
  it("rejects too long", () => {
    expect(sanitizeZip("123456")).toBeNull();
  });
  it("rejects all-zero", () => {
    expect(sanitizeZip("00000")).toBeNull();
  });
  it("returns null for null and undefined", () => {
    expect(sanitizeZip(null)).toBeNull();
    expect(sanitizeZip(undefined)).toBeNull();
  });
});
