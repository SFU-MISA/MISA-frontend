import type { PillarEvent } from '../data/pillarEvents.ts'

function toDate(date: string, time = '00:00') {
  const [y, m, d] = date.split('-').map(Number)
  const [h, min] = time.split(':').map(Number)
  return new Date(y, m - 1, d, h, min)
}

/** "Fri Oct 23" */
export function formatShortDate(event: PillarEvent) {
  return toDate(event.date).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).replaceAll(',', '')
}

function formatTime(event: PillarEvent, time: string) {
  return toDate(event.date, time)
    .toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })
    .replace(':00', '')
    .replace(/\s?([ap])\.?m\.?/i, (_, ap: string) => `${ap.toUpperCase()}M`)
}

/** "Fri Oct 23 | 6PM - 8PM" */
export function formatDateTime(event: PillarEvent) {
  return `${formatShortDate(event)} | ${formatTime(event, event.startTime)} - ${formatTime(event, event.endTime)}`
}

/** Splits events into the next one coming up and the ones after it. Past events are dropped. */
export function splitUpcoming(events: PillarEvent[], now = new Date()) {
  const later = events
    .filter((event) => toDate(event.date, event.endTime) >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
  return { upcoming: later[0], future: later.slice(1) }
}

/** A data: URL for an .ics file, so "Add to calendar" works with any calendar app. */
export function calendarFileUrl(event: PillarEvent) {
  const stamp = (time: string) =>
    `${event.date.replaceAll('-', '')}T${time.replace(':', '')}00`
  const escape = (text: string) => text.replace(/([,;\\])/g, '\\$1')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SFU MISA//Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.slug}-${event.date}@sfumisa.ca`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=America/Vancouver:${stamp(event.startTime)}`,
    `DTEND;TZID=America/Vancouver:${stamp(event.endTime)}`,
    `SUMMARY:${escape(event.name)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(event.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}
