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
    space: 'O(n) worst-case; O(log n) best/average (recursive call stack)',
    justifications: {
      timeComplexity: {
        best: 'O(n log n) — occurs when the pivot splits the array into two roughly equal halves; each recursion level does O(n) work and there are O(log n) levels.',
        average: 'O(n log n) — on average the pivot produces reasonably balanced partitions; the average cost per level is O(n) and there are O(log n) levels, yielding n log n.',
        worst: 'O(n²) — occurs when the pivot selection is consistently the smallest or largest element (e.g., already sorted array with pivot at the end), producing highly unbalanced partitions and O(n) recursion depth.'
      },
      spaceComplexity: 'Worst-case: O(n) due to deeply unbalanced recursion producing a call stack of size O(n).'
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
