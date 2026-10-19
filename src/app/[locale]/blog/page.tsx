import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogCopy, formatDate, getPosts, readingMinutes } from '@/content/blog'
import { defaultLocale, localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== defaultLocale) return {}
  return pageMetadata(locale, {
    title: blogCopy.metaTitle,
    description: blogCopy.metaDescription,
    path: '/blog',
    translated: false,
  })
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  // Portuguese-only, and hidden until a post is published.
  const posts = getPosts()
  if (locale !== defaultLocale || posts.length === 0) notFound()
  const practiceAreas = getDictionary(locale).practiceAreas

  return (
    <section className="mx-auto max-w-content px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <div className="reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{blogCopy.kicker}</p>
        <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{blogCopy.title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">{blogCopy.intro}</p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={localePath(locale, `/blog/${post.slug}`)}
            className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[240px] flex-col justify-between bg-white p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-gold-50 hover:shadow-card`}
          >
            <p className="text-xs text-ink-500 transition group-hover:text-gold-600">
              {practiceAreas.find((area) => area.slug === post.area)?.title ?? blogCopy.label} · {formatDate(post.publishedAt)}
            </p>
            <div>
              <h2 className="max-w-md font-serif text-xl text-ink-950">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{post.description}</p>
              <p className="mt-4 text-xs text-ink-500">{blogCopy.readingTime(readingMinutes(post))}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
