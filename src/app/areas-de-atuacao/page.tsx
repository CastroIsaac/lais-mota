import type { Metadata } from 'next'
import Link from 'next/link'
import { practiceAreas } from '@/lib/practiceAreas'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Áreas de Atuação',
  description:
    'Direito empresarial, contratual, consultoria jurídica internacional e direito civil — conheça as áreas de atuação de Laís Mota.',
  alternates: { canonical: absoluteUrl('/areas-de-atuacao') },
}

export default function AreasDeAtuacaoPage() {
  return (
    <section className="mx-auto max-w-content px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <div className="reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">I · Áreas de atuação</p>
        <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink-950 md:text-5xl">Onde posso ajudar.</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
          Cada oportunidade e cada caso recebem uma análise própria. Estas são as principais frentes de atuação —
          entre em contato para conversar sobre a sua situação específica.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
        {practiceAreas.map((area, i) => (
          <Link
            key={area.slug}
            href={`/areas-de-atuacao/${area.slug}`}
            className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[240px] flex-col justify-between bg-white p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-gold-50 hover:shadow-card`}
          >
            <span className="text-xs text-ink-500 transition group-hover:text-gold-600">↗</span>
            <div>
              <h2 className="max-w-xs font-serif text-xl text-ink-950">{area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{area.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
