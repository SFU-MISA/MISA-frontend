// The four pillar events, in the order they climb the Events page staircase.
// The next event that hasn't happened yet is shown as "Upcoming Event", and
// anything after it under "Future Events". Dates and times are placeholders.
export type PillarEvent = {
  /** Used for the #anchor link from the staircase to the event card */
  slug: string
  name: string
  /** Local date, YYYY-MM-DD */
  date: string
  /** Local 24h times, HH:MM */
  startTime: string
  endTime: string
  location: string
  description: string
  /** Optional image URL; a grey placeholder is shown when missing */
  image?: string
}

const DESCRIPTION =
  'Connect with industry professionals, gain real-world perspectives, and discover the many career opportunities within the field of MIS, including business analytics, tech consulting, and project/product management.'

export const PILLAR_EVENTS: PillarEvent[] = [
  {
    slug: 'mis-connect',
    name: 'MIS Connect',
    date: '2026-10-23',
    startTime: '18:00',
    endTime: '20:00',
    location: 'SFU Burnaby',
    description: DESCRIPTION,
  },
  {
    slug: 'mis-link',
    name: 'MIS Link',
    date: '2026-11-13',
    startTime: '18:00',
    endTime: '20:00',
    location: 'SFU Burnaby',
    description: DESCRIPTION,
  },
  {
    slug: 'mis-breakthrough',
    name: 'MIS Breakthrough',
    date: '2027-01-29',
    startTime: '18:00',
    endTime: '20:00',
    location: 'SFU Burnaby',
    description: DESCRIPTION,
  },
  {
    slug: 'mis-bootcamp',
    name: 'MIS Bootcamp',
    date: '2027-03-12',
    startTime: '10:00',
    endTime: '16:00',
    location: 'SFU Burnaby',
    description: DESCRIPTION,
  },
]
