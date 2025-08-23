import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const insertionSortInfo: AlgorithmInfo = {
  name: 'Insertion Sort',
  description: 'A simple sorting algorithm that builds the final sorted array one element at a time. It works by taking elements from the unsorted portion and inserting them into their correct position in the already sorted portion.',
  
  stable: true,
  inPlace: true,
  
  complexity: {
    time: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    space: 'O(1)',
    justifications: {
      timeComplexity: {
        best: 'When the array is already sorted, only one comparison is made for each element (n-1 comparisons total) as no shifting is needed',
        average: 'On average, each element needs to be compared with half of the preceding elements, resulting in approximately n²/4 comparisons',
        worst: 'When the array is sorted in reverse order, each element must be compared with all preceding elements, resulting in n(n-1)/2 comparisons'
      },
      spaceComplexity: 'Uses only a constant amount of extra space for variables (key, i, j) regardless of input size, making it an in-place sorting algorithm'
    }
  },

  advantages: [
    'Simple implementation and understanding',
    'Efficient for small datasets',
    'Adaptive - performs well on nearly sorted arrays',
    'Stable - maintains relative order of equal elements',
    'In-place - requires only O(1) extra memory',
    'Online - can sort a list as it receives it',
    'Performs well on small arrays (often used as the final stage of hybrid algorithms)'
  ],

  disadvantages: [
    'Inefficient for large datasets due to O(n²) average complexity',
    'More writes compared to Selection Sort',
    'Performance degrades significantly with reverse-sorted input',
    'Not suitable for large-scale applications without modifications'
  ],

  useCases: [
    'Small datasets (typically less than 50 elements)',
    'Nearly sorted arrays where efficiency is close to O(n)',
    'As a subroutine in hybrid algorithms (like Quicksort for small partitions)',
    'Online algorithms where data arrives sequentially',
    'When stability is required and simplicity is preferred',
    'Educational purposes for understanding sorting concepts'
  ],

  keyCharacteristics: [
    'Builds sorted array incrementally from left to right',
    'Each iteration places one element in its correct position',
    'Maintains a sorted portion and an unsorted portion',
    'Elements are shifted rather than swapped',
    'Natural behavior similar to sorting playing cards by hand'
  ],

  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',    // Blue - elements being compared
      swapping: '#EF4444',     // Red - elements being shifted/moved
      sorted: '#10B981',       // Green - elements in final sorted position
      unsorted: '#6B7280'      // Gray - elements not yet processed
    },
    phases: [
      'Initialization: Start with the first element as the sorted portion (trivially sorted)',
      'Element Selection: Pick the next element from the unsorted portion as the key',
      'Position Finding: Compare the key with elements in the sorted portion from right to left',
      'Element Shifting: Shift elements greater than the key one position to the right',
      'Insertion: Place the key in its correct position in the sorted portion',
      'Sorted Portion Growth: The sorted portion now includes one more element',
      'Iteration: Repeat the process for all remaining unsorted elements',
      'Comparison Process: Each comparison determines if shifting is needed',
      'Shifting Mechanism: Elements are moved rather than swapped for efficiency',
      'Adaptive Behavior: Fewer operations needed when array is nearly sorted',
      'Key Preservation: The current element being inserted is preserved during shifts',
      'Boundary Checking: Algorithm stops shifting when correct position is found or beginning is reached',
      'Final Verification: All elements are in their correct positions when algorithm completes'
    ]
  }
};
