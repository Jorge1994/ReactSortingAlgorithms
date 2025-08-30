import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const combSortInfo: AlgorithmInfo = {
  name: 'Comb Sort',
  description: 'Comb Sort improves on Bubble Sort by comparing elements a certain gap apart and shrinking the gap over time, which helps eliminate small values near the end (turtles).',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'When input is nearly sorted and the gap quickly reduces, comparisons are near linearithmic.',
        average: 'Depends on shrink factor; generally better than bubble sort but can approach quadratic behavior.',
        worst: 'In worst case the algorithm behaves similar to bubble sort with O(n^2) comparisons and swaps.'
      },
      spaceComplexity: {
        best: 'Comb Sort only uses a few counters and indices.',
        average: 'O(1) auxiliary space.',
        worst: 'O(1) auxiliary space.'
      }
    }
  },

  stable: false,
  inPlace: true,
  online: false,
  
  advantages: ['Faster than bubble sort for many inputs', 'Simple to implement', 'In-place and constant extra memory'],
  disadvantages: ['Not stable', 'Worst-case still O(n²)'],
  useCases: ['Educational comparisons with bubble and shell sorts', 'Small to medium arrays where simplicity is desired'],
  keyCharacteristics: ['Gap-based comparisons', 'Shrinking gap factor (commonly 1.3)'],
  visualizationNotes: {
    colors: {
      comparing: 'Blue bars indicate elements being compared',
      swapping: 'Red bars show elements being swapped',
      sorted: 'Green bars represent elements in final position',
      unsorted: 'Gray bars are unprocessed elements'
    },
    phases: [
      'Initial pass with a large gap to move out-of-place elements quickly',
      'Reduce gap progressively using the shrink factor to refine order',
      'Final bubble-like passes when gap equals 1 to finish sorting'
    ]
  }
};

