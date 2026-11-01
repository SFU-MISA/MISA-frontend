// Sponsors shown in the Home page "Our Sponsors" section, from the MISA
// Instagram thank-you post for MIS Connect 2026.
// No logos yet: each sponsor shows as a name card until `logo` is set.
// Logos go in src/assets/sponsors/ (SVG, or PNG with a transparent background)
// and are imported here like the event photos.
export type Sponsor = {
  name: string
  /** Logo URL; the sponsor's name is shown instead when missing */
  logo?: string
  /** Sponsor's website, opened when the card is clicked */
  url?: string
}

export const SPONSORS_EVENT = 'MIS Connect 2026'

/** Monetary sponsors: shown larger, above the carousel */
export const MONETARY_SPONSORS: Sponsor[] = [
  { name: 'PepsiCo' },
  { name: 'Invictus' },
]

/** In-kind sponsors: shown in the sliding carousel */
export const IN_KIND_SPONSORS: Sponsor[] = [
  { name: 'Baked' },
  { name: 'Gateway Theatre' },
  { name: 'Bon Macaron Patisserie' },
  { name: 'Barry’s' },
  { name: 'Ballet BC' },
  { name: 'Davie Dosa Company' },
  { name: 'Rio Theatre' },
  { name: 'The Improv Centre' },
  { name: 'Rumble Boxing Studio' },
  { name: 'The Bunny Cafe' },
  { name: 'Climb Base 5' },
  { name: 'Maverick’s Social Room' },
  { name: 'Fitness World' },
  { name: 'Evo Car Share' },
  { name: 'Blossom Teas' },
  { name: 'Renaissance Coffee' },
  { name: 'Let’s Roam' },
  { name: 'Chinese Canadian Museum' },
  { name: 'Museum of Anthropology at UBC' },
  { name: 'Promosapien' },
  { name: 'Indomie' },
  { name: 'Steve’s Poke Bar' },
  { name: 'Pajo’s' },
  { name: 'Cornerstone Printing' },
  { name: 'Nuba' },
  { name: 'Sopra Sotto' },
]
