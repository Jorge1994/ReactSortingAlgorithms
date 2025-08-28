import type { AlgorithmInfo } from '../../types';

export const mergeSortInfo: AlgorithmInfo = {
  name: 'Merge Sort',
  description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the sorted halves. It guarantees O(n log n) performance regardless of input distribution.',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    space: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    justifications: {
      timeComplexity: {
        best: 'The array is always divided into log n levels, and each level requires O(n) operations to merge, regardless of initial order. Even if the array is already sorted, all divisions and merges must still occur.',
        average: 'The divide-and-conquer approach consistently splits the array into halves (creating log n levels), and each level requires exactly n comparisons during the merge phase, resulting in O(n log n) operations.',
        worst: 'Even with completely reverse-sorted input, the algorithm maintains O(n log n) complexity because the division strategy is independent of data order, and merging always requires at most n comparisons per level.'
      },
      spaceComplexity: {
        best: 'Requires O(n) additional space for temporary arrays used during the merge process. Additionally, the recursive call stack contributes O(log n) space, but the dominant factor is the O(n) space for auxiliary arrays.',
        average: 'Consistently requires O(n) auxiliary space regardless of input order, as temporary arrays of the same size are needed for merging.',
        worst: 'Space complexity remains O(n) even in worst case scenarios, as the merge process always requires the same amount of auxiliary space regardless of data distribution.'
      }
    }
  },
  stable: true,
  inPlace: false,
  online: false,
  advantages: [
    'Guaranteed O(n log n) time complexity in all cases',
    'Stable sorting algorithm - maintains relative order of equal elements',
    'Predictable performance regardless of input distribution',
    'Excellent for sorting linked lists with O(1) space complexity',
    'Parallelizable - different segments can be sorted independently',
    'Good cache performance for large datasets when implemented properly'
  ],
  disadvantages: [
    'Requires O(n) additional memory space',
    'Not in-place - cannot sort with constant extra space',
    'Slower than Quick Sort on average for small to medium arrays',
    'Recursive implementation may cause stack overflow for very large arrays',
    'More complex implementation compared to simple algorithms',
    'Overhead of creating temporary arrays can impact performance'
  ],
  useCases: [
    'When guaranteed O(n log n) performance is required',
    'Sorting linked lists efficiently',
    'External sorting of large datasets that do not fit in memory',
    'When stability is required (maintaining order of equal elements)',
    'Parallel and distributed sorting systems',
    'Sorting very large arrays where worst-case performance matters'
  ],
  keyCharacteristics: [
    'Divide-and-conquer strategy',
    'Recursive algorithm structure',
    'Stable sorting method',
    'Not in-place (requires extra memory)',
    'Consistent O(n log n) performance',
    'Bottom-up merge approach available'
  ],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444', 
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Initial State: Display the unsorted array that needs to be sorted using divide-and-conquer approach',
      
      'Division Phase: Recursively divide the array into smaller subarrays until each subarray contains only one element',
      
      'Base Case Recognition: Identify when subarrays reach size 1 (already sorted by definition)',
      
      'Merge Preparation: Begin merging process by taking two adjacent sorted subarrays',
      
      'Comparison Phase: Compare the first elements of both subarrays to determine which is smaller',
      
      'Element Placement: Place the smaller element into the temporary merged array',
      
      'Pointer Advancement: Move the pointer in the subarray from which the element was taken',
      
      'Continued Merging: Repeat comparison and placement until one subarray is exhausted',
      
      'Remaining Elements: Copy all remaining elements from the non-exhausted subarray',
      
      'Subarray Completion: Mark the merged subarray as completed and sorted',
      
      'Level Completion: Continue merging until all subarrays at the current level are processed',
      
      'Recursive Ascension: Move up one level in the recursion tree and repeat the merge process',
      
      'Progressive Growth: Each merge level creates larger sorted subarrays',
      
      'Logarithmic Levels: The total number of merge levels is log₂(n) where n is array size',
      
      'Final Merge: The last merge combines two sorted halves into the final sorted array',
      
      'Completion Verification: Confirm that the entire array is now sorted in ascending order',
      
      'Performance Analysis: Count total comparisons (≈ n log n) and space usage (O(n) auxiliary arrays)',
      
      'Stability Demonstration: Show how equal elements maintain their relative order throughout the process'
    ]
  }
};
