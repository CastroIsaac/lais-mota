export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laismotaadvocacia.com.br'

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return new URL(path, siteUrl).toString()
}

// TODO(mockup): oabNumber is placeholder copy — replace with the real OAB registration number before launch.
export const siteConfig = {
  name: 'Laís Mota Advocacia',
  attorneyName: 'Laís Almeida Mota',
  oabNumber: 'OAB/DF nº 123.456',
  phoneDisplay: '+55 93 99229-0495',
  whatsappUrl: 'https://wa.me/5593992290495',
  email: 'lais_mota@outlook.com',
  // Office address (not her residence) — this is the one safe to publish.
  addressLine: 'CLN 211, Bloco A, Sala 222 — Asa Norte, Brasília-DF',
  hoursLine: 'Atendimento presencial e online, mediante agendamento prévio',
  // TODO: add real handles once she sends them (referenced in the FAQ/posicionamento answers).
  instagramUrl: '',
  linkedinUrl: '',
}
