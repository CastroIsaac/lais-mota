// Blog posts (Portuguese only — the blog is not translated). To publish a post,
// add it to `posts` below and set `draft: false`; drafts only show up in `npm run dev`.
// The blog link in the header/footer and the sitemap entries appear once at least
// one post is published.

export type PostBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  // <title> for Google (~40 chars; " | Laís Mota Advocacia" is appended). Defaults to `title`.
  seoTitle?: string
  // Meta description and card summary (~150 chars).
  description: string
  publishedAt: string // YYYY-MM-DD
  updatedAt?: string // YYYY-MM-DD — bump when the content changes
  // Practice-area slug the post belongs to; the post is linked from that area's page.
  area?: string
  draft?: boolean
  body: PostBlock[]
}

export const blogCopy = {
  label: 'Blog',
  kicker: 'I · Blog',
  title: 'Artigos e orientações jurídicas.',
  intro:
    'Conteúdos sobre contratos, direito empresarial, comércio exterior e direito civil, escritos para ajudar você a tomar decisões mais seguras.',
  metaTitle: 'Blog: Artigos sobre Contratos, Empresas e Família',
  metaDescription:
    'Artigos de Laís Mota, advogada em Brasília, sobre contratos, direito empresarial, comércio exterior, divórcio, inventário e direito civil.',
  back: '← Todos os artigos',
  readingTime: (minutes: number) => `${minutes} min de leitura`,
  related: 'Artigos relacionados',
  disclaimer:
    'Conteúdo de caráter informativo, que não substitui a análise individual de um caso por profissional habilitado.',
  cta: 'Conversar sobre o meu caso',
}

const posts: BlogPost[] = [
  {
    slug: 'o-que-revisar-antes-de-assinar-um-contrato',
    title: 'O que revisar antes de assinar um contrato: 7 pontos de atenção',
    seoTitle: 'O que Revisar Antes de Assinar um Contrato',
    description:
      'Partes, objeto, preço, prazos, multas, rescisão e foro: os pontos que merecem atenção antes de assinar um contrato, nacional ou internacional.',
    publishedAt: '2026-10-19',
    area: 'direito-contratual',
    // Example post — Laís reviews the text before it goes live.
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Boa parte dos conflitos contratuais nasce antes da assinatura: em uma cláusula vaga, em um prazo mal definido ou em uma multa que ninguém leu com atenção. Revisar o contrato com calma custa muito menos do que discutir os seus efeitos depois.',
      },
      { type: 'h2', text: '1. Quem são as partes' },
      {
        type: 'p',
        text: 'Confira se todas as partes estão corretamente identificadas, com nome completo ou razão social, CPF ou CNPJ e endereço. No caso de empresas, verifique se quem assina tem poderes para representá-la.',
      },
      { type: 'h2', text: '2. O que está sendo contratado' },
      {
        type: 'p',
        text: 'O objeto do contrato deve ser descrito com precisão: o que será entregue ou prestado, em que quantidade, com qual padrão de qualidade e onde. Quanto mais genérica a descrição, maior o espaço para divergências.',
      },
      { type: 'h2', text: '3. Preço, pagamento e reajuste' },
      {
        type: 'ul',
        items: [
          'Valor total e forma de pagamento (à vista, parcelado, por etapa).',
          'Datas de vencimento e consequências do atraso.',
          'Índice e periodicidade de reajuste, em contratos de longa duração.',
        ],
      },
      { type: 'h2', text: '4. Prazos e vigência' },
      {
        type: 'p',
        text: 'Verifique quando o contrato começa, quando termina e se há renovação automática. Prazos de entrega e de execução também devem estar claros.',
      },
      { type: 'h2', text: '5. Multas e penalidades' },
      {
        type: 'p',
        text: 'Leia com atenção as cláusulas de multa: em que situações se aplicam, qual o valor e se são proporcionais. Multas excessivas ou unilaterais costumam ser fonte de discussão.',
      },
      { type: 'h2', text: '6. Como o contrato pode ser encerrado' },
      {
        type: 'p',
        text: 'O contrato deve prever as hipóteses de rescisão, o aviso prévio necessário e o que acontece com valores já pagos ou serviços já prestados.',
      },
      { type: 'h2', text: '7. Onde eventuais conflitos serão resolvidos' },
      {
        type: 'p',
        text: 'A cláusula de foro define a cidade em que uma eventual ação judicial será proposta; em alguns contratos, as partes optam pela arbitragem. Em contratos internacionais, é essencial definir também a lei aplicável, o idioma que prevalece e a moeda de pagamento.',
      },
      { type: 'h2', text: 'Quando buscar orientação jurídica' },
      {
        type: 'p',
        text: 'Contratos de valor relevante, de longa duração ou com parceiros estrangeiros merecem uma análise jurídica antes da assinatura. Identificar riscos nessa etapa permite negociar ajustes enquanto ainda há espaço para isso.',
      },
    ],
  },
]

const visible = (post: BlogPost) => !post.draft || process.env.NODE_ENV === 'development'

// Newest first.
export function getPosts() {
  return posts.filter(visible).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug)
}

export function getPostsForArea(area: string) {
  return getPosts().filter((post) => post.area === area)
}

export function hasBlog() {
  return getPosts().length > 0
}

export function readingMinutes(post: BlogPost) {
  const text = post.body.map((block) => (block.type === 'ul' ? block.items.join(' ') : block.text)).join(' ')
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
}

// '2026-10-19' -> '19 de outubro de 2026'
export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
