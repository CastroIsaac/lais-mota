// Service pages (Portuguese only): one page per thing people actually search for —
// "advogada divórcio Brasília", "inventário Brasília"… — under its practice area, at
// /areas-de-atuacao/<area>/<slug>. Same publishing rule as the blog: `draft: true`
// shows only in `npm run dev`; set `draft: false` once Laís has reviewed the text.
// The text is general guidance, with no promises of results (OAB Provimento 205/2021).

import type { PostBlock } from '@/content/blog'

export type ServicePage = {
  slug: string
  // Practice-area slug (see practiceAreas in the dictionaries).
  area: string
  title: string
  // <title> for Google (~40 chars; " | Laís Mota Advocacia" is appended).
  seoTitle: string
  // Meta description (~150 chars).
  description: string
  // One line under the area's list of services.
  summary: string
  updatedAt: string // YYYY-MM-DD — bump when the content changes
  draft?: boolean
  body: PostBlock[]
  faq: { question: string; answer: string }[]
}

export const servicesCopy = {
  heading: 'Serviços nesta área',
  faqTitle: 'Perguntas frequentes',
  cta: 'Conversar sobre o meu caso',
  disclaimer:
    'Conteúdo de caráter informativo, que não substitui a análise individual de um caso por profissional habilitado.',
}

const services: ServicePage[] = [
  {
    slug: 'divorcio',
    area: 'direito-civil',
    title: 'Divórcio em Brasília',
    seoTitle: 'Advogada de Divórcio em Brasília-DF',
    description:
      'Divórcio consensual ou litigioso em Brasília, em cartório ou na Justiça: partilha de bens, guarda e pensão. Atendimento presencial na Asa Norte ou online.',
    summary: 'Consensual ou litigioso, em cartório ou na Justiça, com partilha de bens, guarda e pensão.',
    updatedAt: '2026-10-27',
    draft: true,
    body: [
      {
        type: 'p',
        text: 'O divórcio é um momento de decisões importantes: o que acontece com os bens, com a casa, com os filhos e com as finanças de cada um. Uma orientação jurídica desde o início ajuda a escolher o caminho mais adequado e a evitar acordos que tragam prejuízo depois.',
      },
      { type: 'h2', text: 'Divórcio consensual e divórcio litigioso' },
      {
        type: 'p',
        text: 'Quando o casal está de acordo sobre o fim do casamento e sobre as suas consequências, o divórcio é consensual. Quando há divergência — sobre a partilha, a guarda, a pensão ou o próprio divórcio —, ele é litigioso e precisa ser decidido pela Justiça. Não é necessário apresentar motivo nem passar por separação antes.',
      },
      { type: 'h2', text: 'Divórcio em cartório' },
      {
        type: 'p',
        text: 'Havendo acordo, o divórcio pode, em muitos casos, ser feito em cartório, por escritura pública, o que costuma ser mais simples. A presença de advogado é obrigatória. Quando há filhos menores ou incapazes, as questões de guarda, convivência e pensão precisam ser resolvidas antes na Justiça. Em diversas situações, o ato pode ser feito por videoconferência, pela plataforma e-Notariado.',
      },
      { type: 'h2', text: 'O que é definido no divórcio' },
      {
        type: 'ul',
        items: [
          'Partilha dos bens, conforme o regime de bens do casamento',
          'Guarda e convivência com os filhos',
          'Pensão alimentícia dos filhos e, quando cabível, entre os cônjuges',
          'Manutenção ou retirada do sobrenome de casado',
          'Situação de imóveis, financiamentos, dívidas e empresas do casal',
        ],
      },
      { type: 'h2', text: 'Como funciona o atendimento' },
      {
        type: 'p',
        text: 'A primeira conversa serve para entender a situação da família e do patrimônio, os documentos disponíveis e o que cada parte pretende. A partir disso, é definido o caminho mais adequado — cartório, acordo homologado na Justiça ou ação judicial — e o que é necessário para cada etapa. O atendimento pode ser presencial, no escritório na Asa Norte, ou online.',
      },
    ],
    faq: [
      {
        question: 'Preciso de advogado para me divorciar em cartório?',
        answer:
          'Sim. A lei exige a assistência de advogado no divórcio em cartório. O mesmo advogado pode atender as duas partes quando há acordo.',
      },
      {
        question: 'É possível se divorciar e fazer a partilha dos bens depois?',
        answer:
          'Sim. O divórcio pode ser feito primeiro e a partilha dos bens resolvida depois, mas é importante avaliar os efeitos dessa escolha no patrimônio de cada um.',
      },
      {
        question: 'Moro fora de Brasília. O atendimento pode ser online?',
        answer:
          'Sim. O atendimento é feito por videoconferência para clientes de outras cidades e estados, e muitos atos podem ser realizados de forma eletrônica.',
      },
    ],
  },
  {
    slug: 'inventario',
    area: 'direito-civil',
    title: 'Inventário em Brasília',
    seoTitle: 'Advogada de Inventário em Brasília-DF',
    description:
      'Inventário em cartório ou na Justiça em Brasília: partilha da herança, ITCMD, prazos e documentos. Atendimento presencial na Asa Norte ou online.',
    summary: 'Inventário em cartório ou judicial, partilha da herança, prazos e impostos.',
    updatedAt: '2026-10-27',
    draft: true,
    body: [
      {
        type: 'p',
        text: 'O inventário é o procedimento que levanta os bens, as dívidas e os herdeiros de uma pessoa que faleceu e formaliza a divisão da herança. Sem ele, os bens não podem ser transferidos, vendidos ou regularizados em nome dos herdeiros.',
      },
      { type: 'h2', text: 'Inventário em cartório ou na Justiça' },
      {
        type: 'p',
        text: 'Quando todos os herdeiros estão de acordo, o inventário pode, em muitos casos, ser feito em cartório, por escritura pública, com a assistência de advogado — o que costuma ser mais rápido. Havendo divergência entre os herdeiros, o caminho é o inventário judicial. A existência de testamento ou de herdeiros menores ou incapazes exige uma análise própria para definir se o cartório é possível.',
      },
      { type: 'h2', text: 'Prazo e imposto' },
      {
        type: 'p',
        text: 'A lei prevê o prazo de dois meses, a partir do falecimento, para a abertura do inventário. O atraso pode gerar multa sobre o imposto de transmissão (ITCMD), conforme a lei de cada estado. Por isso, vale buscar orientação logo nas primeiras semanas, mesmo que a família ainda não tenha reunido todos os documentos.',
      },
      { type: 'h2', text: 'Documentos normalmente necessários' },
      {
        type: 'ul',
        items: [
          'Certidão de óbito e documentos pessoais de quem faleceu',
          'Documentos dos herdeiros e, se houver, do cônjuge ou companheiro',
          'Certidão de casamento ou comprovação da união estável',
          'Matrículas de imóveis, documentos de veículos e extratos de contas e investimentos',
          'Informações sobre dívidas e sobre empresas das quais a pessoa era sócia',
        ],
      },
      { type: 'h2', text: 'Como funciona o atendimento' },
      {
        type: 'p',
        text: 'O primeiro passo é entender a família, os bens e se há acordo entre os herdeiros. Com isso, é definido o caminho — cartório ou Justiça —, o que falta reunir e como será feita a partilha. O atendimento pode ser presencial, no escritório na Asa Norte, ou online, inclusive para herdeiros que moram em outras cidades.',
      },
    ],
    faq: [
      {
        question: 'Os bens podem ser vendidos antes de terminar o inventário?',
        answer:
          'Em regra, a venda depende da conclusão do inventário ou de autorização específica. Cada situação precisa ser analisada antes de qualquer negociação.',
      },
      {
        question: 'É preciso fazer inventário quando a pessoa deixou poucos bens?',
        answer:
          'Na maioria dos casos, sim — inclusive para transferir um único imóvel ou veículo. Valores pequenos em conta podem, em algumas situações, ser liberados por procedimento mais simples.',
      },
      {
        question: 'Herdeiros que moram em outros estados precisam vir a Brasília?',
        answer:
          'Não necessariamente. Muitos atos podem ser feitos por procuração ou de forma eletrônica, e o atendimento pode ser feito por videoconferência.',
      },
    ],
  },
  {
    slug: 'uniao-estavel',
    area: 'direito-civil',
    title: 'União estável em Brasília',
    seoTitle: 'Advogada de União Estável em Brasília',
    description:
      'Reconhecimento, contrato e dissolução de união estável em Brasília: regime de bens, partilha, guarda e pensão. Atendimento presencial ou online.',
    summary: 'Contrato, reconhecimento e dissolução de união estável, com partilha de bens.',
    updatedAt: '2026-10-27',
    draft: true,
    body: [
      {
        type: 'p',
        text: 'A união estável é a convivência pública, contínua e duradoura com o objetivo de constituir família. Ela gera direitos e deveres parecidos com os do casamento — inclusive sobre os bens adquiridos durante a relação —, mesmo quando o casal nunca formalizou nada.',
      },
      { type: 'h2', text: 'Formalizar a união estável' },
      {
        type: 'p',
        text: 'A união estável pode ser formalizada por escritura pública em cartório ou por contrato escrito. A formalização traz segurança para o casal: define a data de início da relação, permite escolher o regime de bens e facilita a comprovação perante bancos, planos de saúde, previdência e órgãos públicos. Sem contrato escrito, aplica-se, em regra, o regime da comunhão parcial de bens.',
      },
      { type: 'h2', text: 'Reconhecimento e dissolução' },
      {
        type: 'p',
        text: 'Quando a relação termina, é preciso resolver a partilha dos bens e, havendo filhos, a guarda, a convivência e a pensão. Com acordo, a dissolução pode, em muitos casos, ser feita em cartório. Sem acordo — ou quando uma das partes nega que a união existiu —, o reconhecimento e a dissolução são pedidos na Justiça, com a apresentação de provas da convivência.',
      },
      { type: 'h2', text: 'Situações em que a orientação faz diferença' },
      {
        type: 'ul',
        items: [
          'Escolha do regime de bens antes de comprar um imóvel juntos',
          'Separação com bens, financiamentos ou empresa em comum',
          'Comprovação da união para pensão por morte ou herança',
          'Conversão da união estável em casamento',
        ],
      },
    ],
    faq: [
      {
        question: 'Quanto tempo de convivência caracteriza união estável?',
        answer:
          'A lei não fixa um prazo mínimo. O que importa é a convivência pública, contínua e duradoura com o objetivo de constituir família, analisada caso a caso.',
      },
      {
        question: 'Morar em casas separadas impede a união estável?',
        answer:
          'Não necessariamente. Morar junto é um forte indício, mas não é requisito obrigatório — o conjunto da relação é que é avaliado.',
      },
      {
        question: 'Posso escolher o regime de bens na união estável?',
        answer:
          'Sim, por meio de contrato escrito ou escritura pública. Sem essa escolha, aplica-se, em regra, a comunhão parcial de bens.',
      },
    ],
  },
  {
    slug: 'dissolucao-de-sociedade',
    area: 'direito-empresarial',
    title: 'Dissolução de sociedade e saída de sócio',
    seoTitle: 'Dissolução de Sociedade em Brasília',
    description:
      'Saída de sócio, exclusão, apuração de haveres e dissolução de empresa em Brasília. Assessoria preventiva e em conflitos societários, presencial ou online.',
    summary: 'Saída ou exclusão de sócio, apuração de haveres e encerramento da sociedade.',
    updatedAt: '2026-10-27',
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Conflitos entre sócios estão entre as situações mais delicadas para uma empresa: afetam o caixa, a gestão, os clientes e, muitas vezes, relações pessoais de longa data. Conduzir a saída de um sócio ou o encerramento da sociedade com estratégia reduz o desgaste e protege o patrimônio de todos.',
      },
      { type: 'h2', text: 'Dissolução parcial e dissolução total' },
      {
        type: 'p',
        text: 'Na dissolução parcial, a empresa continua funcionando e apenas um ou alguns sócios deixam a sociedade — por vontade própria (retirada), por exclusão, por falecimento ou por outras hipóteses previstas em lei e no contrato social. Na dissolução total, a sociedade é encerrada, com a liquidação do patrimônio e o pagamento das obrigações.',
      },
      { type: 'h2', text: 'Apuração de haveres' },
      {
        type: 'p',
        text: 'Quando um sócio sai, é preciso calcular quanto ele tem a receber pela sua participação — a chamada apuração de haveres. O contrato social e o acordo de sócios, quando existem, costumam definir os critérios. Na falta deles, ou havendo divergência, a apuração pode ser feita na Justiça, normalmente com apoio de perícia contábil.',
      },
      { type: 'h2', text: 'Como a assessoria atua' },
      {
        type: 'ul',
        items: [
          'Análise do contrato social, do acordo de sócios e da situação da empresa',
          'Negociação da saída e redação da alteração contratual',
          'Notificações e medidas para proteger a gestão durante o conflito',
          'Ação de dissolução parcial e apuração de haveres, quando não há acordo',
          'Revisão preventiva do contrato social para evitar conflitos futuros',
        ],
      },
    ],
    faq: [
      {
        question: 'Um sócio pode sair da empresa sem a concordância dos outros?',
        answer:
          'Em muitos casos, sim, observando o que dizem a lei e o contrato social, inclusive quanto a prazos de aviso. As regras variam conforme o tipo de sociedade e o que foi pactuado.',
      },
      {
        question: 'Um sócio pode ser excluído da sociedade?',
        answer:
          'Sim, em situações específicas previstas em lei e no contrato social, como falta grave no cumprimento de suas obrigações. A exclusão exige cuidado com o procedimento para não ser anulada.',
      },
      {
        question: 'É possível evitar esse tipo de conflito?',
        answer:
          'Um contrato social bem estruturado e um acordo de sócios com regras claras de saída, avaliação e tomada de decisão reduzem bastante o risco de litígio.',
      },
    ],
  },
  {
    slug: 'revisao-de-contratos',
    area: 'direito-contratual',
    title: 'Revisão e elaboração de contratos',
    seoTitle: 'Revisão de Contratos em Brasília-DF',
    description:
      'Revisão, elaboração e negociação de contratos em Brasília: riscos, multas, prazos e rescisão, para pessoas e empresas. Atendimento presencial ou online.',
    summary: 'Análise de riscos antes de assinar, elaboração e negociação de contratos.',
    updatedAt: '2026-10-27',
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Boa parte dos conflitos contratuais nasce antes da assinatura: em uma cláusula vaga, em um prazo mal definido ou em uma multa desproporcional. A revisão do contrato antes de assinar permite identificar esses pontos enquanto ainda há espaço para negociar.',
      },
      { type: 'h2', text: 'O que é analisado na revisão' },
      {
        type: 'ul',
        items: [
          'Identificação das partes e de quem assina por elas',
          'Objeto, entregas e responsabilidades de cada parte',
          'Preço, forma de pagamento e critérios de reajuste',
          'Prazos, renovação e condições de rescisão',
          'Multas, garantias e limites de responsabilidade',
          'Confidencialidade, proteção de dados e propriedade intelectual',
          'Foro, arbitragem e, em contratos internacionais, a lei aplicável e o idioma',
        ],
      },
      { type: 'h2', text: 'Elaboração e negociação' },
      {
        type: 'p',
        text: 'Além da revisão, é possível elaborar o contrato do zero, de acordo com a operação e os objetivos do cliente, e acompanhar a negociação com a outra parte. Isso inclui contratos de prestação de serviços, compra e venda, parcerias comerciais, acordos de confidencialidade (NDAs) e memorandos de entendimento (MOUs), nacionais e internacionais.',
      },
      { type: 'h2', text: 'Para pessoas e para empresas' },
      {
        type: 'p',
        text: 'O atendimento é voltado tanto a pessoas físicas — por exemplo, antes de assinar um contrato de valor relevante — quanto a empresas que precisam de segurança em suas relações comerciais. O trabalho pode ser feito de forma pontual ou recorrente, presencialmente na Asa Norte ou online.',
      },
    ],
    faq: [
      {
        question: 'Quanto tempo leva a revisão de um contrato?',
        answer:
          'Depende da extensão e da complexidade do documento. O prazo é combinado no início, considerando a data em que o contrato precisa ser assinado.',
      },
      {
        question: 'Um contrato já assinado ainda pode ser revisto?',
        answer:
          'Pode ser analisado para entender direitos, obrigações e riscos, e, em situações específicas previstas em lei, é possível buscar a revisão ou a renegociação de cláusulas.',
      },
      {
        question: 'Vocês atendem contratos em inglês ou com empresas estrangeiras?',
        answer:
          'Sim. A atuação inclui contratos internacionais e negociações com parceiros estrangeiros, com atenção à lei aplicável e à forma de resolução de conflitos.',
      },
    ],
  },
]

const visible = (service: ServicePage) => !service.draft || process.env.NODE_ENV === 'development'

export function getServices() {
  return services.filter(visible)
}

export function getService(area: string, slug: string) {
  return getServices().find((service) => service.area === area && service.slug === slug)
}

export function getServicesForArea(area: string) {
  return getServices().filter((service) => service.area === area)
}
