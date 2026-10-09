import type { Metadata } from 'next'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laismotaadvocacia.com.br'

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return new URL(path, siteUrl).toString()
}

export const siteConfig = {
  name: 'Laís Mota Advocacia',
  attorneyName: 'Laís Almeida Mota',
  oabNumber: 'OAB/DF nº 80.286',
  phoneDisplay: '+55 93 99223-0495',
  whatsappUrl: 'https://wa.me/5593992230495',
  email: 'lais_mota@outlook.com',
  // Office address (not her residence) — this is the one safe to publish.
  addressLine: 'CLN 211, Bloco A, Sala 222 — Asa Norte, Brasília-DF',
  hoursLine: 'Atendimento presencial e online, mediante agendamento prévio',
  // TODO: add real handles once she sends them (referenced in the FAQ/posicionamento answers).
  instagramUrl: '',
  linkedinUrl: '',
}

// 1200x630 card shown when a link is shared (WhatsApp, LinkedIn, etc.).
export const shareImage = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Laís Mota Advocacia — advocacia estratégica e internacional em Brasília-DF',
}

// Per-page title/description/canonical plus matching Open Graph tags, so shared
// links show the page's own title. Page-level openGraph replaces the layout's
// wholesale, which is why the image is repeated here.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'pt_BR',
      type: 'website',
      images: [shareImage],
    },
    twitter: { card: 'summary_large_image', images: [shareImage.url] },
  }
}
