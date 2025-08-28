import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const insertionSortInfo: AlgorithmInfo = {
  name: 'Insertion Sort',
  description: 'A simple sorting algorithm that builds the final sorted array one element at a time. It works by taking elements from the unsorted portion and inserting them into their correct position in the already sorted portion.',
  
  stable: true,
  inPlace: true,
  online: true,
  
  complexity: {
    time: {
      best: 'O(n)',
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
        best: 'When the array is already sorted, only one comparison is made for each element (n-1 comparisons total) as no shifting is needed',
        average: 'On average, each element needs to be compared with half of the preceding elements, resulting in approximately n²/4 comparisons',
        worst: 'When the array is sorted in reverse order, each element must be compared with all preceding elements, resulting in n(n-1)/2 comparisons'
      },
      spaceComplexity: {
        best: 'Uses only a constant amount of extra space for variables (key, i, j) regardless of input size, making it an in-place sorting algorithm',
        average: 'Consistent O(1) space usage as no additional data structures are required.',
        worst: 'Even in worst case scenarios, space complexity remains O(1) as the algorithm maintains its in-place approach.'
      }
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
    'Temporarily holds each element while creating the perfect insertion spot in the sorted section',
    'Divides the array into two conceptual regions: an organized left side and an unprocessed right side',
    'Examines the sorted section backwards to efficiently find the correct insertion position',
    'Moves elements by sliding them to create space rather than exchanging positions',
    'Performs exceptionally well on data that is already mostly organized, requiring minimal work',
    'Maintains the original order of identical elements, preserving data relationships',
    'Operates entirely within the original array boundaries without needing extra storage space',
    'Mirrors the intuitive process humans use when organizing physical objects like playing cards'
  ],

  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',    // Blue - elements being compared
      swapping: '#EF4444',     // Red - elements being shifted/moved
      sorted: '#10B981',       // Green - elements in final sorted position
      unsorted: '#6B7280'      // Gray - elements not yet processed
    },
    phases: [
      'Foundation Building: Begin by considering the first element as an already sorted section, since any single element is naturally in order',
      'Element Selection: Choose the next unsorted element to be placed into its correct position within the sorted section',
      'Value Preservation: Remember the chosen element temporarily while making space for it in the sorted portion',
      'Backward Exploration: Start examining the sorted section from right to left to find where the new element belongs',
      'Comparison Process: Compare the chosen element with each element in the sorted section, moving from right to left',
      'Space Creation: When encountering elements larger than our chosen element, shift them one position to the right to create insertion space',
      'Continued Searching: Keep moving leftward through the sorted section, shifting larger elements as needed',
      'Position Discovery: Identify the exact location where our chosen element should be inserted to maintain sorted order',
      'Element Placement: Insert the chosen element into its determined correct position within the sorted section',
      'Section Expansion: The sorted portion now grows by one element, extending the organized area of the array',
      'Progress Verification: Confirm that all elements in the expanded sorted section are properly arranged in ascending order',
      'Process Continuation: Repeat the insertion process for each remaining unsorted element until the entire array is sorted'
    ]
  }
};
