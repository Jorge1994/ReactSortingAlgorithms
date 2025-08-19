import type { SortStep, AlgorithmComplexity } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

/**
 * Bubble Sort implementation that generates visualization steps
 */
const bubbleSortFunction = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr]; // Copy to avoid mutation
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < array.length - i - 1; j++) {
      // Step: Compare two elements
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...array],
        metadata: { 
          comparisons: ++comparisons, 
          swaps,
          currentPhase: `Pass ${i + 1}: Comparing elements ${j} and ${j + 1}`
        }
      });

      if (array[j] > array[j + 1]) {
        // Step: Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...array],
          metadata: { 
            comparisons, 
            swaps: ++swaps,
            currentPhase: `Swapping ${array[j + 1]} and ${array[j]}`
          }
        });
      }
    }

    // Step: Mark the last element as sorted
    steps.push({
      type: 'set-sorted',
      indices: [array.length - i - 1],
      array: [...array],
      metadata: { 
        comparisons, 
        swaps,
        currentPhase: `Element ${array[array.length - i - 1]} in final position`
      }
    });

    // Early termination if no swaps occurred
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < array.length - i - 1; k++) {
        steps.push({
          type: 'set-sorted',
          indices: [k],
          array: [...array],
          metadata: { 
            comparisons, 
            swaps,
            currentPhase: 'Array already sorted - finishing'
          }
        });
      }
      break;
    }
  }

  return steps;
};

const complexity: AlgorithmComplexity = {
  time: {
    best: "O(n)",      // When array is already sorted
    average: "O(n²)",  // Average case
    worst: "O(n²)"     // When array is reverse sorted
  },
  space: "O(1)"        // In-place sorting (constant extra space)
};

export const bubbleSortAlgorithm = createSortingAlgorithm(
  "Bubble Sort",
  "Compares adjacent elements and swaps them if they are in the wrong order. Repeats until no swaps are needed.",
  complexity,
  bubbleSortFunction
);
