'use client'

import { useEffect } from 'react'

/**
 * Eased ("very smooth") scrolling for the whole site, no library.
 *
 * - Mouse wheel / trackpad: deltas feed a target position and the window glides toward it.
 * - Touch (phones/tablets): the page follows the finger with a light smoothing, and on
 *   release it keeps gliding with inertia and slows down gradually (Lenis "syncTouch" style).
 *   Gestures that start mostly horizontal, over form fields or inside an inner scrollable
 *   area (menus, panels) are left native, and so is anything while the mobile menu is open.
 * - Keyboard, anchor links and programmatic scrolls stay native (the target resyncs).
 *
 * Disabled entirely under prefers-reduced-motion.
 */

// Lower = longer glide. 0.07 ≈ the heavy, buttery feel of Lenis-style sites.
const WHEEL_EASE = 0.07
// While the finger is down the page should feel attached to it, just without jitter.
const DRAG_EASE = 0.35
// After release: how far a flick throws (ms of travel at release velocity) and how it settles.
const THROW_MS = 620
const GLIDE_EASE = 0.06

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

function isFormField(target: EventTarget | null) {
  return target instanceof Element && !!target.closest('input, textarea, select, [contenteditable="true"]')
}

const pageLocked = () => document.body.style.overflow === 'hidden'

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let target = window.scrollY
    let current = window.scrollY
    let ease = WHEEL_EASE
    let frame = 0

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight
    const clamp = (y: number) => Math.min(Math.max(y, 0), maxScroll())

    const step = () => {
      current += (target - current) * ease
      if (Math.abs(target - current) < 0.5) current = target
      // 'instant': globals.css sets scroll-behavior: smooth on <html>, which would fight the easing.
      window.scrollTo({ top: current, behavior: 'instant' })
      frame = current === target ? 0 : requestAnimationFrame(step)
    }
    const run = () => {
      if (!frame) frame = requestAnimationFrame(step)
    }
    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      target = current = window.scrollY
    }

    // ── Wheel / trackpad ──
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (canScrollInside(event.target, event.deltaY) || pageLocked()) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1
      if (!frame) current = window.scrollY
      ease = WHEEL_EASE
      target = clamp(target + event.deltaY * unit)
      run()
    }

    // ── Touch ──
    let touchActive = false // this gesture is ours (vertical, not inside something scrollable)
    let decided = false // axis decided for this gesture
    let startX = 0
    let startY = 0
    let lastY = 0
    let samples: { t: number; y: number }[] = []

    const onTouchStart = (event: TouchEvent) => {
      touchActive = false
      decided = false
      if (event.touches.length !== 1 || pageLocked() || isFormField(event.target)) {
        decided = true
        return
      }
      stop() // a new touch catches the page mid-glide, like native scrolling
      const t = event.touches[0]
      startX = t.clientX
      startY = lastY = t.clientY
      samples = [{ t: event.timeStamp, y: t.clientY }]
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      const t = event.touches[0]
      if (!decided) {
        const dx = Math.abs(t.clientX - startX)
        const dy = Math.abs(t.clientY - startY)
        if (dx < 6 && dy < 6) return
        decided = true
        touchActive = dy > dx && !canScrollInside(event.target, startY - t.clientY) && !pageLocked()
        if (!touchActive) return
      }
      if (!touchActive) return
      event.preventDefault()
      const delta = lastY - t.clientY
      lastY = t.clientY
      samples.push({ t: event.timeStamp, y: t.clientY })
      if (samples.length > 6) samples.shift()
      ease = DRAG_EASE
      target = clamp(target + delta)
      run()
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchActive) return
      touchActive = false
      // Release velocity from the last ~100 ms of movement (px/ms, positive = page goes down).
      const now = event.timeStamp
      const recent = samples.filter((s) => now - s.t < 100)
      let velocity = 0
      if (recent.length >= 2) {
        const first = recent[0]
        const last = recent[recent.length - 1]
        const dt = last.t - first.t
        if (dt > 0) velocity = (first.y - last.y) / dt
      }
      ease = GLIDE_EASE
      target = clamp(target + velocity * THROW_MS)
      run()
    }

    // Any scroll we did not drive (keyboard, anchor links, find-in-page) resyncs the target.
    const onScroll = () => {
      if (!frame && !touchActive) target = current = window.scrollY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
