import type { AlgorithmInfo } from '../../types/algorithmInfo';

/**
 * Theoretical information about Bubble Sort algorithm
 * Separated from implementation to maintain clean architecture
 */
export const bubbleSortInfo: AlgorithmInfo = {
  name: "Bubble Sort",
  description: "Compares adjacent elements and swaps them if they are in the wrong order. Repeats until no swaps are needed.",
  
  complexity: {
    time: {
      best: "O(n)",      // When array is already sorted
      average: "O(n²)",  // Average case
      worst: "O(n²)"     // When array is reverse sorted
    },
    space: "O(1)",        // In-place sorting (constant extra space)
    justifications: {
      timeComplexity: {
        best: "When the array is already sorted, the algorithm only needs one pass through the array (n comparisons) to detect that no swaps are needed, allowing early termination.",
        average: "On average, the algorithm performs n passes, each requiring approximately n/2 comparisons and swaps, resulting in n × n/2 ≈ O(n²) operations.",
        worst: "When the array is sorted in reverse order, every element must be moved to its final position through multiple swaps, requiring n passes with n comparisons each, totaling n² operations."
      },
      spaceComplexity: "The algorithm only uses a constant amount of extra memory for temporary variables (like swap variables and loop counters), regardless of input size."
    }
  },

  stable: true,
  inPlace: true,

  advantages: [
    "Simple to implement and understand",
    "In-place sorting (constant extra space)",
    "Stable sorting algorithm",
    "Adaptive - performs better on nearly sorted arrays",
    "Good for educational purposes"
  ],

  disadvantages: [
    "Quadratic time complexity in worst and average cases",
    "Inefficient for large datasets",
    "More swaps compared to other algorithms",
    "Not suitable for production use with large arrays"
  ],

  useCases: [
    "Educational purposes - teaching sorting concepts",
    "Small datasets (less than 50 elements)",
    "When simplicity is more important than efficiency",
    "As a stepping stone to understand more complex algorithms"
  ],

  keyCharacteristics: [
    "Compares adjacent elements",
    "Largest elements 'bubble' to the end",
    "Multiple passes through the array",
    "Early termination when no swaps occur",
    "Each pass places one element in final position"
  ],

  visualizationNotes: {
    colors: {
      comparing: "Blue bars indicate elements being compared",
      swapping: "Red bars show elements being swapped",
      sorted: "Green bars represent elements in final position",
      unsorted: "Gray bars are unprocessed elements"
    },
    
    phases: [
      "Initial Setup: Start with the unsorted array and begin the first pass from the leftmost position",
      "Adjacent Comparison: Compare each pair of adjacent elements (arr[i] and arr[i+1]) moving from left to right",
      "Conditional Swap: If the left element is greater than the right element, swap them to maintain ascending order",
      "Bubbling Effect: Larger elements gradually 'bubble up' towards the end of the array with each comparison",
      "Pass Completion: After each complete pass, the largest unsorted element reaches its final sorted position",
      "Optimization Check: If no swaps occurred during a pass, the array is sorted and the algorithm terminates early",
      "Iteration Reduction: In subsequent passes, ignore the already sorted elements at the end to improve efficiency"
    ]
  }
};
