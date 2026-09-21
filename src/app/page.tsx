import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { faqItems } from '@/lib/faq'
import { practiceAreas } from '@/lib/practiceAreas'
import { absoluteUrl, siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Advocacia Estratégica e Internacional em Brasília',
  description:
    'Laís Mota é advogada em Brasília com atuação estratégica em Direito Civil, Empresarial, Contratual e Consultoria Jurídica Internacional.',
  alternates: { canonical: absoluteUrl('/') },
}

const pillars = [
  {
    n: '01',
    title: 'Estratégia jurídica',
    body: 'Análise aprofundada do problema, dos riscos e dos possíveis caminhos antes da tomada de decisão.',
  },
  {
    n: '02',
    title: 'Atuação empresarial e internacional',
    body: 'Assessoria a empresas e empresários em contratos, negócios, comércio exterior e relações jurídicas que ultrapassam as fronteiras brasileiras.',
  },
  {
    n: '03',
    title: 'Atendimento personalizado',
    body: 'Compreensão da realidade específica de cada cliente e construção de soluções jurídicas compatíveis com seus objetivos.',
  },
]

const steps = [
  { n: '01', title: 'Conversa inicial', body: 'Entendimento do seu caso ou da necessidade da sua empresa, sem compromisso.' },
  { n: '02', title: 'Análise estratégica', body: 'Avaliação da legislação, das provas, dos riscos e dos possíveis cenários decisórios.' },
  { n: '03', title: 'Definição do caminho', body: 'Estruturação da solução jurídica mais adequada aos seus objetivos — preventiva, contratual ou contenciosa.' },
  { n: '04', title: 'Acompanhamento', body: 'Atuação direta até a resolução, com comunicação constante sobre cada etapa.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed photo with the headline overlaid on top at every breakpoint:
          bottom-anchored (vertical scrim) on mobile, right-anchored (horizontal scrim) on
          desktop, since the text sits over the photo the same way at both sizes now.
          `sticky` pins it while the next section scrolls up over it (see that section's
          `relative z-10` + opaque background) instead of just scrolling away normally. */}
      <section className="sticky top-0 z-0 min-h-[100svh] md:min-h-[92vh]">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            {/* Mobile: tighter portrait crop — the wide desktop crop loses too much of her
                when squeezed into a narrow mobile frame. Desktop: wide crop with room on
                the right for the overlaid headline. Both rendered, CSS picks one per breakpoint
                (Next/Image's standard art-direction pattern — no single-source responsive src). */}
            <Image
              src="/images/lais-mota-image.jpeg"
              alt="Laís Mota, advogada"
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-top md:hidden"
            />
            <Image
              src="/images/lais-mota-image.jpg"
              alt="Laís Mota, advogada"
              fill
              priority
              quality={85}
              sizes="100vw"
              className="hidden object-cover object-left md:block"
            />
          </div>
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(16,31,48,0) 32%, rgba(16,31,48,0.58) 62%, rgba(16,31,48,0.96) 92%)',
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(16,31,48,0) 42%, rgba(16,31,48,0.6) 66%, rgba(16,31,48,0.95) 88%)',
            }}
          />
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">Role para saber mais</span>
            <span className="h-8 w-px bg-white/40" aria-hidden="true" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12 pt-20 text-white md:inset-y-0 md:left-auto md:right-0 md:flex md:w-[48%] md:flex-col md:justify-center md:px-10 lg:px-16">
          <div className="reveal w-full max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">Advocacia estratégica e internacional</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] md:text-5xl">
              Estratégia jurídica para decisões que não podem dar errado.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
              Assessoria jurídica personalizada em Direito Civil, Empresarial, Contratual e Consultoria Jurídica
              Internacional — para pessoas físicas e para empresas com atuação no Brasil e no exterior.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
              >
                Agendar uma conversa
              </Link>
              <Link
                href="/areas-de-atuacao"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                Áreas de atuação
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quem atende + os três pilares — relative z-10 + opaque bg so this slides up and
          covers the sticky hero above like a layer, instead of the hero just scrolling
          off normally. */}
      <section className="relative z-10 bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">I · Quem atende</p>
            <div>
              <h2 className="max-w-2xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
                Advocacia técnica, estratégica e personalizada.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700">
                Laís Mota atua em duas frentes: assessoria jurídica de pessoas físicas em questões civis relevantes, e
                assessoria de empresas e empresários em contratos, estruturação de negócios, relações empresariais e
                operações internacionais. Cada caso é analisado não apenas pela questão jurídica apresentada, mas por
                seus impactos patrimoniais, familiares, empresariais e, quando aplicável, internacionais.
              </p>
            </div>
          </div>

          <ul className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-3">
            {pillars.map((item, i) => (
              <li key={item.n} className={`reveal stagger-${i + 1}`}>
                <span className="font-serif text-3xl text-gold-600">{item.n}</span>
                <h3 className="mt-4 font-serif text-lg text-ink-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Practice areas */}
      <section className="relative z-10 overflow-hidden bg-ink-950 py-20 text-white md:py-28">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-8 select-none font-serif text-[9rem] font-semibold leading-none text-white/[0.04] md:text-[14rem]"
        >
          Áreas
        </p>

        <div className="relative mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:items-end md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">II · Áreas de atuação</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug md:text-4xl">Onde posso ajudar.</h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
            {practiceAreas.map((area, i) => (
              <Link
                key={area.slug}
                href={`/areas-de-atuacao/${area.slug}`}
                className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[220px] flex-col justify-between bg-ink-950 p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-ink-900 hover:shadow-card`}
              >
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{area.audience}</span>
                  <span className="transition group-hover:text-gold-400">↗</span>
                </div>
                <div>
                  <h3 className="max-w-xs font-serif text-xl">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{area.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brasília como base — 50/50 split: image+flag left, atuação nacional right.
          Image column stays aspect-locked to the photo's native ratio (1672x941) so
          the full image always shows with no cropping (and the flag's percentage
          position always lines up with the actual pole). */}
      <section className="relative z-10 grid bg-ink-950 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[1672/941] w-full overflow-hidden">
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <filter id="flag-wind" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.045" numOctaves="2" seed="9" result="wind">
                <animate
                  attributeName="baseFrequency"
                  dur="4.2s"
                  repeatCount="indefinite"
                  values="0.006 0.038;0.009 0.055;0.005 0.043;0.007 0.062;0.006 0.038"
                  keyTimes="0;0.28;0.54;0.78;1"
                  calcMode="spline"
                  keySplines=".42 0 .58 1;.42 0 .58 1;.42 0 .58 1;.42 0 .58 1"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="wind" scale="15" xChannelSelector="R" yChannelSelector="G">
                <animate
                  attributeName="scale"
                  dur="3.4s"
                  repeatCount="indefinite"
                  values="12;27;16;30;12"
                  keyTimes="0;0.24;0.51;0.76;1"
                  calcMode="spline"
                  keySplines=".37 0 .63 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1"
                />
              </feDisplacementMap>
            </filter>
          </svg>
          <Image
            src="/images/brasilia-congresso-sem-bandeira.jpg"
            alt="Congresso Nacional, Brasília"
            fill
            quality={85}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="flag-gust absolute" style={{ left: '74%', top: '4%', width: '15%' }}>
            <img
              src="/images/bandeira-sem-fundo.webp"
              alt=""
              aria-hidden="true"
              className="waving-flag block w-full"
            />
          </div>
        </div>

        <div className="reveal bg-ink-950 px-6 py-14 text-white md:px-12 md:py-16 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">Atuação em todo o Brasil</p>
          <h2 className="mt-5 max-w-md font-serif text-3xl leading-tight md:text-4xl">
            De Brasília para todo o Brasil — e além.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            O atendimento é realizado de forma presencial e online — por videoconferência e, quando adequado, por
            ligação telefônica. Essa estrutura permite atender clientes em Brasília, em outros estados brasileiros
            e também clientes envolvidos em questões internacionais.
          </p>
          <Link href="/contato" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition hover:text-gold-300">
            Agendar uma conversa <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Diferenciais — international experience */}
      <section className="relative z-10 bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">III · Diferenciais</p>
            <div>
              <h2 className="max-w-2xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
                Conhecimento jurídico com visão de negócio.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700">
                Formação em Comércio Exterior permite analisar operações não apenas sob o aspecto jurídico, mas também
                considerando sua lógica comercial, contratual e internacional — indo além de atuar em processos ou
                elaborar contratos, para compreender o contexto do cliente e estruturar a solução mais adequada aos
                seus objetivos.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            <div className="reveal stagger-1 bg-paper p-8">
              <h3 className="font-serif text-lg text-ink-950">Operações internacionais</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                Experiência na estruturação jurídica de operações envolvendo importação de produtos regulados
                provenientes da China, além de projetos de internacionalização e estruturação empresarial entre o
                Brasil e o Oriente Médio, incluindo Omã.
              </p>
            </div>
            <div className="reveal stagger-2 bg-paper p-8">
              <h3 className="font-serif text-lg text-ink-950">Instrumentos de negociação</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                Elaboração e análise de contratos comerciais, memorandos de entendimento (MOUs), acordos de
                confidencialidade (NDAs) e estruturas contratuais voltadas à proteção das partes em operações
                transfronteiriças.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">IV · Como funciona</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
              Do primeiro contato à resolução.
            </h2>
          </div>

          <ol className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.n} className={`reveal stagger-${i + 1}`}>
                <span className="text-sm font-semibold text-gold-600">{step.n}</span>
                <h3 className="mt-3 font-serif text-lg text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 bg-gold-50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">V · Perguntas frequentes</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
              Antes de agendar, você pode querer saber.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-line border-t border-b border-line md:ml-[calc(170px+4rem)]">
            {faqItems.map((item, i) => (
              <details key={item.question} className={`reveal stagger-${(i % 4) + 1} group py-5`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg text-ink-950 marker:content-none">
                  {item.question}
                  <span className="shrink-0 text-xl text-gold-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement / CTA */}
      <section className="relative z-10 overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 15% 20%, rgba(180,143,76,0.22), transparent 45%)',
          }}
        />
        <div className="reveal relative mx-auto max-w-content px-5 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Novas oportunidades</p>
          <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
            Vamos transformar uma questão jurídica em decisão segura?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60">
            {siteConfig.oabNumber} · Atendimento presencial e online, com hora marcada.
          </p>
          <Link
            href="/contato"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
          >
            Falar com Laís Mota
          </Link>
        </div>
      </section>
    </>
  )
}
