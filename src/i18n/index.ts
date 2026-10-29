import { en } from './dictionaries/en'
import { pt, type Dictionary } from './dictionaries/pt'
import type { Locale } from './config'

const dictionaries: Record<Locale, Dictionary> = { pt, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export { frontOrder } from './dictionaries/pt'
export type { Dictionary, Faq, Front, PracticeArea } from './dictionaries/pt'
