import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { bubbleSortInfo } from '../info/bubbleSortInfo';

/**
 * Bubble Sort implementation that generates visualization steps
 * Pure algorithm logic separated from theoretical information
 */
const bubbleSortFunction = (arr: number[]): SortStep[] => {
  const startTime = performance.now();
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

  // Ensure the first element is marked as sorted when algorithm completes naturally
  // (not through early termination)
  let firstElementSorted = false;
  
  // Check if first element was already marked in early termination
  for (const step of steps) {
    if (step.type === 'set-sorted' && step.indices.includes(0)) {
      firstElementSorted = true;
      break;
    }
  }
  
  // If first element wasn't marked, mark it now
  if (!firstElementSorted) {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    steps.push({
      type: 'set-sorted',
      indices: [0],
      array: [...array],
      metadata: { 
        comparisons, 
        swaps,
        currentPhase: 'First element in final position',
        executionTime
      }
    });
  } else {
    // Add execution time to the last step if first element was already marked
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    if (steps.length > 0 && steps[steps.length - 1].metadata) {
      steps[steps.length - 1].metadata!.executionTime = executionTime;
    }
  }

  return steps;
};

/**
 * Export the complete Bubble Sort algorithm with separated concerns:
 * - Algorithm logic (this file)
 * - Theoretical information (bubbleSortInfo.ts)
 */
export const bubbleSortAlgorithm = createSortingAlgorithm(
  bubbleSortInfo.name,
  bubbleSortInfo.description,
  bubbleSortInfo.complexity,
  bubbleSortFunction
);
