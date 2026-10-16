import Button from '../components/ui/Button.tsx'
import PillarStairs from '../components/PillarStairs.tsx'
import { TICKETING_PORTAL_URL } from '../config/links.ts'
import { PILLAR_EVENTS, type PillarEvent } from '../data/pillarEvents.ts'
import { calendarFileUrl, formatDateTime, splitUpcoming } from '../utils/eventDates.ts'
import calendarIcon from '../assets/calendar-add.svg?raw'
import './Events.css'

function EventCard({ event, action }: { event: PillarEvent; action: 'tickets' | 'calendar' }) {
  return (
    <article className="event-card" id={event.slug}>
      <div className="event-card__text">
        <h3>{event.name}</h3>
        <p className="event-card__when">{formatDateTime(event)}</p>
        <p>{event.description}</p>
        {action === 'tickets' ? (
          <Button to={TICKETING_PORTAL_URL} className="event-card__cta">
            Buy Ticket
          </Button>
        ) : (
          <Button
            to={calendarFileUrl(event)}
            download={`${event.slug}.ics`}
            className="event-card__cta"
          >
            <span
              className="event-card__icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: calendarIcon }}
            />
            Add to calendar
          </Button>
        )}
      </div>
      {event.image ? (
        <img className="event-card__image" src={event.image} alt="" />
      ) : (
        <div className="event-card__image placeholder">Photo</div>
      )}
    </article>
  )
}

export default function Events() {
  const { upcoming, future } = splitUpcoming(PILLAR_EVENTS)
  const linkedSlugs = (upcoming ? [upcoming, ...future] : []).map((event) => event.slug)
  // Byte waits on the last event that's already happened, just below the next one
  const restingStep = upcoming ? PILLAR_EVENTS.indexOf(upcoming) - 1 : PILLAR_EVENTS.length - 1

  return (
    <>
      <section className="events-hero placeholder" aria-label="Hero">
        Hero image
      </section>

      <section className="events-pillars">
        <div className="container">
          <h1 className="section-title">Pillar Events</h1>
        </div>
        <PillarStairs
          events={PILLAR_EVENTS}
          linkedSlugs={linkedSlugs}
          restingStep={restingStep}
        />
      </section>

      <section className="event-folder event-folder--upcoming">
        <h2 className="event-folder__tab section-title">Upcoming Event</h2>
        <div className="event-folder__panel">
          {upcoming ? (
            <EventCard event={upcoming} action="tickets" />
          ) : (
            <p className="event-folder__empty">
              No upcoming events right now. Check back another time!
            </p>
          )}
        </div>
      </section>

      {future.length > 0 && (
        <section className="event-folder event-folder--future">
          <h2 className="event-folder__tab section-title">Future Events</h2>
          <div className="event-folder__panel">
            {future.map((event) => (
              <EventCard key={event.slug} event={event} action="calendar" />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
