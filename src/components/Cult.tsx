import { useEffect, useRef } from 'react'
import { MEDIA } from '../assets'
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery'
import { useReveal } from '../hooks/useReveal'
import { ContractAddress } from './ContractAddress'
import { XLink } from './XLink'

export function Cult() {
  const revealRef = useReveal<HTMLElement>(0.15)
  const charRef = useRef<HTMLImageElement | null>(null)
  const finePointer = useFinePointer()
  const reduced = useReducedMotion()

  // Very small pointer response. No permanent floating motion.
  useEffect(() => {
    const el = charRef.current
    const host = revealRef.current
    if (!el || !host || !finePointer || reduced) return

    let frame = 0
    let x = 0
    let y = 0
    const apply = () => {
      frame = 0
      el.style.setProperty('--nudge-x', `${x}px`)
      el.style.setProperty('--nudge-y', `${y}px`)
    }
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      x = ((e.clientX - r.left) / r.width - 0.5) * 18
      y = ((e.clientY - r.top) / r.height - 0.5) * 12
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      el.style.setProperty('--nudge-x', '0px')
      el.style.setProperty('--nudge-y', '0px')
    }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [finePointer, reduced, revealRef])

  return (
    <section className="cult" id="cult" ref={revealRef} aria-labelledby="cult-h">
      <p className="idx" data-reveal>
        05 <span aria-hidden="true">/</span> Community
      </p>

      <h2 className="cult__h rvl-lines" id="cult-h" data-reveal>
        <span>One fish.</span>
        <span>One chicken.</span>
        <span>One cult.</span>
      </h2>

      {/* Asset D has a verified alpha channel, so it is used as a true cutout. */}
      <img
        className="cult__char"
        ref={charRef}
        src={MEDIA.cutout.src}
        width={MEDIA.cutout.w}
        height={MEDIA.cutout.h}
        alt={MEDIA.cutout.alt}
        loading="lazy"
        decoding="async"
        data-reveal
      />

      <div className="cult__body">
        <p data-reveal>First, you laugh. Then you look again. Then you share it.</p>
        <p className="cult__creed rvl-lines" data-reveal>
          <span>Post the fish.</span>
          <span>Respect the chicken.</span>
          <span>Feed the cult.</span>
          <span>Never put out the cigarette.</span>
        </p>
      </div>

      <div className="cult__actions" data-reveal>
        <XLink className="btn btn--solid btn--lg" label="Follow Smoking Chicken Fish on X">
          Follow on X
        </XLink>
        <ContractAddress />
      </div>

      <p className="cult__close" data-reveal>
        $SCF — Keep smoking. Keep swimming. Keep sending.
      </p>
    </section>
  )
}
