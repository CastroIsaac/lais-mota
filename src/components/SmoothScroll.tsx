'use client'

import { useEffect } from 'react'

/**
 * Eased ("very smooth") wheel scrolling for the whole site, no library. Mouse-wheel /
 * trackpad deltas feed a target position and the window glides toward it each frame. Touch, keyboard, scrollbar dragging and anchor links
 * stay native. Disabled under prefers-reduced-motion, for ctrl/cmd+wheel (zoom) and for
 * wheel events over inner scrollable areas (menus, form fields).
 */
// Lower = longer glide. 0.07 ≈ the heavy, buttery feel of Lenis-style sites.
const EASE = 0.07

function canScrollInside(target: EventTarget | null, deltaY: number) {
  let el = target instanceof Element ? target : null
  while (el && el !== document.body && el !== document.documentElement) {
    const style = getComputedStyle(el)
    const scrollable = /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight
    if (scrollable) {
      if (deltaY < 0 && el.scrollTop > 0) return true
      if (deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true
    }
    el = el.parentElement
  }
  return false
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let target = window.scrollY
    let current = window.scrollY
    let frame = 0

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

    const step = () => {
      current += (target - current) * EASE
      if (Math.abs(target - current) < 0.5) current = target
      // 'instant': globals.css sets scroll-behavior: smooth on <html>, which would fight the easing.
      window.scrollTo({ top: current, behavior: 'instant' })
      frame = current === target ? 0 : requestAnimationFrame(step)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (canScrollInside(event.target, event.deltaY)) return
      // Mobile menu open locks the page (body overflow hidden): leave it alone.
      if (document.body.style.overflow === 'hidden') return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1
      if (!frame) current = window.scrollY
      target = Math.min(Math.max(target + event.deltaY * unit, 0), maxScroll())
      if (!frame) frame = requestAnimationFrame(step)
    }

    // Any scroll we did not drive (keyboard, scrollbar, anchor links, touch) resyncs the target.
    const onScroll = () => {
      if (!frame) target = current = window.scrollY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
