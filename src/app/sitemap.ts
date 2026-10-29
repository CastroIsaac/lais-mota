import type { MetadataRoute } from 'next'
import { localePath, locales } from '@/i18n/config'
import { getPosts } from '@/content/blog'
import { getServices } from '@/content/services'
import { getDictionary } from '@/i18n'
import { absoluteUrl, languageAlternates } from '@/lib/site'

// Date each page's content last changed. Bump the entry when you edit that page —
// a build-time `new Date()` would tell Google everything changed on every deploy.
const lastModified = {
  home: '2026-10-29',
  sobre: '2026-10-29',
  areas: '2026-10-29',
  internacional: '2026-10-29',
  contato: '2026-10-29',
}

type Page = { path: string; lastModified: string; changeFrequency: 'monthly' | 'yearly'; priority: number }

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Page[] = [
    { path: '/', lastModified: lastModified.home, changeFrequency: 'monthly', priority: 1 },
    { path: '/sobre', lastModified: lastModified.sobre, changeFrequency: 'monthly', priority: 0.8 },
    { path: '/areas-de-atuacao', lastModified: lastModified.areas, changeFrequency: 'monthly', priority: 0.9 },
    { path: '/advocacia-internacional', lastModified: lastModified.internacional, changeFrequency: 'monthly', priority: 0.9 },
    ...getDictionary('pt').practiceAreas.map((area) => ({
      path: `/areas-de-atuacao/${area.slug}`,
      lastModified: lastModified.areas,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { path: '/contato', lastModified: lastModified.contato, changeFrequency: 'yearly', priority: 0.6 },
  ]

  // One entry per page per language, each listing all its translations (hreflang).
  const translatedPages = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, page.path)),
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: languageAlternates(page.path) },
    })),
  )

  // The blog is Portuguese-only, so no hreflang; listed once a post is published.
  const posts = getPosts()
  const blogPages: MetadataRoute.Sitemap = posts.length
    ? [
        { url: absoluteUrl('/blog'), lastModified: posts[0].updatedAt ?? posts[0].publishedAt, changeFrequency: 'weekly', priority: 0.7 },
        ...posts.map((post) => ({
          url: absoluteUrl(`/blog/${post.slug}`),
          lastModified: post.updatedAt ?? post.publishedAt,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })),
      ]
    : []

  // Service pages are Portuguese-only as well; listed once published.
  const servicePages: MetadataRoute.Sitemap = getServices().map((service) => ({
    url: absoluteUrl(`/areas-de-atuacao/${service.area}/${service.slug}`),
    lastModified: service.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...translatedPages, ...servicePages, ...blogPages]
}
