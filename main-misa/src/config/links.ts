// External URLs used across the site.

// Ticketing portal: our Stripe checkout, starting from its event list
export const TICKETING_PORTAL_URL = 'https://portal.misasfu.com'

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

export const LINKEDIN_URL = 'https://www.linkedin.com/company/sfumisa/'

export const NEWSLETTER_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdlTyzGJPON_YUvnWgdUkbC0yXSfcfQNh12okgz03vxb-0ZKQ/viewform'
