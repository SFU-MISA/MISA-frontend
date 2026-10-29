import { INSTAGRAM_URL } from '../config/links.ts'
import audience from '../assets/photos/wall/connect-audience.jpg'
import panelist from '../assets/photos/wall/connect-panelist-laughing.jpg'
import props from '../assets/photos/wall/connect-props.jpg'
import networking from '../assets/photos/wall/connect-networking-student.jpg'
import keynote from '../assets/photos/wall/connect-keynote.jpg'

// The five square tiles under "Connect on our socials" on the About page.
// For now these are MIS Connect photos linking to the Instagram profile; swap
// in recent posts by giving each tile the post's image and URL.
export type SocialPost = {
  image: string
  /** Where the tile links to */
  url: string
  alt: string
}

export const SOCIAL_POSTS: SocialPost[] = [
  { image: audience, url: INSTAGRAM_URL, alt: 'The audience at MIS Connect' },
  { image: panelist, url: INSTAGRAM_URL, alt: 'A panelist laughing at MIS Connect' },
  { image: props, url: INSTAGRAM_URL, alt: 'Friends with MISA props at MIS Connect' },
  { image: networking, url: INSTAGRAM_URL, alt: 'A student networking at MIS Connect' },
  { image: keynote, url: INSTAGRAM_URL, alt: 'The keynote speaker at MIS Connect' },
]
