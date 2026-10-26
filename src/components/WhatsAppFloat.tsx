import { siteConfig } from '@/lib/site'

// The pre-filled greeting tells the WhatsApp assistant the contact came from the site.
export function WhatsAppFloat({ label, greeting }: { label: string; greeting: string }) {
  return (
    <a
      href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(greeting)}`}
      target="_blank"
      rel="noreferrer"
      data-track="botao-flutuante"
      aria-label={label}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-5 pr-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
    >
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#25D366]" aria-hidden="true">
        ✦
      </span>
    </a>
  )
}
