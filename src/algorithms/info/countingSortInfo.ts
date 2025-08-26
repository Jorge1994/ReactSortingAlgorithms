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
      "Phase 1 - Range Discovery: Find the minimum and maximum values in the input array to determine the range of values that need to be counted",
      "Phase 2 - Count Array Initialization: Create a count array of size (max - min + 1) initialized to zeros, where each index represents a value in the range",
      "Phase 3 - Counting Phase: Iterate through the input array and increment the count for each value encountered, building a frequency histogram",
      "Phase 4 - Cumulative Count Calculation: Transform the count array into a cumulative count array where count[i] represents the number of elements ≤ (min + i)",
      "Phase 5 - Output Array Construction: Process input elements from right to left to maintain stability, placing each element at its calculated position in the output array",
      "Phase 6 - Position Calculation: For each element, use its count array value to determine its final position, then decrement the count for subsequent identical elements",
      "Phase 7 - Stability Preservation: By processing from right to left and decrementing counts, ensure that equal elements maintain their original relative order",
      "Phase 8 - Array Copy Back: Copy the sorted elements from the output array back to the original array to complete the sorting process"
    ]
  }
};
