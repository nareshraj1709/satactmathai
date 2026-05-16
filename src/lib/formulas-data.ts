export type FormulaTier = 'SAT' | 'ACT' | 'Both'

export interface FormulaStrand {
  id: string
  number: number
  name: string
  tier: FormulaTier
  blurb: string
  formulas: Array<{ name: string; formula: string; when?: string }>
}

export const FORMULAS: FormulaStrand[] = [
  {
    id: 'algebra',
    number: 1,
    name: 'Algebra',
    tier: 'Both',
    blurb: 'Slopes, lines, quadratics, exponent rules — the workhorse of every SAT and ACT math section.',
    formulas: [
      { name: 'Slope', formula: 'm = (y₂ − y₁) / (x₂ − x₁)', when: 'Two points on a line' },
      { name: 'Slope-Intercept', formula: 'y = mx + b' },
      { name: 'Point-Slope', formula: 'y − y₁ = m(x − x₁)' },
      { name: 'Standard Form', formula: 'Ax + By = C' },
      { name: 'Quadratic Formula', formula: 'x = (−b ± √(b² − 4ac)) / 2a' },
      { name: 'Discriminant', formula: 'D = b² − 4ac' },
      { name: 'Vertex (Standard)', formula: 'x = −b / (2a)' },
      { name: 'Vertex Form', formula: 'y = a(x − h)² + k' },
      { name: 'Difference of Squares', formula: 'a² − b² = (a + b)(a − b)' },
      { name: 'Exponent Product', formula: 'xᵃ · xᵇ = xᵃ⁺ᵇ' },
      { name: 'Exponent Quotient', formula: 'xᵃ / xᵇ = xᵃ⁻ᵇ' },
      { name: 'Power Rule', formula: '(xᵃ)ᵇ = xᵃᵇ' },
    ],
  },
  {
    id: 'geometry',
    number: 2,
    name: 'Geometry',
    tier: 'Both',
    blurb: 'Distance, circles, triangles. The SAT prints some of these on the test — the ACT prints none.',
    formulas: [
      { name: 'Distance', formula: 'd = √((x₂ − x₁)² + (y₂ − y₁)²)' },
      { name: 'Midpoint', formula: 'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)' },
      { name: 'Triangle Area', formula: 'A = ½ b h' },
      { name: 'Circle Area', formula: 'A = π r²' },
      { name: 'Circumference', formula: 'C = 2 π r' },
      { name: 'Circle Equation', formula: '(x − h)² + (y − k)² = r²' },
      { name: 'Arc Length', formula: 's = (θ / 360) × 2 π r' },
      { name: 'Sector Area', formula: 'A = (θ / 360) × π r²' },
      { name: '30-60-90 Triangle', formula: 'x : x√3 : 2x' },
      { name: '45-45-90 Triangle', formula: 'x : x : x√2' },
      { name: 'Pythagorean Theorem', formula: 'a² + b² = c²' },
    ],
  },
  {
    id: 'trigonometry',
    number: 3,
    name: 'Trigonometry',
    tier: 'Both',
    blurb: 'SOH-CAH-TOA plus the identities you actually need. The Law of Sines and Cosines are ACT-only.',
    formulas: [
      { name: 'Sine', formula: 'sin θ = opposite / hypotenuse' },
      { name: 'Cosine', formula: 'cos θ = adjacent / hypotenuse' },
      { name: 'Tangent', formula: 'tan θ = opposite / adjacent' },
      { name: 'Pythagorean Identity', formula: 'sin² θ + cos² θ = 1' },
      { name: 'Complementary', formula: 'sin(x) = cos(90° − x)' },
      { name: 'Radians Conversion', formula: 'θ(rad) = θ(deg) × π / 180' },
      { name: 'Law of Sines', formula: 'a / sin A = b / sin B = c / sin C', when: 'ACT only' },
      { name: 'Law of Cosines', formula: 'c² = a² + b² − 2ab cos C', when: 'ACT only' },
    ],
  },
  {
    id: 'statistics',
    number: 4,
    name: 'Statistics & Probability',
    tier: 'Both',
    blurb: 'Means, percent change, simple interest, exponential growth. Money problems hide here.',
    formulas: [
      { name: 'Mean', formula: 'x̄ = Σx / n' },
      { name: 'Probability', formula: 'P(E) = favorable / total' },
      { name: 'Percent Change', formula: '((new − old) / old) × 100' },
      { name: 'Simple Interest', formula: 'I = P r t' },
      { name: 'Compound Interest', formula: 'A = P (1 + r/n)^(nt)' },
      { name: 'Exponential Growth', formula: 'y = a (1 + r)ᵗ' },
      { name: 'Exponential Decay', formula: 'y = a (1 − r)ᵗ' },
    ],
  },
  {
    id: '3d-geometry',
    number: 5,
    name: '3D Geometry',
    tier: 'ACT',
    blurb: 'Volumes and surface areas of every solid the ACT throws at you. The SAT rarely tests these.',
    formulas: [
      { name: 'Rectangular Prism V', formula: 'V = l w h' },
      { name: 'Cylinder Volume', formula: 'V = π r² h' },
      { name: 'Cone Volume', formula: 'V = ⅓ π r² h' },
      { name: 'Sphere Volume', formula: 'V = (4/3) π r³' },
      { name: 'Sphere Surface Area', formula: 'SA = 4 π r²' },
      { name: 'Pyramid Volume', formula: 'V = ⅓ B h' },
    ],
  },
]
