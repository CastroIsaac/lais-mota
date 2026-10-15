import type { Locale } from './config'

// Kept out of the main dictionaries: the 404 page is a client component, and
// importing the dictionaries there would ship every language's full copy to the browser.
export const notFoundText: Record<Locale, { title: string; body: string; cta: string }> = {
  pt: {
    title: 'Página não encontrada.',
    body: 'O endereço pode ter mudado ou não existir mais.',
    cta: 'Voltar ao início',
  },
  en: {
    title: 'Page not found.',
    body: 'The address may have changed or no longer exists.',
    cta: 'Back to home',
  },
  es: {
    title: 'Página no encontrada.',
    body: 'La dirección puede haber cambiado o ya no existe.',
    cta: 'Volver al inicio',
  },
  fr: {
    title: 'Page introuvable.',
    body: 'L’adresse a peut-être changé ou n’existe plus.',
    cta: 'Retour à l’accueil',
  },
  hi: {
    title: 'पृष्ठ नहीं मिला।',
    body: 'हो सकता है पता बदल गया हो या अब मौजूद न हो।',
    cta: 'होम पर लौटें',
  },
}
