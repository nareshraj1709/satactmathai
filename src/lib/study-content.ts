export function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export interface Subtopic {
  name: string
  slug: string
  videoSearchTerms: string[]
  notes: string
}

export interface TopicSection {
  topic: string
  subtopics: Subtopic[]
}

// ─── SAT MATH CONTENT ───────────────────────────────────────────────
export const SAT_CONTENT: TopicSection[] = [
  {
    topic: 'Heart of Algebra',
    subtopics: [
      {
        name: 'Linear Equations in One Variable',
        slug: 'linear-equations-one-variable',
        videoSearchTerms: ['SAT linear equations tutorial', 'solving linear equations SAT prep'],
        notes: `# Linear Equations in One Variable

## What You Need to Know
A linear equation in one variable has the form **ax + b = c** where a, b, and c are constants.

## Key Strategies
1. **Isolate the variable** — get x alone on one side
2. **Combine like terms** first
3. **Distribute** before solving when parentheses are present
4. **Check your answer** by substituting back

## Common SAT Patterns
- Equations with fractions: multiply both sides by the LCD
- Equations with decimals: multiply by powers of 10
- "No solution" vs "infinitely many solutions" — compare coefficients

[FORMULA: ax + b = c → x = (c - b) / a]

## Example
**Solve: 3(2x - 4) + 5 = 2x + 9**
6x - 12 + 5 = 2x + 9
6x - 7 = 2x + 9
4x = 16
x = 4

[ANSWER: x = 4]`
      },
      {
        name: 'Linear Equations in Two Variables',
        slug: 'linear-equations-two-variables',
        videoSearchTerms: ['SAT systems of equations', 'two variable equations SAT'],
        notes: `# Linear Equations in Two Variables

## Standard Form & Slope-Intercept
- Standard form: **Ax + By = C**
- Slope-intercept: **y = mx + b** (m = slope, b = y-intercept)

## Key Concepts
- **Slope** = rise/run = (y₂ - y₁)/(x₂ - x₁)
- **Parallel lines** have equal slopes
- **Perpendicular lines** have negative reciprocal slopes

[FORMULA: m = (y₂ - y₁) / (x₂ - x₁)]

## SAT Tips
- Convert to slope-intercept to quickly identify slope and y-intercept
- Use point-slope form: y - y₁ = m(x - x₁) when given a point and slope
- Graph interpretation: understand what m and b represent in context`
      },
      {
        name: 'Systems of Linear Equations',
        slug: 'systems-linear-equations',
        videoSearchTerms: ['SAT systems of equations', 'elimination method SAT math'],
        notes: `# Systems of Linear Equations

## Three Methods
1. **Substitution** — solve one equation for a variable, plug into the other
2. **Elimination** — add/subtract equations to cancel a variable
3. **Graphing** — intersection point is the solution

## Number of Solutions
- **One solution** — lines intersect (different slopes)
- **No solution** — lines are parallel (same slope, different y-intercept)
- **Infinite solutions** — same line (same slope AND y-intercept)

[FORMULA: a₁/a₂ ≠ b₁/b₂ → one solution | a₁/a₂ = b₁/b₂ ≠ c₁/c₂ → no solution | a₁/a₂ = b₁/b₂ = c₁/c₂ → infinite]

## SAT Strategy
- Look for which method is fastest — don't default to one
- Elimination is often fastest on the SAT
- Watch for "what is x + y?" questions — you may not need individual values`
      },
      {
        name: 'Linear Inequalities',
        slug: 'linear-inequalities',
        videoSearchTerms: ['SAT linear inequalities', 'graphing inequalities SAT prep'],
        notes: `# Linear Inequalities

## Rules
- Solve like equations, BUT **flip the sign when multiplying/dividing by a negative**
- Graphing: use a **dashed line** for < or >, **solid line** for ≤ or ≥
- Shade the region that satisfies the inequality

## Compound Inequalities
- "AND" = intersection (both must be true)
- "OR" = union (at least one must be true)

## SAT Applications
- Word problems with constraints (budget, capacity, etc.)
- System of inequalities — find the feasible region
- Identify which point satisfies all inequalities`
      },
    ]
  },
  {
    topic: 'Problem Solving & Data Analysis',
    subtopics: [
      {
        name: 'Ratios, Rates & Proportions',
        slug: 'ratios-rates-proportions',
        videoSearchTerms: ['SAT ratios and proportions', 'rate problems SAT math'],
        notes: `# Ratios, Rates & Proportions

## Key Definitions
- **Ratio** — comparison of two quantities (a:b or a/b)
- **Rate** — ratio with different units (miles/hour, $/item)
- **Proportion** — equation stating two ratios are equal

[FORMULA: a/b = c/d → cross multiply: ad = bc]

## Unit Conversion
- Multiply by conversion factors where units cancel
- Example: 60 mph × (5280 ft/mi) × (1 hr/3600 sec) = 88 ft/sec

## SAT Tips
- Set up proportions carefully — keep units consistent
- For "per" problems, identify the rate and multiply/divide
- Watch for part-to-part vs part-to-whole ratios`
      },
      {
        name: 'Percentages & Percent Change',
        slug: 'percentages-percent-change',
        videoSearchTerms: ['SAT percentage problems', 'percent change SAT math'],
        notes: `# Percentages & Percent Change

## Core Formulas
[FORMULA: Percent = (Part / Whole) × 100]
[FORMULA: Percent Change = ((New - Original) / Original) × 100]

## Key Concepts
- **Percent increase**: new = original × (1 + rate)
- **Percent decrease**: new = original × (1 - rate)
- **Successive percents**: multiply the factors, don't add percentages

## Common SAT Traps
- 20% increase then 20% decrease ≠ original (it's 96% of original)
- "What percent of A is B?" means B/A × 100
- Tax/tip problems: multiply by (1 + tax rate)`
      },
      {
        name: 'Scatterplots & Data Interpretation',
        slug: 'scatterplots-data-interpretation',
        videoSearchTerms: ['SAT scatterplot questions', 'data interpretation SAT'],
        notes: `# Scatterplots & Data Interpretation

## Reading Scatterplots
- **Positive correlation**: points trend upward (as x increases, y increases)
- **Negative correlation**: points trend downward
- **No correlation**: no clear pattern

## Line of Best Fit
- Approximates the trend
- Use it for predictions (interpolation within data range)
- Extrapolation (outside data range) is less reliable

## SAT Question Types
- Identify the relationship (positive, negative, or none)
- Use line of best fit to estimate values
- Interpret slope and y-intercept in context
- Identify outliers`
      },
      {
        name: 'Statistics: Mean, Median & Standard Deviation',
        slug: 'statistics-mean-median-sd',
        videoSearchTerms: ['SAT statistics mean median', 'standard deviation SAT prep'],
        notes: `# Statistics: Mean, Median & Standard Deviation

## Central Tendency
[FORMULA: Mean = Sum of values / Number of values]
- **Median**: middle value when sorted (average of two middle for even count)
- **Mode**: most frequent value

## Spread
- **Range** = max - min
- **Standard deviation** = measure of how spread out data is
  - Larger SD = more spread out
  - Adding a constant to all values: mean changes, SD stays same
  - Multiplying all values by a constant: both mean and SD change

## SAT Tips
- Median is resistant to outliers, mean is not
- For weighted averages: multiply each value by its weight
- You won't calculate SD on the SAT — just understand the concept`
      },
      {
        name: 'Probability & Two-Way Tables',
        slug: 'probability-two-way-tables',
        videoSearchTerms: ['SAT probability questions', 'two-way tables SAT math'],
        notes: `# Probability & Two-Way Tables

## Basic Probability
[FORMULA: P(event) = favorable outcomes / total outcomes]

## Two-Way Tables
- Rows and columns represent categories
- Marginal totals are the row/column sums
- **Conditional probability**: P(A|B) = P(A and B) / P(B)

## SAT Applications
- "Given that..." = conditional probability
- Read the table carefully — don't confuse row vs column totals
- Independence: P(A|B) = P(A) means events are independent`
      },
    ]
  },
  {
    topic: 'Passport to Advanced Math',
    subtopics: [
      {
        name: 'Quadratic Equations',
        slug: 'quadratic-equations',
        videoSearchTerms: ['SAT quadratic equations', 'solving quadratics SAT prep'],
        notes: `# Quadratic Equations

## Three Forms
1. **Standard form**: ax² + bx + c = 0
2. **Factored form**: a(x - r)(x - s) = 0 (r, s are roots)
3. **Vertex form**: a(x - h)² + k (vertex at (h, k))

## Solving Methods
- **Factoring** — find two numbers that multiply to ac and add to b
- **Quadratic formula** — works always
- **Completing the square** — useful for vertex form

[FORMULA: x = (-b ± √(b² - 4ac)) / 2a]

## The Discriminant: b² - 4ac
- **Positive** → 2 real solutions
- **Zero** → 1 real solution (double root)
- **Negative** → no real solutions

## SAT Tips
- Vertex = (-b/2a, f(-b/2a)) for standard form
- Sum of roots = -b/a, Product of roots = c/a
- Watch for disguised quadratics: x⁴ - 5x² + 4 = 0`
      },
      {
        name: 'Polynomials',
        slug: 'polynomials',
        videoSearchTerms: ['SAT polynomial questions', 'polynomial operations SAT'],
        notes: `# Polynomials

## Key Operations
- **Adding/Subtracting**: combine like terms
- **Multiplying**: distribute (FOIL for binomials)
- **Dividing**: long division or synthetic division

## Zeros & Factors
- If (x - a) is a factor, then x = a is a zero
- **Remainder Theorem**: f(a) = remainder when f(x) ÷ (x - a)
- **Factor Theorem**: if f(a) = 0, then (x - a) is a factor

## End Behavior
- Leading coefficient positive + even degree → up on both ends
- Leading coefficient positive + odd degree → down left, up right
- Negative leading coefficient → flip the above

## SAT Focus
- Factoring by grouping
- Finding zeros from factored form
- Matching graphs to equations based on zeros and end behavior`
      },
      {
        name: 'Exponential Functions & Growth/Decay',
        slug: 'exponential-functions',
        videoSearchTerms: ['SAT exponential functions', 'exponential growth decay SAT'],
        notes: `# Exponential Functions & Growth/Decay

## General Form
[FORMULA: f(x) = a · bˣ]
- a = initial value (y-intercept when x = 0)
- b = growth/decay factor
- b > 1 → growth, 0 < b < 1 → decay

## Growth & Decay Models
[FORMULA: A = P(1 + r)ᵗ (growth) | A = P(1 - r)ᵗ (decay)]
- P = initial amount, r = rate, t = time

## Compound Interest
[FORMULA: A = P(1 + r/n)ⁿᵗ]
- n = number of times compounded per year

## SAT Tips
- Identify the initial value and the rate from context
- "Doubles every 3 years" → f(t) = initial × 2^(t/3)
- Exponential vs linear: exponential has constant percent change, linear has constant amount change`
      },
      {
        name: 'Radical & Rational Equations',
        slug: 'radical-rational-equations',
        videoSearchTerms: ['SAT radical equations', 'rational equations SAT math'],
        notes: `# Radical & Rational Equations

## Radical Equations
1. Isolate the radical
2. Square both sides (or cube for cube roots)
3. Solve the resulting equation
4. **Check for extraneous solutions!**

## Rational Equations
1. Find the LCD
2. Multiply all terms by LCD
3. Solve the resulting equation
4. **Check that solutions don't make any denominator zero!**

## Exponent Rules
[FORMULA: xᵃ · xᵇ = xᵃ⁺ᵇ | xᵃ/xᵇ = xᵃ⁻ᵇ | (xᵃ)ᵇ = xᵃᵇ | x⁻ⁿ = 1/xⁿ | x^(a/b) = ᵇ√(xᵃ)]

## SAT Focus
- Simplifying expressions with exponents
- Solving equations by isolating the radical/fraction
- Always check for extraneous solutions`
      },
      {
        name: 'Functions & Function Notation',
        slug: 'functions-notation',
        videoSearchTerms: ['SAT functions notation', 'function problems SAT prep'],
        notes: `# Functions & Function Notation

## Core Concepts
- f(x) = output when input is x
- **Domain**: all valid inputs
- **Range**: all possible outputs

## Transformations
- f(x) + k → shift up k
- f(x) - k → shift down k
- f(x + h) → shift left h
- f(x - h) → shift right h
- -f(x) → reflect over x-axis
- f(-x) → reflect over y-axis

## Composition
[FORMULA: (f ∘ g)(x) = f(g(x))]
- Work inside out: evaluate g(x) first, then apply f

## SAT Applications
- Evaluate f(3) given a formula or table
- Find f(g(x)) or g(f(x))
- Interpret function notation in word problems
- Identify domain restrictions (no division by zero, no negative under even root)`
      },
    ]
  },
  {
    topic: 'Additional Topics in Math',
    subtopics: [
      {
        name: 'Geometry: Lines, Angles & Triangles',
        slug: 'geometry-lines-angles-triangles',
        videoSearchTerms: ['SAT geometry triangles', 'angles and lines SAT math'],
        notes: `# Geometry: Lines, Angles & Triangles

## Angle Relationships
- **Vertical angles** are equal
- **Supplementary angles** add to 180°
- **Complementary angles** add to 90°
- **Parallel lines + transversal**: alternate interior angles are equal, corresponding angles are equal

## Triangle Properties
- Angle sum = 180°
- Exterior angle = sum of two remote interior angles
- Triangle inequality: any side < sum of other two sides

## Special Triangles
[FORMULA: 30-60-90 → sides x : x√3 : 2x | 45-45-90 → sides x : x : x√2]

## Area & Perimeter
[FORMULA: Area = ½ × base × height]

## SAT Tips
- Draw and label diagrams
- Look for special triangles hidden in complex figures
- Use the given reference formulas at the start of each SAT math section`
      },
      {
        name: 'Circles',
        slug: 'circles',
        videoSearchTerms: ['SAT circle questions', 'circle equations SAT math'],
        notes: `# Circles

## Standard Equation
[FORMULA: (x - h)² + (y - k)² = r²]
- Center: (h, k), Radius: r

## Key Formulas
[FORMULA: Circumference = 2πr | Area = πr²]
[FORMULA: Arc length = (θ/360) × 2πr | Sector area = (θ/360) × πr²]

## SAT Question Types
- Find center and radius from equation (may need to complete the square)
- Arc length and sector area
- Tangent lines are perpendicular to radius at point of tangency
- Central angle = arc measure

## Radians
[FORMULA: 180° = π radians | θ(rad) = θ(deg) × π/180]`
      },
      {
        name: 'Trigonometry',
        slug: 'trigonometry',
        videoSearchTerms: ['SAT trigonometry', 'trig ratios SAT math prep'],
        notes: `# Trigonometry

## SOH-CAH-TOA
[FORMULA: sin θ = opposite/hypotenuse | cos θ = adjacent/hypotenuse | tan θ = opposite/adjacent]

## Key Identity
[FORMULA: sin²θ + cos²θ = 1]

## Complementary Angles
[FORMULA: sin(x) = cos(90° - x) and cos(x) = sin(90° - x)]

## Unit Circle Basics
- sin = y-coordinate, cos = x-coordinate
- Know values for 0°, 30°, 45°, 60°, 90°

## SAT Tips
- The SAT provides trig formulas in the reference box
- Most trig questions involve right triangles or the unit circle
- Complement relationship is a favorite SAT question type
- Convert between degrees and radians as needed`
      },
      {
        name: 'Complex Numbers',
        slug: 'complex-numbers',
        videoSearchTerms: ['SAT complex numbers', 'imaginary numbers SAT math'],
        notes: `# Complex Numbers

## Definition
[FORMULA: i = √(-1) | i² = -1 | i³ = -i | i⁴ = 1]

## Operations
- **Add/Subtract**: combine real and imaginary parts separately
- **Multiply**: use FOIL and replace i² with -1
- **Divide**: multiply by conjugate of denominator

## Conjugate
- Conjugate of a + bi is a - bi
- (a + bi)(a - bi) = a² + b² (always real)

## SAT Tips
- Powers of i cycle every 4: i, -1, -i, 1
- To find i^n: divide n by 4 and use the remainder
- Complex numbers appear in the "no real solutions" context`
      },
      {
        name: 'Coordinate Geometry',
        slug: 'coordinate-geometry',
        videoSearchTerms: ['SAT coordinate geometry', 'distance midpoint SAT math'],
        notes: `# Coordinate Geometry

## Key Formulas
[FORMULA: Distance = √((x₂-x₁)² + (y₂-y₁)²)]
[FORMULA: Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)]

## Lines
- Slope: m = (y₂-y₁)/(x₂-x₁)
- Point-slope: y - y₁ = m(x - x₁)
- Parallel lines: same slope
- Perpendicular lines: slopes are negative reciprocals (m₁ × m₂ = -1)

## SAT Applications
- Distance between two points
- Finding the midpoint
- Equation of a line through two points
- Identifying parallel/perpendicular lines from equations`
      },
    ]
  },
]

// ─── ACT MATH CONTENT (additional topics beyond SAT) ─────────────────
export const ACT_ADDITIONAL_CONTENT: TopicSection[] = [
  {
    topic: 'Pre-Algebra (ACT)',
    subtopics: [
      {
        name: 'Number Properties & Operations',
        slug: 'number-properties-operations',
        videoSearchTerms: ['ACT number properties', 'ACT pre-algebra review'],
        notes: `# Number Properties & Operations

## Number Types
- **Natural numbers**: 1, 2, 3, ...
- **Whole numbers**: 0, 1, 2, 3, ...
- **Integers**: ..., -2, -1, 0, 1, 2, ...
- **Rational numbers**: can be expressed as a/b (includes fractions, terminating/repeating decimals)
- **Irrational numbers**: cannot be expressed as a/b (π, √2, etc.)

## Key Properties
- **Order of operations**: PEMDAS
- **Absolute value**: distance from zero, always non-negative
- **Divisibility rules**: quick tests for 2, 3, 5, 9, 10
- **Prime factorization**: break into prime factors

## ACT Tips
- GCF and LCM questions are common
- Know your perfect squares up to 15²
- Understand even/odd rules for +, -, ×`
      },
      {
        name: 'Fractions, Decimals & Scientific Notation',
        slug: 'fractions-decimals-scientific-notation',
        videoSearchTerms: ['ACT fractions decimals', 'scientific notation ACT math'],
        notes: `# Fractions, Decimals & Scientific Notation

## Fraction Operations
- **Add/Subtract**: find common denominator
- **Multiply**: multiply straight across
- **Divide**: flip and multiply (keep-change-flip)

## Converting
- Fraction → Decimal: divide numerator by denominator
- Decimal → Percent: multiply by 100
- Percent → Decimal: divide by 100

## Scientific Notation
[FORMULA: a × 10ⁿ where 1 ≤ a < 10]
- Positive n: large number (move decimal right)
- Negative n: small number (move decimal left)

## ACT Focus
- Mixed number arithmetic
- Ordering fractions/decimals on number line
- Operations with scientific notation`
      },
    ]
  },
  {
    topic: 'Elementary Algebra (ACT)',
    subtopics: [
      {
        name: 'Absolute Value Equations & Inequalities',
        slug: 'absolute-value-equations',
        videoSearchTerms: ['ACT absolute value equations', 'absolute value inequalities ACT'],
        notes: `# Absolute Value Equations & Inequalities

## Equations
|ax + b| = c
- If c > 0: ax + b = c OR ax + b = -c (two solutions)
- If c = 0: ax + b = 0 (one solution)
- If c < 0: no solution

## Inequalities
- |x| < c → -c < x < c (AND / between)
- |x| > c → x < -c OR x > c (OR / outside)

## ACT Tips
- Always check solutions in the original equation
- Graph on a number line for clarity
- Remember: absolute value is always ≥ 0`
      },
      {
        name: 'Matrices (ACT)',
        slug: 'matrices-act',
        videoSearchTerms: ['ACT matrices math', 'matrix operations ACT prep'],
        notes: `# Matrices (ACT)

## Basic Operations
- **Addition/Subtraction**: add/subtract corresponding elements (same dimensions required)
- **Scalar multiplication**: multiply every element by the scalar
- **Matrix multiplication**: dot product of rows and columns

## 2×2 Determinant
[FORMULA: det([a b; c d]) = ad - bc]

## ACT Tips
- Matrix multiplication is NOT commutative (AB ≠ BA generally)
- Dimensions: (m×n) × (n×p) = (m×p)
- The ACT tests basic operations more than advanced matrix theory`
      },
    ]
  },
  {
    topic: 'Plane & Coordinate Geometry (ACT)',
    subtopics: [
      {
        name: 'Area & Volume of 3D Shapes',
        slug: 'area-volume-3d-shapes',
        videoSearchTerms: ['ACT volume formulas', '3D geometry ACT math'],
        notes: `# Area & Volume of 3D Shapes

## Key Formulas
[FORMULA: Rectangular Prism: V = lwh, SA = 2(lw + lh + wh)]
[FORMULA: Cylinder: V = πr²h, SA = 2πr² + 2πrh]
[FORMULA: Cone: V = ⅓πr²h]
[FORMULA: Sphere: V = ⁴⁄₃πr³, SA = 4πr²]
[FORMULA: Pyramid: V = ⅓Bh (B = area of base)]

## ACT Tips
- Formulas are NOT given on the ACT — memorize them!
- Watch for composite shapes (cylinder + cone, etc.)
- Unit conversion in volume: cube the linear conversion factor`
      },
      {
        name: 'Conic Sections & Parabolas',
        slug: 'conic-sections-parabolas',
        videoSearchTerms: ['ACT conic sections', 'parabola equations ACT math'],
        notes: `# Conic Sections & Parabolas

## Parabola
[FORMULA: y = a(x - h)² + k → vertex (h,k), axis x = h]
- a > 0: opens up, a < 0: opens down
- Focus and directrix rarely tested but good to know

## Ellipse
[FORMULA: (x-h)²/a² + (y-k)²/b² = 1]
- Center (h,k), semi-axes a and b

## Hyperbola
[FORMULA: (x-h)²/a² - (y-k)²/b² = 1]

## ACT Tips
- Know how to identify each conic from its equation
- Completing the square to convert to standard form
- The ACT focuses most on parabolas and circles`
      },
    ]
  },
  {
    topic: 'Trigonometry (ACT)',
    subtopics: [
      {
        name: 'Graphs of Trig Functions',
        slug: 'graphs-trig-functions',
        videoSearchTerms: ['ACT trig graphs', 'sine cosine graphs ACT math'],
        notes: `# Graphs of Trig Functions

## Sine & Cosine
[FORMULA: y = A sin(Bx + C) + D]
- **Amplitude** = |A|
- **Period** = 2π/|B|
- **Phase shift** = -C/B
- **Vertical shift** = D

## Key Facts
- sin(0) = 0, cos(0) = 1
- sin and cos have period 2π
- tan has period π
- sin is odd: sin(-x) = -sin(x)
- cos is even: cos(-x) = cos(x)

## ACT Tips
- Know the basic shapes of sin, cos, and tan graphs
- Identify amplitude and period from equations or graphs
- The ACT may ask you to match a graph to an equation`
      },
      {
        name: 'Law of Sines & Cosines',
        slug: 'law-sines-cosines',
        videoSearchTerms: ['ACT law of sines cosines', 'non-right triangle ACT math'],
        notes: `# Law of Sines & Cosines

## Law of Sines
[FORMULA: a/sin(A) = b/sin(B) = c/sin(C)]
Use when you know: AAS, ASA, or SSA (ambiguous case)

## Law of Cosines
[FORMULA: c² = a² + b² - 2ab·cos(C)]
Use when you know: SAS or SSS

## Area of Any Triangle
[FORMULA: Area = ½ab·sin(C)]

## ACT Tips
- These formulas are NOT provided on the ACT
- Law of Cosines is a generalization of the Pythagorean theorem
- For SSA (side-side-angle), check for the ambiguous case`
      },
    ]
  },
]

// Combined content for the study page
export const ALL_CONTENT = [...SAT_CONTENT, ...ACT_ADDITIONAL_CONTENT]
