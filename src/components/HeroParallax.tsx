'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Home hero backdrop in two layers: the STF building (photo without the statue) and the
 * "A Justiça" statue as a transparent cut-out on top. Scrolling writes --hero-progress (0 → 1
 * over the first screen) and CSS moves the statue up faster than the building, so it "rises"
 * out of the scene. Skipped under prefers-reduced-motion (static composition).
 */
export function HeroParallax({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight || 1), 0), 1)
      el.style.setProperty('--hero-progress', progress.toFixed(4))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className="hero-parallax absolute inset-0">
      <div className="hero-stage">
        <Image
          src="/images/stf-fundo.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="(max-width: 767px) 300vw, 100vw"
          className="object-cover"
        />
      </div>
      <Image
        src="/images/estatua-justica.webp"
        alt={alt}
        width={1323}
        height={1189}
        priority
        quality={85}
        sizes="(max-width: 767px) 120vw, 60vw"
        className="hero-statue"
      />
    </div>
  )
}
