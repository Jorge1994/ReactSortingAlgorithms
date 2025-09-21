import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const bitonicSortInfo: AlgorithmInfo = {
  name: 'Bitonic Sort',
  description: '**Bitonic Sort** is a fascinating sorting algorithm designed specifically for parallel processing and requires the input size to be a power of two (like 16, 32, or 64 elements). The name comes from "bitonic sequences" - arrays that first increase then decrease, or vice versa (like a mountain or valley shape). **Bitonic Sort** works by repeatedly creating and merging these bitonic sequences using a network of compare-and-swap operations. What makes this algorithm special is that it always performs the same pattern of comparisons regardless of the actual data values - this predictable behavior makes it perfect for parallel computers and hardware implementations. While its O(n log² n) complexity is slower than algorithms like **Quick Sort** for single processors, its ability to run many operations simultaneously can make it very fast on parallel systems like graphics cards (GPUs).',
  complexity: {
    time: { best: 'O(n log² n)', average: 'O(n log² n)', worst: 'O(n log² n)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'Bitonic sort executes log n stages, with each stage performing O(n log n) comparisons across the sorting network, resulting in O(n log² n) total complexity.',
        average: 'The algorithm follows a predetermined comparison pattern regardless of input data, maintaining O(n log² n) complexity in all cases.',
        worst: 'Same as average and best cases due to the data-oblivious nature of the sorting network - performance is independent of input distribution.'
      },
      spaceComplexity: {
        best: 'Uses only constant extra space for temporary variables during in-place compare-and-exchange operations.',
        average: 'Maintains O(1) space complexity as all operations are performed in-place without additional data structures.',
        worst: 'Even in worst case, space remains O(1) due to the in-place nature of the sorting network implementation.'
      }
    }
  },
  stable: false,
  inPlace: true,
  online: false,
  advantages: ['Parallel-friendly', 'Deterministic network pattern', 'Good for hardware implementations'],
  disadvantages: ['Requires power-of-two length', 'Not optimal for general-purpose CPUs compared to quicksort/mergesort'],
  useCases: ['GPU/parallel sorting networks', 'Educational demonstrations of data-oblivious algorithms'],
  keyCharacteristics: ['Data-oblivious', 'Compare-exchange network', 'Requires power-of-two length'],
  phases: [
    "Initial setup: Ensure array length is a power of two (this visualizer allows 16, 32, 64).",
    "Form pairs: First passes form bitonic pairs (size 2) by comparing adjacent elements.",
    "Merge blocks: Merge small bitonic blocks into larger ones (4, 8, ...) using compare-exchange passes.",
    "Index pairing: Pairs are chosen with l = i ^ j—XOR pairing creates non-local exchanges across blocks.",
    "Direction & stages: (i & k) selects ascending/descending order; k doubles each stage while j controls partner offsets.",
    "Finalize: After final merges all elements are sorted. Complexity: O(n log² n); useful for parallel/hardware implementations.",
  ]
};
