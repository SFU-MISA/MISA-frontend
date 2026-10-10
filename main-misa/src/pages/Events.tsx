import { useState } from 'react'
import Button from '../components/ui/Button.tsx'
import PhotoWall from '../components/ui/PhotoWall.tsx'
import { TICKETING_PORTAL_URL } from '../config/links.ts'
import { PILLAR_EVENTS } from '../data/pillarEvents.ts'
import './Events.css'

export default function Events() {
  const [selected, setSelected] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const event = PILLAR_EVENTS[selected]
  const testimonial = event.testimonials[testimonialIndex]

  const selectEvent = (i: number) => {
    setSelected(i)
    setTestimonialIndex(0)
  }

  return (
    <>
      <section className="events-hero placeholder" aria-label="Hero">
        Hero image
      </section>

      <section className="events-pillars">
        <div className="container">
          <h1 className="section-title">Pillar Events</h1>
        </div>
        <ul className="events-pillars__track">
          {PILLAR_EVENTS.map((pillar, i) => (
            <li key={pillar.name}>
              <button
                type="button"
                className={`events-pillars__card${i === selected ? ' is-selected' : ''}`}
                aria-pressed={i === selected}
                onClick={() => selectEvent(i)}
              >
                {pillar.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="container events-detail" aria-live="polite">
        <h2 className="section-title">{event.name}</h2>
        <div className="events-card">
          <h3>What is it?</h3>
          <p>{event.description}</p>
        </div>
      </section>

      <div className="events-photos">
        <PhotoWall photos={event.photos} />
      </div>

      {testimonial && (
        <section className="container events-testimonials">
          <h2 className="section-title">Testimonials</h2>
          <figure className="events-card">
            <h3>{testimonial.name}</h3>
            <blockquote>{testimonial.quote}</blockquote>
          </figure>
          {event.testimonials.length > 1 && (
            <div className="events-testimonials__dots">
              {event.testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === testimonialIndex ? 'is-active' : ''}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === testimonialIndex}
                  onClick={() => setTestimonialIndex(i)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="events-signup">
        <div className="container">
          <h2 className="section-title">Sign Up</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Button to={TICKETING_PORTAL_URL} className="events-signup__cta">
            Get Tickets
          </Button>
        </div>
      </section>
    </>
  )
}
