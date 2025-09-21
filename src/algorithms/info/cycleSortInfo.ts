import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const cycleSortInfo: AlgorithmInfo = {
  name: 'Cycle Sort',
  description: '**Cycle Sort** is a unique in-place sorting algorithm that minimizes the number of memory writes, making it particularly valuable when write operations are expensive (such as with flash memory or EEPROM). The algorithm works by calculating the exact final position of each element and placing it there directly, rather than through a series of swaps. It does this by counting how many elements are smaller than the current element to determine where it should go. When an element is placed in its correct position, it displaces another element, which then needs to be placed in its correct position, creating a "cycle" of moves. Despite its quadratic time complexity, **Cycle Sort\'s** minimal write characteristic makes it useful in specialized scenarios where reducing wear on memory devices is more important than execution speed.',
  complexity: {
    time: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'Even when the array is already sorted, the algorithm must still count how many elements are smaller than each element to determine final positions, requiring O(n²) comparisons.',
        average: 'For each element, the algorithm counts how many elements to its right are smaller to determine the final position, resulting in approximately n²/2 comparisons on average.',
        worst: 'The worst case requires the maximum number of position calculations and cycle rotations, but still maintains O(n²) time complexity due to the systematic approach.'
      },
      spaceComplexity: {
        best: 'The algorithm operates in-place, using only constant extra memory for temporary variables like position counters and the current element being cycled.',
        average: 'Consistently uses O(1) space as no additional data structures are needed regardless of input distribution.',
        worst: 'Even with maximum cycle lengths, space remains O(1) as the algorithm maintains its in-place approach using only temporary variables.'
      }
    }
  },
  stable: false,
  inPlace: true,
  online: false,
  advantages: ['Minimizes the number of writes (useful when write operations are expensive)'],
  disadvantages: ['High number of comparisons, O(n^2) time complexity', 'Not stable'],
  useCases: ['When memory writes are significantly more expensive than reads'],
  keyCharacteristics: ['In-place', 'Minimizes writes', 'Unstable', 'Quadratic time'],
  phases: [
    'Counting phase: determine final position for the current element by counting smaller elements to the right.',
    'Placement phase: put the item in its correct position (this is one memory write).',
    'Rotation phase: rotate the rest of the cycle until cycle_start is reached again.',
    'Mark final positions as sorted.'
  ]
};
