import connectPhoto from '../assets/photos/mis-connect/thumbs-up.jpg'
import linkPhoto from '../assets/photos/mis-link/office-tour.jpg'
import breakthroughPhoto from '../assets/photos/mis-breakthrough/winners.jpg'
import pmbcPhoto from '../assets/photos/mis-pmbc/pmbc.jpg'

// The tiles in the Home page "Our Events" strip, one per pillar event.
export type EventPreview = {
  name: string
  /** Optional image URL; a grey placeholder is shown when missing */
  image?: string
}

export const EVENTS_PREVIEW: EventPreview[] = [
  { name: 'MIS Connect', image: connectPhoto },
  { name: 'MIS Link', image: linkPhoto },
  { name: 'MIS PMBC', image: pmbcPhoto },
  { name: 'MIS Breakthrough', image: breakthroughPhoto },
]
