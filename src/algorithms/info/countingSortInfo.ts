import type { AlgorithmInfo } from '../../types';

export const countingSortInfo: AlgorithmInfo = {
  name: 'Counting Sort',
  description: 'A non-comparison based sorting algorithm that works by counting the number of objects having distinct key values, then performing arithmetic calculations to determine the positions of each key value in the output sequence.',
  complexity: {
    time: { 
      best: 'O(n + k)', 
      average: 'O(n + k)', 
      worst: 'O(n + k)' 
    },
    space: 'O(k)',
    justifications: {
      timeComplexity: {
        best: "Linear time in all cases because we always need to count all n elements and process k possible values. No comparisons between elements are needed.",
        average: "Consistently O(n + k) as the algorithm always performs the same operations: counting n elements, computing cumulative sums for k values, and placing n elements in output.",
        worst: "Still O(n + k) even with large ranges because the algorithm's performance depends only on input size n and range k, not on the arrangement of elements."
      },
      spaceComplexity: "Requires O(k) additional space for the count array where k is the range of input values (max - min + 1), plus O(n) for the output array."
    }
  },
  stable: true,
  inPlace: false,
  online: false,
  advantages: [
    "Linear time complexity O(n + k) when k is not significantly larger than n",
    "Stable sorting algorithm - maintains relative order of equal elements",
    "Not comparison-based - doesn't rely on element comparisons",
    "Predictable performance - always takes the same time regardless of input order",
    "Simple to understand and implement for integer sorting"
  ],
  disadvantages: [
    "Only works with integers or objects that can be mapped to integers",
    "Requires knowledge of the range of input values",
    "Space complexity can be prohibitive when k (range) is much larger than n",
    "Not suitable for general-purpose sorting of arbitrary data types",
    "Memory usage increases linearly with the range of values"
  ],
  useCases: [
    "Sorting integers when the range of values is known and reasonable",
    "Sorting objects by integer keys (age, scores, ratings)",
    "When stability is required and range is manageable",
    "Preprocessing step for radix sort",
    "Counting frequencies of elements in an array"
  ],
  keyCharacteristics: [
    "Non-comparison based sorting algorithm",
    "Stable sorting method",
    "Linear time complexity when range is reasonable",
    "Requires additional space proportional to the range of values",
    "Works by counting occurrences and calculating positions"
  ],
  visualizationNotes: {
    colors: {
      comparing: '#3B82F6',
      swapping: '#EF4444', 
      sorted: '#10B981',
      unsorted: '#6B7280'
    },
    phases: [
      "Phase 1 - Discover Range: Find the smallest (min) and largest (max) values in the array. This tells us how many 'buckets' we need for counting.",
      "Phase 2 - Create Count Array: Create a counting array with (max - min + 1) positions, all starting at 0. Each position represents a possible value.",
      "Phase 3 - Count Elements: Go through the original array. For each element, increment the counter in the corresponding 'bucket'. At the end, we know how many times each value appears.",
      "Phase 4 - Calculate Cumulative Positions: Transform simple counters into cumulative counters by adding each count to all previous counts. This creates a position map where each value tells us how many positions in the sorted array belong to elements with smaller or equal values.",
      "Phase 5 - Build Sorted Array: Process elements from right to left. For each element, use the cumulative counter to know where to place it in the final result.",
      "Phase 6 - Maintain Stability: By processing from right to left and decrementing counters, we ensure equal elements keep their original order.",
      "Phase 7 - Final Result: The output array contains all elements sorted, without ever comparing elements against each other!"
    ]
  }
};
