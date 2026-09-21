import Link from 'next/link'
import { siteConfig } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-ink-950/10 bg-ink-950 text-white">
      <div className="mx-auto grid w-full max-w-content gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <span className="font-serif text-lg">Laís Mota</span>
          <span className="mt-0.5 block text-[0.62rem] font-medium uppercase tracking-[0.28em] text-gold-400">
            Advocacia
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Assessoria jurídica direta e transparente, com atenção a cada detalhe do seu caso.
          </p>
        </div>

        <div className="text-sm text-white/70">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contato</p>
          <p>{siteConfig.phoneDisplay}</p>
          <p className="mt-1">{siteConfig.email}</p>
          <p className="mt-1">{siteConfig.addressLine}</p>
        </div>

        <nav className="text-sm text-white/70" aria-label="Navegação do rodapé">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Navegação</p>
          <ul className="space-y-2">
            <li><Link className="hover:text-gold-400" href="/sobre">Sobre</Link></li>
            <li><Link className="hover:text-gold-400" href="/areas-de-atuacao">Áreas de atuação</Link></li>
            <li><Link className="hover:text-gold-400" href="/contato">Contato</Link></li>
          </ul>
          {(siteConfig.instagramUrl || siteConfig.linkedinUrl) && (
            <div className="mt-6 flex gap-4">
              {siteConfig.instagramUrl && (
                <a className="hover:text-gold-400" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              )}
              {siteConfig.linkedinUrl && (
                <a className="hover:text-gold-400" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </nav>
      </div>

      <div className="border-t border-white/10 px-5 py-5 md:px-8">
        <p className="mx-auto max-w-content text-xs text-white/40">
          {siteConfig.oabNumber} · © {new Date().getFullYear()} {siteConfig.attorneyName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
