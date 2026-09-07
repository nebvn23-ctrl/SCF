import { useCallback, useEffect, useRef, useState } from 'react'
import { MEDIA } from '../assets'
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery'
import { useReveal } from '../hooks/useReveal'

/**
 * Chapter 4. The clip is a normal opaque 960x960 H.264 file with a dark
 * background — not a transparent asset and not a 3D model. It is shown at its
 * real 1:1 ratio, uncropped, so the creature and the falling banknotes stay
 * whole. The banknotes are a joke about the character, nothing more.
 */
export function VideoStage() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const inViewRef = useRef(false)
  const wantsPlayRef = useRef(false) // visitor intent, survives scrolling
  const [playing, setPlaying] = useState(false)
  const [needsGesture, setNeedsGesture] = useState(false)

  const reduced = useReducedMotion()
  const finePointer = useFinePointer()
  const headRef = useReveal<HTMLDivElement>()

  /* ---- lazy source: nothing is fetched until the stage is nearly on screen */
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const attach = () => {
      if (!video.getAttribute('src')) video.setAttribute('src', MEDIA.video.src)
    }

    if (typeof IntersectionObserver !== 'function') {
      attach()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          attach()
          io.disconnect()
        }
      },
      { rootMargin: '500px 0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  /* ---- playback policy: autoplay only when in view, allowed and not reduced */
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    wantsPlayRef.current = !reduced

    const sync = () => {
      const shouldPlay =
        inViewRef.current && wantsPlayRef.current && !document.hidden
      if (shouldPlay) {
        // play() rejects outright when no source is attached yet, which would
        // look identical to a blocked autoplay. Attach first, then play.
        if (!video.getAttribute('src')) {
          video.setAttribute('src', MEDIA.video.src)
          return
        }
        const p = video.play()
        if (p && typeof p.catch === 'function') {
          p.then(() => {
            setNeedsGesture(false)
            setPlaying(true)
          }).catch(() => {
            // Autoplay was blocked: surface an explicit play control.
            setNeedsGesture(true)
            setPlaying(false)
          })
        }
      } else {
        video.pause()
        setPlaying(false)
      }
    }

    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            inViewRef.current = e.isIntersecting && e.intersectionRatio > 0.25
          })
          sync()
        },
        { threshold: [0, 0.25, 0.6] },
      )
      io.observe(section)
    } else {
      inViewRef.current = true
      sync()
    }

    const onVisibility = () => sync()
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    // Fires once the lazily attached source is decodable — retry then.
    const onCanPlay = () => sync()

    document.addEventListener('visibilitychange', onVisibility)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('canplay', onCanPlay)

    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('canplay', onCanPlay)
    }
  }, [reduced])

  const toggle = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (!video.getAttribute('src')) video.setAttribute('src', MEDIA.video.src)

    if (video.paused) {
      wantsPlayRef.current = true
      video
        .play()
        .then(() => {
          setNeedsGesture(false)
          setPlaying(true)
        })
        .catch(() => {
          // Only a genuine policy block counts; a not-yet-loaded source will
          // retry itself on canplay.
          if (video.readyState >= 2) setNeedsGesture(true)
        })
    } else {
      wantsPlayRef.current = false
      video.pause()
      setPlaying(false)
    }
  }, [])

  /* ---- subtle pointer tilt. Not 3D, just a small CSS transform. ---- */
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || !finePointer || reduced) return

    let frame = 0
    let tx = 0
    let ty = 0

    const apply = () => {
      frame = 0
      wrap.style.transform = `perspective(1200px) rotateX(${ty}deg) rotateY(${tx}deg)`
    }
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 6
      ty = -((e.clientY - r.top) / r.height - 0.5) * 6
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      wrap.style.transform = ''
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.style.transform = ''
    }
  }, [finePointer, reduced])

  return (
    <section
      className="stage"
      id="motion"
      ref={sectionRef}
      aria-labelledby="stage-h"
    >
      <span className="stage__ghost" aria-hidden="true">
        $SCF
      </span>

      <div className="stage__head" ref={headRef}>
        <p className="idx">
          04 <span aria-hidden="true">/</span> Motion
        </p>
        <h2 className="stage__h rvl-lines" id="stage-h" data-reveal>
          <span>No logic.</span>
          <span>Just $SCF.</span>
        </h2>
        <p className="stage__copy">
          $SCF isn’t here to explain itself.
          <br />
          It’s here to become a movement.
        </p>
      </div>

      <div className="stage__frame">
        <div className="stage__tilt" ref={wrapRef}>
          <video
            ref={videoRef}
            className="stage__video"
            width={MEDIA.video.w}
            height={MEDIA.video.h}
            poster={MEDIA.video.poster}
            preload="none"
            muted
            loop
            playsInline
            aria-label="Looping clip: Smoking Chicken Fish sits on a pile of banknotes, flapping its wings while more notes fall around it."
          />
          <span className="stage__mark stage__mark--tl" aria-hidden="true" />
          <span className="stage__mark stage__mark--tr" aria-hidden="true" />
          <span className="stage__mark stage__mark--bl" aria-hidden="true" />
          <span className="stage__mark stage__mark--br" aria-hidden="true" />
        </div>

        <div className="stage__bar">
          <button type="button" className="stage__toggle" onClick={toggle}>
            {playing ? 'Pause' : 'Play'}
            <span className="visually-hidden"> the Smoking Chicken Fish clip</span>
          </button>
          <p className="stage__meta">
            {needsGesture
              ? 'Autoplay blocked by your browser — press play.'
              : reduced
                ? 'Reduced motion: playback is yours to start.'
                : 'MUTED · LOOPING · 960×960'}
          </p>
        </div>
      </div>
    </section>
  )
}
