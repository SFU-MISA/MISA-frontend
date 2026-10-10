// The "Pillar Events" on the Events page. Picking a card shows that event's
// description, photos and testimonials underneath.
export type Testimonial = {
  name: string
  quote: string
}

export type PillarEvent = {
  name: string
  description: string
  /** Photo URLs for the sliding photo wall; placeholders shown when empty */
  photos: string[]
  testimonials: Testimonial[]
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const placeholderTestimonials: Testimonial[] = [
  { name: 'Name', quote: LOREM },
  { name: 'Name', quote: LOREM },
  { name: 'Name', quote: LOREM },
]

export const PILLAR_EVENTS: PillarEvent[] = [
  { name: 'MIS Connect', description: LOREM, photos: [], testimonials: placeholderTestimonials },
  { name: 'MIS Link', description: LOREM, photos: [], testimonials: placeholderTestimonials },
  { name: 'MIS Breakthrough', description: LOREM, photos: [], testimonials: placeholderTestimonials },
  { name: 'MIS Bootcamp', description: LOREM, photos: [], testimonials: placeholderTestimonials },
]
