// GA4 measurement ID (public — it ships in the page anyway). Only production
// builds load it, so `next dev` doesn't pollute the reports. NEXT_PUBLIC_GA_ID
// overrides it if the property ever changes.
export const gaId =
  process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_GA_ID ?? 'G-TEHLQN6DXZ') : undefined

// Meta Pixel — off until NEXT_PUBLIC_META_PIXEL_ID is set in Vercel (only worth it
// once she runs Meta ads).
export const metaPixelId =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined : undefined

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

// The site's main conversion: someone opening a WhatsApp conversation.
// Mark `whatsapp_click` as a key event in GA4 and import it into Google Ads;
// on Meta it is the standard `Lead` event, usable as an ad optimisation goal.
export function trackWhatsAppClick(source: string) {
  window.gtag?.('event', 'whatsapp_click', { link_source: source })
  window.fbq?.('track', 'Lead', { content_name: source })
}
