import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smaller than WebP at equal quality), Next falls back to WebP/original
    // per-browser automatically — no code changes needed anywhere <Image> is used.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Spanish, French and Hindi were retired (2026-10): send their indexed URLs to
      // the English page at the same path (slugs are shared across languages).
      { source: '/:lang(es|fr|hi)', destination: '/en', permanent: true },
      { source: '/:lang(es|fr|hi)/:path*', destination: '/en/:path*', permanent: true },
      // The single "Consultoria Jurídica Internacional" area became the whole
      // international practice, with its own hub page and dedicated areas.
      {
        source: '/areas-de-atuacao/consultoria-juridica-internacional',
        destination: '/advocacia-internacional',
        permanent: true,
      },
      {
        source: '/en/areas-de-atuacao/consultoria-juridica-internacional',
        destination: '/en/advocacia-internacional',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
