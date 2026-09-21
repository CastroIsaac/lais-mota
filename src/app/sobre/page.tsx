import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { absoluteUrl, siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre Laís Mota',
  description:
    'Conheça a trajetória de Laís Mota, advogada em Brasília com atuação em Direito Civil, Empresarial, Contratual e Consultoria Jurídica Internacional.',
  alternates: { canonical: absoluteUrl('/sobre') },
}

// TODO(mockup): oabNumber is placeholder copy — replace with the real OAB registration number before launch.
const credentials = [
  {
    label: siteConfig.oabNumber,
    value: 'Registro profissional junto à Ordem dos Advogados do Brasil.',
  },
  {
    label: 'Formação',
    value:
      'Graduada em Direito pela Universidade Federal do Oeste do Pará (UFOPA), com MBA em Comércio Exterior pela ABRACOMEX, em parceria com a Massachusetts International Business (MIB).',
  },
  {
    label: 'Atuação',
    value:
      'Assessoria no Tribunal de Justiça do Estado do Pará (TJPA) e, atualmente, advocacia privada em Brasília nas áreas de Direito Civil, Empresarial, Contratual e Consultoria Jurídica Internacional.',
  },
]

export default function SobrePage() {
  return (
    <>
      <section className="mx-auto grid max-w-content gap-12 px-5 pb-16 pt-32 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-8 md:pb-24 md:pt-40">
        <div className="reveal relative">
          <div className="absolute -bottom-5 -right-5 hidden aspect-[4/5] w-full rounded-sm bg-gold-100 md:block" aria-hidden="true" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink-950/5">
            <Image
              src="/images/lais-mota-image.jpeg"
              alt="Laís Mota, advogada"
              fill
              quality={85}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="reveal stagger-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">I · Sobre</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink-950 md:text-5xl">Laís Almeida Mota</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
            Minha trajetória profissional foi construída a partir da combinação entre formação acadêmica sólida,
            experiência institucional e atuação estratégica na advocacia — sempre associada a uma visão
            interdisciplinar do Direito, especialmente nas áreas civil, empresarial, contratual e de relações
            internacionais.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700">
            Busco desenvolver uma advocacia técnica, estratégica e personalizada — compreendendo não apenas a
            questão jurídica apresentada, mas os seus impactos patrimoniais, familiares, empresariais e, quando
            aplicável, internacionais.
          </p>

          <dl className="mt-10 space-y-6 border-t border-line pt-8">
            {credentials.map((item) => (
              <div key={item.label}>
                <dt className="text-sm font-semibold text-ink-950">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-500">{item.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/contato"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
          >
            Agendar uma conversa
          </Link>
        </div>
      </section>

      {/* Trajetória */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">II · Trajetória</p>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-700">
            <p>
              Ainda durante a graduação, busquei experiências que me permitissem compreender o Direito para além do
              processo judicial, participando de projetos acadêmicos e institucionais relacionados a direitos
              humanos e relações internacionais.
            </p>
            <p>
              Posteriormente, atuei em assessoria no Tribunal de Justiça do Estado do Pará (TJPA) — experiência que
              contribuiu significativamente para a compreensão da dinâmica decisória do Poder Judiciário e para o
              desenvolvimento de uma visão técnica e estratégica do processo.
            </p>
            <p>
              Em Brasília, consolidei minha atuação na advocacia privada, com demandas em Direito Civil, Direito
              Empresarial, Direito Contratual e Consultoria Jurídica Internacional. Hoje, minha atuação reúne duas
              vertentes principais: a assessoria jurídica de pessoas físicas em questões civis relevantes, e a
              assessoria de empresas e empresários em contratos, estruturação de negócios e operações internacionais.
            </p>
          </div>
        </div>
      </section>

      {/* Compromisso */}
      <section className="bg-gold-50 py-16 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">III · Compromisso</p>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-700">
              <p>
                Durante a graduação, participei de atividades relacionadas à política migratória e à proteção de
                refugiados, em projeto desenvolvido na Universidade Federal do Paraná (UFPR), em Curitiba — uma
                experiência que contribuiu para minha formação em direitos humanos e para uma visão jurídica
                sensível às questões internacionais, migratórias e sociais. A defesa dos direitos humanos e da
                dignidade da pessoa permanece como um dos valores que orientam minha compreensão do Direito.
              </p>
              <p className="text-sm text-ink-500">
                Possuo aproximadamente três anos de atuação na advocacia, com experiência em mais de 50 demandas,
                consultorias e projetos jurídicos envolvendo questões civis, empresariais, contratuais e
                internacionais.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
