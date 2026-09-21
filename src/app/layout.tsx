import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ScrollReveal } from '@/components/ScrollReveal'
import { siteConfig, siteUrl } from '@/lib/site'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.attorneyName }],
  description:
    'Laís Mota é advogada em Brasília com atuação estratégica em Direito Civil, Empresarial, Contratual e Consultoria Jurídica Internacional.',
  keywords: [
    'Laís Mota advocacia',
    'advogada Brasília',
    'advogada direito empresarial',
    'advogada direito civil Brasília',
    'consultoria jurídica internacional',
    'advogada contratos internacionais',
    'advogada direito de família Brasília',
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    locale: 'pt_BR',
    siteName: siteConfig.name,
    type: 'website',
  },
  title: {
    default: `${siteConfig.name} | Advocacia Estratégica e Internacional`,
    template: `%s | ${siteConfig.name}`,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: siteConfig.attorneyName,
    url: siteUrl,
    image: `${siteUrl}/images/lais-mota-image.jpeg`,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'CLN 211, Bloco A, Sala 222',
      addressLocality: 'Brasília',
      addressRegion: 'DF',
      addressCountry: 'BR',
    },
    areaServed: 'BR',
    knowsLanguage: ['pt-BR'],
  }

  return (
    <html lang="pt-BR" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollReveal />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
