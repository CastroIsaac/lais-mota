import type { Metadata } from 'next'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata, siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.terms, path: '/termos' })
}

export default async function TermosPage({ params }: Props) {
  const { locale } = await params
  const isPt = locale === 'pt'

  return (
    <article className="mx-auto max-w-prose px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        {isPt ? 'Legal' : 'Legal'}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink-950">
        {isPt ? 'Termos de Uso' : 'Terms of Use'}
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        {isPt ? 'Última atualização: novembro de 2026' : 'Last updated: November 2026'}
      </p>

      <div className="mt-10 space-y-5 text-base leading-relaxed text-ink-700 [&_a]:text-gold-600 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-gold-700 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-ink-950 [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-ink-950">
        {isPt ? (
          <>
            <h2>1. Finalidade do site</h2>
            <p>
              Este site tem finalidade exclusivamente informativa. Nenhuma informação aqui publicada
              constitui aconselhamento jurídico, e a leitura deste conteúdo não estabelece relação
              advogado-cliente.
            </p>

            <h2>2. Restrições da OAB</h2>
            <p>
              Em conformidade com o Código de Ética e Disciplina da OAB e com o Provimento 205/2021,
              este site não faz promessas de resultado, não divulga nomes de clientes, valores de causas
              ou de honorários, e não realiza captação irregular de clientela.
            </p>

            <h2>3. Propriedade intelectual</h2>
            <p>
              Todo o conteúdo deste site — textos, imagens, logotipo e identidade visual — é de
              titularidade de Laís Almeida Mota. É vedada a reprodução total ou parcial sem autorização
              prévia e por escrito.
            </p>

            <h2>4. Limitação de responsabilidade</h2>
            <p>
              O escritório não se responsabiliza por decisões tomadas com base nas informações gerais
              deste site, nem por eventuais indisponibilidades ou erros de acesso. Para análise
              individualizada, entre em contato para agendamento.
            </p>

            <h2>5. Links externos</h2>
            <p>
              Este site pode conter links para páginas externas. O escritório não controla o conteúdo
              de sites de terceiros e não se responsabiliza por seu conteúdo ou práticas de privacidade.
            </p>

            <h2>6. Lei aplicável</h2>
            <p>
              Estes termos são regidos pela lei brasileira. Fica eleito o foro da Comarca de Brasília-DF
              para a resolução de quaisquer controvérsias.
            </p>

            <h2>7. Contato</h2>
            <p>
              Dúvidas sobre estes termos podem ser enviadas para{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </>
        ) : (
          <>
            <h2>1. Purpose of this site</h2>
            <p>
              This site is for informational purposes only. Nothing published here constitutes legal
              advice, and reading this content does not create a lawyer-client relationship.
            </p>

            <h2>2. OAB professional rules</h2>
            <p>
              In accordance with the Brazilian Bar Association (OAB) Code of Ethics and Professional
              Conduct, this site makes no promises of results, does not disclose client names, case
              values or fee amounts, and does not engage in irregular client solicitation.
            </p>

            <h2>3. Intellectual property</h2>
            <p>
              All content on this site — texts, images, logo and visual identity — is owned by Laís
              Almeida Mota. Reproduction in whole or in part is prohibited without prior written
              authorisation.
            </p>

            <h2>4. Limitation of liability</h2>
            <p>
              The office accepts no liability for decisions made based on the general information on
              this site, or for any unavailability or access errors. For individual analysis, please
              contact us to arrange a meeting.
            </p>

            <h2>5. External links</h2>
            <p>
              This site may contain links to external pages. The office does not control third-party
              site content and accepts no responsibility for their content or privacy practices.
            </p>

            <h2>6. Governing law</h2>
            <p>
              These terms are governed by Brazilian law. The courts of Brasília, DF, are the agreed
              venue for resolving any disputes.
            </p>

            <h2>7. Contact</h2>
            <p>
              Questions about these terms may be sent to{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
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
