import type { Dictionary, PracticeArea } from './pt'

// SEO titles here are written for people searching from outside Brazil
// ("... lawyer in Brazil"), the main audience of the English pages.
const practiceAreas: PracticeArea[] = [
  // ── Strategic Practice ─────────────────────────────────────────────────
  {
    slug: 'direito-civil',
    front: 'estrategica',
    title: 'Civil and Family Law',
    shortTitle: 'Civil and Family Law',
    audience: 'Individuals and families',
    summary: 'Strategic handling of family, property and civil-obligation disputes.',
    seo: {
      title: 'Civil and Family Lawyer in Brasília, Brazil',
      description:
        'Divorce, stable unions, probate, family property matters and civil liability in Brazil — strategic counsel and personalized service from Brasília.',
    },
    description: [
      'Strategic handling of family, property and civil-obligation disputes, including divorce, recognition and dissolution of stable unions, probate, property matters, civil liability and other civil claims.',
      'Clients are mostly individuals facing significant family, property or contractual issues. Each case is assessed in light of its impact on assets, family and, where relevant, ties to other countries.',
    ],
    services: [
      'Uncontested and contested divorce',
      'Recognition and dissolution of stable unions',
      'Probate, estate division and succession planning',
      'Property matters between family members',
      'Civil liability and damages',
      'Disputes over civil obligations',
    ],
    faq: [
      {
        question: 'Can probate be handled at a notary office in Brazil?',
        answer:
          'When all heirs agree and the legal requirements are met, probate can be carried out at a notary office by public deed, with a lawyer’s assistance being mandatory. Without agreement, it goes through the courts. The initial review determines the right path.',
      },
      {
        question: 'Can a divorce be handled without in-person meetings?',
        answer:
          'Yes. Advice and follow-up can be done by video call, and an uncontested divorce, where eligible, can also be formalized electronically before a Brazilian notary.',
      },
    ],
  },
  {
    slug: 'direito-empresarial',
    front: 'estrategica',
    title: 'Business and Corporate Law',
    shortTitle: 'Business and Corporate Law',
    audience: 'Companies, partners and business owners',
    summary: 'Preventive and litigation counsel for companies, partners and business owners.',
    seo: {
      title: 'Business and Corporate Lawyer in Brasília, Brazil',
      description:
        'Shareholder disputes, company dissolution, shareholder agreements and corporate liability in Brazil — preventive and litigation counsel.',
    },
    description: [
      'Preventive and litigation counsel for companies, partners and business owners, including shareholder disputes, company dissolutions, corporate liability and legal support for decision-making.',
      'The practice focuses on disputes between partners, the dissolution of companies, the legal organization of business activities and the prevention or resolution of disputes.',
    ],
    services: [
      'Shareholder disputes and company dissolution',
      'Shareholder agreements and reorganizations',
      'Liability of partners and officers',
      'Legal organization of business activities',
      'Legal support for strategic decisions',
    ],
  },
  {
    slug: 'direito-contratual',
    front: 'estrategica',
    title: 'Contract Law',
    shortTitle: 'Contract Law',
    audience: 'Individuals and companies',
    summary: 'Strategic drafting, review and negotiation of civil and commercial contracts.',
    seo: {
      title: 'Contract Lawyer in Brasília, Brazil',
      description:
        'Drafting, review and negotiation of civil and commercial contracts under Brazilian law, focused on risk prevention and legal certainty.',
    },
    description: [
      'Drafting, review, negotiation and strategic analysis of civil, business and commercial contracts, with a focus on risk prevention and legal certainty.',
      'I work for individuals and companies alike, with particular attention to identifying risks and protecting the contractual relationship. Contracts with foreign parties are covered under International Contracts.',
    ],
    services: [
      'Drafting and review of civil and commercial contracts',
      'Contract negotiation',
      'Service, supply and partnership agreements',
      'Notices, terminations and renegotiations',
      'Contract risk prevention and management',
    ],
  },
  {
    slug: 'contencioso-estrategico',
    front: 'estrategica',
    title: 'Strategic Civil and Commercial Litigation',
    shortTitle: 'Strategic Litigation',
    audience: 'Individuals and companies',
    summary: 'Complex disputes handled with careful analysis of evidence, risks and likely outcomes.',
    seo: {
      title: 'Civil and Commercial Litigation in Brazil',
      description:
        'Contract, shareholder and property disputes in Brazilian courts, handled with analysis of evidence, risks and scenarios — and settlement when appropriate.',
    },
    description: [
      'Representation in complex civil and commercial disputes, with prior analysis of the evidence, the risks and the possible outcomes before each procedural step.',
      'Experience as a legal advisor at the Court of Justice of the State of Pará helps in understanding how Brazilian courts reach decisions. Whenever appropriate, judicial or out-of-court settlement is considered part of the strategy.',
    ],
    services: [
      'Complex civil and commercial lawsuits',
      'Contract and shareholder disputes',
      'Property and civil liability claims',
      'Risk and scenario assessment before litigation',
      'Negotiation and settlements, in and out of court',
      'Appeals and follow-up before higher courts',
    ],
  },

  // ── International & Business Practice ──────────────────────────────────
  {
    slug: 'comercio-exterior-commodities',
    front: 'internacional',
    title: 'Foreign Trade, Commodities and International Contracts',
    shortTitle: 'Foreign Trade and Commodities',
    audience: 'Traders, intermediaries, importers and exporters',
    summary:
      'Legal structuring of international deals in oil, fertilizers, sugar, minerals and industrial equipment.',
    seo: {
      title: 'Commodities and Trade Lawyer in Brazil',
      description:
        'International contracts, intermediary protection, due diligence and compliance for deals in oil, fertilizers, sugar, minerals and machinery involving Brazil.',
    },
    description: [
      'Legal counsel on the analysis and structuring of international purchase and sale transactions involving oil and oil products, fertilizers — particularly urea imports —, sugar and agricultural products for international markets, mining and precious stones, as well as airport equipment and industrial machinery.',
      'In these deals, the paperwork, the chain of intermediaries and the commercial terms carry much of the risk. The work involves structuring and reviewing contracts, protecting intermediaries’ positions, verifying documents and counterparties, and organizing the transaction to reduce legal and commercial exposure.',
    ],
    services: [
      'International sale and supply agreements',
      'Protection of intermediaries and commissions',
      'Commercial exclusivity clauses and agreements',
      'Document review and counterparty due diligence',
      'Compliance and transaction risk reduction',
      'Incoterms, guarantees and dispute resolution',
    ],
    faq: [
      {
        question: 'Which commodity transactions does the practice cover?',
        answer:
          'Import and export deals involving oil and oil products, fertilizers such as urea, sugar and other agricultural products, minerals and precious stones, as well as airport equipment and industrial machinery — with Brazilian or foreign parties.',
      },
      {
        question: 'Why carry out due diligence before closing a deal?',
        answer:
          'International commodity deals often involve long chains of intermediaries and documents issued in several countries. Verifying counterparties, signing authority and documents before taking on obligations helps identify inconsistencies and reduces the risk of fraud, default and disputes.',
      },
    ],
  },
  {
    slug: 'direito-regulatorio-anvisa',
    front: 'internacional',
    title: 'Regulatory Law, ANVISA and International Trade in Pharmaceuticals',
    shortTitle: 'Regulatory, ANVISA and Pharmaceuticals',
    audience: 'Foreign manufacturers, importers and distributors',
    summary: 'Importing medicines into Brazil: sanitary compliance and setting up importers before ANVISA.',
    seo: {
      title: 'ANVISA Lawyer: Importing Medicines into Brazil',
      description:
        'Legal requirements for importing medicines into Brazil, ANVISA procedures, setting up importers and partnering with licensed Brazilian companies.',
    },
    description: [
      'Counsel to foreign and Brazilian companies seeking to bring medicines and pharmaceutical products to the Brazilian market, with legal studies and strategies involving suppliers from countries such as India, Mexico and China.',
      'Importing medicines into Brazil requires specific sanitary authorization and a company licensed by ANVISA, Brazil’s health regulatory agency. The work starts with the requirements that apply to the product and business model, and moves on to structuring the importing company or a partnership with a Brazilian company that already holds the licenses.',
    ],
    services: [
      'Legal requirements for importing medicines',
      'Regulatory procedures before ANVISA',
      'Legal structuring of importing companies',
      'Counsel to intermediaries and distributors',
      'Sanitary and documentary compliance',
      'Partnerships with Brazilian companies licensed to import',
    ],
    faq: [
      {
        question: 'Can a foreign company import medicines directly into Brazil?',
        answer:
          'As a rule, importing for commercial sale requires a company established in Brazil with the required sanitary authorizations, and a product registered with ANVISA. Market entry therefore usually involves setting up a licensed local company or partnering with a Brazilian company that already holds the authorizations. The case review shows which model fits best.',
      },
      {
        question: 'Does the work include contracts with suppliers abroad?',
        answer:
          'Yes. The structuring covers contracts with foreign manufacturers and suppliers, the required documentation and, when needed, coordination with professionals in other jurisdictions.',
      },
    ],
  },
  {
    slug: 'imigracao-empresarial-investimento-estrangeiro',
    front: 'internacional',
    title: 'Business Immigration, Foreign Investment and Internationalization',
    shortTitle: 'Business Immigration and Foreign Investment',
    audience: 'Foreign nationals, investors and companies',
    summary: 'Residence for investors and entrepreneurs, opening a company in Brazil and investing in the country.',
    seo: {
      title: 'Business Immigration and Investment Lawyer in Brazil',
      description:
        'Immigration status, investor and entrepreneur residence permits, opening a company in Brazil as a foreigner and legal counsel on investing in Brazil.',
    },
    description: [
      'Counsel to foreign nationals who wish to stay in Brazil legally, set up companies and carry out business in the country — from immigration status to structuring the investment.',
      'Immigration, incorporation and investment usually go hand in hand: the type of residence permit, the form of the company and the registration of foreign capital should be planned together from the start.',
    ],
    services: [
      'Immigration status regularization',
      'Residence permits for investors and entrepreneurs',
      'Incorporation of Brazilian companies by foreigners',
      'Counsel on investing in Brazil',
      'Document compliance before Brazilian authorities',
      'Guidance on hiring foreign professionals',
    ],
    faq: [
      {
        question: 'Can a foreigner open a company in Brazil?',
        answer:
          'Yes. Foreign individuals and companies can hold shares in Brazilian companies, subject to requirements such as a Brazilian tax ID (CPF or CNPJ), a legal representative in Brazil and, in some sectors, specific restrictions. To manage the company, the law generally requires an officer who resides in Brazil.',
      },
      {
        question: 'Is there a residence permit for investors?',
        answer:
          'Yes. Brazilian immigration law provides for residence permits for people who invest in the country, with criteria and amounts set by specific regulations, as well as other permits tied to business and employment. A review of your profile shows which option applies.',
      },
    ],
  },
  {
    slug: 'sucessoes-internacionais',
    front: 'internacional',
    title: 'International Estates and Cross-Border Wealth Planning',
    shortTitle: 'International Estates',
    audience: 'Families and heirs in Brazil and abroad',
    summary: 'Probate with heirs or assets in other countries, such as Portugal and France, and wealth planning.',
    seo: {
      title: 'International Probate and Estate Lawyer in Brazil',
      description:
        'Brazilian probate with heirs abroad, assets in other countries and foreign documents — coordinated with lawyers in Portugal, France and elsewhere.',
    },
    description: [
      'Counsel on probate and succession matters connecting Brazil and other countries, including Portugal and France — with heirs living in different countries, assets abroad or foreign documents.',
      'These cases require determining where each asset must be probated, which law applies and how documents issued in one country take effect in another. The work includes coordinating with foreign lawyers so the proceedings move forward together.',
    ],
    services: [
      'Probate and succession with international elements',
      'Heirs residing in different countries',
      'Identifying and regularizing assets abroad',
      'Legal coordination with foreign lawyers',
      'Recognition and effect of foreign documents in Brazil',
      'Jurisdiction and applicable law analysis',
      'Cross-border wealth and succession planning',
    ],
    faq: [
      {
        question: 'Do assets in Brazil require Brazilian probate if the deceased lived abroad?',
        answer:
          'Yes. Under Brazilian law, only Brazilian authorities can conduct probate and divide assets located in Brazil, even if the deceased was a foreign national or lived outside the country. Assets abroad generally follow the procedures of the country where they are.',
      },
      {
        question: 'Can heirs living abroad take part without traveling to Brazil?',
        answer:
          'Generally, yes — through a power of attorney and documents properly apostilled or legalized and, where available, by electronic acts.',
      },
    ],
  },
  {
    slug: 'representacoes-estrangeiras',
    front: 'internacional',
    title: 'Counsel to Foreign Missions and Institutional Relations',
    shortTitle: 'Foreign Missions',
    audience: 'Embassies, consulates and foreign missions',
    summary: 'Brazilian law for diplomatic missions, including the termination of local employment contracts.',
    seo: {
      title: 'Legal Counsel for Embassies and Consulates in Brazil',
      description:
        'Brazilian law for foreign missions: ending local employment contracts, severance calculations, documentation and out-of-court settlements.',
    },
    description: [
      'Counsel to foreign diplomatic and consular missions in Brazil on matters of Brazilian law, with attention to the legal particularities that apply to these entities and to the institutional handling of the relationships involved.',
      'One area of work is ending employment relationships with locally hired staff: reviewing the contracts, calculating severance, organizing the documentation and assessing out-of-court settlement options — with discretion and confidentiality.',
    ],
    services: [
      'Termination of local staff employment contracts',
      'Severance calculations and review of amounts due',
      'Employment and institutional documentation',
      'Out-of-court settlements and agreements',
      'Guidance on Brazilian law applicable to foreign missions',
      'Institutional relations with local authorities and partners',
    ],
    faq: [
      {
        question: 'Are locally hired embassy staff subject to Brazilian labor law?',
        answer:
          'As a rule, yes. Contracts with locally hired staff of foreign missions follow Brazilian labor law, and Brazilian courts do not recognize immunity from jurisdiction in employment matters. Careful handling of the termination and any settlement is therefore especially important.',
      },
    ],
  },
  {
    slug: 'contratos-internacionais',
    front: 'internacional',
    title: 'International Contracts, Negotiation and Deal Structuring',
    shortTitle: 'International Contracts',
    audience: 'Companies, intermediaries and business partners',
    summary: 'NDA, NCNDA, IMFPA, MOUs, commercial agency and exclusivity agreements for cross-border deals.',
    seo: {
      title: 'International Contracts Lawyer: NDA, NCNDA, IMFPA',
      description:
        'Drafting and review of NDAs, NCNDAs, IMFPAs, MOUs, commercial agency and exclusivity agreements, guarantees and dispute resolution clauses.',
    },
    description: [
      'Drafting, review and negotiation of the legal instruments used in commercial deals between companies and intermediaries from different countries — with partners from markets such as Mexico, Guatemala, Italy and Spain, among others.',
      'In cross-border deals, a contract has to work under more than one legal system: governing law, forum or arbitration, language, guarantees and non-circumvention protection should be addressed from the first draft.',
    ],
    services: [
      'NDA — Non-Disclosure Agreements',
      'NCNDA — Non-Circumvention, Non-Disclosure Agreements',
      'IMFPA — Fee Protection Agreements',
      'International commercial agency agreements',
      'Exclusivity agreements',
      'Memoranda of understanding (MOU)',
      'Engagement and international advisory agreements',
      'Guarantees and dispute resolution mechanisms',
    ],
    faq: [
      {
        question: 'What are an NCNDA and an IMFPA?',
        answer:
          'Both are common in international deals involving intermediaries. An NCNDA (Non-Circumvention, Non-Disclosure Agreement) protects information and prevents the parties from bypassing whoever introduced the deal; an IMFPA (Irrevocable Master Fee Protection Agreement) governs the payment of intermediaries’ commissions. How well either works depends on careful drafting and the chosen governing law.',
      },
      {
        question: 'Can contracts be drafted in English?',
        answer:
          'Yes. International contracts can be drafted in English or as bilingual versions, specifying which version prevails. For use before Brazilian authorities, a sworn translation may be required.',
      },
    ],
  },
  {
    slug: 'direito-societario-internacional',
    front: 'internacional',
    title: 'International Corporate Law and Business Expansion',
    shortTitle: 'International Corporate and Expansion',
    audience: 'Expanding companies and foreign groups',
    summary: 'Corporate structures, market entry and structuring operations across countries.',
    seo: {
      title: 'Doing Business in Brazil: Corporate Lawyer',
      description:
        'Corporate structures, subsidiaries, partner agreements, commercial agency and market entry for foreign companies in Brazil — and Brazilian companies abroad.',
    },
    description: [
      'Counsel on business expansion, organizing international operations and structuring commercial relationships between countries — with experience in internationalization and corporate structuring projects between Brazil and the Middle East, including Oman.',
      'The work covers analysis of corporate structures, partner agreements, commercial agency, market entry planning and coordination with legal professionals in other jurisdictions.',
    ],
    services: [
      'Corporate structure and market entry analysis',
      'Setting up subsidiaries, branches and joint ventures',
      'Shareholder and partner agreements',
      'Commercial agency and distribution',
      'Planning entry into new markets',
      'Coordination with lawyers in other jurisdictions',
    ],
    faq: [
      {
        question: 'How can a foreign company start operating in Brazil?',
        answer:
          'It depends on the goal and the stage of the operation: a commercial agent or distributor, a partnership with a local company, a joint venture or a subsidiary — usually a limited liability company (sociedade limitada). Each model has different implications for cost, liability, taxation and control, and the choice should be made before the first contract.',
      },
    ],
  },
  {
    slug: 'direito-internacional-privado',
    front: 'internacional',
    title: 'Private International Law, Family and Assets',
    shortTitle: 'International Family and Assets',
    audience: 'People and families with ties to more than one country',
    summary: 'Family and property matters with parties abroad, international child support and foreign documents.',
    seo: {
      title: 'International Family Lawyer in Brazil',
      description:
        'Divorce with a spouse abroad, international child support, recognition of foreign judgments in Brazil, foreign documents and cross-border legal cooperation.',
    },
    description: [
      'Private legal matters that cross Brazil’s borders, especially family and property disputes with parties living abroad.',
      'These situations involve international support obligations, foreign documents, determining which courts have jurisdiction and cross-border legal cooperation mechanisms.',
    ],
    services: [
      'Divorce and family matters with parties abroad',
      'International child and spousal support',
      'Recognition of foreign judgments in Brazil',
      'Foreign documents, apostille and translation',
      'Jurisdiction and applicable law',
      'International legal cooperation',
    ],
    faq: [
      {
        question: 'Is a divorce granted abroad valid in Brazil?',
        answer:
          'To take effect in Brazil, a foreign divorce judgment generally has to be recognized by the Superior Court of Justice (STJ). For simple uncontested divorces, Brazilian notarial rules allow it to be registered directly at the civil registry office.',
      },
      {
        question: 'Can child support be claimed from someone living in another country?',
        answer:
          'Yes. Brazil is a party to international conventions on the recovery of support abroad, such as the 1956 New York Convention and the 2007 Hague Convention, which allow support to be requested and enforced through cooperation between the authorities of the countries involved.',
      },
    ],
  },
]

export const en: Dictionary = {
  meta: {
    defaultTitle: 'Strategic and International Legal Practice',
    home: {
      title: 'Laís Mota | International & Business Lawyer in Brazil',
      description:
        'Boutique law firm in Brasília, Brazil: foreign trade and commodities, international contracts, foreign investment, business immigration and civil law.',
    },
    about: {
      title: 'About Laís Mota',
      description:
        'Learn about Laís Mota, a lawyer in Brasília, Brazil, with a strategic practice and an international and business practice for foreign clients.',
    },
    areas: {
      title: 'Practice Areas',
      description:
        'Strategic practice (civil, family, corporate, contracts, litigation) and international practice (trade, ANVISA, immigration, investment, estates) in Brazil.',
    },
    international: {
      title: 'International Business Lawyer in Brazil',
      description:
        'Brazilian counsel for foreign companies and investors: trade and commodities, international contracts, ANVISA, business immigration and cross-border estates.',
    },
    contact: {
      title: 'Contact',
      description:
        'Schedule a meeting with Laís Mota, by video call or in person in Brasília, Brazil, to discuss your case or your company’s legal needs.',
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Learn how Lais Mota Advocacia collects, uses and protects your personal data, in accordance with Brazilian data protection law (LGPD).',
    },
    terms: {
      title: 'Terms of Use',
      description: 'Terms of use for the Lais Mota Advocacia website.',
    },
    shareImageAlt: 'Laís Mota Advocacia — strategic and international legal practice in Brasília, Brazil',
    keywords: [
      'lawyer in Brazil',
      'international business lawyer Brazil',
      'Brazilian lawyer for foreigners',
      'foreign investment Brazil lawyer',
      'business immigration Brazil',
      'ANVISA regulatory lawyer',
      'commodities lawyer Brazil',
      'international contracts Brazil',
      'international probate Brazil',
    ],
  },

  nav: {
    home: 'Home',
    about: 'About',
    areas: 'Practice areas',
    international: 'International',
    contact: 'Contact',
    cta: 'Book a meeting',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Navigation',
    language: 'Language',
  },

  fronts: {
    estrategica: {
      name: 'Strategic Practice',
      tagline: 'Individuals, families and companies',
      description:
        'Civil, business, family and property matters and complex litigation, with risk and scenario analysis before every decision.',
    },
    internacional: {
      name: 'International & Business Practice',
      tagline: 'Deals between Brazil and other countries',
      description:
        'Foreign trade, international contracts, foreign investment, regulation, commodities, business immigration and international estates.',
    },
  },

  home: {
    heroAlt: 'Laís Mota, lawyer in Brasília, Brazil',
    eyebrow: 'Lawyer in Brazil · Strategic and international practice',
    title: 'Understand the whole problem before choosing the path.',
    lead: 'A strategic practice grounded in civil litigation and complex human matters, and an international practice connecting law, business and transactions between Brazil and other countries.',
    ctaPrimary: 'Book a meeting',
    ctaSecondary: 'International practice',
    scroll: 'Scroll to learn more',
    who: {
      kicker: 'I · How I work',
      title: 'Strategy, study, sensitivity and depth.',
      body: 'Before the brief or the contract, I try to understand the problem as a whole: the people involved, what is at stake and the risks that have not surfaced yet. That is where I start building options, and the best solution is often not the most obvious legal route. I practice on two fronts: a strategic practice for civil, business, family and property matters, and an international and business practice for transactions between Brazil and other countries.',
    },
    pillars: [
      {
        title: 'Understand before acting',
        body: 'Studying the case, the documents and the people involved before any decision. No ready-made answers.',
      },
      {
        title: 'Build options',
        body: 'Risks and scenarios mapped out to find solutions that often go beyond the traditional legal route.',
      },
      {
        title: 'Technological and hands-on',
        body: 'Digital tools that keep the work moving, with direct contact with me from the first conversation to the end.',
      },
    ],
    areas: {
      watermark: 'Areas',
      kicker: 'II · Practice areas',
      title: 'Two fronts of practice.',
      all: 'See all practice areas',
      frontCta: 'Explore the international practice',
    },
    brasilia: {
      imageAlt: 'National Congress, Brasília',
      kicker: 'Serving clients across Brazil',
      title: 'From Brasília to all of Brazil — and beyond.',
      body: 'Meetings are held in person and online — by video call and, when appropriate, by phone. This allows us to serve clients in Brasília, in other Brazilian states and companies, investors and families abroad.',
      cta: 'Book a meeting',
    },
    diff: {
      kicker: 'III · International practice',
      title: 'One logic behind every transaction.',
      body: 'Commodities, contracts, investment, health regulation, pharmaceutical imports, immigration and corporate structuring may look like separate fields. What ties them together is the same work: understanding business, connecting people, analyzing different legal systems and structuring solutions. My background in Foreign Trade lets me read each transaction by its commercial logic, not only its legal one.',
    },
    moments: [
      {
        alt: 'Laís Mota at the Embassy of India in Brasília, at the Strategic Partnerships event',
        caption: 'Embassy of India — Brazil–India Strategic Partnerships',
      },
      {
        alt: 'Laís Mota at COP30, the UN Climate Change Conference, in Belém',
        caption: 'COP30 — UN Climate Change Conference, Belém',
      },
    ],
    experience: [
      {
        title: 'International transactions',
        body: 'Experience in the legal structuring of commodity and regulated-product transactions — including imports from China —, as well as internationalization and corporate structuring projects between Brazil and the Middle East, including Oman.',
      },
      {
        title: 'Negotiation instruments',
        body: 'Drafting and review of commercial contracts, memoranda of understanding (MOUs), non-disclosure and non-circumvention agreements (NDA, NCNDA), fee protection agreements (IMFPA) and contractual frameworks that protect the parties in cross-border transactions.',
      },
    ],
    itamaraty: {
      imageAlt: 'Laís Mota at the Itamaraty Palace, headquarters of Brazil’s Ministry of Foreign Affairs, in Brasília',
      kicker: 'International relations',
      title: 'From institutional settings to international dialogue.',
      body: 'A modern legal practice is also built by listening to different contexts — legal, business, cultural and global.',
    },
    process: {
      kicker: 'IV · Method',
      title: 'MÉTODO LITIS™',
      intro:
        'My own methodology, which organizes every case and transaction into stages of analysis, strategy, review and follow-through. It is not a rigid protocol: it ensures that no decision is made before the problem has been fully understood.',
    },
    steps: [
      {
        title: 'Analysis',
        body: 'Careful listening, study of the documents and the people involved, and a reading of the whole problem, not just the legal question.',
      },
      {
        title: 'Strategy',
        body: 'Risks and scenarios mapped out and options built, in court or out of it, until the one best suited to your goals emerges.',
      },
      {
        title: 'Review',
        body: 'Every brief, contract or opinion goes through a critical review before it moves on: what could go wrong, and what is still missing.',
      },
      {
        title: 'Follow-through',
        body: 'Present at every stage until the end, with clear communication about what is happening and what comes next.',
      },
    ],
    faq: {
      kicker: 'V · FAQ',
      title: 'Before booking, you may want to know.',
    },
    closing: {
      kicker: 'First conversation',
      title: 'Tell me the whole problem. Strategy starts there.',
      line: 'In-person and online meetings, by appointment.',
      cta: 'Talk to Laís Mota',
    },
  },

  international: {
    kicker: 'International & Business Practice',
    title: 'Brazilian law for transactions that cross borders.',
    lead: 'Counsel to companies, investors, intermediaries and families on matters between Brazil and other countries — foreign trade, commodities, international contracts, health regulation, business immigration, foreign investment and international estates.',
    cta: 'Book a meeting',
    capabilities: {
      kicker: 'I · The logic of the practice',
      title: 'Different fields, one way of thinking.',
      items: [
        {
          title: 'Understanding business',
          body: 'A Foreign Trade background to read the deal by its commercial logic: intermediaries, Incoterms, guarantees, deadlines and performance risks.',
        },
        {
          title: 'Connecting people',
          body: 'Working alongside lawyers and professionals in other countries, so each part of the deal is handled by someone who knows the local law.',
        },
        {
          title: 'Analyzing legal systems',
          body: 'Reading the transaction under Brazilian law and the rules of the other countries involved: contracts, regulation, and corporate, immigration and documentary requirements.',
        },
        {
          title: 'Structuring solutions',
          body: 'Instruments, guarantees, governing law and dispute resolution designed for the actual transaction, not copied from templates.',
        },
      ],
    },
    areas: {
      kicker: 'II · Areas',
      title: 'International practice areas.',
    },
    markets: {
      kicker: 'III · International experience',
      title: 'Transactions with partners across continents.',
      body: 'Experience in studies, negotiations and deal structuring involving partners and suppliers from countries such as China, India, Oman, Mexico, Guatemala, Italy, Spain, Portugal and France.',
      note: 'Client names, amounts and specific negotiations are kept under attorney–client confidentiality.',
    },
    process: {
      kicker: 'IV · Steps',
      title: 'How an international matter is handled.',
      steps: [
        { title: 'Assessment', body: 'Understanding the transaction, the parties, the countries involved and the commercial goals.' },
        { title: 'Risks and documents', body: 'Document review, counterparty checks and mapping of legal and regulatory risks.' },
        { title: 'Structuring', body: 'Drafting and negotiating the instruments, setting governing law, guarantees and dispute resolution.' },
        { title: 'Follow-through', body: 'Coordination with foreign partners and support until the transaction closes.' },
      ],
    },
    faq: {
      kicker: 'V · FAQ',
      title: 'About the international practice.',
      items: [
        {
          question: 'Do you work with companies and investors based outside Brazil?',
          answer:
            'Yes. The engagement can be entirely online, by video call, with documents sent and reviewed digitally. In-person meetings take place at the office in Brasília, by appointment.',
        },
        {
          question: 'How does coordination with foreign lawyers work?',
          answer:
            'When a matter depends on another country’s law, the work is done together with professionals in that jurisdiction: the office handles the Brazilian side, and strategy, deadlines and documents are aligned between the lawyers involved.',
        },
        {
          question: 'When should I bring in legal counsel on an international deal?',
          answer:
            'Before signing the first document — including NDAs, letters of intent and commercial offers. Adjusting the structure at the start is usually far simpler than fixing it after obligations have been taken on.',
        },
        {
          question: 'Is information about my transaction kept confidential?',
          answer:
            'Yes. Confidentiality is a professional duty of every lawyer in Brazil. The office does not disclose client names, amounts or details of negotiations.',
        },
      ],
    },
    closing: {
      title: 'Working on an international deal?',
      line: 'Initial meeting by video call or in person in Brasília.',
      cta: 'Talk to Laís Mota',
    },
  },

  about: {
    photoAlt: 'Laís Mota, lawyer',
    kicker: 'I · About',
    intro: [
      'I chose to build a legal practice that is neither rigid nor distant. I believe confidence comes from competence, not from an artificial image of authority.',
      'My work rests on strategy, study, sensitivity and depth. I like to understand the problem as a whole, get to know the people involved and build options, even when the best solution lies outside the traditional legal route.',
    ],
    oabNote: 'Admitted to the Brazilian Bar Association (Ordem dos Advogados do Brasil).',
    credentials: [
      {
        label: 'Education',
        value:
          'Law degree from the Federal University of Western Pará (UFOPA), with an MBA in Foreign Trade from ABRACOMEX, in partnership with Massachusetts International Business (MIB).',
      },
      {
        label: 'Experience',
        value:
          'Legal advisor at the Court of Justice of the State of Pará (TJPA) and, currently, private practice in Brasília on two fronts: a strategic practice (civil, family, business, contracts and litigation) and an international and business practice.',
      },
    ],
    cta: 'Book a meeting',
    trajectory: {
      kicker: 'II · Career',
      paragraphs: [
        'While still in law school, I sought experiences that would help me understand the law beyond litigation, taking part in academic and institutional projects related to human rights and international relations.',
        'I then worked as a legal advisor at the Court of Justice of the State of Pará (TJPA) — an experience that greatly deepened my understanding of how courts reach decisions and helped me develop a technical and strategic view of litigation.',
        'In Brasília, I established my private practice. It is increasingly multidisciplinary, connecting law, business, technology and international relations, while keeping its grounding in civil litigation and complex human matters.',
        'The international practice is not just another area of the firm. I have been building it with dedication, in foreign trade and commodity transactions, contracts, investment, health regulation, pharmaceutical imports, immigration and corporate structuring, working with professionals in different countries.',
      ],
    },
    values: {
      kicker: 'III · How I think about law',
      title: 'Sophisticated, yet approachable. International, with an identity of its own.',
      items: [
        { title: 'Intellectual rigor', body: 'Constant study as the foundation of any strategy.' },
        { title: 'Communication', body: 'Explaining clearly what is happening and why, without unnecessary legalese.' },
        { title: 'Elegance', body: 'In how a case is handled, written and negotiated.' },
        { title: 'Discretion', body: 'Confidentiality and care with the information and the people involved in every case.' },
        { title: 'Human relationships', body: 'Behind every case or transaction there are people, and that is where the work begins.' },
      ],
      method: 'This way of working is organized in the MÉTODO LITIS™.',
      methodLink: 'Explore the method',
    },
    commitment: {
      kicker: 'IV · Commitment',
      body: 'During my studies, I took part in activities related to migration policy and refugee protection, in a project at the Federal University of Paraná (UFPR), in Curitiba — an experience that shaped my grounding in human rights and a legal perspective attentive to international, migration and social issues. The defense of human rights and human dignity remains one of the values that guide my understanding of the law.',
      note: 'I have approximately three years of legal practice, with experience in more than 50 cases, advisory engagements and legal projects involving civil, business, contractual and international matters.',
    },
  },

  areasPage: {
    kicker: 'I · Practice areas',
    title: 'How I can help.',
    intro:
      'The practice is organized into two fronts. Every case and every transaction receives its own analysis — get in touch to discuss your specific situation.',
  },

  areaPage: {
    servicesTitle: 'What the work covers',
    audienceLabel: 'Who it is for',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'Other areas in this practice',
    cta: 'Discuss my case',
  },

  contact: {
    kicker: 'I · Contact',
    title: 'Let’s talk about your case.',
    intro:
      'Fill in the form or reach out directly through the channels below. Meetings are by appointment, subject to prior confirmation.',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    office: 'Office',
    hours: 'Meetings',
    hoursValue: 'In person and online, by prior appointment',
    mapTitle: 'Map of the office in Asa Norte, Brasília',
    mapLink: 'Open in Google Maps',
  },

  form: {
    name: 'Name',
    subject: 'Subject',
    message: 'Tell us briefly about your case',
    submit: 'Send via WhatsApp',
    note: 'When you submit, your message will open in WhatsApp for you to review and send.',
    whatsappTemplate: 'Hello, my name is {name}.\nSubject: {subject}\n\n{message}',
    errors: {
      name: 'Please enter your name.',
      subject: 'Please enter a subject.',
      message: 'Please describe your case briefly.',
    },
    success: 'WhatsApp opened! Review your message and tap Send.',
  },

  footer: {
    tagline: 'A boutique, strategic and international legal practice with personalized service.',
    contact: 'Contact',
    nav: 'Navigation',
    navLabel: 'Footer navigation',
    rights: 'All rights reserved.',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  },

  stickyCta: 'Book a meeting',

  cookie: {
    message: 'We use cookies to analyse traffic and improve your experience. By accepting, you consent to our',
    privacyLink: 'Privacy Policy',
    accept: 'Accept',
    decline: 'Decline',
  },

  whatsappLabel: 'Chat on WhatsApp',
  whatsappGreeting: 'Hello! I found you through the website and would like to speak with Laís Mota.',

  practiceAreas,

  faq: [
    {
      question: 'How do meetings work?',
      answer:
        'Meetings take place in person at the office in Brasília (Asa Norte) or online by video call — always by prior appointment, so that each matter can be reviewed individually.',
    },
    {
      question: 'What kinds of matters does the office handle?',
      answer:
        'Two main fronts. Strategic practice: civil, family, property, business and contract matters and complex litigation. International and business practice: foreign trade and commodities, international contracts, health regulation (ANVISA), business immigration, foreign investment, international estates and counsel to foreign missions.',
    },
    {
      question: 'Is online service as good as meeting in person?',
      answer:
        'Yes. The case analysis, legal strategy and follow-up are the same — video calls (and, when appropriate, phone calls) make it possible to serve clients in Brasília, in other states and in other countries.',
    },
    {
      question: 'What should I bring to the first meeting?',
      answer:
        'It depends on the matter — usually personal or corporate documents and any material related to the case (contracts, correspondence, notices). This is agreed with you when booking, so the first meeting is productive from the start.',
    },
    {
      question: 'When is preventive legal advice worth it?',
      answer:
        'Before signing a significant contract, starting a business operation or negotiating with a partner — in Brazil or abroad. Identifying risks before signing is usually far simpler than solving them later.',
    },
    {
      question: 'What does the international practice involve?',
      answer:
        'Transactions that require, at the same time, Brazilian legal analysis, an understanding of international commercial relationships and coordination with foreign partners — such as commodity deals, imports of regulated products, foreign investors and companies entering Brazil, and estates with assets or heirs in other countries.',
    },
  ],
}
