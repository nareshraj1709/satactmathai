'use client'

const sections = [
  {
    title: 'Algebra',
    color: '#2563EB',
    bg: '#EFF6FF',
    formulas: [
      { name: 'Slope', formula: 'm = (y₂ - y₁) / (x₂ - x₁)' },
      { name: 'Slope-Intercept', formula: 'y = mx + b' },
      { name: 'Point-Slope', formula: 'y - y₁ = m(x - x₁)' },
      { name: 'Standard Form', formula: 'Ax + By = C' },
      { name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a' },
      { name: 'Discriminant', formula: 'D = b² - 4ac' },
      { name: 'Vertex (Standard)', formula: 'x = -b/(2a)' },
      { name: 'Vertex Form', formula: 'y = a(x - h)² + k' },
      { name: 'Difference of Squares', formula: 'a² - b² = (a+b)(a-b)' },
      { name: 'Exponent Product', formula: 'xᵃ · xᵇ = xᵃ⁺ᵇ' },
      { name: 'Exponent Quotient', formula: 'xᵃ / xᵇ = xᵃ⁻ᵇ' },
      { name: 'Power Rule', formula: '(xᵃ)ᵇ = xᵃᵇ' },
    ],
  },
  {
    title: 'Geometry',
    color: '#DC2626',
    bg: '#FEF2F2',
    formulas: [
      { name: 'Distance', formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)' },
      { name: 'Midpoint', formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)' },
      { name: 'Triangle Area', formula: 'A = ½bh' },
      { name: 'Circle Area', formula: 'A = πr²' },
      { name: 'Circumference', formula: 'C = 2πr' },
      { name: 'Circle Equation', formula: '(x-h)² + (y-k)² = r²' },
      { name: 'Arc Length', formula: 's = (θ/360) × 2πr' },
      { name: 'Sector Area', formula: 'A = (θ/360) × πr²' },
      { name: '30-60-90 Triangle', formula: 'x : x√3 : 2x' },
      { name: '45-45-90 Triangle', formula: 'x : x : x√2' },
      { name: 'Pythagorean Theorem', formula: 'a² + b² = c²' },
    ],
  },
  {
    title: 'Trigonometry',
    color: '#7C3AED',
    bg: '#F5F3FF',
    formulas: [
      { name: 'Sine', formula: 'sin θ = opposite / hypotenuse' },
      { name: 'Cosine', formula: 'cos θ = adjacent / hypotenuse' },
      { name: 'Tangent', formula: 'tan θ = opposite / adjacent' },
      { name: 'Pythagorean Identity', formula: 'sin²θ + cos²θ = 1' },
      { name: 'Complementary', formula: 'sin(x) = cos(90° - x)' },
      { name: 'Radians Conversion', formula: 'θ(rad) = θ(deg) × π/180' },
      { name: 'Law of Sines (ACT)', formula: 'a/sinA = b/sinB = c/sinC' },
      { name: 'Law of Cosines (ACT)', formula: 'c² = a² + b² - 2ab·cosC' },
    ],
  },
  {
    title: 'Statistics & Probability',
    color: '#059669',
    bg: '#ECFDF5',
    formulas: [
      { name: 'Mean', formula: 'x̄ = Σx / n' },
      { name: 'Probability', formula: 'P(E) = favorable / total' },
      { name: 'Percent Change', formula: '((new - old) / old) × 100' },
      { name: 'Simple Interest', formula: 'I = Prt' },
      { name: 'Compound Interest', formula: 'A = P(1 + r/n)ⁿᵗ' },
      { name: 'Exponential Growth', formula: 'y = a(1 + r)ᵗ' },
      { name: 'Exponential Decay', formula: 'y = a(1 - r)ᵗ' },
    ],
  },
  {
    title: '3D Geometry (ACT)',
    color: '#D97706',
    bg: '#FFFBEB',
    formulas: [
      { name: 'Rectangular Prism V', formula: 'V = lwh' },
      { name: 'Cylinder Volume', formula: 'V = πr²h' },
      { name: 'Cone Volume', formula: 'V = ⅓πr²h' },
      { name: 'Sphere Volume', formula: 'V = (4/3)πr³' },
      { name: 'Sphere Surface Area', formula: 'SA = 4πr²' },
      { name: 'Pyramid Volume', formula: 'V = ⅓Bh' },
    ],
  },
]

export default function FormulaSheetPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
          Formula Sheet
        </h1>
        <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 8px' }}>
          Every formula you need for the SAT and ACT math sections
        </p>
        <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 32px' }}>
          Note: The SAT provides some formulas at the start of each section. The ACT does NOT provide any formulas — memorize them all!
        </p>

        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: section.color, margin: '0 0 16px' }}>{section.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {section.formulas.map(f => (
                <div key={f.name} style={{
                  background: section.bg, borderRadius: 12, padding: '16px 20px',
                  border: `1px solid ${section.color}20`,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: section.color, marginBottom: 4 }}>{f.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1E293B', fontFamily: 'Georgia, serif' }}>{f.formula}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
