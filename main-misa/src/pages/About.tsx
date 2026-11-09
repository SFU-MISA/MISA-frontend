import ExecGrid from '../components/ExecGrid.tsx'
import Button from '../components/ui/Button.tsx'
import PhotoWall from '../components/ui/PhotoWall.tsx'
import { OPENINGS } from '../data/openings.ts'
import { INSTAGRAM_URL, LINKEDIN_URL, NEWSLETTER_URL } from '../config/links.ts'
import instagramIcon from '../assets/instagram.svg?raw'
import linkedinIcon from '../assets/linkedin.svg?raw'
import mailIcon from '../assets/mail.svg?raw'
import './About.css'

// Every photo in assets/photos/wall, in filename order
const WALL_PHOTOS = Object.values(
  import.meta.glob<string>('../assets/photos/wall/*.jpg', {
    eager: true,
    import: 'default',
  }),
)

// The strips use small tiles, so list the photos twice to keep each strip
// wider than the screen while it loops
const STRIP_PHOTOS = [...WALL_PHOTOS, ...WALL_PHOTOS]

export default function About() {
  return (
    <>
      {/* Landing: photos / title and intro / photos, all on the first screen */}
      <section className="about-hero page-top">
        <div className="about-photos" data-reveal>
          <PhotoWall photos={STRIP_PHOTOS} direction="left" />
        </div>
        <div className="container" data-reveal>
          <h1 className="section-title">About Us</h1>
          <p className="about-intro">
            A team of 50 innovators, builders, and strategists. These are the
            people working hard behind the scenes to deliver you the best
            events and projects.
          </p>
        </div>
        <div className="about-photos" data-reveal>
          <PhotoWall photos={STRIP_PHOTOS} direction="right" />
        </div>
      </section>

      <section className="container about-pillars" data-reveal="stagger">
        <article className="about-card">
          <h2 className="section-title">Mission</h2>
          <p>
            Be a space where innovation is possible. We aim to bring students a
            wide range of real, hands-on experiences that turn their skills into
            projects in a multidisciplinary setting.
          </p>
        </article>
        <article className="about-card">
          <h2 className="section-title">Vision</h2>
          <p>
            To redefine what student communities can achieve and empower the
            next generation of leaders and professionals.
          </p>
        </article>
      </section>

      <section className="container about-socials">
        <div className="about-socials__header" data-reveal>
          <div className="about-socials__text">
            <h2 className="section-title about-socials__title">
              Connect on our socials
            </h2>
            <p>Stay in the loop on upcoming events, recaps and opportunities.</p>
          </div>
          <div className="about-socials__links">
            <a className="about-socials__icon" href={INSTAGRAM_URL} aria-label="Instagram">
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: instagramIcon }} />
            </a>
            <a className="about-socials__icon" href={LINKEDIN_URL} aria-label="LinkedIn">
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: linkedinIcon }} />
            </a>
            <a className="about-socials__newsletter" href={NEWSLETTER_URL}>
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: mailIcon }} />
              Join our newsletter
            </a>
          </div>
        </div>
      </section>

      <ExecGrid />

      <section className="about-join">
        <div className="container">
          <h2 className="section-title" data-reveal>Join our team!</h2>
          {OPENINGS.length > 0 ? (
            <ul className="about-join__list" data-reveal="stagger">
              {OPENINGS.map((opening) => (
                <li key={opening.role} className="about-card">
                  <h3>{opening.role}</h3>
                  <p>{opening.description}</p>
                  <Button to={opening.applyUrl}>Apply</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="about-join__empty" data-reveal>
              Hiring opportunities will be posted here.
              <br />
              Check back another time!
            </p>
          )}
        </div>
      </section>
    </>
  )
}
