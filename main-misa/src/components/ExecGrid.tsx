import { EXEC_TEAM, TEAM_YEAR } from '../data/team.ts'
import './ExecGrid.css'

/** "2026/2027 Executive Team" grid of headshots, names and roles. */
export default function ExecGrid() {
  return (
    <section className="container exec-grid" id="team">
      <h2 className="section-title" data-reveal>{TEAM_YEAR} Executive Team</h2>
      <ul className="exec-grid__list" data-reveal="stagger">
        {EXEC_TEAM.map((member, i) => (
          <li key={i} className="exec-grid__member">
            {member.photo ? (
              <img className="exec-grid__photo" src={member.photo} alt={member.name} />
            ) : (
              <div className="exec-grid__photo exec-grid__photo--empty" />
            )}
            <p className="exec-grid__name">{member.name}</p>
            <p className="exec-grid__role">{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
