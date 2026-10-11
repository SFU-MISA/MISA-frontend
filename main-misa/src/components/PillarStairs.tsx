import { useEffect, useRef, useState } from 'react'
import type { PillarEvent } from '../data/pillarEvents.ts'
import { formatShortDate } from '../utils/eventDates.ts'
import byteRunning from '../assets/byte-running.svg'
import './PillarStairs.css'

type PillarStairsProps = {
  events: PillarEvent[]
  /** Slugs of events that have a card further down the page to link to */
  linkedSlugs: string[]
  /** Step Byte climbs to when the stairs scroll into view (-1 = stay at the bottom) */
  restingStep: number
}

// Geometry from the Figma "Events Page" staircase (frame 305:394), in its
// 1440px-wide coordinates. Each step sits STEP_X right and STEP_Y up from the
// one below it.
const STEP_X = 188.8
const STEP_Y = -187.3
const FACE = 'M0 0L399.5 149L399.5 300.5L2 154.5Z'
const TOP = 'M0 33L189.5 0L587.5 147L399.5 182.5Z'
const PLATFORM = 'M0 119L397.5 267L700 203L700 0Z'
const BYTE_START = { x: -7, y: 2104 }
// Byte's feet, measured from the top-left of its image
const BYTE_FEET = { x: 157, y: 251 }
const CLIMB_MS = 260

function stepOrigin(i: number) {
  return { x: 270 + STEP_X * i, y: 2059 + STEP_Y * i }
}

/** Moves Byte so its feet land on the open right end of step i's top. */
function byteTransform(step: number) {
  if (step < 0) return 'translate(0px, 0px) scale(1)'
  const face = stepOrigin(step)
  const x = face.x + 471 - (BYTE_START.x + BYTE_FEET.x)
  const y = face.y + 117 - (BYTE_START.y + BYTE_FEET.y)
  return `translate(${x}px, ${y}px) scale(0.62)`
}

/**
 * The pillar events as a staircase, with Byte climbing to the next event.
 * Hovering or focusing a step sends Byte there; clicking jumps to its card.
 */
export default function PillarStairs({ events, linkedSlugs, restingStep }: PillarStairsProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [byteStep, setByteStep] = useState(-1)

  const target = hovered ?? (inView ? restingStep : -1)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  // Climb (or hop down) one step at a time towards the target
  useEffect(() => {
    if (byteStep === target) return
    const timer = setTimeout(
      () => setByteStep((step) => step + Math.sign(target - step)),
      CLIMB_MS,
    )
    return () => clearTimeout(timer)
  }, [byteStep, target])

  const top = stepOrigin(events.length - 1)

  return (
    <svg
      ref={svgRef}
      className="stairs"
      viewBox="-10 1190 1530 1180"
      role="group"
      aria-label="Pillar events timeline"
    >
      {/* Floor edge running off to the right */}
      <path className="stairs__edge" d="M669 2360L1520 2174" />

      {events.map((event, i) => {
        const face = stepOrigin(i)
        const isTop = i === events.length - 1
        const linked = linkedSlugs.includes(event.slug)
        const [first, ...rest] = event.name.split(' ')
        const twoLines = event.name.length > 12

        const step = (
          <g
            className={`stairs__step${i === target ? ' is-active' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <path
              className="stairs__top"
              d={isTop ? PLATFORM : TOP}
              transform={`translate(${face.x + (isTop ? 1.5 : 1)} ${face.y + (isTop ? -119 : -33)})`}
            />
            <path className="stairs__face" d={FACE} transform={`translate(${face.x} ${face.y})`} />
            <text
              className="stairs__name"
              transform={`matrix(0.9374 0.3483 -0.3483 0.9374 ${face.x + 42} ${face.y + 24})`}
            >
              {twoLines ? (
                <>
                  <tspan x="0" y="50">{first}</tspan>
                  <tspan x="0" y="104">{rest.join(' ')}</tspan>
                </>
              ) : (
                <tspan x="0" y="80">{event.name}</tspan>
              )}
            </text>
            <text
              className="stairs__date"
              transform={`matrix(0.9793 -0.2026 0.2026 0.9793 ${face.x + 425} ${face.y + 196})`}
            >
              <tspan x="0" y="50">{formatShortDate(event)}</tspan>
            </text>
          </g>
        )

        return linked ? (
          <a
            key={event.slug}
            href={`#${event.slug}`}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            {step}
          </a>
        ) : (
          <g key={event.slug}>{step}</g>
        )
      })}

      {/* Flag at the top of the stairs */}
      <g className="stairs__flag" transform={`translate(${top.x + 343} ${top.y - 287})`}>
        <rect x="0" y="0" width="6" height="320" rx="3" />
        <path
          className="stairs__flag-cloth"
          d="M55.3 8.2C70.9 0.2 78.9-0.4 88 0.2L88 38.9C56.8 42.6 66.4 46.3 55.3 49.4C31.9 55.9 7 48.6 0 45.7L11.6 26.6L0 8.2C16.6 11.5 48.1 11.9 55.3 8.2Z"
          transform="translate(-85 9)"
        />
      </g>

      <image
        className="stairs__byte"
        href={byteRunning}
        x={BYTE_START.x}
        y={BYTE_START.y}
        width="312"
        height="259"
        style={{
          transform: byteTransform(byteStep),
          transformOrigin: `${BYTE_START.x + BYTE_FEET.x}px ${BYTE_START.y + BYTE_FEET.y}px`,
        }}
        aria-hidden="true"
      />
    </svg>
  )
}
