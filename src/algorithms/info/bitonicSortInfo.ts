import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const bitonicSortInfo: AlgorithmInfo = {
  name: 'Bitonic Sort',
  description: 'Bitonic sort is a parallel sorting algorithm that works correctly when the input size is a power of two. This visual implementation supports sizes 16, 32 and 64 and demonstrates the data-oblivious compare-exchange network.',
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
    colors: { comparing: '#3B82F6', swapping: '#EF4444', sorted: '#10B981', unsorted: '#6B7280' },
    phases: ['Constructing bitonic sequences', 'Merging bitonic sequences', 'Final sorted output']
  }
};
