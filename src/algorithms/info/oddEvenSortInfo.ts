import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const oddEvenSortInfo: AlgorithmInfo = {
  name: 'Odd-Even Sort',
  description: '**Odd-Even Sort**, also known as **Brick Sort**, is a parallel sorting algorithm that demonstrates how **Bubble Sort** concepts can be adapted for concurrent execution. Built upon the foundation of **Bubble Sort\'s** comparison and swap operations, this algorithm alternates between two phases: in the odd phase, it compares and swaps elements at positions (1,2), (3,4), (5,6), etc., while in the even phase, it compares elements at positions (0,1), (2,3), (4,5), etc. This separation allows multiple comparisons to occur simultaneously without interference, as no two operations access the same memory location. While maintaining the same O(n²) sequential complexity as **Bubble Sort**, **Odd-Even Sort** can achieve significant speedup on parallel processors. The algorithm is particularly valuable for teaching parallel algorithm concepts and has practical applications in parallel computing environments and SIMD (Single Instruction, Multiple Data) architectures.',
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
        best: 'If the array is already sorted, a single pass (checking pairs) can detect no swaps, leading to O(n) behaviour.',
        average: 'Typically requires multiple passes; in the average case it behaves similarly to Bubble Sort with O(n²) comparisons/swaps.',
        worst: 'In the worst case many passes are needed to move elements to their correct positions, resulting in O(n²) time.'
      },
      spaceComplexity: {
        best: 'Uses only constant extra space for counters and temporary swap variables.',
        average: 'In-place sorting with O(1) auxiliary space.',
        worst: 'Still O(1) since it performs swaps in-place.'
      }
    }
  },
  stable: true,
  inPlace: true,
  online: false,
  advantages: [
    'Simple to implement and parallelizable for certain architectures',
    'Adaptive for nearly sorted arrays',
    'Stable and in-place'
  ],
  disadvantages: [
    'Quadratic time complexity for average and worst cases',
    'Generally slower than more advanced algorithms like Quick/Heap/Merge Sort for large inputs'
  ],
  useCases: [
    'Educational purposes',
    'Small or nearly-sorted datasets',
    'Environments where pairwise independent operations can be parallelised'
  ],
  keyCharacteristics: [
    "Alternates between comparing even-odd and odd-even pairs",
    'Simple synchronization-friendly structure',
    'In-place and stable'
  ],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444',
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      'Initialization: Prepare for alternating even-odd comparison pattern that enables parallel processing',
      
      'Even Pass: Compare adjacent pairs (0,1), (2,3), (4,5)... and swap if out of order. All comparisons can run simultaneously',
      
      'Odd Pass: Compare adjacent pairs (1,2), (3,4), (5,6)... and swap if out of order. Independent operations allow parallelization',
      
      'Swap Tracking: Monitor whether any swaps occurred during the current cycle to detect completion',
      
      'Cycle Evaluation: Check if both even and odd passes completed without swaps, indicating the array is sorted',
      
      'Continue or Terminate: Repeat even-odd cycles until no swaps occur, achieving early termination on sorted data'
    ]
  }
};
