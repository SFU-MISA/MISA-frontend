import ExecGrid from '../components/ExecGrid.tsx'
import Button from '../components/ui/Button.tsx'
import PhotoWall from '../components/ui/PhotoWall.tsx'
import { OPENINGS } from '../data/openings.ts'
import { SOCIAL_POSTS } from '../data/socialPosts.ts'
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

export default function About() {
  return (
    <>
      <section className="container page-top">
        <h1 className="section-title" data-reveal>About Us</h1>
        <p className="about-intro" data-reveal>
          A team of 45 innovators, builders, and strategists that work together
          to turn MISA from a club to a true launchpad.
        </p>
      </section>

      <div className="about-photos" data-reveal>
        <PhotoWall photos={WALL_PHOTOS} />
      </div>

      <section className="container about-pillars" data-reveal="stagger">
        <article className="about-card">
          <h2 className="section-title">Mission</h2>
          <p>
            To build a high execution community where ambitious minds turn their
            ideas into reality.
          </p>
        </article>
        <article className="about-card">
          <h2 className="section-title">Vision</h2>
          <p>Help students become the next generation of leaders.</p>
        </article>
      </section>

      <section className="container about-socials">
        <div className="about-socials__header" data-reveal>
          <h2 className="section-title about-socials__title">
            Connect on our socials
          </h2>
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
        <ul className="about-socials__grid" data-reveal="stagger">
          {SOCIAL_POSTS.map((post, i) => (
            <li key={i}>
              <a className="about-socials__tile" href={post.url}>
                <img src={post.image} alt={post.alt} />
              </a>
            </li>
          ))}
        </ul>
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
