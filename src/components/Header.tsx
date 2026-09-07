import { useEffect, useRef } from 'react'
import { SITE } from '../config'
import { XLink } from './XLink'

export function Header() {
  const barRef = useRef<HTMLSpanElement | null>(null)

  // Scroll progress hairline. Written straight to the node inside rAF so
  // scrolling never triggers a React render.
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let frame = 0
    const paint = () => {
      frame = 0
      const max =
        document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      bar.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className="hdr">
      <a className="hdr__brand" href="#top">
        <span className="hdr__name">{SITE.displayName}</span>
        <span className="hdr__tick">{SITE.ticker}</span>
      </a>

      <nav className="hdr__nav" aria-label="Sections">
        <a href="#lore">Lore</a>
        <a href="#gallery">Gallery</a>
        <a href="#motion">Motion</a>
        <a href="#cult">Cult</a>
      </nav>

      <XLink className="hdr__x" label="Smoking Chicken Fish on X">
        <span aria-hidden="true">𝕏</span>
        <span className="visually-hidden">X</span>
      </XLink>

      <span className="hdr__progress" ref={barRef} aria-hidden="true" />
    </header>
  )
}
