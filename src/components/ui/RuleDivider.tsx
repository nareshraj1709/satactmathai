export default function RuleDivider({ marker, className = '' }: { marker?: string; className?: string }) {
  if (!marker) return <hr className={`rule border-0 ${className}`} />
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 rule" style={{ height: 1 }} />
      <div className="eyebrow text-[11px]"><span className="marker not-italic">№</span> {marker}</div>
      <div className="flex-1 rule" style={{ height: 1 }} />
    </div>
  )
}
