import type { AlgorithmInfo } from '../../types';

export const timSortInfo: AlgorithmInfo = {
  name: 'Tim Sort',
  description: '**Tim Sort** is a highly sophisticated hybrid sorting algorithm that represents the pinnacle of practical sorting algorithm design, combining and improving upon **Merge Sort** and **Insertion Sort** strategies. Created by Tim Peters for Python, it has become the standard sorting algorithm for Python, Java, and many other major programming languages. **Tim Sort** excels by recognizing and exploiting existing order in real-world data through its innovative approach of identifying natural runs (consecutive ordered elements) and merging them intelligently using advanced **Merge Sort** techniques. The algorithm goes far beyond simple hybridization by employing advanced techniques like binary insertion sort for small runs, galloping mode for uneven merge operations, and a sophisticated merging strategy that minimizes temporary memory usage. This makes **Tim Sort** exceptionally fast on partially sorted data while maintaining excellent worst-case guarantees, representing a significant evolution beyond traditional **Merge Sort**.',
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
  memoryUsage: "O(n) auxiliary space for temporary arrays during merge operations",
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
    colors: { 
      comparing: '#3B82F6',    // Blue for comparisons
      swapping: '#EF4444',     // Red for swaps/moves
      sorted: '#10B981',       // Green for finally sorted
      unsorted: '#6B7280'      // Gray for unsorted elements
    },
    phases: [
      "Phase 1: Run Detection - Identify existing ordered sequences in the input",
      "Phase 2: Minimum Run Length - Calculate optimal run size (typically 32-64 elements)",
      "Phase 3: Insertion Sort - Sort individual runs using insertion sort for efficiency",
      "Phase 4: Run Creation - Create artificial runs if natural ones are too small",
      "Phase 5: Merge Strategy - Plan optimal merging order using stack-based approach",
      "Phase 6: Binary Merge - Merge adjacent runs using binary insertion techniques",
      "Phase 7: Galloping Mode - Optimize merging when one run consistently wins",
      "Phase 8: Stack Management - Maintain invariants to ensure balanced merging",
      "Phase 9: Final Merge - Complete remaining merge operations",
      "Phase 10: Verification - Ensure final array is completely sorted and stable"
    ]
  }
};
