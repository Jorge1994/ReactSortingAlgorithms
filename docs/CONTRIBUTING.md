# Contributing to Sorting Algorithm Visualizer

Thank you for your interest in contributing! This guide will help you add new sorting algorithms, fix bugs, or improve the documentation.

## 🚀 Quick Start for Contributors

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/sorting-visualizer.git
   cd sorting-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests** (when available)
   ```bash
   npm test
   ```

## 📝 Adding New Sorting Algorithms

### Step-by-Step Process

#### 1. **Algorithm Compatibility Assessment**

Before implementing, determine compatibility:

**✅ Standard Algorithms** (use standard process):
- Work with single array using compare/swap operations
- Examples: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Heap Sort

**⚠️ Requires Adaptations**:
- Merge Sort (requires atomic merge visualization)
- Algorithms needing temporary arrays or special states

**🔴 Needs Specialized Visualizer**:
- Counting Sort, Radix Sort, Bucket Sort (multiple array visualization)
- Algorithms requiring completely different visual representations

#### 2. **For Standard Algorithms**

**Step 2.1: Create Algorithm Core**

Create file: `src/algorithms/core/yourAlgorithm.ts`

```typescript
import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

function yourAlgorithmSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;
  let swaps = 0;

  // Add initial state
  steps.push({
    type: 'compare',
    indices: [],
    array: [...workingArray],
    metadata: { comparisons, swaps, currentPhase: 'Initialization' }
  });

  // Your algorithm implementation here
  // Generate steps for each operation:
  
  // For comparisons:
  steps.push({
    type: 'compare',
    indices: [i, j],
    array: [...workingArray],
    metadata: { comparisons: ++comparisons, swaps, currentPhase: 'Comparing elements' }
  });

  // For swaps:
  if (workingArray[i] > workingArray[j]) {
    [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
    steps.push({
      type: 'swap',
      indices: [i, j],
      array: [...workingArray],
      metadata: { comparisons, swaps: ++swaps, currentPhase: 'Swapping elements' }
    });
  }

  // For marking as sorted:
  steps.push({
    type: 'set-sorted',
    indices: [sortedIndex],
    array: [...workingArray],
    metadata: { comparisons, swaps, currentPhase: 'Element in final position' }
  });

  return steps;
}

export const yourAlgorithm = createSortingAlgorithm(
  'Your Algorithm Name',
  'Brief description of your algorithm',
  {
    time: { 
      best: 'O(n)', 
      average: 'O(n²)', 
      worst: 'O(n²)' 
    },
    space: 'O(1)',
    justifications: {
      timeComplexity: {
        best: "Detailed explanation for best case scenario",
        average: "Detailed explanation for average case", 
        worst: "Detailed explanation for worst case"
      },
      spaceComplexity: "Explanation of memory usage patterns"
    }
  },
  yourAlgorithmSteps
);
```

**Step 2.2: Register Algorithm**

In `src/algorithms/registry.ts`:

```typescript
import { yourAlgorithm } from './core/yourAlgorithm';

export const algorithmRegistry = {
  // ... existing algorithms
  'your-algorithm': yourAlgorithm,
} as const;
```

**Step 2.3: Create Algorithm Information**

Create file: `src/algorithms/info/yourAlgorithmInfo.ts`:

```typescript
import type { AlgorithmInfo } from '../../types';

export const yourAlgorithmInfo: AlgorithmInfo = {
  name: 'Your Algorithm Name',
  description: 'Comprehensive description of how the algorithm works, its principles, and methodology.',
  complexity: {
    time: { 
      best: 'O(n)', 
      average: 'O(n²)', 
      worst: 'O(n²)' 
    },
    space: 'O(1)',
    justifications: {
      timeComplexity: {
        best: "When array is already sorted, algorithm can terminate early",
        average: "Typical random array requires quadratic comparisons",
        worst: "Reverse sorted array requires maximum number of operations"
      },
      spaceComplexity: "Algorithm operates in-place with only constant extra variables"
    }
  },
  advantages: [
    "Simple to understand and implement",
    "Works in-place with minimal memory overhead",
    "Stable sorting algorithm"
  ],
  disadvantages: [
    "Poor performance on large datasets",
    "Not adaptive to partially sorted data",
    "Many unnecessary comparisons"
  ],
  useCases: [
    "Educational purposes and algorithm learning",
    "Small datasets where simplicity matters",
    "When memory usage must be minimized"
  ],
  keyCharacteristics: [
    "Comparison-based sorting algorithm",
    "In-place sorting with O(1) space complexity",
    "Stable - maintains relative order of equal elements"
  ],
  visualizationNotes: {
    phases: [
      "Phase 1: Initialization - Set up initial state and variables",
      "Phase 2: First Pass - Compare adjacent elements and perform swaps",
      "Phase 3: Optimization - Reduce search space after each pass",
      "Phase 4: Early Termination - Stop when no swaps occur in a pass",
      "Phase 5: Completion - All elements in final sorted positions"
      // Add as many detailed phases as needed for educational clarity
    ]
  }
};
```

**Step 2.4: Register Algorithm Information**

In `src/algorithms/infoRegistry.ts`:

```typescript
import { yourAlgorithmInfo } from './info/yourAlgorithmInfo';

export const algorithmInfoRegistry = {
  // ... existing algorithms
  'your-algorithm': yourAlgorithmInfo,
} as const;
```

**Step 2.5: Create Code Implementation Examples**

Create file: `src/data/yourAlgorithmImplementations.ts`:

```typescript
import type { ImplementationExample } from '../types';

export const yourAlgorithmImplementations: ImplementationExample[] = [
  {
    language: 'python',
    title: 'Basic Implementation',
    code: `def your_algorithm(arr):
    """
    Your Algorithm implementation with educational comments.
    
    Args:
        arr: List of comparable elements to sort
    
    Returns:
        None (sorts in-place)
    """
    n = len(arr)
    
    # Main algorithm loop
    for i in range(n):
        # Inner algorithm logic
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if they are in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original array: {numbers}")
    
    your_algorithm(numbers)
    print(f"Sorted array: {numbers}")`,
    explanation: 'This basic implementation demonstrates the core algorithm logic with clear variable names and educational comments.'
  },
  {
    language: 'javascript',
    title: 'JavaScript Implementation',
    code: `function yourAlgorithm(arr) {
    /**
     * Your Algorithm implementation in JavaScript
     * @param {number[]} arr - Array of numbers to sort
     * @returns {number[]} - The sorted array
     */
    const n = arr.length;
    
    // Algorithm implementation
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // ES6 array destructuring for swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', yourAlgorithm([...numbers]));`,
    explanation: 'JavaScript version showcasing modern ES6+ syntax and best practices.'
  }
];
```

**Step 2.6: Register Implementations**

In `src/data/implementationsRegistry.ts`:

```typescript
import { yourAlgorithmImplementations } from './yourAlgorithmImplementations';

export const implementationsRegistry = {
  // ... existing algorithms
  'your-algorithm': yourAlgorithmImplementations,
} as const;
```

**Step 2.7: Add to Algorithm Comparison**

Update comparison tables to include your algorithm's complexity and characteristics.

**Step 2.8: Update Navigation**

Ensure your algorithm appears in navigation dropdowns and routing works for:
- `/algorithm/your-algorithm` (info page)
- `/visualize/your-algorithm` (visualization page)

#### 3. **For Specialized Algorithms**

If your algorithm requires a specialized visualizer:

1. **Extend SortStep interface** if needed (add new step types)
2. **Create specialized visualizer component** in `src/components/`
3. **Update routing logic** to use specialized visualizer
4. **Maintain consistent UI patterns** with existing visualizers
5. **Follow same registration process** for algorithm and info

## 🎨 Code Style Guidelines

### TypeScript Best Practices
- Use strict type checking
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Component Guidelines
- Use functional components with hooks
- Keep components focused and single-purpose
- Use proper dependency arrays in useEffect
- Prefer composition over inheritance

### Algorithm Implementation Rules
- **Educational Focus**: Prioritize teaching value over optimization
- **Pure Functions**: Algorithm core should have no side effects
- **Comprehensive Steps**: Generate detailed steps for visualization
- **Error Handling**: Handle edge cases (empty arrays, single elements)

### Naming Conventions
- **Files**: camelCase for TypeScript files (`bubbleSort.ts`)
- **Components**: PascalCase (`ArrayVisualizer.tsx`)
- **Variables**: camelCase (`sortedIndices`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ARRAY_SIZE`)
- **Algorithm Keys**: kebab-case (`'bubble-sort'`)

## 🧪 Testing Guidelines

### Algorithm Testing
- Test with various input sizes (empty, single element, small, large)
- Test edge cases (already sorted, reverse sorted, duplicates)
- Verify step generation produces valid SortStep arrays
- Check that metadata (comparisons, swaps) is accurate

### Component Testing
- Test with different algorithm props
- Verify animation states work correctly
- Test responsive design on various screen sizes
- Check accessibility features

## 📚 Documentation Standards

### Code Documentation
- Add JSDoc comments to all public functions
- Include complexity analysis in algorithm comments
- Document any non-obvious implementation decisions
- Provide usage examples

### Educational Content
- Write clear, beginner-friendly descriptions
- Include real-world use cases and examples
- Explain the "why" not just the "what"
- Use progressive disclosure (simple → complex)

### Algorithm Information Requirements
- **Comprehensive phases**: Break algorithm into detailed educational steps
- **Complexity justifications**: Explain mathematical reasoning
- **Practical examples**: When and why to use the algorithm
- **Visual guidance**: How the algorithm appears in the visualizer

## 🐛 Bug Reports and Feature Requests

### Bug Reports
Please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots or screen recordings if applicable

### Feature Requests
Please include:
- Clear description of the feature
- Use case and motivation
- Possible implementation approach
- Any related examples or references

## 📋 Pull Request Process

1. **Fork** the repository
2. **Create feature branch** (`git checkout -b feature/amazing-algorithm`)
3. **Implement changes** following our guidelines
4. **Test thoroughly** on different browsers/devices
5. **Update documentation** if needed
6. **Submit pull request** with clear description

### Pull Request Checklist
- [ ] Code follows style guidelines
- [ ] Algorithm is properly registered in all registries
- [ ] Educational content is comprehensive and clear
- [ ] Implementation examples are provided
- [ ] Visual testing completed
- [ ] Documentation updated
- [ ] No breaking changes without discussion

## 🤔 Questions and Support

- **Algorithm Questions**: Open a discussion about algorithm implementation
- **Technical Issues**: Create an issue with detailed reproduction steps
- **General Questions**: Use GitHub discussions for broader topics

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special recognition for educational content improvements

Thank you for contributing to making sorting algorithms more accessible and educational! 🎉