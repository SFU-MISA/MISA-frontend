// The four tiles in the Home page "Our Events" strip.
export type EventPreview = {
  name: string
  /** Optional image URL; a grey placeholder is shown when missing */
  image?: string
}

export const EVENTS_PREVIEW: EventPreview[] = [
  { name: 'MIS Connect' },
  { name: 'MIS Link' },
  { name: 'MIS Breakthrough' },
  { name: 'MIS Bootcamp' },
]
