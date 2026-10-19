import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { blogCopy, formatDate, getPost, getPosts, readingMinutes, type PostBlock } from '@/content/blog'
import { defaultLocale, localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { absoluteUrl, pageMetadata, shareImage, siteUrl } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

// Posts exist only in Portuguese.
export function generateStaticParams() {
  return getPosts().map((post) => ({ locale: defaultLocale, slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (locale !== defaultLocale || !post) return {}
  const metadata = pageMetadata(locale, {
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    translated: false,
  })
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  }
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === 'h2') return <h2 className="mt-10 font-serif text-2xl text-ink-950">{block.text}</h2>
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink-700">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return <p className="mt-4 text-base leading-relaxed text-ink-700">{block.text}</p>
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (locale !== defaultLocale || !post) notFound()
  const href = (path: string) => localePath(locale, path)
  const area = getDictionary(locale).practiceAreas.find((a) => a.slug === post.area)

  const url = absoluteUrl(href(`/blog/${post.slug}`))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getDictionary(locale).nav.home, item: absoluteUrl(href('/')) },
          { '@type': 'ListItem', position: 2, name: blogCopy.label, item: absoluteUrl(href('/blog')) },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        inLanguage: 'pt-BR',
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        image: absoluteUrl(shareImage(locale).url),
        author: { '@id': `${siteUrl}/#lais-mota` },
        publisher: { '@id': `${siteUrl}/#escritorio` },
        ...(area && { about: area.title }),
      },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <JsonLd data={jsonLd} />
      <Link href={href('/blog')} className="text-sm font-medium text-ink-500 transition hover:text-gold-600">
        {blogCopy.back}
      </Link>

      <header className="reveal">
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          {area ? (
            <Link href={href(`/areas-de-atuacao/${area.slug}`)} className="hover:text-gold-700">
              {area.title}
            </Link>
          ) : (
            blogCopy.label
          )}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-sm text-ink-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {blogCopy.readingTime(readingMinutes(post))}
        </p>
      </header>

      <div className="mt-6 border-t border-line pt-4">
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-ink-500">{blogCopy.disclaimer}</p>

      <Link
        href={href('/contato')}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
      >
        {blogCopy.cta}
      </Link>
    </article>
  )
}
