import { EXEC_TEAM, TEAM_YEAR } from '../data/team.ts'
import linkedinIcon from '../assets/linkedin.svg?raw'
import './ExecGrid.css'

/** "2026/2027 Executive Team" grid of headshots, names and roles. */
export default function ExecGrid() {
  return (
    <section className="container exec-grid" id="team">
      <h2 className="section-title" data-reveal>{TEAM_YEAR} Executive Team</h2>
      <ul className="exec-grid__list" data-reveal="stagger">
        {EXEC_TEAM.map((member, i) => (
          <li key={i} className="exec-grid__member">
            {member.linkedin ? (
              // Headshot links to their LinkedIn, with a small badge to show it
              <a
                className="exec-grid__link"
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
              >
                <Photo name={member.name} photo={member.photo} />
                <span
                  className="exec-grid__badge"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: linkedinIcon }}
                />
              </a>
            ) : (
              <Photo name={member.name} photo={member.photo} />
            )}
            <p className="exec-grid__name">{member.name}</p>
            <p className="exec-grid__role">{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Photo({ name, photo }: { name: string; photo?: string }) {
  return photo ? (
    <img className="exec-grid__photo" src={photo} alt={name} />
  ) : (
    <div className="exec-grid__photo exec-grid__photo--empty" />
  )
}
