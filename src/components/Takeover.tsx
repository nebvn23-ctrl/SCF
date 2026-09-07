import { useEffect, useRef } from 'react'
import { MEDIA } from '../assets'
import { useDesktop, useReducedMotion } from '../hooks/useMediaQuery'
import { useReveal } from '../hooks/useReveal'

/**
 * Chapter 2. The photograph is a single still: the tear, the paper edges and
 * the creature are all baked into asset B. Nothing inside the photo moves.
 * What animates is (a) two paper-coloured CSS panels with torn clip-path edges
 * that sit *on top* of the photo and slide apart, and (b) the scale of the
 * whole still image. That is the entire trick, stated plainly.
 */
export function Takeover() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const loreRef = useReveal<HTMLDivElement>()
  const isDesktop = useDesktop()
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = sectionRef.current
    if (!root || !isDesktop || reduced) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    // GSAP is loaded lazily. If it fails, the CSS resting state (panels
    // already open, headline already in place) is what the visitor sees.
    ;(async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: '+=85%',
              scrub: 0.6,
              pin: '.takeover__stage',
              pinSpacing: true,
              anticipatePin: 1,
            },
          })

          // The CSS resting state uses translateY(-101%), which the browser
          // reports back in pixels. y:0 must be set explicitly or GSAP keeps
          // that pixel offset and the panels start already open.
          tl.fromTo(
            '.takeover__panel--a',
            { y: 0, yPercent: 0 },
            { y: 0, yPercent: -101, ease: 'none' },
            0,
          )
            .fromTo(
              '.takeover__panel--b',
              { y: 0, yPercent: 0 },
              { y: 0, yPercent: 101, ease: 'none' },
              0,
            )
            .fromTo(
              '.takeover__img',
              { scale: 1.14 },
              { scale: 1, ease: 'none' },
              0,
            )
            .fromTo(
              '.takeover__h2',
              { clipPath: 'inset(0 100% 0 0)', xPercent: -6 },
              {
                clipPath: 'inset(0 0% 0 0)',
                xPercent: 0,
                ease: 'power2.out',
                duration: 0.5,
              },
              0.15,
            )
        }, root)

        cleanup = () => ctx.revert()
      } catch {
        /* Animation is optional. Content is already visible without it. */
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [isDesktop, reduced])

  return (
    <>
      <section className="takeover" ref={sectionRef} id="lore">
        <div className="takeover__stage">
          <div className="takeover__frame">
            <img
              className="takeover__img"
              src={MEDIA.tear.src}
              width={MEDIA.tear.w}
              height={MEDIA.tear.h}
              alt={MEDIA.tear.alt}
              loading="lazy"
              decoding="async"
            />
            <div
              className="takeover__panel takeover__panel--a"
              aria-hidden="true"
            />
            <div
              className="takeover__panel takeover__panel--b"
              aria-hidden="true"
            />
          </div>
          <p className="idx idx--dark takeover__label" aria-hidden="true">
            02 <span>/</span> Takeover
          </p>
          <h2 className="takeover__h2">
            <span>My</span> <span>site</span> <span>now.</span>
          </h2>
        </div>
      </section>

      <section className="lore" ref={loreRef} aria-labelledby="lore-h">
        <p className="idx" data-reveal>
          02 <span aria-hidden="true">/</span> Takeover
        </p>

        <h3 className="lore__h" id="lore-h" data-reveal>
          Born in the trenches
        </h3>

        <div className="lore__body">
          <p data-reveal>
            From the radioactive depths of the degen trenches emerged Smoking
            Chicken Fish—half chicken, half fish, fully smoked.
          </p>
          <p data-reveal>
            While other mascots begged for attention, Smoking Chicken Fish
            simply watched, smoked, and judged.
          </p>
        </div>

        <p className="lore__punch rvl-lines" data-reveal>
          <span>No explanation needed.</span>
        </p>
      </section>
    </>
  )
}
