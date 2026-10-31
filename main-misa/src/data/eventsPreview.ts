import connectPhoto from '../assets/photos/mis-connect/thumbs-up.jpg'
import linkPhoto from '../assets/photos/mis-link/office-tour.jpg'
import breakthroughPhoto from '../assets/photos/mis-breakthrough/winners.jpg'
import bootcampPhoto from '../assets/photos/mis-bootcamp/conversation.jpg'

// The four tiles in the Home page "Our Events" strip.
export type EventPreview = {
  name: string
  /** Optional image URL; a grey placeholder is shown when missing */
  image?: string
}

export const EVENTS_PREVIEW: EventPreview[] = [
  { name: 'MIS Connect', image: connectPhoto },
  { name: 'MIS Link', image: linkPhoto },
  { name: 'MIS Breakthrough', image: breakthroughPhoto },
  { name: 'MIS Bootcamp', image: bootcampPhoto },
]
