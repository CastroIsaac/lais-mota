'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { gaId, trackWhatsAppClick } from '@/lib/analytics'

export function Analytics() {
  // One listener covers every wa.me link on the site, including ones added later.
  useEffect(() => {
    if (!gaId) return

    function handleClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="wa.me/"]')
      if (link) trackWhatsAppClick(link.dataset.track ?? 'link')
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!gaId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  )
}
