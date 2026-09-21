'use client'

import { useState, type FormEvent } from 'react'
import { siteConfig } from '@/lib/site'

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)

    const data = new FormData(event.currentTarget)
    const nome = data.get('nome')
    const assunto = data.get('assunto')
    const mensagem = data.get('mensagem')

    const text = `Olá, meu nome é ${nome}.\nAssunto: ${assunto}\n\n${mensagem}`
    const url = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noreferrer')
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-sm bg-gold-50 p-6 md:p-8">
      <label className="flex flex-col gap-2 text-sm font-semibold text-ink-950">
        Nome
        <input
          name="nome"
          required
          autoComplete="name"
          className="rounded-sm border border-line bg-white px-4 py-3 text-base font-normal text-ink-950 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-ink-950">
        Assunto
        <input
          name="assunto"
          required
          className="rounded-sm border border-line bg-white px-4 py-3 text-base font-normal text-ink-950 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-ink-950">
        Conte brevemente sobre o seu caso
        <textarea
          name="mensagem"
          required
          rows={5}
          className="resize-y rounded-sm border border-line bg-white px-4 py-3 text-base font-normal text-ink-950 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-between rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-600 disabled:opacity-60"
      >
        Enviar pelo WhatsApp <span aria-hidden="true">↗</span>
      </button>
      <p className="text-xs leading-relaxed text-ink-500">
        Ao enviar, sua mensagem será aberta no WhatsApp para confirmação e envio.
      </p>
    </form>
  )
}
