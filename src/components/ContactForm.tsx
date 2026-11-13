'use client'

import { useState, type FormEvent } from 'react'
import { trackWhatsAppClick } from '@/lib/analytics'
import type { Dictionary } from '@/i18n'
import { siteConfig } from '@/lib/site'

const inputClass = 'rounded-sm border bg-white px-4 py-3 text-base font-normal text-ink-950 outline-none transition focus:ring-2 focus:ring-gold-500/20'

export function ContactForm({ t }: { t: Dictionary['form'] }) {
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<'nome' | 'assunto' | 'mensagem', string>>>({})
  const [success, setSuccess] = useState(false)

  function validate(data: FormData) {
    const errs: typeof errors = {}
    if (!data.get('nome')?.toString().trim()) errs.nome = t.errors.name
    if (!data.get('assunto')?.toString().trim()) errs.assunto = t.errors.subject
    if (!data.get('mensagem')?.toString().trim()) errs.mensagem = t.errors.message
    return errs
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const errs = validate(data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)

    const text = t.whatsappTemplate
      .replace('{name}', String(data.get('nome')))
      .replace('{subject}', String(data.get('assunto')))
      .replace('{message}', String(data.get('mensagem')))
    const url = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(text)}`
    trackWhatsAppClick('formulario-contato')
    window.open(url, '_blank', 'noreferrer')
    setSubmitting(false)
    setSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 rounded-sm bg-gold-50 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink-950" htmlFor="form-nome">{t.name}</label>
        <input
          id="form-nome"
          name="nome"
          autoComplete="name"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'err-nome' : undefined}
          onChange={() => errors.nome && setErrors((e) => ({ ...e, nome: undefined }))}
          className={`${inputClass} ${errors.nome ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-line focus:border-gold-500'}`}
        />
        {errors.nome && <p id="err-nome" role="alert" className="text-xs text-red-600">{errors.nome}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink-950" htmlFor="form-assunto">{t.subject}</label>
        <input
          id="form-assunto"
          name="assunto"
          aria-invalid={!!errors.assunto}
          aria-describedby={errors.assunto ? 'err-assunto' : undefined}
          onChange={() => errors.assunto && setErrors((e) => ({ ...e, assunto: undefined }))}
          className={`${inputClass} ${errors.assunto ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-line focus:border-gold-500'}`}
        />
        {errors.assunto && <p id="err-assunto" role="alert" className="text-xs text-red-600">{errors.assunto}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink-950" htmlFor="form-mensagem">{t.message}</label>
        <textarea
          id="form-mensagem"
          name="mensagem"
          rows={5}
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? 'err-mensagem' : undefined}
          onChange={() => errors.mensagem && setErrors((e) => ({ ...e, mensagem: undefined }))}
          className={`resize-y ${inputClass} ${errors.mensagem ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-line focus:border-gold-500'}`}
        />
        {errors.mensagem && <p id="err-mensagem" role="alert" className="text-xs text-red-600">{errors.mensagem}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-between rounded bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-600 disabled:opacity-60"
      >
        {t.submit} <span aria-hidden="true">↗</span>
      </button>

      {success && (
        <p role="status" className="text-sm font-medium text-gold-700">{t.success}</p>
      )}

      <p className="text-xs leading-relaxed text-ink-500">
        {t.note}
      </p>
    </form>
  )
}
