import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const bitonicSortInfo: AlgorithmInfo = {
  name: 'Bitonic Sort',
  description: 'Bitonic Sort is a sophisticated parallel sorting algorithm designed specifically for massively parallel architectures and requires the input size to be a power of two. The algorithm is based on the concept of a bitonic sequence - a sequence that first increases then decreases (or vice versa). Bitonic Sort works by recursively constructing bitonic sequences and then sorting them into monotonic sequences using compare-and-exchange operations. What makes this algorithm particularly valuable is that it\'s a data-oblivious sorting network, meaning the sequence of comparisons is predetermined and doesn\'t depend on the actual data values. This property makes it ideal for parallel processors, GPUs, and hardware implementations where all processing units can execute the same operations simultaneously. While its O(n log² n) complexity is higher than optimal sequential algorithms, its exceptional parallelizability can lead to significant performance gains on appropriate hardware.',
  complexity: {
    time: { best: 'O(n log^2 n)', average: 'O(n log^2 n)', worst: 'O(n log^2 n)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'Bitonic sort runs through log n stages, each performing O(n log n) comparisons in this network implementation, giving O(n log^2 n).',
        average: 'Same as best for data-oblivious networks.',
        worst: 'Same as best.'
      },
      spaceComplexity: {
        best: 'In-place compare-exchange operations use constant extra memory.',
        average: 'In-place compare-exchange operations use constant extra memory.',
        worst: 'In-place compare-exchange operations use constant extra memory.'
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
  visualizationNotes: {
    colors: {
      comparing: "Blue bars indicate elements currently being compared",
      swapping: "Red bars show elements that are being swapped",
      sorted: "Green bars mark elements that have reached final position",
      unsorted: "Gray bars represent unprocessed or idle elements"
    },
    phases: [
      "Initial setup: Ensure array length is a power of two (this visualizer allows 16, 32, 64).",
      "Form pairs: First passes form bitonic pairs (size 2) by comparing adjacent elements.",
      "Merge blocks: Merge small bitonic blocks into larger ones (4, 8, ...) using compare-exchange passes.",
      "Index pairing: Pairs are chosen with l = i ^ j—XOR pairing creates non-local exchanges across blocks.",
      "Direction & stages: (i & k) selects ascending/descending order; k doubles each stage while j controls partner offsets.",
      "Finalize: After final merges all elements are sorted. Complexity: O(n log² n); useful for parallel/hardware implementations.",
    ]
  }
};
