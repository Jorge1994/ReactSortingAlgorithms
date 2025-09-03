import type { AlgorithmInfo } from "../../types/algorithmInfo";

export const bogoSortInfo: AlgorithmInfo = {
  name: "Bogo Sort",
  description: "**Bogo Sort**, also known as **Permutation Sort** or **Stupid Sort**, represents the antithesis of algorithmic efficiency and serves as a humorous example in computer science education. The algorithm works by repeatedly shuffling the array randomly and then checking if it happens to be sorted. If not, it shuffles again, continuing this process until luck produces a sorted array. With an average time complexity of O((n+1)!), **Bogo Sort** is so inefficient that sorting just 10 elements would take over 3.6 million shuffles on average. For larger arrays, the expected runtime becomes astronomical - sorting 13 elements could take longer than the age of the universe. Despite its complete impracticality, **Bogo Sort** teaches important lessons about algorithm analysis, probability, and the importance of deterministic approaches to problem-solving.",
  complexity: {
    time: { best: "O(n)", average: "O((n+1)!)", worst: "Unbounded" },
    space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    justifications: {
      timeComplexity: {
        best: "If the array is already sorted only n-1 comparisons are required to confirm order.",
        average: "Requires checking many permutations; expected number of shuffles grows factorially with n.",
        worst: "No practical upper bound — depends on random shuffles.",
      },
      spaceComplexity: {
        best: "Only small constant extra memory used for counters and swaps.",
        average: "Constant additional space.",
        worst: "Constant additional space.",
      },
    },
  },
  
  stable: false,
  inPlace: true,
  online: false,

  advantages: [
    "Very simple to implement",
    "Useful as a teaching example to contrast with efficient algorithms",
  ],
  disadvantages: [
    "Extremely inefficient",
    "Not suitable for any practical use",
  ],
  useCases: ["Educational demonstrations", "Humorous examples"],
  keyCharacteristics: [
    "Randomized algorithm",
    "Relies on permutations/shuffles",
    "Factorial expected time",
  ],
  visualizationNotes: {
    colors: {
      comparing: "#3B82F6",
      swapping: "#EF4444",
      sorted: "#10B981",
      unsorted: "#6B7280",
    },
    phases: [
      "Initial check: compare adjacent elements to detect if already sorted",
      "Shuffle phase: perform a random permutation of the array",
      "Check phase: compare adjacent elements after each shuffle",
      "Repeat until sorted or a safety cap is reached",
    ],
  },
};
