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
    space: "O(1)"        // In-place sorting (constant extra space)
  },

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
      "Multiple passes through the array",
      "Each pass compares adjacent elements",
      "Larger elements move towards the end",
      "Final element is sorted after each pass",
      "Algorithm stops when no swaps occur"
    ]
  }
};
