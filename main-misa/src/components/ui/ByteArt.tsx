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

// How quickly the eyes catch up with where they're looking. Higher is lazier.
const SMOOTHING_MS = 110
// Eyes move less up and down than side to side
const VERTICAL = 0.7
// After this long without the mouse moving, Byte's eyes drift back to the middle
const IDLE_MS = 2500
// On touch screens Byte glances at a tap for this long
const TAP_LOOK_MS = 1500

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Byte, drawn inline so Byte's eyes can follow the mouse (or a tap, on phones). */
export default function ByteArt({ svg, eyes = [], reach = 3, className = '' }: ByteArtProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || eyes.length === 0 || reducedMotion()) return

    const parts = eyes.flatMap((name) =>
      Array.from(root.querySelectorAll<SVGGraphicsElement>(`[data-name="${name}"]`)),
    )
    if (parts.length === 0) return

    const look = { x: 0, y: 0 } // where the eyes are heading
    const now = { x: 0, y: 0 } // where they are this frame
    let frame = 0
    let last = 0
    let idleTimer = 0
    let visible = false

    // Ease towards the target each frame, like a soft spring with no bounce
    const tick = (time: number) => {
      const dt = last ? time - last : 16
      last = time
      const k = 1 - Math.exp(-dt / SMOOTHING_MS)
      now.x += (look.x - now.x) * k
      now.y += (look.y - now.y) * k
      for (const part of parts) {
        part.style.transform = `translate(${now.x.toFixed(2)}px, ${now.y.toFixed(2)}px)`
      }
      if (Math.abs(look.x - now.x) + Math.abs(look.y - now.y) > 0.01) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const start = () => {
      if (frame) return
      last = 0
      frame = requestAnimationFrame(tick)
    }

    const lookAt = (x: number, y: number, holdMs: number) => {
      // Aim from the middle of the eyes, so both look the same way
      const boxes = parts.map((part) => part.getBoundingClientRect())
      const cx = boxes.reduce((sum, b) => sum + b.left + b.width / 2, 0) / boxes.length
      const cy = boxes.reduce((sum, b) => sum + b.top + b.height / 2, 0) / boxes.length
      const dx = x - cx
      const dy = y - cy
      const distance = Math.hypot(dx, dy) || 1
      // Ease into the edge of the eye instead of stopping at a hard limit
      const amount = Math.tanh(distance / 300) * reach
      look.x = (dx / distance) * amount
      look.y = (dy / distance) * amount * VERTICAL
      start()

      clearTimeout(idleTimer)
      idleTimer = window.setTimeout(relax, holdMs)
    }

    const relax = () => {
      look.x = 0
      look.y = 0
      start()
    }

    const onMove = (e: PointerEvent) => {
      if (visible && e.pointerType === 'mouse') lookAt(e.clientX, e.clientY, IDLE_MS)
    }
    const onTap = (e: PointerEvent) => {
      if (visible && e.pointerType !== 'mouse') lookAt(e.clientX, e.clientY, TAP_LOOK_MS)
    }

    // Only watch the mouse while Byte is on screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) relax()
    })
    observer.observe(root)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onTap)
    document.documentElement.addEventListener('pointerleave', relax)
    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onTap)
      document.documentElement.removeEventListener('pointerleave', relax)
      cancelAnimationFrame(frame)
      clearTimeout(idleTimer)
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
