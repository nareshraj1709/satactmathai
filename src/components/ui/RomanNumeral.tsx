const ROMAN: Array<[number, string]> = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(n: number): string {
  if (n <= 0 || !Number.isInteger(n)) return ''
  let out = ''
  let rem = n
  for (const [v, s] of ROMAN) {
    while (rem >= v) { out += s; rem -= v }
  }
  return out
}

export default function RomanNumeral({ n, className = '' }: { n: number; className?: string }) {
  return <span className={`marker ${className}`}>{toRoman(n)}</span>
}
