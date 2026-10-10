import ExecGrid from '../components/ExecGrid.tsx'
import Button from '../components/ui/Button.tsx'
import PhotoWall from '../components/ui/PhotoWall.tsx'
import { OPENINGS } from '../data/openings.ts'
import './About.css'

export default function About() {
  return (
    <>
      <section className="container page-top">
        <h1 className="section-title">About Us</h1>
        <p className="about-intro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </section>

      <div className="about-photos">
        <PhotoWall />
      </div>

      <section className="container about-pillars">
        <article className="about-card">
          <h2 className="section-title">Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </article>
        <article className="about-card">
          <h2 className="section-title">Vision</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </article>
      </section>

      <section className="container about-socials">
        <h2 className="section-title about-socials__title">
          Connect on our socials
        </h2>
        <ul className="about-socials__grid">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className="about-socials__tile placeholder" />
          ))}
        </ul>
      </section>

      <ExecGrid />

      <section className="about-join">
        <div className="container">
          <h2 className="section-title">Join our team!</h2>
          {OPENINGS.length > 0 ? (
            <ul className="about-join__list">
              {OPENINGS.map((opening) => (
                <li key={opening.role} className="about-card">
                  <h3>{opening.role}</h3>
                  <p>{opening.description}</p>
                  <Button to={opening.applyUrl}>Apply</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="about-join__empty">
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
