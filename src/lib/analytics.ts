// GA4 measurement ID (public — it ships in the page anyway). Only production
// builds load it, so `next dev` doesn't pollute the reports. NEXT_PUBLIC_GA_ID
// overrides it if the property ever changes.
export const gaId =
  process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_GA_ID ?? 'G-TEHLQN6DXZ') : undefined

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// The site's main conversion: someone opening a WhatsApp conversation.
// Mark `whatsapp_click` as a key event in GA4 and import it into Google Ads.
export function trackWhatsAppClick(source: string) {
  window.gtag?.('event', 'whatsapp_click', { link_source: source })
}
