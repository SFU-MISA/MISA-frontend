import { useEffect, useRef } from 'react'

/**
 * Phones can't hover, so hover-only micro-interactions never play there.
 * On touch screens this adds `is-playing` to the element once it scrolls
 * into view, so CSS can play the same animation then instead.
 */
export function usePlayOnView<T extends Element>(threshold = 0.6) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (
      !el ||
      !window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-playing')
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
