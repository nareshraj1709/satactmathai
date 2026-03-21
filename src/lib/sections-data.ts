export interface Section {
  id: number
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
  { id: 1, number: 1, name: 'Linear Equations Basics', topic: 'Heart of Algebra', subtopic: 'Linear Equations', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '📐', tier: 'Both', description: 'Solve one-variable linear equations including fractions and decimals' },
  { id: 2, number: 2, name: 'Slope & Linear Graphs', topic: 'Heart of Algebra', subtopic: 'Linear Functions', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '📈', tier: 'Both', description: 'Find slope, graph lines, and convert between forms' },
  { id: 3, number: 3, name: 'Systems of Equations', topic: 'Heart of Algebra', subtopic: 'Systems', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '🔗', tier: 'Both', description: 'Solve systems using substitution and elimination' },
  { id: 4, number: 4, name: 'Inequalities & Graphs', topic: 'Heart of Algebra', subtopic: 'Inequalities', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '↔️', tier: 'Both', description: 'Solve and graph linear inequalities and systems' },
  { id: 5, number: 5, name: 'Absolute Value', topic: 'Heart of Algebra', subtopic: 'Absolute Value', color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE', icon: '| |', tier: 'Both', description: 'Solve absolute value equations and inequalities' },

  // Problem Solving & Data Analysis
  { id: 6, number: 6, name: 'Ratios & Proportions', topic: 'Problem Solving & Data Analysis', subtopic: 'Ratios', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '⚖️', tier: 'Both', description: 'Set up and solve ratio and proportion problems' },
  { id: 7, number: 7, name: 'Percentages', topic: 'Problem Solving & Data Analysis', subtopic: 'Percentages', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '%', tier: 'Both', description: 'Percent change, tax, tip, discount, and successive percent problems' },
  { id: 8, number: 8, name: 'Data & Scatterplots', topic: 'Problem Solving & Data Analysis', subtopic: 'Data Analysis', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '📊', tier: 'Both', description: 'Read scatterplots, identify trends, use lines of best fit' },
  { id: 9, number: 9, name: 'Statistics & Averages', topic: 'Problem Solving & Data Analysis', subtopic: 'Statistics', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: 'x̄', tier: 'Both', description: 'Mean, median, mode, range, and standard deviation concepts' },
  { id: 10, number: 10, name: 'Probability', topic: 'Problem Solving & Data Analysis', subtopic: 'Probability', color: '#059669', bgColor: '#ECFDF5', borderColor: '#A7F3D0', icon: '🎲', tier: 'Both', description: 'Basic probability, conditional probability, two-way tables' },

  // Passport to Advanced Math
  { id: 11, number: 11, name: 'Quadratics: Factoring', topic: 'Passport to Advanced Math', subtopic: 'Quadratics', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: 'x²', tier: 'Both', description: 'Factor quadratics and solve by factoring' },
  { id: 12, number: 12, name: 'Quadratic Formula & Discriminant', topic: 'Passport to Advanced Math', subtopic: 'Quadratics', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: '±', tier: 'Both', description: 'Apply the quadratic formula and analyze the discriminant' },
  { id: 13, number: 13, name: 'Polynomials', topic: 'Passport to Advanced Math', subtopic: 'Polynomials', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: 'xⁿ', tier: 'Both', description: 'Add, multiply, divide polynomials and find zeros' },
  { id: 14, number: 14, name: 'Exponential Growth & Decay', topic: 'Passport to Advanced Math', subtopic: 'Exponentials', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: '📈', tier: 'Both', description: 'Model exponential growth, decay, and compound interest' },
  { id: 15, number: 15, name: 'Radicals & Rational Expressions', topic: 'Passport to Advanced Math', subtopic: 'Radicals', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: '√', tier: 'Both', description: 'Simplify radicals and solve radical/rational equations' },
  { id: 16, number: 16, name: 'Functions', topic: 'Passport to Advanced Math', subtopic: 'Functions', color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE', icon: 'f(x)', tier: 'Both', description: 'Evaluate, compose, and transform functions' },

  // Additional Topics / Geometry
  { id: 17, number: 17, name: 'Triangles & Angles', topic: 'Additional Topics', subtopic: 'Geometry', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: '△', tier: 'Both', description: 'Triangle properties, special triangles, angle relationships' },
  { id: 18, number: 18, name: 'Circles', topic: 'Additional Topics', subtopic: 'Circles', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: '○', tier: 'Both', description: 'Circle equations, arc length, sector area, tangent lines' },
  { id: 19, number: 19, name: 'Trigonometry', topic: 'Additional Topics', subtopic: 'Trigonometry', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: 'θ', tier: 'Both', description: 'SOH-CAH-TOA, unit circle, trig identities' },
  { id: 20, number: 20, name: 'Complex Numbers', topic: 'Additional Topics', subtopic: 'Complex Numbers', color: '#DC2626', bgColor: '#FEF2F2', borderColor: '#FECACA', icon: 'i', tier: 'Both', description: 'Operations with complex numbers and powers of i' },

  // ACT-Specific
  { id: 21, number: 21, name: 'Number Properties', topic: 'Pre-Algebra (ACT)', subtopic: 'Number Properties', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '#', tier: 'ACT', description: 'Factors, multiples, primes, divisibility, GCF/LCM' },
  { id: 22, number: 22, name: 'Matrices', topic: 'Elementary Algebra (ACT)', subtopic: 'Matrices', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '▦', tier: 'ACT', description: 'Matrix operations, determinants, and multiplication' },
  { id: 23, number: 23, name: '3D Geometry & Volume', topic: 'Geometry (ACT)', subtopic: '3D Shapes', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '🧊', tier: 'ACT', description: 'Volume and surface area of prisms, cylinders, cones, spheres' },
  { id: 24, number: 24, name: 'Trig Graphs & Laws', topic: 'Trigonometry (ACT)', subtopic: 'Advanced Trig', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '〰️', tier: 'ACT', description: 'Trig function graphs, law of sines and cosines' },
  { id: 25, number: 25, name: 'Conic Sections', topic: 'Geometry (ACT)', subtopic: 'Conics', color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A', icon: '🔵', tier: 'ACT', description: 'Parabolas, ellipses, and hyperbolas' },
]
