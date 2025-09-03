import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const cycleSortInfo: AlgorithmInfo = {
  name: 'Cycle Sort',
  description: '**Cycle Sort** is a unique in-place sorting algorithm that minimizes the number of memory writes, making it particularly valuable when write operations are expensive (such as with flash memory or EEPROM). The algorithm works by calculating the exact final position of each element and placing it there directly, rather than through a series of swaps. It does this by counting how many elements are smaller than the current element to determine where it should go. When an element is placed in its correct position, it displaces another element, which then needs to be placed in its correct position, creating a "cycle" of moves. Despite its quadratic time complexity, **Cycle Sort\'s** minimal write characteristic makes it useful in specialized scenarios where reducing wear on memory devices is more important than execution speed.',
  complexity: {
    time: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'Even in best case the algorithm must count positions for each element leading to O(n^2) comparisons.',
        average: 'Each element may need to be compared with many others to find its final position, resulting in O(n^2).',
        worst: 'Worst-case behavior still performs O(n^2) comparisons and rotations.'
      },
      spaceComplexity: {
        best: 'Uses constant extra space for temporary variables.',
        average: 'Uses constant extra space for temporary variables.',
        worst: 'Uses constant extra space for temporary variables.'
      }
    }
  },
  stable: false,
  inPlace: true,
  online: false,
  memoryUsage: 'Very low: only a few temporary variables',
  advantages: ['Minimizes the number of writes (useful when write operations are expensive)'],
  disadvantages: ['High number of comparisons, O(n^2) time complexity', 'Not stable'],
  useCases: ['When memory writes are significantly more expensive than reads'],
  keyCharacteristics: ['In-place', 'Minimizes writes', 'Unstable', 'Quadratic time'],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444',
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Counting phase: determine final position for the current element by counting smaller elements to the right.',
      'Placement phase: put the item in its correct position (this is one memory write).',
      'Rotation phase: rotate the rest of the cycle until cycle_start is reached again.',
      'Mark final positions as sorted.'
    ]
  }
};
