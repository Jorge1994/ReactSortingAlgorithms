import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const cocktailSortInfo: AlgorithmInfo = {
  name: 'Cocktail Shaker Sort',
  description: 'A bidirectional variation of Bubble Sort that passes through the list in both directions alternately to move large elements to the end and small elements to the beginning in each full iteration.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'When the array is already sorted, the algorithm performs one forward and optionally one backward pass detecting no swaps, allowing early termination in linear time.',
        average: 'On average, the algorithm performs about n/2 forward and backward comparisons per pass leading to O(n²) behavior similar to Bubble Sort.',
        worst: 'In the worst case (reverse-sorted), elements must move many positions, requiring roughly n² comparisons and swaps across passes.'
      },
      spaceComplexity: {
        best: 'In-place algorithm using only a few index variables and counters.',
        average: 'No additional arrays or allocations required beyond constant temporaries.',
        worst: 'Remains O(1) as it sorts the array in place.'
      }
    }
  },
  stable: true,
  inPlace: true,
  online: false,
  advantages: [
    'More efficient than Bubble Sort on certain partially-sorted inputs',
    'Moves elements in both directions which can reduce number of passes',
    'Simple to implement and visualize'
  ],
  disadvantages: [
    'Still quadratic time in average and worst cases',
    'Not as efficient as Quick Sort, Merge Sort or Heap Sort for large datasets'
  ],
  useCases: [
    'Educational demonstrations',
    'Small datasets',
    'When bidirectional bubbling yields fewer passes'
  ],
  keyCharacteristics: [
    'Bidirectional passes (forward and backward) in each iteration',
    'Adaptive with early termination when no swaps occur',
    'In-place and stable'
  ],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444',
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Initial Setup: Start with the unsorted array and initialize left and right boundaries',
      'Forward Pass: Move from left to right, comparing adjacent elements and swapping when needed to push larger elements to the right boundary',
      'Right Boundary Update: After forward pass, the largest element is at the right boundary and can be marked as sorted',
      'Backward Pass: Move from right to left, comparing adjacent elements and swapping to push smaller elements to the left boundary',
      'Left Boundary Update: After backward pass, the smallest element is at the left boundary and can be marked as sorted',
      'Boundary Narrowing: Shrink the left and right boundaries inward and repeat passes until boundaries meet or no swaps occur',
      'Early Termination: If a pass completes without swaps, the array is sorted and algorithm can finish early'
    ]
  }
};
