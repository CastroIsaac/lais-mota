import type { MetadataRoute } from 'next'
import { practiceAreas } from '@/lib/practiceAreas'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1, lastModified: new Date() },
    { url: absoluteUrl('/sobre'), changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
    { url: absoluteUrl('/areas-de-atuacao'), changeFrequency: 'monthly', priority: 0.9, lastModified: new Date() },
    ...practiceAreas.map((area) => ({
      url: absoluteUrl(`/areas-de-atuacao/${area.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: new Date(),
    })),
    { url: absoluteUrl('/contato'), changeFrequency: 'yearly', priority: 0.6, lastModified: new Date() },
  ]
}
