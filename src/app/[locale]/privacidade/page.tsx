import type { Metadata } from 'next'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata, siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.privacy, path: '/privacidade' })
}

export default async function PrivacidadePage({ params }: Props) {
  const { locale } = await params
  const isPt = locale === 'pt'

  return (
    <article className="mx-auto max-w-prose px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        {isPt ? 'Legal' : 'Legal'}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink-950">
        {isPt ? 'Política de Privacidade' : 'Privacy Policy'}
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        {isPt ? 'Última atualização: novembro de 2026' : 'Last updated: November 2026'}
      </p>

      <div className="mt-10 space-y-5 text-base leading-relaxed text-ink-700 [&_a]:text-gold-600 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-gold-700 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-ink-950 [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-ink-950">
        {isPt ? (
          <>
            <h2>1. Quem somos</h2>
            <p>
              Este site é operado por <strong>Laís Almeida Mota Advocacia</strong> (OAB/DF), com escritório
              na CLN 211, Bloco A, Sala 222, Asa Norte, Brasília-DF. Para questões relacionadas a esta
              política, entre em contato pelo e-mail{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>2. Dados coletados</h2>
            <p>Coletamos apenas os dados que você nos fornece voluntariamente:</p>
            <ul>
              <li>
                <strong>Formulário de contato:</strong> nome, assunto e mensagem. Esses dados são
                transmitidos diretamente ao WhatsApp do escritório e não são armazenados em servidores
                próprios.
              </li>
              <li>
                <strong>Cookies de analytics:</strong> quando você aceita os cookies, utilizamos o Google
                Analytics (GA4) para coletar dados anonimizados de navegação (páginas visitadas,
                localização aproximada, dispositivo). Esses dados são usados exclusivamente para
                aprimorar o site.
              </li>
            </ul>

            <h2>3. Base legal (LGPD)</h2>
            <p>
              O tratamento dos seus dados tem como base legal o seu consentimento (art. 7º, I da Lei nº
              13.709/2018 — LGPD), que pode ser revogado a qualquer momento ao limpar os cookies do
              navegador ou recusar o banner de consentimento.
            </p>

            <h2>4. Compartilhamento de dados</h2>
            <p>
              Os dados de analytics são processados pelo Google LLC, nos termos da política de privacidade
              do Google. Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais.
            </p>

            <h2>5. Retenção de dados</h2>
            <p>
              Os dados de analytics são retidos pelo Google por até 14 meses. As mensagens enviadas pelo
              WhatsApp seguem a política de retenção do aplicativo.
            </p>

            <h2>6. Seus direitos</h2>
            <p>
              Nos termos da LGPD, você tem direito a acessar, corrigir, anonimizar, bloquear ou eliminar
              os seus dados pessoais, bem como a revogar o consentimento. Para exercer esses direitos,
              entre em contato pelo e-mail{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Utilizamos cookies próprios e de terceiros (Google Analytics) apenas após o seu consentimento
              expresso. Você pode gerenciar ou revogar o consentimento a qualquer momento nas configurações
              do navegador.
            </p>

            <h2>8. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. A data da última atualização consta no topo
              desta página.
            </p>
          </>
        ) : (
          <>
            <h2>1. Who we are</h2>
            <p>
              This site is operated by <strong>Laís Almeida Mota Advocacia</strong> (OAB/DF), based at
              CLN 211, Bloco A, Room 222, Asa Norte, Brasília, Brazil. For privacy-related enquiries,
              please contact us at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>2. Data we collect</h2>
            <p>We only collect information you provide voluntarily:</p>
            <ul>
              <li>
                <strong>Contact form:</strong> name, subject and message. This information is transmitted
                directly to the office WhatsApp account and is not stored on our own servers.
              </li>
              <li>
                <strong>Analytics cookies:</strong> when you accept cookies, we use Google Analytics (GA4)
                to collect anonymised browsing data (pages visited, approximate location, device type).
                This data is used solely to improve the site.
              </li>
            </ul>

            <h2>3. Legal basis (LGPD)</h2>
            <p>
              Data processing is based on your consent (Art. 7, I of Brazilian Law 13,709/2018 — LGPD),
              which may be withdrawn at any time by clearing browser cookies or declining the consent
              banner.
            </p>

            <h2>4. Data sharing</h2>
            <p>
              Analytics data is processed by Google LLC under their privacy policy. We do not sell or
              share your data with third parties for commercial purposes.
            </p>

            <h2>5. Retention</h2>
            <p>
              Analytics data is retained by Google for up to 14 months. WhatsApp messages follow
              WhatsApp's own retention policy.
            </p>

            <h2>6. Your rights</h2>
            <p>
              Under the LGPD, you have the right to access, correct, anonymise, block or delete your
              personal data, and to withdraw consent. To exercise these rights, contact us at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use first-party and third-party cookies (Google Analytics) only after your explicit
              consent. You may manage or revoke consent at any time through your browser settings.
            </p>

            <h2>8. Changes to this policy</h2>
            <p>
              We may update this policy periodically. The date of the last update is shown at the top of
              this page.
            </p>
          </>
        )}
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <Link
          href={localePath(locale, '/')}
          className="text-sm font-semibold text-ink-950 underline underline-offset-4 hover:text-gold-600"
        >
          ← {isPt ? 'Voltar ao início' : 'Back to home'}
        </Link>
      </div>
    </article>
  )
}
