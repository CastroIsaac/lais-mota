import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { absoluteUrl, siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Agende uma conversa com Laís Mota para tratar do seu caso ou das necessidades jurídicas da sua empresa.',
  alternates: { canonical: absoluteUrl('/contato') },
}

export default function ContatoPage() {
  return (
    <section className="mx-auto grid max-w-content gap-14 px-5 pb-20 pt-32 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-8 md:pb-28 md:pt-40">
      <div className="reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">I · Contato</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink-950 md:text-5xl">Vamos conversar sobre o seu caso.</h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700">
          Preencha o formulário ao lado ou fale diretamente pelos canais abaixo. O atendimento é feito com hora
          marcada, mediante confirmação prévia.
        </p>

        <dl className="mt-10 space-y-5 border-t border-line pt-8 text-sm">
          <div>
            <dt className="font-semibold text-ink-950">Telefone / WhatsApp</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.phoneDisplay}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">E-mail</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">Escritório</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.addressLine}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">Atendimento</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.hoursLine}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">{siteConfig.oabNumber}</dt>
          </div>
        </dl>
      </div>

      <div className="reveal stagger-1">
        <ContactForm />
      </div>
    </section>
  )
}
