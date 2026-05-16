export default function Quote({
  quote,
  name,
  detail,
}: {
  quote: string
  name: string
  detail?: string
}) {
  return (
    <figure className="card p-7">
      <blockquote className="font-serif text-[20px] leading-[1.45] text-[color:var(--color-ink)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 eyebrow">
        — {name}{detail && <> · {detail}</>}
      </figcaption>
    </figure>
  )
}
