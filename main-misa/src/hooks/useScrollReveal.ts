import { useEffect } from 'react'

const DURATION = 700
const STAGGER_MS = 90
// Later items in a long list don't wait any longer than this many steps
const MAX_STAGGER_STEPS = 6
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'
const KEYFRAMES: Keyframe[] = [
  { opacity: 0, translate: '0 32px' },
  { opacity: 1, translate: '0 0' },
]

/** True when the reveal animations should run at all */
export function canReveal() {
  return (
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    typeof Element.prototype.animate === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function reveal(el: HTMLElement) {
  el.classList.add('is-revealed')
  const options = { duration: DURATION, easing: EASING, fill: 'backwards' as const }

  if (el.dataset.reveal === 'stagger') {
    Array.from(el.children).forEach((child, i) => {
      child.animate(KEYFRAMES, {
        ...options,
        delay: Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS,
      })
    })
  } else {
    el.animate(KEYFRAMES, options)
  }
}

/**
 * Fades elements marked `data-reveal` up into place the first time they
 * scroll into view. `data-reveal="stagger"` does the same to each child in
 * turn. The Web Animations API is used (not CSS transitions) so it never
 * clashes with an element's own hover transitions or keyframes.
 *
 * `html.js-reveal` (set in main.tsx) hides the elements until then, so
 * nothing is hidden without JS or with reduced motion on.
 */
export function useScrollReveal(pageKey: string) {
  useEffect(() => {
    if (!canReveal()) return

    const pending = new Set(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          reveal(el)
          pending.delete(el)
          observer.unobserve(el)
        }
        // Anything the page jumped straight past (a fast scroll, the back
        // button, an anchor link) just appears, so nothing above is left blank
        for (const el of pending) {
          if (el.getBoundingClientRect().bottom > 0) continue
          el.classList.add('is-revealed')
          pending.delete(el)
          observer.unobserve(el)
        }
      },
      // Start a little before the element is fully on screen
      { rootMargin: '0px 0px -10% 0px' },
    )
    pending.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pageKey])
}
