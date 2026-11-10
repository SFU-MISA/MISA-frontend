import connectPhoto from '../assets/photos/mis-connect/panel.jpg'
import linkPhoto from '../assets/photos/mis-link/networking.jpg'
import breakthroughPhoto from '../assets/photos/mis-breakthrough/presenting.jpg'
import pmbcPhoto from '../assets/photos/mis-pmbc/pmbc.jpg'

// The pillar events, in the order they climb the Events page staircase.
// The next event that hasn't happened yet is shown as "Upcoming Event", and
// anything after it under "Future Events". Leave out `date` while it's still
// being decided and the event shows "Coming Soon" instead.
export type PillarEvent = {
  /** Used for the #anchor link from the staircase to the event card */
  slug: string
  name: string
  /** Local date, YYYY-MM-DD; leave out while it's still to be decided */
  date?: string
  /** Local 24h times, HH:MM */
  startTime?: string
  endTime?: string
  location: string
  description: string
  /** Optional image URL; a grey placeholder is shown when missing */
  image?: string
}

export const PILLAR_EVENTS: PillarEvent[] = [
  {
    slug: 'mis-connect',
    name: 'MIS Connect',
    date: '2026-10-23',
    startTime: '18:00',
    endTime: '20:00',
    location: 'SFU Burnaby',
    description:
      'Connect with industry professionals, gain real-world perspectives, and discover the many career opportunities within the field of MIS, including business analytics, tech consulting, and project/product management.',
    image: connectPhoto,
  },
  {
    slug: 'mis-link',
    name: 'MIS Link',
    date: '2026-11-13',
    startTime: '18:00',
    endTime: '20:00',
    location: 'SFU Burnaby',
    description:
      'Take a step into a possible future path and get an insider look at leading firms. MIS Link is a series of office tours designed for you to explore workplaces, connect with peers, and build relationships with industry professionals.',
    image: linkPhoto,
  },
  {
    slug: 'mis-pmbc',
    name: 'MIS PMBC',
    location: 'TBD',
    description:
      'Move beyond classroom theory, and put your skills to the test building like a real product manager at PMBC. You will be able to tackle real world challenges, design solutions and pitch them to industry judges.',
    image: pmbcPhoto,
  },
  {
    slug: 'mis-breakthrough',
    name: 'MIS Breakthrough',
    location: 'TBD',
    description:
      'A high momentum hackathon sprint, where developers, designers and strategists come together to build real tech under pressure and ship a real product solution alongside peers and mentors.',
    image: breakthroughPhoto,
  },
]
