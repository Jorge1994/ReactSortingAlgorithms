import type { AlgorithmInfo } from '../../types';

export const radixSortInfo: AlgorithmInfo = {
  name: 'Radix Sort',
  description: '**Radix Sort** is a sophisticated non-comparison sorting algorithm that sorts integers by processing their digits from least significant to most significant. Unlike comparison-based algorithms, **Radix Sort** achieves linear time complexity by exploiting the structure of numbers themselves. The algorithm works by repeatedly sorting the entire array based on each digit position, using a stable sorting algorithm (typically **Counting Sort**) as a subroutine. Starting with the least significant digit, it ensures that after processing all digits, elements are completely sorted. The key insight is that numbers with more digits are inherently larger, and among numbers with the same number of digits, lexicographic ordering by digits produces numerical ordering. This makes **Radix Sort** particularly effective for sorting large datasets of integers or fixed-length strings, representing a significant departure from traditional comparison-based approaches.',
  stable: true,
  inPlace: false,
  online: false,
  complexity: {
    time: { best: 'O(d×n)', average: 'O(d×n)', worst: 'O(d×n)' },
    space: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)' },
    justifications: {
      timeComplexity: {
        best: "Always processes d digits with n elements, where d is the number of digits in the maximum number. Each digit requires O(n) time.",
        average: "Consistently O(d×n) regardless of input distribution. Each of the d digits requires one pass through n elements.",
        worst: "Maximum digits d times n elements gives O(d×n) complexity. Performance is independent of data distribution."
      },
      spaceComplexity: {
        best: "Requires auxiliary space for the output array (n elements) and counting array (k=10 for decimal radix), giving O(n+k) space complexity.",
        average: "Consistently O(n+k) auxiliary space for bucket storage and element redistribution regardless of input.",
        worst: "O(n+k) auxiliary space where n is array size and k=10 for decimal radix, independent of data distribution."
      }
    }
  },
  advantages: [
    'Linear time complexity O(d×n) for integers with fixed number of digits',
    'Stable sorting algorithm - maintains relative order of equal elements',
    'Not based on comparisons - can be faster than comparison-based algorithms',
    'Predictable performance - always O(d×n) regardless of input distribution',
    'Can be parallelized effectively for large datasets',
    'Works well with other data types that can be represented as integers'
  ],
  disadvantages: [
    'Only works with integers or data that can be mapped to integers',
    'Requires additional memory space O(n+k) for auxiliary arrays',
    'Performance depends on the number of digits (d) in the largest number',
    'Can be slower than comparison-based algorithms for small datasets',
    'Not an in-place sorting algorithm',
    'Implementation complexity is higher than simple comparison-based sorts'
  ],
  useCases: [
    'Sorting large datasets of integers where d is small relative to n',
    'When stable sorting is required for records with integer keys',
    'Sorting strings of fixed length (treating each character as a digit)',
    'Database indexing and external sorting operations',
    'Sorting IP addresses, postal codes, or other structured numeric data',
    'When comparison operations are expensive or not well-defined'
  ],
  keyCharacteristics: [
    'Non-comparative: Does not compare elements directly',
    'Stable: Preserves relative order of equal elements',
    'Digit-by-digit processing: Sorts from least to most significant digit',
    'Uses counting sort: Employs counting sort as a stable subroutine',
    'Linear in optimal conditions: O(d×n) where d is typically small',
    'Space complexity: Requires O(n+k) additional space'
  ],
  visualizationNotes: {
    colors: { 
      comparing: '#3B82F6',    // Blue - for elements being analyzed
      swapping: '#EF4444',     // Red - for elements being moved/placed
      sorted: '#10B981',       // Green - for elements in auxiliary/final positions
      unsorted: '#6B7280'      // Gray - for unprocessed elements
    },
    phases: [
      "Phase 1 - Digit Analysis: Each element is examined to extract the current digit (units, tens, hundreds, etc.). The digit determines which 'bucket' the element belongs to.",
      
      "Phase 2 - Counting: Count how many elements have each digit value (0-9). This creates a frequency distribution showing how many elements will go into each bucket.",
      
      "Phase 3 - Cumulative Positioning: Transform the count array into cumulative positions. This tells us where each group of elements with the same digit should be placed in the auxiliary array.",
      
      "Phase 4 - Stable Placement: Place elements into the auxiliary array using the calculated positions. Process from right to left to maintain stability (equal elements keep their relative order).",
      
      "Phase 5 - Array Transfer: Copy all elements from the auxiliary array back to the main array. The auxiliary array becomes empty and ready for the next digit pass.",
      
      "Phase 6 - Next Digit: Move to the next more significant digit (units → tens → hundreds). Repeat the entire process until all digits have been processed.",
      
      "Phase 7 - Completion Check: After processing all d digits (where d is the number of digits in the largest number), the array is completely sorted.",
      
      "Educational Insight: Unlike comparison-based algorithms, Radix Sort never compares two elements directly. Instead, it uses the mathematical property that sorting by less significant digits first, then more significant digits, results in a fully sorted array.",
      
      "Stability Demonstration: When elements have the same digit value, they maintain their relative order from the previous pass, which is crucial for the algorithm's correctness.",
      
      "Memory Usage Pattern: The auxiliary array and count array represent the O(n+k) space complexity, where n is the array size and k=10 for decimal digits.",
      
      "Performance Insight: Each pass takes O(n) time, and with d digits total, the algorithm achieves O(d×n) complexity. When d is small (constant), this approaches linear time."
    ]
  }
};
