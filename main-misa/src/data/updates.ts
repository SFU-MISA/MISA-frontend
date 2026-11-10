import misLinkImage from '../assets/updates/mis-link.webp'
import newWebsiteImage from '../assets/updates/new-website.jpg'

// Home page "Updates" cards. Leave the array empty to show the
// "No current updates" state from the Figma.
export type Update = {
  title: string
  body: string
  /** Optional image URL; a grey placeholder is shown when missing */
  image?: string
}

export const UPDATES: Update[] = [
  {
    title: 'Next Up: MIS Link',
    body: 'Step out of the lecture hall and into offices of today’s leading firms with MISA’s second event series this year to network with professionals and other students!',
    image: misLinkImage,
  },
  {
    title: 'New look here at MISA',
    body: 'Say hello to our brand new website! Following our rebrand this year, we’ve given our digital home a new look so you can check out our latest updates, work, and upcoming events!',
    image: newWebsiteImage,
  },
]
