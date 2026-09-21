export type PracticeArea = {
  slug: string
  title: string
  audience: string
  summary: string
  description: string
  topics: string[]
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'direito-empresarial',
    title: 'Direito Empresarial',
    audience: 'Empresas, sócios e empresários',
    summary: 'Assessoria preventiva e contenciosa a empresas, sócios e empresários.',
    description:
      'Assessoria preventiva e contenciosa a empresas, sócios e empresários, incluindo conflitos societários, dissoluções societárias, responsabilidades empresariais e apoio jurídico à tomada de decisões. O atendimento é direcionado a situações que envolvam conflitos societários, dissolução de sociedades, organização jurídica da atividade empresarial e prevenção ou resolução de litígios.',
    topics: [
      'Conflitos e dissolução societária',
      'Responsabilidade empresarial',
      'Organização jurídica da atividade empresarial',
      'Apoio jurídico à tomada de decisão',
    ],
  },
  {
    slug: 'direito-contratual',
    title: 'Direito Contratual',
    audience: 'Pessoas físicas e empresas',
    summary: 'Elaboração, revisão e negociação estratégica de contratos nacionais e internacionais.',
    description:
      'Elaboração, revisão, negociação e análise estratégica de contratos civis, empresariais e comerciais, nacionais e internacionais, com atenção à prevenção de riscos e à segurança jurídica das operações. Atuo tanto para pessoas físicas quanto para empresas, com especial atenção à identificação de riscos e à proteção jurídica da relação contratual.',
    topics: [
      'Elaboração e revisão de contratos',
      'Negociação contratual',
      'Contratos nacionais e internacionais',
      'Prevenção de riscos contratuais',
    ],
  },
  {
    slug: 'consultoria-juridica-internacional',
    title: 'Consultoria Jurídica Internacional',
    audience: 'Empresas, empresários e investidores',
    summary: 'Assessoria a empresas envolvidas em relações comerciais internacionais e internacionalização de negócios.',
    description:
      'Assessoria jurídica a empresas e empresários envolvidos em relações comerciais internacionais, internacionalização de negócios, comércio exterior, negociação com parceiros estrangeiros, contratos internacionais e estruturação jurídica de operações transfronteiriças. O público é formado principalmente por empresas, empresários, investidores e parceiros comerciais envolvidos em operações entre o Brasil e outros países.',
    topics: [
      'Internacionalização de empresas',
      'Comércio exterior',
      'Negociação e contratos internacionais',
      'Estruturação jurídica de operações transfronteiriças',
    ],
  },
  {
    slug: 'direito-civil',
    title: 'Direito Civil',
    audience: 'Pessoas físicas',
    summary: 'Atuação estratégica em conflitos familiares, patrimoniais e obrigacionais.',
    description:
      'Atuação estratégica em conflitos familiares, patrimoniais e obrigacionais, incluindo divórcios, reconhecimento e dissolução de união estável, inventários, questões patrimoniais, responsabilidade civil e demais demandas civis. Os clientes são predominantemente pessoas físicas que enfrentam questões familiares, patrimoniais ou obrigacionais relevantes.',
    topics: [
      'Divórcio e dissolução de união estável',
      'Inventários e questões patrimoniais',
      'Responsabilidade civil',
      'Conflitos obrigacionais',
    ],
  },
]

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug)
}
