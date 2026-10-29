import type { Locale } from '@/i18n/config'

// Small round flags drawn inline — emoji flags don't render on Windows.
const flags: Record<Locale, React.ReactNode> = {
  pt: (
    <>
      <rect width="32" height="32" fill="#009c3b" />
      <polygon points="16,5 30,16 16,27 2,16" fill="#ffdf00" />
      <circle cx="16" cy="16" r="6.2" fill="#002776" />
      <path d="M10.2 14.6c3.9-.9 8-.3 11.6 1.7" stroke="#fff" strokeWidth="1.1" fill="none" />
    </>
  ),
  en: (
    <>
      <rect width="32" height="32" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 32) / 13} width="32" height={32 / 13} fill="#b22234" />
      ))}
      <rect width="15" height={(32 / 13) * 7} fill="#3c3b6e" />
      {[
        [3, 3], [7.5, 3], [12, 3], [5.2, 6.5], [9.8, 6.5], [3, 10], [7.5, 10], [12, 10], [5.2, 13.5], [9.8, 13.5],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="#fff" />
      ))}
    </>
  ),
}

export function Flag({ locale, className = 'h-5 w-5' }: { locale: Locale; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`${className} shrink-0 rounded-full ring-1 ring-ink-950/15`} aria-hidden="true">
      <defs>
        <clipPath id={`flag-clip-${locale}`}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-clip-${locale})`}>{flags[locale]}</g>
    </svg>
  )
}
