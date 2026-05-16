export interface Section {
  id: number
  slug: string
  number: number
  name: string
  topic: string
  subtopic: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
  tier: 'SAT' | 'ACT' | 'Both'
  description: string
}

export const SECTIONS: Section[] = [
  // Heart of Algebra
  { id: 1, slug: 'linear-equations-basics', number: 1, name: 'Linear Equations Basics', topic: 'Heart of Algebra', subtopic: 'Linear Equations', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '📐', tier: 'Both', description: 'Solve one-variable linear equations including fractions and decimals' },
  { id: 2, slug: 'slope-and-linear-graphs', number: 2, name: 'Slope & Linear Graphs', topic: 'Heart of Algebra', subtopic: 'Linear Functions', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '📈', tier: 'Both', description: 'Find slope, graph lines, and convert between forms' },
  { id: 3, slug: 'systems-of-equations', number: 3, name: 'Systems of Equations', topic: 'Heart of Algebra', subtopic: 'Systems', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '🔗', tier: 'Both', description: 'Solve systems using substitution and elimination' },
  { id: 4, slug: 'inequalities-and-graphs', number: 4, name: 'Inequalities & Graphs', topic: 'Heart of Algebra', subtopic: 'Inequalities', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '↔️', tier: 'Both', description: 'Solve and graph linear inequalities and systems' },
  { id: 5, slug: 'absolute-value', number: 5, name: 'Absolute Value', topic: 'Heart of Algebra', subtopic: 'Absolute Value', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '| |', tier: 'Both', description: 'Solve absolute value equations and inequalities' },

  // Problem Solving & Data Analysis
  { id: 6, slug: 'ratios-and-proportions', number: 6, name: 'Ratios & Proportions', topic: 'Problem Solving & Data Analysis', subtopic: 'Ratios', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '⚖️', tier: 'Both', description: 'Set up and solve ratio and proportion problems' },
  { id: 7, slug: 'percentages', number: 7, name: 'Percentages', topic: 'Problem Solving & Data Analysis', subtopic: 'Percentages', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '%', tier: 'Both', description: 'Percent change, tax, tip, discount, and successive percent problems' },
  { id: 8, slug: 'data-and-scatterplots', number: 8, name: 'Data & Scatterplots', topic: 'Problem Solving & Data Analysis', subtopic: 'Data Analysis', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '📊', tier: 'Both', description: 'Read scatterplots, identify trends, use lines of best fit' },
  { id: 9, slug: 'statistics-and-averages', number: 9, name: 'Statistics & Averages', topic: 'Problem Solving & Data Analysis', subtopic: 'Statistics', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: 'x̄', tier: 'Both', description: 'Mean, median, mode, range, and standard deviation concepts' },
  { id: 10, slug: 'probability', number: 10, name: 'Probability', topic: 'Problem Solving & Data Analysis', subtopic: 'Probability', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '🎲', tier: 'Both', description: 'Basic probability, conditional probability, two-way tables' },

  // Passport to Advanced Math
  { id: 11, slug: 'quadratics-factoring', number: 11, name: 'Quadratics: Factoring', topic: 'Passport to Advanced Math', subtopic: 'Quadratics', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: 'x²', tier: 'Both', description: 'Factor quadratics and solve by factoring' },
  { id: 12, slug: 'quadratic-formula-and-discriminant', number: 12, name: 'Quadratic Formula & Discriminant', topic: 'Passport to Advanced Math', subtopic: 'Quadratics', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: '±', tier: 'Both', description: 'Apply the quadratic formula and analyze the discriminant' },
  { id: 13, slug: 'polynomials', number: 13, name: 'Polynomials', topic: 'Passport to Advanced Math', subtopic: 'Polynomials', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: 'xⁿ', tier: 'Both', description: 'Add, multiply, divide polynomials and find zeros' },
  { id: 14, slug: 'exponential-growth-and-decay', number: 14, name: 'Exponential Growth & Decay', topic: 'Passport to Advanced Math', subtopic: 'Exponentials', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: '📈', tier: 'Both', description: 'Model exponential growth, decay, and compound interest' },
  { id: 15, slug: 'radicals-and-rational-expressions', number: 15, name: 'Radicals & Rational Expressions', topic: 'Passport to Advanced Math', subtopic: 'Radicals', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: '√', tier: 'Both', description: 'Simplify radicals and solve radical/rational equations' },
  { id: 16, slug: 'functions', number: 16, name: 'Functions', topic: 'Passport to Advanced Math', subtopic: 'Functions', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: 'f(x)', tier: 'Both', description: 'Evaluate, compose, and transform functions' },

  // Additional Topics / Geometry
  { id: 17, slug: 'triangles-and-angles', number: 17, name: 'Triangles & Angles', topic: 'Additional Topics', subtopic: 'Geometry', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: '△', tier: 'Both', description: 'Triangle properties, special triangles, angle relationships' },
  { id: 18, slug: 'circles', number: 18, name: 'Circles', topic: 'Additional Topics', subtopic: 'Circles', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: '○', tier: 'Both', description: 'Circle equations, arc length, sector area, tangent lines' },
  { id: 19, slug: 'trigonometry', number: 19, name: 'Trigonometry', topic: 'Additional Topics', subtopic: 'Trigonometry', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: 'θ', tier: 'Both', description: 'SOH-CAH-TOA, unit circle, trig identities' },
  { id: 20, slug: 'complex-numbers', number: 20, name: 'Complex Numbers', topic: 'Additional Topics', subtopic: 'Complex Numbers', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: 'i', tier: 'Both', description: 'Operations with complex numbers and powers of i' },

  // ACT-Specific
  { id: 21, slug: 'number-properties', number: 21, name: 'Number Properties', topic: 'Pre-Algebra (ACT)', subtopic: 'Number Properties', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '#', tier: 'ACT', description: 'Factors, multiples, primes, divisibility, GCF/LCM' },
  { id: 22, slug: 'matrices', number: 22, name: 'Matrices', topic: 'Elementary Algebra (ACT)', subtopic: 'Matrices', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '▦', tier: 'ACT', description: 'Matrix operations, determinants, and multiplication' },
  { id: 23, slug: '3d-geometry-and-volume', number: 23, name: '3D Geometry & Volume', topic: 'Geometry (ACT)', subtopic: '3D Shapes', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '🧊', tier: 'ACT', description: 'Volume and surface area of prisms, cylinders, cones, spheres' },
  { id: 24, slug: 'trig-graphs-and-laws', number: 24, name: 'Trig Graphs & Laws', topic: 'Trigonometry (ACT)', subtopic: 'Advanced Trig', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '〰️', tier: 'ACT', description: 'Trig function graphs, law of sines and cosines' },
  { id: 25, slug: 'conic-sections', number: 25, name: 'Conic Sections', topic: 'Geometry (ACT)', subtopic: 'Conics', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '🔵', tier: 'ACT', description: 'Parabolas, ellipses, and hyperbolas' },
]

// Mapping from syllabus subtopic slugs (from study-content.ts) → SECTION slug.
// When a user clicks "Practice this topic" from a syllabus page, we route them
// to the best-matching practice section here.
export const SUBTOPIC_TO_SECTION: Record<string, string> = {
  // SAT — Heart of Algebra
  'linear-equations-one-variable': 'linear-equations-basics',
  'linear-equations-two-variables': 'slope-and-linear-graphs',
  'linear-functions': 'slope-and-linear-graphs',
  'systems-two-linear-equations': 'systems-of-equations',
  'linear-inequalities-one-variable': 'inequalities-and-graphs',
  'linear-inequalities-two-variables': 'inequalities-and-graphs',
  'interpreting-slope-y-intercept': 'slope-and-linear-graphs',
  'writing-linear-equations-context': 'linear-equations-basics',

  // SAT — Problem Solving & Data Analysis
  'ratios-rates-proportions': 'ratios-and-proportions',
  'percent-percent-change': 'percentages',
  'units-conversions': 'ratios-and-proportions',
  'tables-graphs-data-interpretation': 'data-and-scatterplots',
  'scatterplots-line-best-fit': 'data-and-scatterplots',
  'mean-median-mode-range': 'statistics-and-averages',
  'standard-deviation-spread': 'statistics-and-averages',
  'probability-conditional-probability': 'probability',

  // SAT — Passport to Advanced Math
  'quadratic-equations-factoring': 'quadratics-factoring',
  'quadratic-formula': 'quadratic-formula-and-discriminant',
  'completing-the-square': 'quadratic-formula-and-discriminant',
  'polynomial-operations': 'polynomials',
  'polynomial-zeros-factors': 'polynomials',
  'rational-expressions': 'radicals-and-rational-expressions',
  'radical-equations': 'radicals-and-rational-expressions',
  'exponential-functions': 'exponential-growth-and-decay',
  'function-notation-evaluation': 'functions',
  'composite-inverse-functions': 'functions',

  // SAT — Additional Topics
  'circles-geometry': 'circles',
  'right-triangles-pythagorean': 'triangles-and-angles',
  'similar-triangles': 'triangles-and-angles',
  'sohcahtoa-trig-basics': 'trigonometry',
  'complex-number-arithmetic': 'complex-numbers',
  'volume-3d-shapes': '3d-geometry-and-volume',

  // ACT subtopics
  'integers-divisibility': 'number-properties',
  'fractions-decimals': 'number-properties',
  'matrix-operations': 'matrices',
  'sequences-series': 'functions',
  'logarithms': 'functions',
  'coordinate-geometry-distance': 'circles',
  'transformations': 'functions',
  'unit-circle-trig': 'trig-graphs-and-laws',
  'trig-identities': 'trig-graphs-and-laws',
  'law-of-sines-cosines': 'trig-graphs-and-laws',
}

export function resolveSectionSlug(slug: string): Section | undefined {
  // Direct match on Section.slug
  const direct = SECTIONS.find(s => s.slug === slug)
  if (direct) return direct
  // Fallback via subtopic mapping
  const mapped = SUBTOPIC_TO_SECTION[slug]
  if (mapped) return SECTIONS.find(s => s.slug === mapped)
  return undefined
}
