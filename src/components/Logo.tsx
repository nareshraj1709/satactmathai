export default function Logo({
  size = 16,
  showName = true,
}: {
  size?: number
  showName?: boolean
  nameSize?: number
}) {
  return (
    <div className="flex items-baseline gap-1 leading-none select-none">
      <span
        className="font-serif text-[color:var(--color-ink)]"
        style={{ fontSize: size + 6, fontWeight: 600, lineHeight: 1 }}
        aria-hidden
      >
        Σ
      </span>
      {showName && (
        <span className="font-serif text-[color:var(--color-ink)]" style={{ fontSize: size, fontWeight: 700, letterSpacing: '-0.01em' }}>
          SATACTMath
          <span className="font-mono italic" style={{ color: 'var(--color-marker)', fontWeight: 500, marginLeft: 1 }}>_AI_</span>
        </span>
      )}
    </div>
  )
}
