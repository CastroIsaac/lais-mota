// Every piece of on-page copy, in Portuguese. English implements the same
// shape (`Dictionary`), so TypeScript flags any string a translation is missing.
// Practice-area slugs stay in Portuguese in every language so URLs line up.
//
// OAB (Provimento 205/2021): informative tone only — no promises of results, no
// client names, values or specific negotiations, no prices, no comparisons.

// The two fronts the practice is organized into (see `fronts` below).
export type Front = 'estrategica' | 'internacional'
export const frontOrder: Front[] = ['estrategica', 'internacional']

export type Faq = { question: string; answer: string }

export type PracticeArea = {
  slug: string
  front: Front
  title: string
  // Card / link label — the full titles are long by design (they mirror the
  // names the office uses), so lists use this shorter version.
  shortTitle: string
  audience: string
  summary: string
  // <title> (the "| Laís Mota Advocacia" suffix is added) and meta description, ≤155 chars.
  seo: { title: string; description: string }
  description: string[]
  services: string[]
  faq?: Faq[]
}

const practiceAreas: PracticeArea[] = [
  // ── Advocacia Estratégica ──────────────────────────────────────────────
  {
    slug: 'direito-civil',
    front: 'estrategica',
    title: 'Direito Civil e de Família',
    shortTitle: 'Direito Civil e de Família',
    audience: 'Pessoas físicas e famílias',
    summary: 'Atuação estratégica em conflitos familiares, patrimoniais e obrigacionais.',
    seo: {
      title: 'Advogada de Direito Civil e de Família em Brasília',
      description:
        'Divórcio, união estável, inventários, questões patrimoniais e responsabilidade civil, com atuação estratégica e atendimento personalizado em Brasília-DF.',
    },
    description: [
      'Atuação estratégica em conflitos familiares, patrimoniais e obrigacionais, incluindo divórcios, reconhecimento e dissolução de união estável, inventários, questões patrimoniais, responsabilidade civil e demais demandas civis.',
      'Os clientes são predominantemente pessoas físicas que enfrentam questões familiares, patrimoniais ou obrigacionais relevantes. Cada caso é analisado considerando seus impactos sobre o patrimônio, a família e, quando houver, os vínculos com outros países.',
    ],
    services: [
      'Divórcio consensual e litigioso',
      'Reconhecimento e dissolução de união estável',
      'Inventários, partilhas e planejamento sucessório',
      'Questões patrimoniais entre familiares',
      'Responsabilidade civil e indenizações',
      'Conflitos obrigacionais',
    ],
    faq: [
      {
        question: 'O inventário pode ser feito em cartório?',
        answer:
          'Quando há consenso entre os herdeiros e os requisitos legais estão presentes, o inventário pode ser feito em cartório, por escritura pública, com a assistência obrigatória de advogado. Não havendo acordo, o procedimento segue pela via judicial. A análise inicial define o caminho adequado.',
      },
      {
        question: 'É possível conduzir um divórcio sem atendimento presencial?',
        answer:
          'Sim. A orientação e o acompanhamento podem ser feitos por videoconferência, e o divórcio consensual, quando cabível, também pode ser formalizado em cartório por meio eletrônico.',
      },
    ],
  },
  {
    slug: 'direito-empresarial',
    front: 'estrategica',
    title: 'Direito Empresarial e Societário',
    shortTitle: 'Direito Empresarial e Societário',
    audience: 'Empresas, sócios e empresários',
    summary: 'Assessoria preventiva e contenciosa a empresas, sócios e empresários.',
    seo: {
      title: 'Advogada de Direito Empresarial em Brasília',
      description:
        'Conflitos societários, dissolução de sociedades, acordos de sócios e responsabilidade empresarial — assessoria preventiva e contenciosa em Brasília-DF.',
    },
    description: [
      'Assessoria preventiva e contenciosa a empresas, sócios e empresários, incluindo conflitos societários, dissoluções societárias, responsabilidades empresariais e apoio jurídico à tomada de decisões.',
      'O atendimento é direcionado a situações que envolvam conflitos entre sócios, dissolução de sociedades, organização jurídica da atividade empresarial e prevenção ou resolução de litígios.',
    ],
    services: [
      'Conflitos societários e dissolução de sociedades',
      'Acordos de sócios e reorganizações',
      'Responsabilidade de sócios e administradores',
      'Organização jurídica da atividade empresarial',
      'Apoio jurídico à tomada de decisões estratégicas',
    ],
  },
  {
    slug: 'direito-contratual',
    front: 'estrategica',
    title: 'Direito Contratual',
    shortTitle: 'Direito Contratual',
    audience: 'Pessoas físicas e empresas',
    summary: 'Elaboração, revisão e negociação estratégica de contratos civis e empresariais.',
    seo: {
      title: 'Advogada de Contratos em Brasília',
      description:
        'Elaboração, revisão e negociação de contratos civis, empresariais e comerciais, com foco na prevenção de riscos e na segurança jurídica. Brasília-DF.',
    },
    description: [
      'Elaboração, revisão, negociação e análise estratégica de contratos civis, empresariais e comerciais, com atenção à prevenção de riscos e à segurança jurídica das operações.',
      'Atuo tanto para pessoas físicas quanto para empresas, com especial atenção à identificação de riscos e à proteção jurídica da relação contratual. Contratos com partes estrangeiras são tratados na área de Contratos Internacionais.',
    ],
    services: [
      'Elaboração e revisão de contratos civis e empresariais',
      'Negociação contratual',
      'Contratos de prestação de serviços, fornecimento e parceria',
      'Notificações, rescisões e renegociações',
      'Prevenção e gestão de riscos contratuais',
    ],
  },
  {
    slug: 'contencioso-estrategico',
    front: 'estrategica',
    title: 'Contencioso Estratégico Cível e Empresarial',
    shortTitle: 'Contencioso Estratégico',
    audience: 'Pessoas físicas e empresas',
    summary: 'Condução de litígios complexos com análise de provas, riscos e cenários decisórios.',
    seo: {
      title: 'Contencioso Cível e Empresarial em Brasília',
      description:
        'Litígios cíveis, contratuais, societários e patrimoniais conduzidos com análise de provas, riscos e cenários — e busca de acordo quando adequado. Brasília-DF.',
    },
    description: [
      'Atuação em litígios cíveis e empresariais de maior complexidade, com análise prévia das provas, dos riscos e dos possíveis cenários decisórios antes de cada movimento processual.',
      'A experiência em assessoria no Tribunal de Justiça do Estado do Pará contribui para compreender a dinâmica decisória do Judiciário. Sempre que adequado, a composição judicial ou extrajudicial é considerada como parte da estratégia.',
    ],
    services: [
      'Ações cíveis e empresariais de maior complexidade',
      'Disputas contratuais e societárias',
      'Ações patrimoniais e de responsabilidade civil',
      'Avaliação de riscos e cenários antes do litígio',
      'Negociação e acordos judiciais e extrajudiciais',
      'Recursos e acompanhamento nos tribunais',
    ],
  },

  // ── Advocacia Internacional e Empresarial ──────────────────────────────
  {
    slug: 'comercio-exterior-commodities',
    front: 'internacional',
    title: 'Comércio Exterior, Commodities e Contratos Internacionais',
    shortTitle: 'Comércio Exterior e Commodities',
    audience: 'Traders, intermediários, importadores e exportadores',
    summary:
      'Estruturação jurídica de operações internacionais com petróleo, fertilizantes, açúcar, minérios e bens industriais.',
    seo: {
      title: 'Advogada de Comércio Exterior e Commodities',
      description:
        'Contratos internacionais, proteção de intermediários, due diligence e compliance em operações com petróleo, fertilizantes, açúcar, minérios e maquinários.',
    },
    description: [
      'Assessoria jurídica na análise e estruturação de operações internacionais de compra e venda envolvendo petróleo e derivados, fertilizantes — especialmente a importação de ureia —, açúcar e produtos agrícolas destinados ao mercado internacional, mineração e comercialização de pedras preciosas, além de equipamentos aeroportuários e maquinários industriais.',
      'Nessas operações, a documentação, a cadeia de intermediários e as condições comerciais concentram boa parte do risco. O trabalho envolve estruturar e revisar os contratos, proteger a posição de intermediários, verificar documentos e contrapartes e organizar a operação para reduzir exposições jurídicas e comerciais.',
    ],
    services: [
      'Contratos internacionais de compra e venda e de fornecimento',
      'Proteção de intermediários e de comissões',
      'Cláusulas e contratos de exclusividade comercial',
      'Análise documental e due diligence de contrapartes',
      'Compliance e redução de riscos da operação',
      'Incoterms, garantias e solução de controvérsias',
    ],
    faq: [
      {
        question: 'Quais operações com commodities a assessoria abrange?',
        answer:
          'Operações de importação e exportação envolvendo petróleo e derivados, fertilizantes como a ureia, açúcar e outros produtos agrícolas, minérios e pedras preciosas, além de equipamentos aeroportuários e maquinários industriais — com partes brasileiras ou estrangeiras.',
      },
      {
        question: 'Por que fazer due diligence antes de fechar a operação?',
        answer:
          'Operações internacionais com commodities costumam envolver longas cadeias de intermediários e documentos emitidos em diferentes países. Verificar contrapartes, poderes de representação e documentos antes de assumir obrigações ajuda a identificar inconsistências e a reduzir riscos de fraude, inadimplemento e disputas.',
      },
    ],
  },
  {
    slug: 'direito-regulatorio-anvisa',
    front: 'internacional',
    title: 'Direito Regulatório, ANVISA e Comércio Internacional de Produtos Farmacêuticos',
    shortTitle: 'Regulatório, ANVISA e Farmacêuticos',
    audience: 'Fabricantes estrangeiros, importadoras e distribuidoras',
    summary: 'Importação de medicamentos, regularização sanitária e estruturação de importadoras perante a ANVISA.',
    seo: {
      title: 'Advogada de Direito Regulatório e ANVISA',
      description:
        'Importação de medicamentos e produtos farmacêuticos: requisitos legais, procedimentos na ANVISA, estruturação de importadoras e parcerias no Brasil.',
    },
    description: [
      'Assessoria a empresas estrangeiras e brasileiras interessadas em introduzir medicamentos e produtos farmacêuticos no mercado brasileiro, com estudos e estratégias jurídicas envolvendo fornecedores de países como Índia, México e China.',
      'A importação de medicamentos no Brasil depende de regularização sanitária específica e de empresa habilitada perante a ANVISA. O trabalho começa pela análise dos requisitos aplicáveis ao produto e ao modelo de negócio e segue para a estruturação da empresa importadora ou da parceria com empresas brasileiras já habilitadas.',
    ],
    services: [
      'Análise dos requisitos legais para importação de medicamentos',
      'Procedimentos regulatórios perante a ANVISA',
      'Estruturação jurídica de empresas importadoras',
      'Assessoria a intermediadoras e distribuidoras',
      'Regularização sanitária e documental',
      'Parcerias com empresas brasileiras já habilitadas para importação',
    ],
    faq: [
      {
        question: 'Uma empresa estrangeira pode importar medicamentos diretamente para o Brasil?',
        answer:
          'Em regra, a importação para comercialização exige empresa estabelecida no Brasil, com as autorizações sanitárias exigidas, e produto regularizado na ANVISA. Por isso, a entrada no mercado costuma passar pela constituição de uma empresa local habilitada ou por parceria com empresa brasileira que já possua as autorizações. A análise do caso indica o modelo mais adequado.',
      },
      {
        question: 'A assessoria inclui os contratos com fornecedores no exterior?',
        answer:
          'Sim. A estruturação contempla os contratos com fabricantes e fornecedores estrangeiros, a documentação exigida e, quando necessário, a coordenação com profissionais de outras jurisdições.',
      },
    ],
  },
  {
    slug: 'imigracao-empresarial-investimento-estrangeiro',
    front: 'internacional',
    title: 'Imigração Empresarial, Investimentos Estrangeiros e Internacionalização de Empresas',
    shortTitle: 'Imigração Empresarial e Investimento Estrangeiro',
    audience: 'Estrangeiros, investidores e empresas',
    summary: 'Residência para investidores e empresários, constituição de empresas por estrangeiros e investimentos no Brasil.',
    seo: {
      title: 'Imigração Empresarial e Investimento Estrangeiro',
      description:
        'Regularização migratória, residência para investidores e empresários, abertura de empresa por estrangeiros e assessoria a investimentos no Brasil.',
    },
    description: [
      'Assessoria a estrangeiros que desejam permanecer legalmente no Brasil, constituir empresas e desenvolver atividades econômicas no país — da regularização migratória à estruturação do investimento.',
      'Migração, constituição de empresa e investimento costumam caminhar juntos: o tipo de autorização de residência, a forma da empresa e o registro do capital estrangeiro devem ser planejados de forma coordenada desde o início.',
    ],
    services: [
      'Regularização migratória',
      'Autorização de residência para investidores e empresários',
      'Constituição de empresas brasileiras por estrangeiros',
      'Assessoria para investimentos no Brasil',
      'Regularização documental perante autoridades brasileiras',
      'Orientação jurídica para contratação de profissionais estrangeiros',
    ],
    faq: [
      {
        question: 'Estrangeiro pode abrir empresa no Brasil?',
        answer:
          'Sim. Pessoas e empresas estrangeiras podem ser sócias de empresas brasileiras, observados requisitos como inscrição no CPF ou no CNPJ, representante no país e, em alguns setores, restrições específicas. Para administrar a empresa, a legislação exige, em regra, administrador residente no Brasil.',
      },
      {
        question: 'Existe autorização de residência para investidores?',
        answer:
          'Sim. A legislação migratória brasileira prevê autorização de residência para quem realiza investimento no país, com critérios e valores definidos em normas específicas, além de outras hipóteses ligadas a atividades empresariais e de trabalho. A análise do perfil indica a modalidade adequada.',
      },
    ],
  },
  {
    slug: 'sucessoes-internacionais',
    front: 'internacional',
    title: 'Sucessões Internacionais e Planejamento Patrimonial Transnacional',
    shortTitle: 'Sucessões Internacionais',
    audience: 'Famílias e herdeiros no Brasil e no exterior',
    summary: 'Inventários com herdeiros ou bens em outros países, como Portugal e França, e planejamento patrimonial.',
    seo: {
      title: 'Advogada de Sucessões e Inventário Internacional',
      description:
        'Inventários com herdeiros no exterior, patrimônio em outros países e documentos estrangeiros — com coordenação entre advogados do Brasil e da Europa.',
    },
    description: [
      'Assessoria em inventários e sucessões com conexão entre o Brasil e outros países, incluindo Portugal e França — com herdeiros residentes em diferentes países, patrimônio no exterior ou documentos estrangeiros.',
      'Esses casos exigem definir onde cada bem deve ser inventariado, qual legislação se aplica e como documentos produzidos em um país produzem efeitos no outro. O trabalho inclui a coordenação com advogados estrangeiros, para que os procedimentos avancem de forma integrada.',
    ],
    services: [
      'Inventários e sucessões com elementos internacionais',
      'Herdeiros residentes em diferentes países',
      'Identificação e regularização de patrimônio no exterior',
      'Coordenação jurídica com advogados estrangeiros',
      'Reconhecimento e eficácia de documentos estrangeiros no Brasil',
      'Análise de competência e legislação aplicável',
      'Planejamento patrimonial e sucessório transnacional',
    ],
    faq: [
      {
        question: 'Bens no Brasil de quem faleceu no exterior precisam de inventário no Brasil?',
        answer:
          'Sim. Pela legislação brasileira, compete à autoridade brasileira o inventário e a partilha de bens situados no Brasil, ainda que o falecido tivesse nacionalidade estrangeira ou domicílio fora do país. Bens no exterior seguem, em regra, os procedimentos do país onde estão.',
      },
      {
        question: 'Herdeiros que moram fora podem participar sem vir ao Brasil?',
        answer:
          'Em geral, sim — por meio de procuração e documentos devidamente apostilados ou legalizados e, quando cabível, com o uso de atos eletrônicos.',
      },
    ],
  },
  {
    slug: 'representacoes-estrangeiras',
    front: 'internacional',
    title: 'Assessoria Jurídica a Representações Estrangeiras e Relações Institucionais',
    shortTitle: 'Representações Estrangeiras',
    audience: 'Embaixadas, consulados e representações estrangeiras',
    summary: 'Direito brasileiro aplicado a missões diplomáticas, incluindo encerramento de vínculos trabalhistas locais.',
    seo: {
      title: 'Assessoria Jurídica a Embaixadas e Consulados',
      description:
        'Direito brasileiro para embaixadas e consulados: encerramento de vínculos trabalhistas, cálculos rescisórios, documentação e composição extrajudicial.',
    },
    description: [
      'Assessoria a representações diplomáticas e consulares estrangeiras no Brasil em questões de Direito brasileiro, com atenção às particularidades jurídicas aplicáveis a essas entidades e à condução institucional das relações envolvidas.',
      'Uma das frentes envolve o encerramento de vínculos trabalhistas de empregados locais: análise dos contratos, cálculos rescisórios, organização da documentação e avaliação de possibilidades de composição extrajudicial — com discrição e sigilo.',
    ],
    services: [
      'Encerramento de vínculos trabalhistas de empregados locais',
      'Cálculos rescisórios e conferência de verbas',
      'Documentação trabalhista e institucional',
      'Composição extrajudicial e acordos',
      'Orientação sobre o Direito brasileiro aplicável a representações estrangeiras',
      'Relações institucionais com autoridades e parceiros locais',
    ],
    faq: [
      {
        question: 'Empregados locais de embaixadas estão sujeitos à legislação trabalhista brasileira?',
        answer:
          'Em regra, sim. Contratos com empregados locais de representações estrangeiras seguem a legislação trabalhista brasileira, e os tribunais brasileiros não reconhecem imunidade de jurisdição em matéria trabalhista. Por isso, uma condução cuidadosa do encerramento do vínculo e da eventual composição é especialmente importante.',
      },
    ],
  },
  {
    slug: 'contratos-internacionais',
    front: 'internacional',
    title: 'Contratos Internacionais, Negociação e Estruturação Jurídica de Negócios',
    shortTitle: 'Contratos Internacionais',
    audience: 'Empresas, intermediários e parceiros comerciais',
    summary: 'NDA, NCNDA, IMFPA, MOUs, representação comercial e exclusividade em negócios entre países.',
    seo: {
      title: 'Contratos Internacionais: NDA, NCNDA e IMFPA',
      description:
        'Elaboração e revisão de NDA, NCNDA, IMFPA, MOUs, contratos de representação comercial e de exclusividade, garantias e solução de controvérsias.',
    },
    description: [
      'Elaboração, revisão e negociação dos instrumentos jurídicos utilizados em operações comerciais entre empresas e intermediários de diferentes países — com parceiros de mercados como México, Guatemala, Itália e Espanha, entre outros.',
      'Em negócios transfronteiriços, o contrato precisa funcionar em mais de um sistema jurídico: lei aplicável, foro ou arbitragem, idioma, garantias e mecanismos de proteção contra a circunvenção devem ser pensados desde a primeira minuta.',
    ],
    services: [
      'NDA — Acordos de Confidencialidade',
      'NCNDA — Acordos de Não Divulgação e Não Circunvenção',
      'IMFPA — Acordos de Proteção de Comissões',
      'Contratos internacionais de representação comercial',
      'Contratos de exclusividade',
      'Memorandos de entendimento (MOU)',
      'Contratos de honorários e de assessoria internacional',
      'Garantias e mecanismos de solução de controvérsias',
    ],
    faq: [
      {
        question: 'O que são NCNDA e IMFPA?',
        answer:
          'São instrumentos comuns em operações internacionais com intermediários. O NCNDA (Non-Circumvention, Non-Disclosure Agreement) protege informações e impede que as partes contornem quem apresentou o negócio; o IMFPA (Irrevocable Master Fee Protection Agreement) disciplina o pagamento das comissões dos intermediários. A eficácia de ambos depende de redação cuidadosa e da lei aplicável escolhida.',
      },
      {
        question: 'Os contratos podem ser redigidos em inglês?',
        answer:
          'Sim. Contratos internacionais podem ser redigidos em inglês ou em versão bilíngue, com a definição de qual versão prevalece. Para produzir efeitos perante autoridades brasileiras, pode ser necessária tradução juramentada.',
      },
    ],
  },
  {
    slug: 'direito-societario-internacional',
    front: 'internacional',
    title: 'Direito Societário Internacional e Expansão Empresarial',
    shortTitle: 'Societário Internacional e Expansão',
    audience: 'Empresas em expansão e grupos estrangeiros',
    summary: 'Modelos societários, entrada em novos mercados e estruturação de operações entre países.',
    seo: {
      title: 'Societário Internacional e Expansão de Empresas',
      description:
        'Modelos societários, subsidiárias, contratos entre parceiros e representação comercial para empresas estrangeiras no Brasil e brasileiras no exterior.',
    },
    description: [
      'Assessoria à expansão de empresas, à organização de operações internacionais e à estruturação de relações comerciais entre diferentes países — com experiência em projetos de internacionalização e estruturação empresarial entre o Brasil e o Oriente Médio, incluindo Omã.',
      'O trabalho abrange a análise de modelos societários, contratos entre parceiros, representação comercial, planejamento de entrada em novos mercados e articulação com profissionais jurídicos de outras jurisdições.',
    ],
    services: [
      'Análise de modelos societários e de entrada no mercado',
      'Constituição de subsidiárias, filiais e joint ventures',
      'Acordos de sócios e contratos entre parceiros',
      'Representação comercial e distribuição',
      'Planejamento de entrada em novos mercados',
      'Articulação com advogados de outras jurisdições',
    ],
    faq: [
      {
        question: 'Como uma empresa estrangeira pode começar a atuar no Brasil?',
        answer:
          'Depende do objetivo e do estágio da operação: representante comercial ou distribuidor, parceria com empresa local, joint venture ou constituição de subsidiária — geralmente uma sociedade limitada. Cada modelo tem impactos diferentes de custo, responsabilidade, tributação e controle, e a escolha deve ser feita antes do primeiro contrato.',
      },
    ],
  },
  {
    slug: 'direito-internacional-privado',
    front: 'internacional',
    title: 'Direito Internacional Privado, Família e Patrimônio',
    shortTitle: 'Família e Patrimônio Internacionais',
    audience: 'Pessoas e famílias com vínculos em mais de um país',
    summary: 'Questões familiares e patrimoniais com partes no exterior, alimentos internacionais e documentos estrangeiros.',
    seo: {
      title: 'Direito Internacional Privado: Família e Patrimônio',
      description:
        'Divórcio com parte no exterior, alimentos internacionais, homologação de sentença estrangeira, documentos estrangeiros e cooperação jurídica entre países.',
    },
    description: [
      'Atuação em questões jurídicas privadas que ultrapassam as fronteiras brasileiras, especialmente demandas familiares e patrimoniais com partes residentes no exterior.',
      'São situações que envolvem obrigações alimentares internacionais, documentação estrangeira, definição da competência jurisdicional e mecanismos de cooperação jurídica entre países.',
    ],
    services: [
      'Divórcio e questões familiares com partes no exterior',
      'Alimentos internacionais',
      'Homologação de sentenças estrangeiras',
      'Documentação estrangeira, apostilamento e tradução',
      'Competência jurisdicional e lei aplicável',
      'Cooperação jurídica internacional',
    ],
    faq: [
      {
        question: 'Um divórcio feito no exterior vale no Brasil?',
        answer:
          'Para produzir efeitos no Brasil, a sentença estrangeira de divórcio, em regra, precisa ser homologada pelo Superior Tribunal de Justiça. Nos casos de divórcio consensual simples, as normas do CNJ permitem a averbação diretamente no cartório de registro civil.',
      },
      {
        question: 'É possível cobrar pensão alimentícia de quem mora em outro país?',
        answer:
          'Sim. O Brasil é parte de convenções internacionais sobre a cobrança de alimentos no exterior, como a Convenção de Nova York de 1956 e a Convenção da Haia de 2007, que permitem pedir e executar alimentos por meio da cooperação entre autoridades dos países envolvidos.',
      },
    ],
  },
]

export const pt = {
  meta: {
    defaultTitle: 'Advocacia Estratégica e Internacional',
    home: {
      title: 'Laís Mota | Advocacia Estratégica e Internacional em Brasília',
      description:
        'Advocacia boutique em Brasília: Direito Civil, Empresarial e Contratual, comércio exterior, contratos internacionais, investimento estrangeiro e imigração.',
    },
    about: {
      title: 'Sobre Laís Mota',
      description:
        'Conheça a trajetória de Laís Mota, advogada em Brasília com atuação em advocacia estratégica e em advocacia internacional e empresarial.',
    },
    areas: {
      title: 'Áreas de Atuação',
      description:
        'Advocacia estratégica (civil, família, empresarial, contratos e contencioso) e advocacia internacional (comércio exterior, ANVISA, imigração, sucessões).',
    },
    international: {
      title: 'Advocacia Internacional e Empresarial no Brasil',
      description:
        'Comércio exterior, commodities, contratos internacionais, ANVISA, imigração empresarial, investimento estrangeiro e sucessões internacionais. Brasília-DF.',
    },
    contact: {
      title: 'Contato',
      description:
        'Agende uma conversa com Laís Mota, presencial em Brasília ou por videoconferência, para tratar do seu caso ou das necessidades jurídicas da sua empresa.',
    },
    shareImageAlt: 'Laís Mota Advocacia — advocacia estratégica e internacional em Brasília-DF',
    keywords: [
      'Laís Mota advocacia',
      'advogada Brasília',
      'advocacia internacional Brasília',
      'advogada comércio exterior',
      'advogada contratos internacionais',
      'advogada ANVISA importação de medicamentos',
      'imigração empresarial Brasil',
      'inventário internacional',
      'advogada direito empresarial Brasília',
      'advogada direito de família Brasília',
    ],
  },

  nav: {
    home: 'Início',
    about: 'Sobre',
    areas: 'Áreas de atuação',
    international: 'Internacional',
    contact: 'Contato',
    cta: 'Agendar conversa',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    mainNav: 'Navegação principal',
    mobileNav: 'Navegação',
    language: 'Idioma',
  },

  // The two fronts the office presents itself through. Keys match PracticeArea.front.
  fronts: {
    estrategica: {
      name: 'Advocacia Estratégica',
      tagline: 'Pessoas, famílias e empresas',
      description:
        'Demandas cíveis, empresariais, familiares e patrimoniais e contencioso complexo, com análise de riscos e de cenários antes de cada decisão.',
    },
    internacional: {
      name: 'Advocacia Internacional e Empresarial',
      tagline: 'Operações entre o Brasil e outros países',
      description:
        'Comércio exterior, contratos internacionais, investimentos estrangeiros, regulação, commodities, imigração empresarial e sucessões internacionais.',
    },
  },

  home: {
    heroAlt: 'Laís Mota, advogada',
    eyebrow: 'Advocacia boutique, estratégica e internacional',
    title: 'Estratégia jurídica para decisões que não podem dar errado.',
    lead: 'Advocacia estratégica em demandas cíveis, empresariais e patrimoniais, e advocacia internacional para empresas, investidores e operações entre o Brasil e outros países.',
    ctaPrimary: 'Agendar uma conversa',
    ctaSecondary: 'Advocacia internacional',
    scroll: 'Role para saber mais',
    who: {
      kicker: 'I · Quem atende',
      title: 'Advocacia boutique para operações que exigem análise cuidadosa.',
      body: 'Laís Mota Advocacia é um escritório boutique em Brasília, com atendimento personalizado e atuação em operações jurídicas complexas. A atuação reúne duas frentes: a advocacia estratégica, voltada a demandas cíveis, empresariais, familiares, patrimoniais e ao contencioso complexo; e a advocacia internacional e empresarial, que combina a análise jurídica brasileira, a compreensão das relações comerciais internacionais e a coordenação com parceiros estrangeiros.',
    },
    pillars: [
      {
        title: 'Estratégia jurídica',
        body: 'Análise aprofundada do problema, dos riscos e dos possíveis caminhos antes da tomada de decisão.',
      },
      {
        title: 'Visão internacional',
        body: 'Operações que exigem Direito brasileiro, lógica comercial internacional e coordenação com advogados e parceiros de outras jurisdições.',
      },
      {
        title: 'Atendimento personalizado e digital',
        body: 'Contato direto com a advogada, presencial ou por videoconferência, com documentos e acompanhamento em formato digital.',
      },
    ],
    areas: {
      watermark: 'Áreas',
      kicker: 'II · Áreas de atuação',
      title: 'Duas frentes de atuação.',
      all: 'Ver todas as áreas',
      frontCta: 'Conhecer a advocacia internacional',
    },
    brasilia: {
      imageAlt: 'Congresso Nacional, Brasília',
      kicker: 'Atuação em todo o Brasil',
      title: 'De Brasília para todo o Brasil — e além.',
      body: 'O atendimento é realizado de forma presencial e online — por videoconferência e, quando adequado, por ligação telefônica. Essa estrutura permite atender clientes em Brasília, em outros estados brasileiros e também empresas, investidores e famílias no exterior.',
      cta: 'Agendar uma conversa',
    },
    diff: {
      kicker: 'III · Diferenciais',
      title: 'Conhecimento jurídico com visão de negócio.',
      body: 'Formação em Comércio Exterior permite analisar operações não apenas sob o aspecto jurídico, mas também considerando sua lógica comercial, contratual e internacional — indo além de atuar em processos ou elaborar contratos, para compreender o contexto do cliente e estruturar a solução mais adequada aos seus objetivos.',
    },
    moments: [
      {
        alt: 'Laís Mota na Embaixada da Índia em Brasília, no evento Parcerias Estratégicas',
        caption: 'Embaixada da Índia — Parcerias Estratégicas Brasil-Índia',
      },
      {
        alt: 'Laís Mota na COP30, Conferência do Clima da ONU, em Belém',
        caption: 'COP30 — Conferência do Clima da ONU, Belém',
      },
    ],
    experience: [
      {
        title: 'Operações internacionais',
        body: 'Experiência na estruturação jurídica de operações com commodities e produtos regulados — inclusive importação proveniente da China —, além de projetos de internacionalização e estruturação empresarial entre o Brasil e o Oriente Médio, incluindo Omã.',
      },
      {
        title: 'Instrumentos de negociação',
        body: 'Elaboração e análise de contratos comerciais, memorandos de entendimento (MOUs), acordos de confidencialidade e de não circunvenção (NDA, NCNDA), proteção de comissões (IMFPA) e estruturas contratuais voltadas à proteção das partes em operações transfronteiriças.',
      },
    ],
    itamaraty: {
      imageAlt: 'Laís Mota no Palácio do Itamaraty, sede do Ministério das Relações Exteriores, em Brasília',
      kicker: 'Diferenciais',
      title: 'Do ambiente institucional ao diálogo internacional.',
      body: 'Uma atuação contemporânea também se constrói pela escuta de diferentes contextos — jurídicos, empresariais, culturais e globais.',
    },
    process: {
      kicker: 'IV · Como funciona',
      title: 'Do primeiro contato à resolução.',
    },
    steps: [
      { title: 'Conversa inicial', body: 'Entendimento do seu caso ou da necessidade da sua empresa, sem compromisso.' },
      { title: 'Análise estratégica', body: 'Avaliação da legislação, dos documentos, dos riscos e dos possíveis cenários decisórios.' },
      {
        title: 'Definição do caminho',
        body: 'Estruturação da solução jurídica mais adequada aos seus objetivos — preventiva, contratual ou contenciosa.',
      },
      { title: 'Acompanhamento', body: 'Atuação direta até a resolução, com comunicação constante sobre cada etapa.' },
    ],
    faq: {
      kicker: 'V · Perguntas frequentes',
      title: 'Antes de agendar, você pode querer saber.',
    },
    closing: {
      kicker: 'Novas oportunidades',
      title: 'Vamos transformar uma questão jurídica em decisão segura?',
      line: 'Atendimento presencial e online, com hora marcada.',
      cta: 'Falar com Laís Mota',
    },
  },

  international: {
    kicker: 'Advocacia Internacional e Empresarial',
    title: 'Direito brasileiro para operações que atravessam fronteiras.',
    lead: 'Assessoria a empresas, investidores, intermediários e famílias em operações entre o Brasil e outros países — comércio exterior, commodities, contratos internacionais, regulação sanitária, imigração empresarial, investimento estrangeiro e sucessões internacionais.',
    cta: 'Agendar uma conversa',
    capabilities: {
      kicker: 'I · Como atuamos',
      title: 'Três competências em uma mesma operação.',
      items: [
        {
          title: 'Análise jurídica brasileira',
          body: 'Leitura da operação à luz do Direito brasileiro — contratos, regulação, exigências societárias, migratórias e documentais.',
        },
        {
          title: 'Visão comercial internacional',
          body: 'Formação em Comércio Exterior para compreender a lógica da operação: intermediários, Incoterms, garantias, prazos e riscos de execução.',
        },
        {
          title: 'Coordenação com parceiros estrangeiros',
          body: 'Articulação com advogados e profissionais de outras jurisdições, para que cada parte da operação seja tratada por quem conhece a lei local.',
        },
      ],
    },
    areas: {
      kicker: 'II · Áreas',
      title: 'Frentes da advocacia internacional.',
    },
    markets: {
      kicker: 'III · Experiência internacional',
      title: 'Operações com parceiros em diferentes continentes.',
      body: 'Experiência em estudos, negociações e estruturação de operações envolvendo parceiros e fornecedores de países como China, Índia, Omã, México, Guatemala, Itália, Espanha, Portugal e França.',
      note: 'Nomes de clientes, valores e negociações específicas são mantidos sob sigilo profissional.',
    },
    process: {
      kicker: 'IV · Etapas',
      title: 'Como uma operação internacional é conduzida.',
      steps: [
        { title: 'Diagnóstico', body: 'Entendimento da operação, das partes, dos países envolvidos e dos objetivos comerciais.' },
        { title: 'Riscos e documentos', body: 'Análise documental, verificação de contrapartes e mapeamento dos riscos jurídicos e regulatórios.' },
        { title: 'Estruturação', body: 'Redação e negociação dos instrumentos, definição de lei aplicável, garantias e solução de controvérsias.' },
        { title: 'Acompanhamento', body: 'Coordenação com parceiros estrangeiros e suporte até a conclusão da operação.' },
      ],
    },
    faq: {
      kicker: 'V · Perguntas frequentes',
      title: 'Sobre a atuação internacional.',
      items: [
        {
          question: 'O escritório atende empresas e investidores que estão fora do Brasil?',
          answer:
            'Sim. O atendimento pode ser integralmente online, por videoconferência, com envio e análise de documentos em formato digital. Reuniões presenciais acontecem no escritório em Brasília, mediante agendamento.',
        },
        {
          question: 'Como funciona a coordenação com advogados estrangeiros?',
          answer:
            'Quando a operação depende da lei de outro país, o trabalho é feito em conjunto com profissionais daquela jurisdição: a parte brasileira fica com o escritório, e as estratégias, prazos e documentos são alinhados entre os advogados envolvidos.',
        },
        {
          question: 'Em que momento devo envolver a assessoria jurídica numa operação internacional?',
          answer:
            'Antes de assinar o primeiro documento — inclusive NDAs, cartas de intenção e propostas comerciais. Ajustar a estrutura no início costuma ser muito mais simples do que corrigi-la depois de assumidas as obrigações.',
        },
        {
          question: 'As informações da minha operação ficam em sigilo?',
          answer:
            'Sim. O sigilo profissional é dever da advocacia. O escritório não divulga nomes de clientes, valores nem detalhes de negociações.',
        },
      ],
    },
    closing: {
      title: 'Uma operação internacional em andamento?',
      line: 'Conversa inicial por videoconferência ou presencial em Brasília.',
      cta: 'Falar com Laís Mota',
    },
  },

  about: {
    photoAlt: 'Laís Mota, advogada',
    kicker: 'I · Sobre',
    intro: [
      'Minha trajetória profissional foi construída a partir da combinação entre formação acadêmica sólida, experiência institucional e atuação estratégica na advocacia — sempre associada a uma visão interdisciplinar do Direito, especialmente nas áreas civil, empresarial, contratual e de relações internacionais.',
      'Busco desenvolver uma advocacia boutique, técnica, estratégica e personalizada — compreendendo não apenas a questão jurídica apresentada, mas os seus impactos patrimoniais, familiares, empresariais e, quando aplicável, internacionais.',
    ],
    oabNote: 'Registro profissional junto à Ordem dos Advogados do Brasil.',
    credentials: [
      {
        label: 'Formação',
        value:
          'Graduada em Direito pela Universidade Federal do Oeste do Pará (UFOPA), com MBA em Comércio Exterior pela ABRACOMEX, em parceria com a Massachusetts International Business (MIB).',
      },
      {
        label: 'Atuação',
        value:
          'Assessoria no Tribunal de Justiça do Estado do Pará (TJPA) e, atualmente, advocacia privada em Brasília em duas frentes: advocacia estratégica (civil, família, empresarial, contratos e contencioso) e advocacia internacional e empresarial.',
      },
    ],
    cta: 'Agendar uma conversa',
    trajectory: {
      kicker: 'II · Trajetória',
      paragraphs: [
        'Ainda durante a graduação, busquei experiências que me permitissem compreender o Direito para além do processo judicial, participando de projetos acadêmicos e institucionais relacionados a direitos humanos e relações internacionais.',
        'Posteriormente, atuei em assessoria no Tribunal de Justiça do Estado do Pará (TJPA) — experiência que contribuiu significativamente para a compreensão da dinâmica decisória do Poder Judiciário e para o desenvolvimento de uma visão técnica e estratégica do processo.',
        'Em Brasília, consolidei minha atuação na advocacia privada. Hoje, ela reúne duas frentes: a advocacia estratégica, em demandas cíveis, empresariais, familiares, patrimoniais e contencioso complexo; e a advocacia internacional e empresarial, com operações de comércio exterior e commodities, contratos internacionais, regulação sanitária, imigração empresarial, investimentos estrangeiros e sucessões com elementos internacionais.',
      ],
    },
    commitment: {
      kicker: 'III · Compromisso',
      body: 'Durante a graduação, participei de atividades relacionadas à política migratória e à proteção de refugiados, em projeto desenvolvido na Universidade Federal do Paraná (UFPR), em Curitiba — uma experiência que contribuiu para minha formação em direitos humanos e para uma visão jurídica sensível às questões internacionais, migratórias e sociais. A defesa dos direitos humanos e da dignidade da pessoa permanece como um dos valores que orientam minha compreensão do Direito.',
      note: 'Possuo aproximadamente três anos de atuação na advocacia, com experiência em mais de 50 demandas, consultorias e projetos jurídicos envolvendo questões civis, empresariais, contratuais e internacionais.',
    },
  },

  areasPage: {
    kicker: 'I · Áreas de atuação',
    title: 'Onde posso ajudar.',
    intro:
      'A atuação está organizada em duas frentes. Cada caso e cada operação recebem uma análise própria — entre em contato para conversar sobre a sua situação específica.',
  },

  areaPage: {
    servicesTitle: 'O que a assessoria abrange',
    audienceLabel: 'Para quem',
    faqTitle: 'Perguntas frequentes',
    relatedTitle: 'Outras áreas desta frente',
    cta: 'Conversar sobre o meu caso',
  },

  contact: {
    kicker: 'I · Contato',
    title: 'Vamos conversar sobre o seu caso.',
    intro:
      'Preencha o formulário ao lado ou fale diretamente pelos canais abaixo. O atendimento é feito com hora marcada, mediante confirmação prévia.',
    phone: 'Telefone / WhatsApp',
    email: 'E-mail',
    office: 'Escritório',
    hours: 'Atendimento',
    hoursValue: 'Atendimento presencial e online, mediante agendamento prévio',
  },

  form: {
    name: 'Nome',
    subject: 'Assunto',
    message: 'Conte brevemente sobre o seu caso',
    submit: 'Enviar pelo WhatsApp',
    note: 'Ao enviar, sua mensagem será aberta no WhatsApp para confirmação e envio.',
    // {name}, {subject} and {message} are filled in from the form.
    whatsappTemplate: 'Olá, meu nome é {name}.\nAssunto: {subject}\n\n{message}',
  },

  footer: {
    tagline: 'Advocacia boutique, estratégica e internacional, com atendimento personalizado.',
    contact: 'Contato',
    nav: 'Navegação',
    navLabel: 'Navegação do rodapé',
    rights: 'Todos os direitos reservados.',
  },

  whatsappLabel: 'Falar pelo WhatsApp',
  whatsappGreeting: 'Olá! Vim pelo site e gostaria de falar com a Dra. Laís Mota.',

  practiceAreas,

  faq: [
    {
      question: 'Como funciona o atendimento?',
      answer:
        'O atendimento é realizado de forma presencial, no escritório em Brasília (Asa Norte), ou online, por videoconferência — sempre mediante agendamento prévio, para permitir uma análise individualizada de cada demanda.',
    },
    {
      question: 'Quais tipos de demanda o escritório atende?',
      answer:
        'Duas frentes principais. Na advocacia estratégica: demandas cíveis, familiares, patrimoniais, empresariais, contratuais e contencioso complexo. Na advocacia internacional e empresarial: comércio exterior e commodities, contratos internacionais, regulação sanitária (ANVISA), imigração empresarial, investimentos estrangeiros, sucessões internacionais e assessoria a representações estrangeiras.',
    },
    {
      question: 'O atendimento online tem a mesma qualidade do presencial?',
      answer:
        'Sim. A análise do caso, a estratégia jurídica e o acompanhamento são os mesmos — a videoconferência (e, quando adequado, a ligação telefônica) permite atender clientes em Brasília, em outros estados e em outros países.',
    },
    {
      question: 'O que devo levar para a primeira conversa?',
      answer:
        'Depende da natureza da demanda — geralmente documentos pessoais ou societários e qualquer material relacionado ao caso (contratos, comunicações, notificações). Isso é definido junto com você no agendamento, para que a primeira conversa já seja produtiva.',
    },
    {
      question: 'Quando vale a pena buscar consultoria jurídica preventiva?',
      answer:
        'Antes de firmar um contrato relevante, iniciar uma operação empresarial ou negociar com um parceiro — nacional ou internacional. Identificar riscos antes de assinar costuma ser muito mais simples do que resolvê-los depois.',
    },
    {
      question: 'O que envolve a atuação internacional do escritório?',
      answer:
        'Operações que exigem, ao mesmo tempo, análise jurídica brasileira, compreensão das relações comerciais internacionais e coordenação com parceiros estrangeiros — como operações com commodities, importação de produtos regulados, entrada de investidores e empresas estrangeiras no Brasil e sucessões com bens ou herdeiros em outros países.',
    },
  ],
}

export type Dictionary = typeof pt
