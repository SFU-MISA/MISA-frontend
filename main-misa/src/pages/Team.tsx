import ExecGrid from '../components/ExecGrid.tsx'
import Seo from '../components/Seo.tsx'

// The footer links to "Team"; this shows the same exec grid as About.
export default function Team() {
  return (
    <div className="page-top">
      <Seo
        title="Our Team · MISA SFU"
        description="Meet the executive team behind MISA, SFU's Management Information Systems Association."
        path="/team"
      />
      <ExecGrid />
    </div>
  )
}
