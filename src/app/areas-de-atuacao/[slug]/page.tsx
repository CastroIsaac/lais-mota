import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPracticeArea, practiceAreas } from '@/lib/practiceAreas'
import { absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getPracticeArea(slug)
  if (!area) return {}

  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: absoluteUrl(`/areas-de-atuacao/${area.slug}`) },
  }
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params
  const area = getPracticeArea(slug)
  if (!area) notFound()

  return (
    <section className="mx-auto max-w-content px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <Link href="/areas-de-atuacao" className="text-sm font-medium text-ink-500 transition hover:text-gold-600">
        ← Áreas de atuação
      </Link>

      <div className="reveal">
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{area.audience}</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{area.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700">{area.description}</p>
      </div>

      <ul className="reveal stagger-1 mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {area.topics.map((topic) => (
          <li key={topic} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            {topic}
          </li>
        ))}
      </ul>

      <Link
        href="/contato"
        className="mt-12 inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
      >
        Conversar sobre o meu caso
      </Link>
    </section>
  )
}
