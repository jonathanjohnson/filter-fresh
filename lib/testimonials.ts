export type Testimonial = {
  quote: string;
  name: string;
  citySlug: string;
  city: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Showed up on time, pulled my Pentair cartridges out, soaked them, brought them back so clean they looked new. Two pool companies before this just hosed them off. Worth every dollar.",
    name: "Marcus L.",
    citySlug: "temecula",
    city: "Temecula",
  },
  {
    quote:
      "Best seventy-five bucks I've spent on the pool this year. Came out for a single cartridge clean and the photos came through to my phone before they had even left the property.",
    name: "Lisa M.",
    citySlug: "murrieta",
    city: "Murrieta",
  },
  {
    quote:
      "Used to drive into Temecula for filter service. Now they come to Wildomar. Same flat rate, same hour, and the chemical sand cleanse the last guy was charging extra for is included.",
    name: "Brian H.",
    citySlug: "wildomar",
    city: "Wildomar",
  },
  {
    quote:
      "I had a DE filter that nobody wanted to touch because grids are a pain. These guys took it apart on the driveway, cleaned every grid, recharged the DE, and were done in under an hour.",
    name: "Jennifer K.",
    citySlug: "carlsbad",
    city: "Carlsbad",
  },
  {
    quote:
      "Honest, fast, no upsell pitch. They told me my manifold has another season in it and not to bother replacing yet. First pool tech in five years who didn't try to sell me something extra.",
    name: "Priya S.",
    citySlug: "encinitas",
    city: "Encinitas",
  },
  {
    quote:
      "Booked online Sunday night, got a text Monday morning, cleaned Tuesday. Sand backwash on one pool and a cartridge clean on the other. $150 for both. The last guy charged me $400.",
    name: "David R.",
    citySlug: "san-diego",
    city: "San Diego",
  },
  {
    quote:
      "Asked about a contract and they said they don't do those. Refreshing. Will be using them again in the spring.",
    name: "Tom W.",
    citySlug: "escondido",
    city: "Escondido",
  },
];

export function getTestimonialsForArea(slugs: string[]): Testimonial[] {
  const set = new Set(slugs);
  return TESTIMONIALS.filter((t) => set.has(t.citySlug));
}
