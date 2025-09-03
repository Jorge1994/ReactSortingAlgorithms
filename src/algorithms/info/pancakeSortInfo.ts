import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const pancakeSortInfo: AlgorithmInfo = {
  name: 'Pancake Sort',
  description: '**Pancake Sort** is a whimsical sorting algorithm inspired by the problem of sorting a stack of pancakes using only a spatula to flip portions of the stack. The algorithm can only perform "flip" operations, which reverse the order of elements from the beginning of the array up to a chosen position. To sort the array, **Pancake Sort** repeatedly finds the largest unsorted element, flips the array to bring this element to the front (if it\'s not already there), then flips again to move it to its correct position at the end of the unsorted portion. While highly inefficient with its quadratic time complexity, **Pancake Sort** serves as an excellent educational tool for understanding algorithmic constraints and creative problem-solving. It also has practical applications in robotics and scenarios where only specific types of operations are allowed.',
  complexity: {
    time: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    space: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)'
    },
    justifications: {
      timeComplexity: {
        best: 'Even in the best case pancake sort performs many flips to place elements which leads to quadratic behaviour for typical implementations.',
  average: 'Requires finding the max and performing up to two flips per element which results in O(n²) operations.',
  worst: 'Worst-case also needs O(n²) flips and comparisons.'
      },
      spaceComplexity: {
        best: 'In-place algorithm using constant extra space for indices and temporary swap variable.',
        average: 'Requires O(1) auxiliary memory.',
        worst: 'Still O(1) as operations are done in-place.'
      }
    }
  },
  stable: false,
  inPlace: true,
  online: false,
  memoryUsage: 'Only a small constant amount of extra memory for swapping',
  advantages: [
    'Interesting educational algorithm demonstrating prefix reversals',
    'In-place and simple to implement'
  ],
  disadvantages: [
    'Quadratic time complexity makes it impractical for large arrays',
    'Not stable'
  ],
  useCases: [
    'Educational demonstrations',
    'Situations where only prefix reversals are allowed (theoretical)'
  ],
  keyCharacteristics: [
    'Uses prefix flips to move the largest element to its place',
    'In-place but not stable',
    'Quadratic time complexity'
  ],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444',
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Find maximum in prefix',
      'Flip prefix to bring max to front',
      'Flip full current prefix to move max to its final position',
      'Reduce prefix size and repeat'
    ]
  }
};
