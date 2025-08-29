import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const stoogeSortInfo: AlgorithmInfo = {
  name: 'Stooge Sort',
  description: 'Stooge Sort is a highly inefficient recursive sorting algorithm used for educational purposes. It sorts by recursively sorting the initial 2/3, the final 2/3, and then the initial 2/3 again.',
  complexity: {
    time: { best: 'O(n^{log 3 / log 1.5}) ~ O(n^{2.7})', average: 'O(n^{2.7})', worst: 'O(n^{2.7})' },
    space: { best: 'O(n) (recursive stack)', average: 'O(n)', worst: 'O(n)' },
    justifications: {
      timeComplexity: {
        best: 'Recurrence T(n) = 3T(2n/3) + O(1) leads to n^{log_ (3) / log_(3/2)} ≈ n^{2.7}.',
        average: 'Same recurrence applies in general due to recursive structure.',
        worst: 'Same as best/average due to deterministic recursion pattern.'
      },
      spaceComplexity: {
        best: 'Uses recursion depth proportional to O(log_{3/2} n) — working array copy is O(n) when recording steps for visualization.',
        average: 'Same as best.',
        worst: 'Same as best.'
      }
    }
  },
  stable: false,
  inPlace: false,
  online: false,
  advantages: ['Very simple to describe and implement', 'Good for demonstrating recursion and poor algorithm design'],
  disadvantages: ['Extremely inefficient', 'Not suitable for practical use'],
  useCases: ['Educational demonstration of recursion and algorithm analysis'],
  keyCharacteristics: ['Recursive', 'Divide into overlapping sections (2/3)', 'Poor time complexity ~ O(n^{2.7})'],
  visualizationNotes: {
    colors: { comparing: '#3B82F6', swapping: '#EF4444', sorted: '#10B981', unsorted: '#6B7280' },
    phases: [
      'Compare and swap the first and last elements of the current segment',
      'Recursively sort the first 2/3 of the segment',
      'Recursively sort the last 2/3 of the segment',
      'Recursively sort the first 2/3 again to finish'
    ]
  }
};
