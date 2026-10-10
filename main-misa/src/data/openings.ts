// "Join our team!" on the About page. Leave empty to show the
// "Hiring opportunities will be posted here" message from the Figma.
export type Opening = {
  role: string
  description: string
  /** Link to the application form */
  applyUrl: string
}

export const OPENINGS: Opening[] = []
