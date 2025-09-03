import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  description: '**Quick Sort** is one of the most widely used sorting algorithms, employing a divide-and-conquer strategy that makes it exceptionally fast in practice. The algorithm works by selecting a \'pivot\' element from the array and partitioning the other elements into two subarrays according to whether they are less than or greater than the pivot. This partitioning process places the pivot in its final sorted position, and the algorithm then recursively applies the same process to the subarrays. While **Quick Sort** can degrade to O(n²) in the worst case when poor pivots are chosen, its average-case performance of O(n log n) combined with excellent cache locality and in-place operation makes it the default choice for many standard library implementations.',
  stable: false,
  inPlace: true,
  online: false,
  memoryUsage: 'Quick Sort is generally classified as in-place because it rearranges elements within the input array and uses only a small number of extra variables. However, the recursion stack consumes O(log n) space in the best and average cases (balanced partitions) and can grow to O(n) in the worst case when partitions are highly unbalanced. This means it is not strictly O(1) auxiliary space, but it does not allocate additional arrays proportional to the input size. Iterative variants or tail-call optimizations can reduce stack usage.',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    space: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)'
    },
    justifications: {
      timeComplexity: {
        best: 'Occurs when the pivot element divides the array into two equal halves. This results in a balanced recursion tree with O(log n) depth, and each level requires O(n) time to partition the array, yielding O(n log n).',
        average: 'On average, the pivot divides the array into two parts, but not necessarily equal. This leads to a slightly worse performance than the best case, but still results in O(n log n) time complexity.',
        worst: 'Occurs when the smallest or largest element is always chosen as the pivot (e.g., sorted arrays). This results in highly unbalanced partitions and O(n) recursion depth, yielding O(n²) time complexity.'
      },
      spaceComplexity: {
        best: 'O(log n) due to a balanced recursion tree with stack depth O(log n) when the pivot consistently divides the array into equal halves.',
        average: 'O(log n) average case maintains balanced recursion with logarithmic stack depth for most random inputs.',
        worst: 'Deeply unbalanced recursion can produce a call stack of size O(n), resulting in O(n) auxiliary space when pivot selection is consistently poor.'
      }
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
  'Choice of Pivot affects partition balance and performance. Common strategies: first/last (simple, can trigger worst-case on sorted inputs), random (good practical choice), median-of-three/median (best balance but more overhead)',
  'Partition algorithms include Naive (uses extra O(n) space), Lomuto (simple, used here), and Hoare (more efficient in swaps). All run in O(n) time'
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
