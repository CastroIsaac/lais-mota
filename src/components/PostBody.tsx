import type { PostBlock } from '@/content/blog'

// Renders the long-form text of blog posts and service pages.
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return blocks.map((block, i) => <Block key={i} block={block} />)
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === 'h2') return <h2 className="mt-10 font-serif text-2xl text-ink-950">{block.text}</h2>
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink-700">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return <p className="mt-4 text-base leading-relaxed text-ink-700">{block.text}</p>
}
