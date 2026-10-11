import { useEffect, useRef } from 'react'
import './ByteArt.css'

type ByteArtProps = {
  /** Raw SVG markup, imported with `?raw` so its layers can be animated */
  svg: string
  /** Layer names (from Figma) of Byte's eyes, which follow the mouse */
  eyes?: string[]
  /** How far the eyes can move, in the SVG's own units */
  reach?: number
  className?: string
}

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Byte, drawn inline so Byte's eyes can follow the mouse around the page. */
export default function ByteArt({ svg, eyes = [], reach = 3, className = '' }: ByteArtProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || eyes.length === 0 || reducedMotion()) return

    const parts = eyes.flatMap((name) =>
      Array.from(root.querySelectorAll<SVGGraphicsElement>(`[data-name="${name}"]`)),
    )
    const svgEl = root.querySelector('svg')
    if (!svgEl || parts.length === 0) return
    for (const part of parts) {
      part.style.transition = 'transform 150ms ease-out'
    }

    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        // Aim from the middle of the eyes, so both look the same way
        const boxes = parts.map((part) => part.getBoundingClientRect())
        const cx = boxes.reduce((sum, b) => sum + b.left + b.width / 2, 0) / boxes.length
        const cy = boxes.reduce((sum, b) => sum + b.top + b.height / 2, 0) / boxes.length
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const distance = Math.hypot(dx, dy) || 1
        // Look fully sideways once the mouse is ~250px away
        const amount = Math.min(distance / 250, 1) * reach
        const x = (dx / distance) * amount
        const y = (dy / distance) * amount
        for (const part of parts) {
          part.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [eyes, reach])

  return (
    <span
      ref={ref}
      className={`byte-art ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
