// Sponsors shown in the Home page "Our Sponsors" section, from the MISA
// Instagram thank-you post for MIS Connect 2026.
// A sponsor without a `logo` shows as a name card until one is added.
// Logos live in src/assets/sponsors/monetary/ and src/assets/sponsors/in-kind/
// (SVG, or PNG/JPG around 400-640px wide) and are imported here.
import pepsicoLogo from '../assets/sponsors/monetary/pepsico.jpg'
import slalomLogo from '../assets/sponsors/monetary/slalom.svg'
import invictusLogo from '../assets/sponsors/monetary/invictus.png'
import affinityLogo from '../assets/sponsors/monetary/affinity.png'
import balletBcLogo from '../assets/sponsors/in-kind/ballet-bc.jpg'
import barrysLogo from '../assets/sponsors/in-kind/barrys.png'
import bonMacaronLogo from '../assets/sponsors/in-kind/bon-macaron.png'
import climbBase5Logo from '../assets/sponsors/in-kind/climb-base5.png'
import improvCentreLogo from '../assets/sponsors/in-kind/improv-centre.png'
import rumbleBoxingLogo from '../assets/sponsors/in-kind/rumble-boxing.png'
import stevesPokeBarLogo from '../assets/sponsors/in-kind/steves-poke-bar.png'

export type Sponsor = {
  name: string
  /** Logo URL; the sponsor's name is shown instead when missing */
  logo?: string
  /** Sponsor's website, opened when the card is clicked */
  url?: string
}

export const SPONSORS_EVENT = 'MIS Connect 2026'

/** Monetary sponsors: shown larger, above the carousel, and link to their site */
export const MONETARY_SPONSORS: Sponsor[] = [
  { name: 'PepsiCo', logo: pepsicoLogo, url: 'https://www.pepsico.com' },
  { name: 'Slalom', logo: slalomLogo, url: 'https://www.slalom.com' },
  { name: 'Invictus', logo: invictusLogo, url: 'https://www.invictusaccounting.com/'},
  { name: 'Affinity', logo: affinityLogo, url: 'https://www.affinity-group.ca/'},
]

/** In-kind sponsors: shown in the sliding carousel */
export const IN_KIND_SPONSORS: Sponsor[] = [
  // Sponsors without a logo yet are commented out; uncomment once added
  // { name: 'Baked' },
  // { name: 'Gateway Theatre' },
  { name: 'Bon Macaron Patisserie', logo: bonMacaronLogo },
  { name: 'Barry’s', logo: barrysLogo },
  { name: 'Ballet BC', logo: balletBcLogo },
  // { name: 'Davie Dosa Company' },
  // { name: 'Rio Theatre' },
  { name: 'The Improv Centre', logo: improvCentreLogo },
  { name: 'Rumble Boxing Studio', logo: rumbleBoxingLogo },
  // { name: 'The Bunny Cafe' },
  { name: 'Climb Base 5', logo: climbBase5Logo },
  // { name: 'Maverick’s Social Room' },
  // { name: 'Fitness World' },
  // { name: 'Evo Car Share' },
  // { name: 'Blossom Teas' },
  // { name: 'Renaissance Coffee' },
  // { name: 'Let’s Roam' },
  // { name: 'Chinese Canadian Museum' },
  // { name: 'Museum of Anthropology at UBC' },
  // { name: 'Promosapien' },
  // { name: 'Indomie' },
  { name: 'Steve’s Poke Bar', logo: stevesPokeBarLogo },
  // { name: 'Pajo’s' },
  // { name: 'Cornerstone Printing' },
  // { name: 'Nuba' },
  // { name: 'Sopra Sotto' },
]
