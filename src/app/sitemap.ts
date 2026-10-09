import type { MetadataRoute } from 'next'
import { practiceAreas } from '@/lib/practiceAreas'
import { absoluteUrl } from '@/lib/site'

// Date each page's content last changed. Bump the entry when you edit that page —
// a build-time `new Date()` would tell Google everything changed on every deploy.
const lastModified = {
  home: '2026-10-09',
  sobre: '2026-10-09',
  areas: '2026-09-21',
  contato: '2026-10-09',
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1, lastModified: lastModified.home },
    { url: absoluteUrl('/sobre'), changeFrequency: 'monthly', priority: 0.8, lastModified: lastModified.sobre },
    { url: absoluteUrl('/areas-de-atuacao'), changeFrequency: 'monthly', priority: 0.9, lastModified: lastModified.areas },
    ...practiceAreas.map((area) => ({
      url: absoluteUrl(`/areas-de-atuacao/${area.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: lastModified.areas,
    })),
    { url: absoluteUrl('/contato'), changeFrequency: 'yearly', priority: 0.6, lastModified: lastModified.contato },
  ]
}
