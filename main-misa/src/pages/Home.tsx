import type { CSSProperties } from 'react'
import Button from '../components/ui/Button.tsx'
import ByteArt from '../components/ui/ByteArt.tsx'
import Polaroid from '../components/ui/Polaroid.tsx'
import { usePlayOnView } from '../hooks/usePlayOnView.ts'
import { UPDATES } from '../data/updates.ts'
import { EVENTS_PREVIEW } from '../data/eventsPreview.ts'
import {
  IN_KIND_SPONSORS,
  MONETARY_SPONSORS,
  SPONSORS_EVENT,
  type Sponsor,
} from '../data/sponsors.ts'
import teamPhoto from '../assets/photos/team.jpg'
// Placeholder until a proper hero shot is picked
import heroPhoto from '../assets/photos/hero/home.jpg'
import connectGroupPhoto from '../assets/photos/mis-connect/group-backdrop.jpg'
import connectHeartsPhoto from '../assets/photos/mis-connect/hand-hearts.jpg'
import star from '../assets/star.svg'
import byteHead from '../assets/byte-head.svg?raw'
import byteLaptop from '../assets/byte-laptop.svg?raw'
import byteMegaphone from '../assets/byte-megaphone.svg'
import dashedArrow from '../assets/dashed-arrow.svg'
import './Home.css'

// Figma layer names of Byte's eyes. Only the front-facing Byte follows the
// mouse; on the side-on drawings a moving eye looks odd.
const LAPTOP_EYES = ['Vector 305', 'Vector 306']

// With only a few logos, one pass of the carousel is narrower than a wide
// screen and the loop shows a gap, so the logos repeat until there are at
// least this many per pass
const CAROUSEL_MIN_CARDS = 16
const CAROUSEL_REPEATS = Math.max(
  1,
  Math.ceil(CAROUSEL_MIN_CARDS / Math.max(IN_KIND_SPONSORS.length, 1)),
)

export default function Home() {
  const photosRef = usePlayOnView<HTMLDivElement>()
  const byteRef = usePlayOnView<HTMLDivElement>()

  return (
    <>
      <section className="home-hero" aria-label="Hero">
        <img className="hero-image" src={heroPhoto} alt="Students listening to the panel at MIS Connect" />
      </section>

      <section className="home-about">
        <div className="container home-about__text" data-reveal="stagger">
          <h2 className="section-title">About MISA</h2>
          <p>
            Bridging the gap between students and the business technology
            industry.
          </p>
          <Button to="/about" variant="light" className="home-about__cta">
            Learn More
          </Button>
        </div>

        <div className="home-about__photos" ref={photosRef} data-reveal="stagger">
          <img className="home-about__star" src={star} alt="" />
          <Polaroid
            className="home-about__polaroid"
            src={connectGroupPhoto}
            alt="Students at the MISA photo backdrop at MIS Connect"
          />
          <Polaroid
            className="home-about__polaroid home-about__polaroid--center"
            src={teamPhoto}
            alt="The MISA team"
          />
          <Polaroid
            className="home-about__polaroid"
            src={connectHeartsPhoto}
            alt="Friends making hand hearts at MIS Connect"
          />
          <ByteArt className="home-about__byte-head" svg={byteHead} />
        </div>
      </section>

      <section className="home-updates">
        <div className="container">
          <h2 className="section-title" data-reveal>Updates</h2>
        </div>

        {UPDATES.length > 0 ? (
          <ul className="home-updates__track" data-reveal="stagger">
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
            <div className="home-updates__empty" data-reveal>
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
        <div className="home-byte" ref={byteRef} data-reveal>
          <h2 className="section-title">Meet Byte</h2>
          <p>The official mascot of MISA.</p>
          <p className="home-byte__tagline">Curious. Small. Innovative.</p>
          <p>
            Byte loves turning big ideas into real projects, proving you don’t
            need a massive footprint to make an impact.
          </p>
          <div className="home-byte__art" aria-hidden="true">
            <img className="home-byte__arrow" src={dashedArrow} alt="" />
            <ByteArt className="home-byte__mascot" svg={byteLaptop} eyes={LAPTOP_EYES} />
          </div>
        </div>
      </section>

      <section className="home-events">
        <div className="container">
          <h2 className="section-title" data-reveal>Our Events</h2>
          <ul className="home-events__grid" data-reveal="stagger">
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

      <section className="home-sponsors" aria-labelledby="home-sponsors-title">
        <div className="container">
          <h2 id="home-sponsors-title" className="section-title" data-reveal>
            Our Sponsors
          </h2>
          <p className="home-sponsors__intro" data-reveal>
            A big thank you to the partners who made {SPONSORS_EVENT} possible
            and keep supporting our students.
          </p>

          <ul className="home-sponsors__featured" data-reveal="stagger">
            {MONETARY_SPONSORS.map((sponsor) => (
              <li key={sponsor.name}>
                <SponsorCard sponsor={sponsor} featured />
              </li>
            ))}
          </ul>
        </div>

        {/* The list is drawn twice so the loop has no gap; the copy and any
            repeats are hidden from screen readers and skipped by Tab */}
        <div
          className="home-sponsors__viewport"
          data-reveal
          style={
            {
              '--sponsor-count': IN_KIND_SPONSORS.length * CAROUSEL_REPEATS,
            } as CSSProperties
          }
        >
          <div className="home-sponsors__track">
            {[false, true].map((isCopy) => (
              <ul
                key={String(isCopy)}
                className="home-sponsors__list"
                aria-hidden={isCopy || undefined}
              >
                {Array.from({ length: CAROUSEL_REPEATS }, (_, repeat) =>
                  IN_KIND_SPONSORS.map((sponsor) => (
                    <li
                      key={`${repeat}-${sponsor.name}`}
                      className={repeat > 0 ? 'home-sponsors__repeat' : undefined}
                      aria-hidden={(!isCopy && repeat > 0) || undefined}
                    >
                      <SponsorCard sponsor={sponsor} hidden={isCopy || repeat > 0} />
                    </li>
                  )),
                )}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

type SponsorCardProps = {
  sponsor: Sponsor
  /** Larger card, for monetary sponsors */
  featured?: boolean
  /** The carousel's repeated copy: hidden from screen readers and Tab */
  hidden?: boolean
}

/** A sponsor's logo, or their name until a logo is added */
function SponsorCard({ sponsor, featured = false, hidden = false }: SponsorCardProps) {
  const className = [
    'home-sponsors__card',
    featured && 'home-sponsors__card--featured',
    sponsor.logo && 'home-sponsors__card--logo',
  ]
    .filter(Boolean)
    .join(' ')
  const content = sponsor.logo ? (
    <img src={sponsor.logo} alt={hidden ? '' : sponsor.name} />
  ) : (
    sponsor.name
  )

  if (!sponsor.url) return <div className={className}>{content}</div>

  return (
    <a
      className={`${className} home-sponsors__card--link`}
      href={sponsor.url}
      target="_blank"
      rel="noreferrer"
      tabIndex={hidden ? -1 : undefined}
      aria-label={hidden ? undefined : `${sponsor.name} website (opens in a new tab)`}
    >
      {content}
      <span className="home-sponsors__external" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}
