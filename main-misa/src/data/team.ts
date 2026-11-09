// Executive team shown on the About and Team pages.
export const TEAM_YEAR = '2026/2027'

export type ExecMember = {
  name: string
  role: string
  /** Optional headshot URL; a grey placeholder is shown when missing */
  photo?: string
  /** Optional LinkedIn profile URL; when set, the headshot links to it */
  linkedin?: string
}

// Headshots from Photoshoot #1, square-cropped. Names, roles and order follow
// the "Introducing" posts on @sfu_misa.
const headshots = import.meta.glob<string>('../assets/photos/headshots/*.jpg', {
  eager: true,
  import: 'default',
})
const headshot = (file: string) => headshots[`../assets/photos/headshots/${file}`]

export const EXEC_TEAM: ExecMember[] = [
  {
    name: 'Daniel Kim',
    role: 'President',
    photo: headshot('daniel-kim.jpg'),
    linkedin: 'https://www.linkedin.com/in/-danielkim/',
  },
  {
    name: 'Victor Yu',
    role: 'Co-Vice President',
    photo: headshot('victor-yu.jpg'),
    linkedin: 'https://www.linkedin.com/in/victoryuu/',
  },
  {
    name: 'Cloris Lau',
    role: 'Co-Vice President',
    photo: headshot('cloris-lau.jpg'),
    linkedin: 'https://www.linkedin.com/in/clorislau/',
  },
  {
    name: 'Phineas Tran',
    role: 'Director of Finance',
    photo: headshot('phineas-tran.jpg'),
    linkedin: 'https://www.linkedin.com/in/phineastran/',
  },
  {
    name: 'Daniel Shi',
    role: 'Director of Web Development',
    photo: headshot('daniel-shi.jpg'),
    linkedin: 'https://www.linkedin.com/in/danielshi101',
  },
  {
    name: 'Esther Cho',
    role: 'Director of Software Systems',
    photo: headshot('esther-cho.jpg'),
    linkedin: 'https://www.linkedin.com/in/esthercho04/',
  },
  {
    name: 'Shannon Tang',
    role: 'Director of Project Management',
    photo: headshot('shannon-tang.jpg'),
    linkedin: 'https://www.linkedin.com/in/shannontango/',
  },
  {
    name: 'Joshua Oladokun',
    role: 'Director of Corporate Relations',
    photo: headshot('joshua-oladokun.jpg'),
    linkedin: 'https://www.linkedin.com/in/joshua-oladokun-47aab0303/',
  },
  {
    name: 'Rodrigo Velazco',
    role: 'Director of Strategy',
    photo: headshot('rodrigo-velazco.jpg'),
    linkedin: 'https://www.linkedin.com/in/rodrigovelazco/',
  },
  {
    name: 'Lauryn Yau',
    role: 'Co-Director of Design',
    photo: headshot('lauryn-yau.jpg'),
    linkedin: 'https://www.linkedin.com/in/laurynyau/',
  },
  {
    name: 'Areeba Ali',
    role: 'Co-Director of Design',
    photo: headshot('areeba-ali.jpg'),
    linkedin: 'https://www.linkedin.com/in/ali-areeba/',
  },
  
  {
    name: 'Tiensa Tran',
    role: 'Director of Marketing',
    photo: headshot('tiensa-tran.jpg'),
    linkedin: 'https://www.linkedin.com/in/tiensatran/',
  },
  {
    name: 'Emma Qiu',
    role: 'Director of Human Resources',
    photo: headshot('emma-qiu.jpg'),
    linkedin: 'https://www.linkedin.com/in/emqi/',
  },
]
