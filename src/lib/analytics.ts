// GA4 measurement ID (G-XXXXXXXXXX). Set NEXT_PUBLIC_GA_ID in Vercel; without it
// no analytics script loads and tracking calls are no-ops.
export const gaId = process.env.NEXT_PUBLIC_GA_ID

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
