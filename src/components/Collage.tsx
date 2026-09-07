import { useEffect, useRef } from 'react'
import { MEDIA } from '../assets'
import { useDesktop, useReducedMotion } from '../hooks/useMediaQuery'
import { useReveal } from '../hooks/useReveal'

export function Collage() {
  const revealRef = useReveal<HTMLElement>(0.12)
  const parallaxRef = useRef<HTMLElement | null>(null)
  const isDesktop = useDesktop()
  const reduced = useReducedMotion()

  // Minimal differential parallax, desktop + fine motion only, transform only.
  useEffect(() => {
    const root = parallaxRef.current
    if (!root || !isDesktop || reduced) return

    let cancelled = false
    let cleanup: (() => void) | undefined
    ;(async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
          const drift: Array<[string, number]> = [
            ['.fig--fridge', -46],
            ['.fig--closeup', 30],
            ['.fig--chaos', -26],
          ]
          drift.forEach(([sel, y]) => {
            gsap.to(sel, {
              y,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            })
          })
        }, root)

        cleanup = () => ctx.revert()
      } catch {
        /* optional */
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [isDesktop, reduced])

  return (
    <section
      className="collage"
      id="gallery"
      aria-labelledby="collage-h"
      ref={(node) => {
        revealRef.current = node
        parallaxRef.current = node
      }}
    >
      <p className="idx idx--dark" data-reveal>
        03 <span aria-hidden="true">/</span> Evidence
      </p>

      <h2 className="collage__h" id="collage-h" data-reveal>
        A meme built <em>different.</em>
      </h2>

      <figure className="fig fig--fridge" data-reveal="mask">
        <img
          src={MEDIA.fridge.src}
          width={MEDIA.fridge.w}
          height={MEDIA.fridge.h}
          alt={MEDIA.fridge.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>Fig. 01 — Cold storage. Still smoking.</figcaption>
      </figure>

      <figure className="fig fig--closeup" data-reveal="mask">
        <img
          src={MEDIA.closeup.src}
          width={MEDIA.closeup.w}
          height={MEDIA.closeup.h}
          alt={MEDIA.closeup.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>Fig. 02 — Eye contact is not offered.</figcaption>
      </figure>

      <div className="collage__body" data-reveal>
        <p>Dogs have been repeated. Frogs have been farmed. Cats have been copied.</p>
        <p>
          The timeline needs something stranger—something impossible to ignore.
        </p>
      </div>

      <figure className="fig fig--chaos" data-reveal="mask">
        <img
          src={MEDIA.chaos.src}
          width={MEDIA.chaos.w}
          height={MEDIA.chaos.h}
          alt={MEDIA.chaos.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>Fig. 03 — Flour everywhere. No apology.</figcaption>
      </figure>

      <p className="collage__statement rvl-lines" data-reveal>
        <span>SCF doesn’t follow the meta.</span>
        <span className="outline">It contaminates the meta.</span>
      </p>
    </section>
  )
}
