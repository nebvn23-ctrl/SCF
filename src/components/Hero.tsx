import { useEffect, useRef } from 'react'
import { MEDIA } from '../assets'
import { useDesktop, useReducedMotion } from '../hooks/useMediaQuery'
import { SITE } from '../config'
import { ContractAddress } from './ContractAddress'
import { XLink } from './XLink'

const TAPE = 'SMOKING CHICKEN FISH — $SCF — NO EXPLANATION NEEDED — '

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)
  const isDesktop = useDesktop()
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
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
          gsap.to('.hero__media img', {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          })
        }, root)
        cleanup = () => ctx.revert()
      } catch {
        /* decorative only */
      }
    })()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [isDesktop, reduced])

  return (
    <section className="hero" id="top" ref={rootRef}>
      {/* Decorative left rail. Hidden from assistive technology. */}
      <div className="hero__rail" aria-hidden="true">
        <span>SPECIMEN 01 / KITCHEN / UNBOTHERED</span>
      </div>

      <div className="hero__inner">
        <p className="hero__kicker">The internet made a mistake.</p>

        <h1 className="hero__h1">
          <span className="hero__line">Smoking</span>
          <span className="hero__line">Chicken</span>
          <span className="hero__line hero__line--outline">Fish</span>
        </h1>

        <p className="hero__ticker">
          <span className="tickbox">{SITE.ticker}</span>
        </p>

        <figure className="hero__media">
          <img
            src={MEDIA.counter.src}
            width={MEDIA.counter.w}
            height={MEDIA.counter.h}
            alt={MEDIA.counter.alt}
            fetchPriority="high"
            decoding="async"
          />
        </figure>

        <p className="hero__copy">
          They said a chicken couldn’t swim.
          <br />
          They said a fish couldn’t smoke.
        </p>
        <p className="hero__copy hero__copy--strong">They were wrong.</p>

        <div className="hero__actions">
          <a className="btn btn--solid" href="#lore">
            Enter the lore
          </a>
          <XLink className="btn btn--ghost" label="Smoking Chicken Fish on X">
            X
          </XLink>
        </div>

        <ContractAddress />
      </div>

      <div className="tape" aria-hidden="true">
        <div className="tape__track">
          <span>{TAPE.repeat(4)}</span>
          <span>{TAPE.repeat(4)}</span>
        </div>
      </div>
    </section>
  )
}
