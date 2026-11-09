import type { PillarEvent } from '../data/pillarEvents.ts'

function toDate(date: string, time = '00:00') {
  const [y, m, d] = date.split('-').map(Number)
  const [h, min] = time.split(':').map(Number)
  return new Date(y, m - 1, d, h, min)
}

/** Shown in place of the date while an event's date is still being decided */
export const DATE_TBD = 'Coming Soon'

/** "Fri Oct 23", or "Coming Soon" when there's no date yet */
export function formatShortDate(event: PillarEvent) {
  if (!event.date) return DATE_TBD
  return toDate(event.date).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).replaceAll(',', '')
}

function formatTime(date: string, time: string) {
  return toDate(date, time)
    .toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })
    .replace(':00', '')
    .replace(/\s?([ap])\.?m\.?/i, (_, ap: string) => `${ap.toUpperCase()}M`)
}

/** "Fri Oct 23 | 6PM - 8PM", or "Coming Soon" when there's no date yet */
export function formatDateTime(event: PillarEvent) {
  const { date, startTime, endTime } = event
  if (!date) return DATE_TBD
  if (!startTime || !endTime) return formatShortDate(event)
  return `${formatShortDate(event)} | ${formatTime(date, startTime)} - ${formatTime(date, endTime)}`
}

/**
 * Splits events into the next one coming up and the ones after it. Past events
 * are dropped; events without a date yet come after the dated ones, in list order.
 */
export function splitUpcoming(events: PillarEvent[], now = new Date()) {
  const dated = events
    .filter((event) => event.date && toDate(event.date, event.endTime) >= now)
    .sort((a, b) => a.date!.localeCompare(b.date!))
  const later = [...dated, ...events.filter((event) => !event.date)]
  return { upcoming: later[0], future: later.slice(1) }
}

/** A data: URL for an .ics file, so "Add to calendar" works with any calendar app. */
export function calendarFileUrl(event: PillarEvent & { date: string }) {
  const stamp = (time = '00:00') =>
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
