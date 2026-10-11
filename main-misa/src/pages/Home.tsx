import Button from '../components/ui/Button.tsx'
import ByteArt from '../components/ui/ByteArt.tsx'
import Polaroid from '../components/ui/Polaroid.tsx'
import { UPDATES } from '../data/updates.ts'
import { EVENTS_PREVIEW } from '../data/eventsPreview.ts'
import teamPhoto from '../assets/photos/team.jpg'
import star from '../assets/star.svg'
import byteHead from '../assets/byte-head.svg?raw'
import byteLaptop from '../assets/byte-laptop.svg?raw'
import byteMegaphone from '../assets/byte-megaphone.svg'
import dashedArrow from '../assets/dashed-arrow.svg'
import './Home.css'

// Figma layer names of Byte's eyes in each drawing
const HEAD_EYES = ['Vector 422']
const LAPTOP_EYES = ['Vector 305', 'Vector 306']

export default function Home() {
  return (
    <>
      <section className="home-hero placeholder" aria-label="Hero">
        Hero image
      </section>

      <section className="home-about">
        <div className="container home-about__text">
          <h2 className="section-title">About MISA</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Button to="/about" variant="light" className="home-about__cta">
            Learn More
          </Button>
        </div>

        <div className="home-about__photos">
          <img className="home-about__star" src={star} alt="" />
          <Polaroid className="home-about__polaroid" />
          <Polaroid
            className="home-about__polaroid home-about__polaroid--center"
            src={teamPhoto}
            alt="The MISA team"
          />
          <Polaroid className="home-about__polaroid" />
          <ByteArt className="home-about__byte-head" svg={byteHead} eyes={HEAD_EYES} />
        </div>
      </section>

      <section className="home-updates">
        <div className="container">
          <h2 className="section-title">Updates</h2>
        </div>

        {UPDATES.length > 0 ? (
          <ul className="home-updates__track">
            {UPDATES.map((update, i) => (
              <li key={i} className="home-updates__card">
                {update.image ? (
                  <img className="home-updates__image" src={update.image} alt="" />
                ) : (
                  <div className="home-updates__image placeholder">Image</div>
                )}
                <h3>{update.title}</h3>
                <p>{update.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="container">
            <div className="home-updates__empty">
              <div>
                <h3>No current updates</h3>
                <p>
                  Any MISA updates will be posted here, check back later to see
                  what’s going on with MISA!
                </p>
              </div>
              <img src={byteMegaphone} alt="" />
            </div>
          </div>
        )}
      </section>

      <section className="container">
        <div className="home-byte">
          <h2 className="section-title">Meet Byte</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="home-byte__art" aria-hidden="true">
            <img className="home-byte__arrow" src={dashedArrow} alt="" />
            <ByteArt className="home-byte__mascot" svg={byteLaptop} eyes={LAPTOP_EYES} />
          </div>
        </div>
      </section>

      <section className="home-events">
        <div className="container">
          <h2 className="section-title">Our Events</h2>
          <ul className="home-events__grid">
            {EVENTS_PREVIEW.map((event) => (
              <li key={event.name} className="home-events__tile">
                {event.image ? (
                  <img src={event.image} alt={event.name} />
                ) : (
                  <div className="placeholder">{event.name}</div>
                )}
              </li>
            ))}
          </ul>
          <Button to="/events" className="home-events__cta">
            Learn More
          </Button>
        </div>
      </section>
    </>
  )
}
