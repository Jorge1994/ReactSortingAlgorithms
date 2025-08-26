# Sorting Algorithm Visualizer - AI Coding Instructions

## Project Overview
React-based sorting algorithm visualizer with strict separation between algorithm logic and UI. Uses TypeScript, Vite, Tailwind CSS, React Router, and Framer Motion for educational visualization of sorting algorithms.

## Core Architecture Principles

### Modular Separation Pattern
- **Algorithm Core** (`src/algorithms/core/`): Pure algorithm implementations that generate visualization steps
- **UI Components** (`src/components/`): Only handle visualization and user interaction  
- **Animation Engine** (`src/hooks/useAnimationEngine.ts`): Bridges algorithm steps to UI rendering
- **Registry System** (`src/algorithms/registry.ts`): Centralized algorithm management

### Key Interfaces
```typescript
// Every algorithm must implement this pattern
interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight';
  indices: number[];
  array: number[];
  metadata?: { comparisons: number; swaps: number; currentPhase?: string };
}

interface SortingAlgorithm {
  name: string;
  execute: (array: number[]) => SortStep[];
  complexity: { 
    time: { best: string; average: string; worst: string }; 
    space: string;
    justifications: {
      timeComplexity: { best: string; average: string; worst: string };
      spaceComplexity: string;
    };
  };
}

interface AlgorithmInfo {
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  keyCharacteristics: string[];
  visualizationNotes: {
    colors: { comparing: string; swapping: string; sorted: string; unsorted: string };
    phases: string[]; // Detailed educational phases - as many as needed for full comprehension
  };
}
```

## Development Workflow

### Setup Commands (PowerShell)
```powershell
# Project folder "Sorting" already exists with documentation
# Initialize React project in current directory
npm create vite@latest . -- --template react-ts
npm install react-router-dom framer-motion
npm install -D tailwindcss postcss autoprefixer @types/react-router-dom
npx tailwindcss init -p
npm run dev
```

### Algorithm Implementation Pattern
1. Create pure algorithm in `src/algorithms/core/[algorithm].ts`
2. Use `createSortingAlgorithm` factory function
3. Generate `SortStep[]` array for visualization
4. Register in `src/algorithms/registry.ts`
5. Create detailed algorithm info in `src/algorithms/info/[algorithm]Info.ts`
6. UI automatically supports new algorithm

### Algorithm Information Requirements
When adding new algorithms, always provide:

#### Complexity Justifications
- **Time Complexity**: Detailed theoretical explanations for best, average, and worst cases
- **Space Complexity**: Clear explanation of memory usage patterns
- Include mathematical reasoning and real-world scenarios for each complexity case
- Example format: "When the array is already sorted, only one pass is needed (n comparisons) allowing early termination"

#### Educational Algorithm Phases
- Provide as many detailed, step-by-step phases as necessary to explain the algorithm's execution thoroughly
- Each phase should be educational and build understanding progressively
- Use clear, descriptive titles followed by detailed explanations
- Format: "Phase Title: Detailed explanation of what happens and why"
- Focus on helping users understand the underlying logic, not just what happens
- Connect phases to the visual representation when possible
- Prioritize comprehension over brevity - if 100 steps are needed for clarity, use 100 steps

### Color System (Tailwind Custom)
- `comparing: '#3B82F6'` (Blue) - Elements being compared
- `swapping: '#EF4444'` (Red) - Elements being swapped
- `sorted: '#10B981'` (Green) - Elements in final position
- `unsorted: '#6B7280'` (Gray) - Unprocessed elements

## Component Patterns

### Reusable Templates
- `AlgorithmInfo`: Template for algorithm documentation pages (complexity, Python code, advantages)
- `SortingVisualizer`: Accepts algorithm name as prop, renders any registered algorithm
- `CodeBlock`: Syntax-highlighted Python implementations for educational content

### Routing Structure
- `/` - Home with algorithm selector
- `/algorithm/:name` - Educational content template
- `/visualize/:name` - Visualization with controls

### Data Flow
```
User Input → Algorithm Registry → Algorithm.execute() → SortStep[] → useAnimationEngine → UI Components
```

## Testing Strategy
- Algorithm core logic is pure functions - easily unit testable
- UI components receive step data as props - testable in isolation
- Animation engine state management separate from algorithm logic

## File Organization
Never mix algorithm logic with UI concerns. Algorithm files should have zero React dependencies. Use the registry pattern to keep algorithms discoverable and the factory pattern to ensure consistent interfaces.

## Adding New Sorting Algorithms

### Step-by-Step Process

#### 1. **Assess Algorithm Compatibility**
Before implementation, determine if the algorithm works with the current visualizer:

**✅ Compatible algorithms** (use standard process):
- Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Heap Sort, Shell Sort, etc.
- Algorithms that work with a single array and use basic operations (compare, swap, highlight)

**⚠️ Requires adaptations**:
- Merge Sort (solved with atomic merge visualization)
- Algorithms needing temporary states or special visualization

**🔴 Incompatible algorithms** (need specialized visualizer):
- Counting Sort (requires 3 simultaneous arrays)
- Radix Sort (requires bucket visualization)
- Bucket Sort (requires dynamic bucket management)
- Tim Sort (requires run identification and hybrid algorithm display)

#### 2. **For Compatible Algorithms - Standard Process**

**Step 2.1: Create Algorithm Core**
```bash
# Create file: src/algorithms/core/[algorithmName].ts
```

```typescript
import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

function algorithmNameSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;
  let swaps = 0;

  // Implementation with detailed SortStep generation
  // Focus on educational value over technical optimization
  
  return steps;
}

export const algorithmName = createSortingAlgorithm(
  'Algorithm Name',
  'Educational description of the algorithm',
  {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    justifications: {
      timeComplexity: {
        best: "Detailed explanation for best case",
        average: "Detailed explanation for average case", 
        worst: "Detailed explanation for worst case"
      },
      spaceComplexity: "Explanation of space usage"
    }
  },
  algorithmNameSteps
);
```

**Step 2.2: Register Algorithm**
```typescript
// In src/algorithms/registry.ts
import { algorithmName } from './core/algorithmName';

export const algorithmRegistry = {
  // ... existing algorithms
  'algorithm-name': algorithmName,
} as const;
```

**Step 2.3: Create Algorithm Information**
```typescript
// Create file: src/algorithms/info/algorithmNameInfo.ts
import type { AlgorithmInfo } from '../../types';

export const algorithmNameInfo: AlgorithmInfo = {
  name: 'Algorithm Name',
  description: 'Comprehensive description',
  complexity: { /* same as in core */ },
  advantages: ["List of advantages"],
  disadvantages: ["List of disadvantages"],
  useCases: ["When to use this algorithm"],
  keyCharacteristics: ["Important properties"],
  visualizationNotes: {
    colors: { 
      comparing: '#3B82F6', 
      swapping: '#EF4444', 
      sorted: '#10B981', 
      unsorted: '#6B7280' 
    },
    phases: [
      "Phase 1: Detailed explanation",
      "Phase 2: Detailed explanation",
      // Add as many phases as needed for complete understanding
    ]
  }
};
```

**Step 2.4: Register Algorithm Info**
```typescript
// In src/algorithms/infoRegistry.ts
import { algorithmNameInfo } from './info/algorithmNameInfo';

export const algorithmInfoRegistry = {
  // ... existing algorithms
  'algorithm-name': algorithmNameInfo,
} as const;
```

**Step 2.5: Create Implementation Examples**
```typescript
// Create file: src/data/algorithmNameImplementations.ts
import type { ImplementationExample } from '../types';

export const algorithmNameImplementations: ImplementationExample[] = [
  {
    language: 'python',
    title: 'Basic Implementation',
    code: `# Python implementation with educational comments`,
    explanation: 'Step-by-step explanation'
  },
  {
    language: 'javascript', 
    title: 'JavaScript Implementation',
    code: `// JavaScript version`,
    explanation: 'Alternative implementation explanation'
  }
];
```

**Step 2.6: Register Implementations**
```typescript
// In src/data/implementationsRegistry.ts
import { algorithmNameImplementations } from './algorithmNameImplementations';

export const implementationsRegistry = {
  // ... existing algorithms
  'algorithm-name': algorithmNameImplementations,
} as const;
```

**Step 2.7: Add to Algorithm Comparison Table**

Update the algorithm comparison component to include the new algorithm:
- Open `src/components/AlgorithmComparison.tsx` or the comparison data file
- Add the new algorithm to comparative analysis tables
- Include time/space complexity comparisons with other algorithms

**Step 2.8: Add to Navigation/Dropdown**

Update the header navigation to include the new algorithm:
- Open the header dropdown or navigation component
- Add new algorithm option that routes to:
  - `/algorithm/algorithm-name` (AlgorithmDetails view)
  - `/visualize/algorithm-name` (Visualization view)
- Ensure proper routing integration

**Step 2.9: Verify UI Integration**

Ensure the following components automatically pick up the new algorithm:

- **AlgorithmDetails**: Shows algorithm info from `infoRegistry`
- **ImplementationSection**: Shows code examples from `implementationsRegistry`  
- **AlgorithmSelector**: Lists algorithm in dropdown/navigation
- **SortingVisualizer**: Renders algorithm using standard `ArrayVisualizer`

Verification checklist:
- [ ] Algorithm appears in navigation dropdown
- [ ] `/algorithm/algorithm-name` route shows correct information
- [ ] `/visualize/algorithm-name` route loads standard visualizer
- [ ] Implementation examples render correctly
- [ ] Algorithm comparison table includes new entry

#### 3. **For Incompatible Algorithms - Specialized Visualizer Process**

**Step 3.1: Extend SortStep Interface (if needed)**
```typescript
// In src/types/algorithm.ts - add new step types if needed
interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight' | 
        'bucket-operation' | 'counting-phase' | 'run-identified'; // Add as needed
  indices: number[];
  array: number[];
  metadata?: {
    comparisons: number;
    swaps: number;
    currentPhase?: string;
    buckets?: number[][]; // For bucket-based algorithms
    counts?: number[];    // For counting-based algorithms
    runs?: Array<{start: number; length: number}>; // For run-based algorithms
  };
}
```

**Step 3.2: Create Specialized Visualizer Component**
```bash
# Create file: src/components/[AlgorithmName]Visualizer.tsx
```

```typescript
import { useState, useEffect } from 'react';
import type { SortStep } from '../types';

interface SpecializedVisualizerProps {
  algorithm: string;
  // Add specific props for the algorithm
}

export function AlgorithmNameVisualizer({ algorithm }: SpecializedVisualizerProps) {
  // Implement specialized visualization logic
  // Maintain similar UI patterns to ArrayVisualizer
  // Use same color scheme and animation principles
  // Focus on educational clarity

  return (
    <div className="specialized-visualizer">
      {/* Maintain similar structure to existing visualizer */}
      <div className="array-container">
        {/* Custom visualization for this algorithm */}
      </div>
      
      {/* Reuse existing components where possible */}
      <AnimationControls />
      <StatisticsPanel />
      <ColorLegend />
    </div>
  );
}
```

**Step 3.3: Update Routing and Components**

Modify components to conditionally use specialized visualizers:
- Maintain consistent UI patterns and user experience
- Ensure specialized visualizers follow same design principles
- Update main visualizer component to route to specialized visualizer

In `src/components/SortingVisualizer.tsx` or routing logic:
```typescript
if (algorithmKey === 'counting-sort') {
  return <CountingSortVisualizer algorithm={algorithmKey} />;
} else if (algorithmKey === 'radix-sort') {
  return <RadixSortVisualizer algorithm={algorithmKey} />;
} else {
  return <ArrayVisualizer algorithm={algorithmKey} />; // Standard visualizer
}
```

**Step 3.4: Add to Algorithm Comparison Table**

Update the algorithm comparison component to include the new algorithm:
- Open `src/components/AlgorithmComparison.tsx` or comparison data file
- Add the new algorithm to comparative analysis tables
- Include time/space complexity comparisons with other algorithms
- Note any special visualization requirements

**Step 3.5: Add to Navigation/Dropdown**

Update the header navigation to include the new algorithm:
- Open the header dropdown or navigation component
- Add new algorithm option that routes to:
  - `/algorithm/algorithm-name` (AlgorithmDetails view)
  - `/visualize/algorithm-name` (Specialized Visualizer view)
- Ensure proper routing integration

**Step 3.6: Verify UI Integration**

Ensure the following components automatically pick up the new algorithm:

- **AlgorithmDetails**: Shows algorithm info from `infoRegistry`
- **ImplementationSection**: Shows code examples from `implementationsRegistry`  
- **AlgorithmSelector**: Lists algorithm in dropdown/navigation
- **Specialized Visualizer**: Renders algorithm using custom visualization

Verification checklist:
- [ ] Algorithm appears in navigation dropdown
- [ ] `/algorithm/algorithm-name` route shows correct information
- [ ] `/visualize/algorithm-name` route loads specialized visualizer
- [ ] Implementation examples render correctly
- [ ] Algorithm comparison table includes new entry

**Step 3.7: Follow Steps 2.2-2.6** for registration and documentation

#### 4. **Testing and Validation**

**Step 4.1: Test Algorithm Logic**
- Verify correct sorting with various input sizes
- Check edge cases (empty array, single element, already sorted, reverse sorted)
- Validate step generation produces educational sequence

**Step 4.2: Test Visualization**
- Ensure smooth animations
- Verify all steps are visually clear
- Check color coding consistency
- Test responsive design across screen sizes

**Step 4.3: Test Integration**
- Verify registry integration works
- Check routing and navigation
- Validate information displays correctly
- Test implementation examples render properly

### Important Guidelines

1. **Educational Focus**: Prioritize teaching value over technical optimization
2. **Consistent UI**: Specialized visualizers must maintain similar look and feel
3. **Color Consistency**: Use established color scheme across all visualizers
4. **Progressive Disclosure**: Show complex algorithms in digestible steps
5. **Responsive Design**: Ensure visualizers work on all screen sizes
6. **Performance**: Keep animations smooth even with larger datasets
7. **Accessibility**: Maintain good contrast and screen reader compatibility

### Specialized Visualizer Design Principles

When creating specialized visualizers for incompatible algorithms:

- **Maintain Visual Hierarchy**: Keep same header, controls, and layout structure
- **Reuse Components**: Use existing AnimationControls, StatisticsPanel, ColorLegend
- **Consistent Animations**: Use same timing and easing functions
- **Color Harmony**: Extend existing color palette rather than introducing new schemes
- **Educational Clarity**: Break complex operations into clear, understandable steps
- **Progressive Complexity**: Start simple, add detail progressively
- **Responsive Layout**: Adapt to different screen sizes like existing visualizers

## Answering User Queries
All the code, functions, variables, strings, comments, and the documentation must be written in English.
The answers to the user in the chat must be in Portuguese from Portugal.
All the text in UI must be in English.
Whenever possible, maintain a modular code structure by splitting functionality into smaller, well-organized components, and avoid large monolithic files.
Do not change the UI, unless as a last resort to fix a critical issue or asked explicitly.