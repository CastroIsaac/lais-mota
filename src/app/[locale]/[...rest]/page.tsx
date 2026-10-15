import { notFound } from 'next/navigation'

// Unknown paths inside a language (e.g. /en/xyz) — render that language's 404
// with the site header/footer instead of Next's bare default page.
export default function CatchAll() {
  notFound()
}
