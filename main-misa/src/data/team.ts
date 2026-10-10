// Executive team shown on the About and Team pages.
export const TEAM_YEAR = '2026/2027'

export type ExecMember = {
  name: string
  role: string
  /** Optional headshot URL; a grey placeholder is shown when missing */
  photo?: string
}

export const EXEC_TEAM: ExecMember[] = Array.from({ length: 12 }, () => ({
  name: 'Name',
  role: 'Title',
}))
