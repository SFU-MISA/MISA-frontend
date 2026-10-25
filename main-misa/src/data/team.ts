// Executive team shown on the About and Team pages.
export const TEAM_YEAR = '2026/2027'

export type ExecMember = {
  name: string
  role: string
  /** Optional headshot URL; a grey placeholder is shown when missing */
  photo?: string
}

// Headshots from Photoshoot #1, square-cropped. Names, roles and order follow
// the "Introducing" posts on @sfu_misa.
const headshots = import.meta.glob<string>('../assets/photos/headshots/*.jpg', {
  eager: true,
  import: 'default',
})
const headshot = (file: string) => headshots[`../assets/photos/headshots/${file}`]

export const EXEC_TEAM: ExecMember[] = [
  { name: 'Daniel Kim', role: 'President' },
  { name: 'Phineas Tran', role: 'Director of Finance', photo: headshot('phineas-tran.jpg') },
  {
    name: 'Shannon Tang',
    role: 'Director of Project Management',
    photo: headshot('shannon-tang.jpg'),
  },
  {
    name: 'Joshua Oladokun',
    role: 'Director of Corporate Relations',
    photo: headshot('joshua-oladokun.jpg'),
  },
  { name: 'Rodrigo Velazco', role: 'Director of Strategy', photo: headshot('rodrigo-velazco.jpg') },
  { name: 'Lauryn Yau', role: 'Co-Director of Design', photo: headshot('lauryn-yau.jpg') },
  { name: 'Areeba Ali', role: 'Co-Director of Design', photo: headshot('areeba-ali.jpg') },
  { name: 'Daniel Shi', role: 'Director of Web Design', photo: headshot('daniel-shi.jpg') },
  { name: 'Esther Cho', role: 'Director of Software Systems', photo: headshot('esther-cho.jpg') },
  { name: 'Tiensa Tran', role: 'Director of Marketing', photo: headshot('tiensa-tran.jpg') },
  { name: 'Emma Qiu', role: 'Director of Human Resources', photo: headshot('emma-qiu.jpg') },
  // In the photoshoot but not in the posts; names and roles still to come
  { name: 'Name', role: 'Title', photo: headshot('unknown-1.jpg') },
  { name: 'Name', role: 'Title', photo: headshot('unknown-2.jpg') },
]
