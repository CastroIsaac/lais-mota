'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Adds `.in-view` to any `.reveal` element once it scrolls into the viewport.
// The animation itself (opacity/transform) lives in globals.css so this stays
// framework-agnostic and cheap — one observer for the whole page.
//
// This component lives in the root layout, so it does NOT remount when
// navigating between pages (only `children` swaps) — the effect must re-run
// on `pathname` change, otherwise `.reveal` elements on a client-navigated
// page are never observed and stay stuck at opacity: 0 until a hard reload.
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    document.body.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    )

    const targets = document.querySelectorAll('.reveal:not(.in-view)')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
