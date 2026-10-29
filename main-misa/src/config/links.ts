// External URLs used across the site. The portal URL can be overridden per
// environment with VITE_TICKETING_PORTAL_URL (e.g. in .env.local).
export const TICKETING_PORTAL_URL =
  import.meta.env.VITE_TICKETING_PORTAL_URL ?? 'https://portal.sfumisa.ca'

// Matches the FINAL Figma frames: the nav shows About + Events, and the
// footer also links to Team.
export const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
] as const

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { to: '/team', label: 'Team' },
] as const

export const INSTAGRAM_URL = 'https://www.instagram.com/sfu_misa/'

// "Connect on our socials" buttons on the About page
export const SOCIAL_LINKS = [
  { to: INSTAGRAM_URL, label: 'Instagram' },
  { to: 'https://www.linkedin.com/company/sfumisa/', label: 'LinkedIn' },
  {
    to: 'https://docs.google.com/forms/d/e/1FAIpQLSdlTyzGJPON_YUvnWgdUkbC0yXSfcfQNh12okgz03vxb-0ZKQ/viewform',
    label: 'Join our newsletter',
  },
] as const
