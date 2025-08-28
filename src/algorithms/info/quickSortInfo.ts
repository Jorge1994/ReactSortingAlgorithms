import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  description: 'Quick Sort is a divide-and-conquer, in-place sorting algorithm. This implementation uses the Lomuto partition scheme and highlights pivot selection, comparisons and swaps for visualization.',
  stable: false,
  inPlace: true,
  online: false,
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
  space: 'O(log n) best/average (recursive call stack); O(n) worst-case',
  justifications: {
      timeComplexity: {
        best: 'Occurs when the pivot element divides the array into two equal halves. This results in a balanced recursion tree with O(log n) depth, and each level requires O(n) time to partition the array, yielding O(n log n).',
        average: 'On average, the pivot divides the array into two parts, but not necessarily equal. This leads to a slightly worse performance than the best case, but still results in O(n log n) time complexity.',
        worst: 'Occurs when the smallest or largest element is always chosen as the pivot (e.g., sorted arrays). This results in highly unbalanced partitions and O(n) recursion depth, yielding O(n²) time complexity.'
      },
  spaceComplexity: 'O(log n) due to a balanced recursion tree with stack depth O(log n). Deeply unbalanced recursion can produce a call stack of size O(n), resulting in O(n) auxiliary space.'
    }
  },
  advantages: [
  'It is a divide-and-conquer algorithm that makes it easier to solve problems.',
  'It is efficient on large data sets.',
  'It has a low overhead, as it only requires a small amount of memory to function.',
  'It is cache-friendly because it works in-place and does not copy data to auxiliary arrays.',
  'Fastest general-purpose algorithm for large data when stability is not required.',
  'It is tail-recursive in form in many implementations, enabling tail-call optimizations where supported.'
  ],
  disadvantages: [
  'It has a worst-case time complexity of O(n²), which occurs when the pivot is chosen poorly.',
  'It is not a good choice for very small data sets in some contexts.',
  "It is not a stable sort — equal elements may not retain their original relative order because swaps are driven by pivot positions."
  ],
  useCases: [
  'Sorting large datasets efficiently in memory.',
  'Used in library sort functions (e.g., C++ std::sort and Java Arrays.sort for primitives).',
  'Arranging records in databases for faster searching.',
  'Preprocessing step in algorithms requiring sorted input (e.g., binary search, two-pointer techniques).',
  'Finding the kth smallest/largest element using Quickselect (a variant of quicksort).',
  'Sorting arrays of objects based on multiple keys (custom comparators).',
  'Data compression preprocessing (e.g., Huffman coding).',
  'Graphics and computational geometry (e.g., convex hull algorithms).'
  ],
  keyCharacteristics: [
    'Divide-and-conquer',
    'In-place with swaps',
    'Pivot selection influences performance'
  ],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444',
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Select Pivot: Highlight the pivot element used for partitioning.',
      'Compare: Compare elements against pivot and highlight comparisons.',
      'Swap: Swap elements that belong to the left partition.',
      'Place Pivot: Move pivot to its final sorted position and mark it sorted.',
      'Recurse: Apply the same steps to left and right partitions.'
    ]
  }
};
