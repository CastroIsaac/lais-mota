import { siteConfig } from '@/lib/site'

export function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-5 pr-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
    >
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#25D366]" aria-hidden="true">
        ✦
      </span>
    </a>
  )
}
