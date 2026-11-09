import { EXEC_TEAM, TEAM_YEAR } from '../data/team.ts'
import linkedinIcon from '../assets/linkedin.svg?raw'
import './ExecGrid.css'

/** "2026/2027 Executive Team" grid of headshots, names and roles. */
export default function ExecGrid() {
  return (
    <section className="container exec-grid" id="team">
      <h2 className="section-title exec-grid__title" data-reveal>
        <span className="exec-grid__year">{TEAM_YEAR}</span> Executive Team
      </h2>
      <ul className="exec-grid__list" data-reveal="stagger">
        {EXEC_TEAM.map((member, i) => (
          <li key={i} className="exec-grid__member">
            <div className="exec-grid__frame">
              <Photo name={member.name} photo={member.photo} />
              {member.linkedin && (
                // Only the corner badge is a link, so the photo itself stays still
                <a
                  className="exec-grid__badge"
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                  title="LinkedIn"
                >
                  <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: linkedinIcon }} />
                </a>
              )}
            </div>
            <p className="exec-grid__name">{member.name}</p>
            <p className="exec-grid__role">{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Photo({ name, photo }: { name: string; photo?: string }) {
  // The clip keeps the hover zoom inside the rounded corners
  return (
    <div className="exec-grid__clip">
      {photo ? (
        <img className="exec-grid__photo" src={photo} alt={name} />
      ) : (
        <div className="exec-grid__photo exec-grid__photo--empty" />
      )}
    </div>
  )
}
