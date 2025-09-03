import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const stoogeSortInfo: AlgorithmInfo = {
  name: 'Stooge Sort',
  description: 'Stooge Sort is deliberately one of the most inefficient sorting algorithms ever devised, serving as an important lesson in how not to design algorithms. Named after the Three Stooges comedy trio, this recursive algorithm follows a bizarre strategy: it sorts the first two-thirds of the array, then the last two-thirds, and then the first two-thirds again. The algorithm\'s time complexity of O(n^2.7) makes it significantly slower than even naive algorithms like Bubble Sort. Despite its terrible performance, Stooge Sort is mathematically fascinating as it demonstrates how recursive algorithms can be analyzed using recurrence relations, and it serves as a cautionary tale in algorithm design courses. Its existence proves that not all recursive divide-and-conquer approaches lead to efficient solutions.',
  complexity: {
    time: { best: 'O(n²·⁷)', average: 'O(n²·⁷)', worst: 'O(n²·⁷)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    justifications: {
      timeComplexity: {
  best: 'Recurrence T(n) = 3T(2n/3) + O(1) leads to n raised to the power (log 3 / log 1.5), which is approximately n²·⁷.',
  average: 'The same recurrence applies in general due to the recursive structure.',
  worst: 'Same as best/average due to the deterministic recursive pattern.'
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
  keyCharacteristics: ['Recursive', 'Divide into overlapping sections (2/3)', 'Poor time complexity ~ O(n²·⁷)'],
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
