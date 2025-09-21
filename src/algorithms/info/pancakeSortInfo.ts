import type { AlgorithmInfo } from '../../types/algorithmInfo';

/**
 * Theoretical information about Pancake Sort algorithm
 * Separated from implementation to maintain clean architecture
 */
export const pancakeSortInfo: AlgorithmInfo = {
  name: "Pancake Sort",
  description: "**Pancake Sort** is a whimsical sorting algorithm inspired by the problem of sorting a stack of pancakes using only a spatula to flip portions of the stack. The algorithm can only perform 'flip' operations, which reverse the order of elements from the beginning of the array up to a chosen position. To sort the array, **Pancake Sort** repeatedly finds the largest unsorted element, flips the array to bring this element to the front (if it's not already there), then flips again to move it to its correct position at the end of the unsorted portion. While highly inefficient with its quadratic time complexity, **Pancake Sort** serves as an excellent educational tool for understanding algorithmic constraints and creative problem-solving.",
  
  complexity: {
    time: {
      best: "O(n²)",
      average: "O(n²)", 
      worst: "O(n²)"
    },
    space: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)"
    },
    justifications: {
      timeComplexity: {
        best: "Even when the array is already sorted, the algorithm must still check each position and may perform flips to verify sorting, requiring O(n²) operations in the worst case analysis.",
        average: "For each of the n elements, the algorithm may need to perform 2 flips: one to bring the maximum element to position 0, and another to place it in its final position. This results in at most 2(n-1) flips, with each flip operation taking O(n) time, giving O(n²) total complexity.",
        worst: "The worst case occurs when elements need maximum rearrangement. The algorithm performs at most 2n-3 flips (proven upper bound), where each flip requires O(n) time to reverse a prefix, resulting in O(n²) time complexity."
      },
      spaceComplexity: {
        best: "The algorithm operates in-place, using only constant extra memory for variables like current position index and temporary storage during flip operations.",
        average: "Consistently uses O(1) space as pancake sort performs all operations within the original array using only index variables.",
        worst: "Space complexity remains O(1) even in worst case as the flip operation reverses array segments in-place without requiring additional storage proportional to input size."
      }
    }
  },

  stable: false,
  inPlace: true,
  online: false,

  advantages: [
    "Interesting educational algorithm demonstrating prefix reversals",
    "In-place and simple to implement",
    "Demonstrates algorithmic constraints and problem-solving creativity"
  ],

  disadvantages: [
    "Quadratic time complexity makes it impractical for large arrays",
    "Not stable - relative order of equal elements may change",
    "Limited to prefix reversal operations only"
  ],

  useCases: [
    "Educational demonstrations of algorithmic constraints",
    "Theoretical computer science problems involving limited operations",
    "Robotics scenarios where only certain movements are allowed"
  ],

  keyCharacteristics: [
    "Uses only prefix flip operations to sort elements",
    "Finds maximum element and moves it to correct position via flips",
    "At most 2n-3 flips needed to sort any array",
    "In-place but not stable sorting algorithm",
    "Demonstrates creative problem-solving within constraints"
  ],

  visualizationNotes: {
    phases: [
      "Initial Setup: Display the unsorted array and identify the largest unsorted element that needs to be moved to its correct position",
      "Find Maximum: Scan through the unsorted portion to locate the largest element that hasn't been placed in its final position yet",
      "Position Analysis: Determine if the maximum element is already at the front of the unsorted portion or needs to be moved there first",
      "First Flip (if needed): If the maximum element is not at the front, flip the prefix from position 0 to the maximum element's position to bring it to the front",
      "Second Flip: Flip the prefix from position 0 to the target position to place the maximum element in its correct final sorted position",
      "Boundary Update: Reduce the size of the unsorted portion by one element, as the largest element is now correctly positioned",
      "Progress Verification: Show how the sorted region grows from right to left with each pancake flip operation",
      "Optimization Check: Continue the process for the remaining unsorted elements until the entire array is sorted",
      "Final State: Display the completely sorted array with all elements in their correct ascending order positions"
    ]
  }
};
