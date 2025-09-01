import type { AlgorithmInfo } from '../../types';

export const bucketSortInfo: AlgorithmInfo = {
  name: 'Bucket Sort',
  description: 'Bucket sort is a distribution sorting algorithm that divides elements into buckets based on their values, sorts each bucket individually using insertion sort, then concatenates the sorted buckets to produce the final sorted array.',
  complexity: {
    time: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    space: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    justifications: {
      timeComplexity: {
        best: 'When elements are uniformly distributed across buckets, each bucket has O(n/k) elements. Insertion sort on each bucket takes O((n/k)²), and with k buckets: O(k × (n/k)²) = O(n²/k). If k = n, then O(n²/n) = O(n). Total: O(n) for distribution + O(n) for sorting = O(n + k).',
        average: 'With uniform distribution, expected time is O(n + k) where k is the number of buckets. The distribution phase takes O(n) and sorting k buckets with average n/k elements each takes O(n + k).',
        worst: 'When all elements fall into the same bucket, bucket sort degenerates to insertion sort on the entire array, giving O(n²) time complexity.'
      },
      spaceComplexity: {
        best: 'Requires space for k buckets plus the original array, giving O(n + k) space complexity.',
        average: 'Requires space for k buckets plus the original array, giving O(n + k) space complexity.',
        worst: 'Requires space for k buckets plus the original array, giving O(n + k) space complexity.'
      }
    }
  },
  stable: true,
  inPlace: false,
  online: false,
  advantages: [
    'Linear time complexity O(n + k) when elements are uniformly distributed',
    'Naturally parallel - buckets can be sorted independently',
    'Stable sorting algorithm - maintains relative order of equal elements',
    'Good cache performance due to spatial locality within buckets',
    'Adaptable bucket count based on data characteristics'
  ],
  disadvantages: [
    'Requires prior knowledge of input distribution for optimal performance',
    'Poor performance O(n²) when elements cluster in few buckets',
    'Additional space overhead for maintaining buckets',
    'Not in-place - requires extra memory proportional to input size',
    'Performance depends heavily on bucket distribution strategy'
  ],
  useCases: [
    'Sorting floating-point numbers with known range',
    'Data with known uniform distribution patterns',
    'Parallel sorting implementations across multiple processors',
    'External sorting when memory is limited',
    'Preprocessing step for other algorithms requiring sorted buckets'
  ],
  keyCharacteristics: [
    'Distribution-based sorting using multiple buckets',
    'Uses insertion sort for internal bucket sorting',
    'Bucket count adapts to array size (√n for optimal performance)',
    'Three distinct phases: distribution, internal sorting, concatenation',
    'Performance highly dependent on input data distribution'
  ],
  visualizationNotes: {
    colors: {
      comparing: 'Blue highlights elements being analyzed for bucket placement',
      swapping: 'Red shows elements being moved during internal bucket sorting',
      sorted: 'Green marks elements that have reached their final sorted position',
      unsorted: 'Gray represents elements not yet processed or in transit between buckets'
    },
    phases: [
      'Initialization: Create empty buckets based on array size using adaptive formula (√n for optimal distribution)',
      'Range Calculation: Determine min/max values to establish bucket ranges for uniform distribution',
      'Distribution Phase: Analyze each element and move it to appropriate bucket based on value range',
      'Bucket Highlighting: Highlight target bucket and element being moved during distribution',
      'Internal Sorting Phase: Apply insertion sort within each non-empty bucket independently',
      'Insertion Sort Steps: Show detailed insertion sort operations within individual buckets',
      'Concatenation Phase: Merge sorted buckets sequentially into final array',
      'Element Migration: Animate elements moving from buckets back to their final sorted positions',
      'Completion: All elements sorted and placed in final array with green highlighting'
    ]
  }
};
