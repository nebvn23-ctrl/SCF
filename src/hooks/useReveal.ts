import { useEffect, useRef } from 'react'

/**
 * Adds `is-in` to every `[data-reveal]` descendant (and to the root itself)
 * once it scrolls into view.
 *
 * The pre-animation state lives behind the `.js` class that main.tsx puts on
 * <html>, so if the bundle never executes, nothing is ever hidden.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets: Element[] = [...root.querySelectorAll('[data-reveal]')]
    if (root.hasAttribute('data-reveal')) targets.push(root)
    if (!targets.length) return

    if (typeof IntersectionObserver !== 'function') {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [threshold])

  return ref
}
