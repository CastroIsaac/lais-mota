export default function Loading() {
  return (
    <div className="mx-auto max-w-content animate-pulse px-5 py-32 md:px-8 md:py-40">
      <div className="mb-4 h-2.5 w-20 rounded bg-ink-950/8" />
      <div className="mb-6 h-10 w-3/4 rounded bg-ink-950/8" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-ink-950/8" />
        <div className="h-4 w-5/6 rounded bg-ink-950/8" />
        <div className="h-4 w-4/6 rounded bg-ink-950/8" />
      </div>
    </div>
  )
}
