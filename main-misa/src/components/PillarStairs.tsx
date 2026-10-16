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
// Invisible hover area covering a step's face and top, so the steps meet
// edge to edge with no gaps for the mouse to fall through
const HIT_AREA = 'M2 154.5L0 0L190.5 -33L588.5 114L399.5 149.5L399.5 300.5Z'
// Byte's feet, measured from the top-left of its image
const BYTE_FEET = { x: 157, y: 251 }
const GROUND = { x: 150, y: 2355 }
const HOP_MS = 200

function stepOrigin(i: number) {
  return { x: 270 + STEP_X * i, y: 2059 + STEP_Y * i }
}

/** Where Byte's feet land: the open right end of step i's top, or the ground. */
function feetPosition(step: number) {
  if (step < 0) return { ...GROUND, scale: 1 }
  const face = stepOrigin(step)
  return { x: face.x + 471, y: face.y + 117, scale: 0.62 }
}

type ByteState = { step: number; facing: 1 | -1; hops: number }

/**
 * The pillar events as a staircase, with Byte standing on the last event that's happened.
 * Hovering or focusing a step sends Byte hopping there, and Byte stays on it
 * until another step is hovered. Clicking a step jumps to its card.
 */
export default function PillarStairs({ events, linkedSlugs, restingStep }: PillarStairsProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [seen, setSeen] = useState(false)
  // The step under the mouse right now, which is highlighted
  const [hovered, setHovered] = useState<number | null>(null)
  // The last step hovered, which Byte stays on after the mouse leaves
  const [chosen, setChosen] = useState<number | null>(null)
  const [byte, setByte] = useState<ByteState>({ step: -1, facing: 1, hops: 0 })

  const target = chosen ?? (seen ? restingStep : -1)

  // Byte starts climbing the first time the stairs scroll into view
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  // Hop one step at a time towards the target, facing the way Byte is going.
  // Byte keeps facing that way after landing, and only turns when sent back.
  useEffect(() => {
    if (byte.step === target) return
    const timer = setTimeout(() => {
      setByte(({ step, hops }) => {
        const direction = target > step ? 1 : -1
        return { step: step + direction, facing: direction, hops: hops + 1 }
      })
    }, HOP_MS)
    return () => clearTimeout(timer)
  }, [byte.step, target])

  const hoverStep = (i: number) => {
    setHovered(i)
    setChosen(i)
  }

  const leaveStairs = () => setHovered(null)

  const top = stepOrigin(events.length - 1)
  const feet = feetPosition(byte.step)

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

      <g onPointerLeave={leaveStairs}>
        {/* Invisible ground before the first step, so Byte can be sent back down */}
        <rect
          className="stairs__hit"
          x="-10"
          y="2040"
          width="282"
          height="330"
          onPointerEnter={() => hoverStep(-1)}
        />
        {events.map((event, i) => {
          const face = stepOrigin(i)
          const isTop = i === events.length - 1
          const linked = linkedSlugs.includes(event.slug)
          const [first, ...rest] = event.name.split(' ')
          const twoLines = event.name.length > 12

          const step = (
            <g
              className={`stairs__step${i === hovered ? ' is-active' : ''}`}
              onPointerEnter={() => hoverStep(i)}
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
              <path className="stairs__hit" d={HIT_AREA} transform={`translate(${face.x} ${face.y})`} />
            </g>
          )

          return linked ? (
            <a
              key={event.slug}
              href={`#${event.slug}`}
              onFocus={() => hoverStep(i)}
              onBlur={leaveStairs}
            >
              {step}
            </a>
          ) : (
            <g key={event.slug}>{step}</g>
          )
        })}
      </g>

      {/* Flag at the top of the stairs */}
      <g className="stairs__flag" transform={`translate(${top.x + 343} ${top.y - 287})`}>
        <rect x="0" y="0" width="6" height="320" rx="3" />
        <path
          className="stairs__flag-cloth"
          d="M55.3 8.2C70.9 0.2 78.9-0.4 88 0.2L88 38.9C56.8 42.6 66.4 46.3 55.3 49.4C31.9 55.9 7 48.6 0 45.7L11.6 26.6L0 8.2C16.6 11.5 48.1 11.9 55.3 8.2Z"
          transform="translate(-85 9)"
        />
      </g>

      {/* Byte: moves to the step, hops on the way, and turns to face where it's going */}
      <g
        className="stairs__byte"
        style={{ transform: `translate(${feet.x}px, ${feet.y}px) scale(${feet.scale})` }}
        aria-hidden="true"
      >
        <g className={byte.hops === 0 ? undefined : `stairs__hop-${byte.hops % 2}`}>
          <g style={{ transform: `scaleX(${byte.facing})` }} className="stairs__turn">
            <image
              href={byteRunning}
              x={-BYTE_FEET.x}
              y={-BYTE_FEET.y}
              width="312"
              height="259"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
