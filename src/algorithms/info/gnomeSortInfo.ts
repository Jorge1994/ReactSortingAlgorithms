import type { AlgorithmInfo } from "../../types/algorithmInfo";

export const gnomeSortInfo: AlgorithmInfo = {
  name: "Gnome Sort",
  description: "Gnome Sort, also known as Stupid Sort, is a delightfully simple sorting algorithm that mimics the way a garden gnome might sort a line of flower pots. The algorithm works by moving forward through the array, and whenever it encounters two adjacent elements that are out of order, it swaps them and steps backward to check if the newly placed element needs to be moved further back. This process continues until the element finds its correct position, at which point the algorithm resumes moving forward. While Gnome Sort has the same time complexity as Bubble Sort, its straightforward logic makes it one of the easiest sorting algorithms to understand and implement. The algorithm is adaptive, performing significantly better on partially sorted data, and maintains stability throughout the sorting process.",
  stable: true,
  inPlace: true,
  online: false,
  memoryUsage: "This is an in-place algorithm. So O(1) auxiliary space is needed.",
  complexity: {
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    justifications: {
      timeComplexity: {
        best: "Occurs when the array is already sorted; the algorithm makes a single pass and performs only O(n) comparisons with no swaps.",
        average: "On average elements move backwards multiple times via swaps; behaviour resembles insertion sort and results in O(n²) operations.",
        worst: "When the array is reverse sorted, every element must be swapped many times to reach its final position, producing O(n²) time.",
      },
      spaceComplexity: {
        best: "Only a constant number of extra variables are used (indices and counters), so auxiliary space is O(1).",
        average: "Consistent O(1) space usage as no additional data structures are required.",
        worst: "Even in worst case scenarios, space complexity remains O(1) as the algorithm maintains its in-place approach.",
      },
    },
  },
  advantages: [
    "Simple to implement and understand",
    "In-place and stable",
    "Good for small or nearly-sorted datasets",
    "Adaptive - performs better on already or partially sorted arrays",
    "Uses only swaps and comparisons - easy to visualize for educational purposes",
  ],
  disadvantages: [
    "Quadratic time complexity on average and worst cases",
    "Inefficient for large datasets compared to O(n log n) algorithms",
  ],
  useCases: [
    "Educational demonstrations and visualization",
    "Small arrays or mostly-sorted data where simplicity matters",
  ],
  keyCharacteristics: [
    "Works like a garden gnome sorting flowers: steps forward when order is correct, steps back and swaps when it is not",
    "Stable and in-place",
    "Similar behaviour to insertion sort but implemented with swaps and index movement",
  ],
  visualizationNotes: {
    colors: {
      comparing: "#3B82F6",
      swapping: "#EF4444",
      sorted: "#10B981",
      unsorted: "#6B7280",
    },
    phases: [
      "Start: Begin at index 0 (the algorithm advances to index 1 immediately) and compare with the previous element as needed",
      "Advance: If the pair is in order, move one step to the right",
      "Swap & Retreat: If the pair is out of order, swap them and move one step left to re-check",
      "Repeat: Continue until the end is reached and all elements are in place",
      "Finalize: Mark elements as sorted",
    ],
  },
};
