import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const shellSortInfo: AlgorithmInfo = {
  name: 'Shell Sort',
  description: 'Shell Sort is an innovative generalization of Insertion Sort that overcomes the fundamental limitation of moving elements only one position at a time. Created by Donald Shell in 1959, this algorithm introduces the concept of a \'gap\' or \'increment\' sequence, allowing elements to be compared and moved across larger distances initially, then gradually reducing the gap until it becomes 1 (at which point it performs a final Insertion Sort pass). This approach helps move elements closer to their final positions early in the process, significantly reducing the number of shifts required compared to standard Insertion Sort. The choice of gap sequence dramatically affects performance - while the worst case remains O(n²), many gap sequences achieve sub-quadratic performance. Shell Sort is particularly valuable when Quicksort is undesirable due to its worst-case behavior, and when constant space complexity is required.',

  stable: false,
  inPlace: true,
  online: false,

  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n*log n)~O(n^1.25)',
      worst: 'O(n²)'
    },
    space: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)'
    },
    justifications: {
      timeComplexity: {
        best: 'With a good gap sequence and nearly sorted input fewer operations are needed, approaching O(n log n)',
        average: 'Depends on choice of gaps; many practical sequences yield sub-quadratic performance',
        worst: 'With poor gap choices it can degrade to O(n²) similar to insertion sort'
      },
      spaceComplexity: {
        best: 'Performs sorting in-place using only constant extra memory',
        average: 'O(1) additional space regardless of input size',
        worst: 'O(1) additional space'
      }
    }
  },

  advantages: [
    'Improves insertion sort by moving elements over large gaps first',
    'In-place: requires only a constant amount of extra memory',
    'Typically performs well in practice for medium-sized arrays'
  ],

  disadvantages: [
    'Not stable',
    'Performance depends on gap sequence; worst-case can be O(n²)',
    'Harder to analyze theoretically than simpler sorts'
  ],

  useCases: [
    'General-purpose in-place sorting when a simple, practical algorithm is desired',
    'Medium-sized arrays where a full n log n algorithm may be overkill',
    'As an educational example of gap-based refinement of insertion sort'
  ],

  keyCharacteristics: [
    'Uses a diminishing gap sequence to partially sort the array before final insertion sort',
    'Operates in-place with constant extra space',
    'Not stable in general',
    'Performance strongly influenced by gap choice'
  ],

  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444',
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Gap Phases: Repeated passes over the array using a diminishing gap sequence',
      'Gapped Insertion: Each pass performs insertion-sort-like swaps but only between elements gap apart',
      'Refinement: As gap decreases, the array becomes more locally sorted until a final pass with gap=1 finishes the sort'
    ]
  }
};
