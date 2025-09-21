import type { AlgorithmInfo } from '../../types';

export const timSortInfo: AlgorithmInfo = {
  name: 'Tim Sort',
  description: '**Tim Sort** is the "ultimate" sorting algorithm used by Python and Java - it\'s what runs when you call `sort()` in these languages. Created by Tim Peters, **Tim Sort** is incredibly smart because it looks for patterns in your data before deciding how to sort it. If parts of your array are already in order (called "runs"), it finds these organized sections and merges them together efficiently using an improved version of **Merge Sort**. For small sections (less than 32 elements), it switches to **Insertion Sort** which works better on tiny arrays. **Tim Sort** is like having a sorting expert that examines your data and chooses the best strategy: it can be as fast as O(n) when data is mostly sorted, but guarantees it will never be slower than O(n log n) even in the worst case. This combination of intelligence and reliability is why it became the standard for major programming languages.',
  complexity: {
    time: { 
      best: 'O(n)', 
      average: 'O(n log n)', 
      worst: 'O(n log n)' 
    },
    space: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    justifications: {
      timeComplexity: {
        best: "When the array has many pre-existing ordered runs, Tim Sort can achieve linear time by identifying and merging these natural sequences efficiently",
        average: "In typical cases, Tim Sort performs merge operations on runs of size 32-64, resulting in O(n log n) comparisons and merges",
        worst: "Even when no natural runs exist, Tim Sort creates artificial runs using insertion sort and merges them in O(n log n) time"
      },
      spaceComplexity: {
        best: "Requires O(n) auxiliary space for temporary arrays during merge operations",
        average: "Requires O(n) auxiliary space for temporary arrays during merge operations", 
        worst: "Requires O(n) auxiliary space for temporary arrays during merge operations"
      }
    }
  },
  stable: true,
  inPlace: false,
  online: false,
  advantages: [
    "Excellent performance on real-world data with existing patterns",
    "Stable sorting algorithm (preserves relative order of equal elements)",
    "Adaptive - performs better on partially sorted data",
    "Optimized for common patterns in real-world datasets",
    "Used as the default sorting algorithm in Python and Java",
    "Combines the best of insertion sort (for small arrays) and merge sort (for large arrays)",
    "Guaranteed O(n log n) worst-case performance"
  ],
  disadvantages: [
    "More complex to implement than basic sorting algorithms",
    "Requires additional memory space proportional to array size",
    "Overhead of run detection and merging logic",
    "May not be optimal for completely random data",
    "Implementation complexity makes it harder to understand for beginners"
  ],
  useCases: [
    "Default sorting algorithm in production programming languages",
    "Sorting large datasets with existing partial order",
    "Applications requiring stable sorting behavior",
    "Real-world data sorting where patterns are common",
    "Library implementations where reliability is crucial",
    "Systems where both worst-case guarantees and average-case performance matter"
  ],
  keyCharacteristics: [
    "Hybrid algorithm combining insertion sort and merge sort",
    "Identifies and exploits existing ordered sequences (runs)",
    "Uses insertion sort for runs smaller than 32 elements", 
    "Employs sophisticated merging strategy for larger sequences",
    "Stable sorting preserves order of equal elements",
    "Adaptive performance based on input data patterns",
    "Optimized for real-world data distributions"
  ],
  visualizationNotes: {
    phases: [
      "Run Detection: Identify existing ordered sequences in the input",
      "Minimum Run Length: Calculate optimal run size (typically 32-64 elements)",
      "Insertion Sort: Sort individual runs using insertion sort for efficiency",
      "Run Creation: Create artificial runs if natural ones are too small",
      "Merge Strategy: Plan optimal merging order using stack-based approach",
      "Binary Merge: Merge adjacent runs using binary insertion techniques",
      "Galloping Mode: Optimize merging when one run consistently wins",
      "Stack Management: Maintain invariants to ensure balanced merging",
      "Final Merge: Complete remaining merge operations",
      "Verification: Ensure final array is completely sorted and stable"
    ]
  }
};
