import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const shellSortInfo: AlgorithmInfo = {
  name: 'Shell Sort',
  description: 'An in-place comparison sort that generalizes insertion sort by allowing the exchange of items that are far apart using a diminishing gap sequence.',

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
