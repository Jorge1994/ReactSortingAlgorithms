import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { oddEvenSortInfo } from '../info/oddEvenSortInfo.ts';

/**
 * Odd-Even Sort (Brick Sort) implementation that generates visualization steps
 * Alternates between comparing odd-even and even-odd indexed pairs until no swaps occur
 */
const oddEvenSortFunction = (input: number[]): SortStep[] => {
  const startTime = performance.now();
  const arr = [...input];
  const steps: SortStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  let cycle = 0;

  let isSorted = false;
  while (!isSorted) {
    isSorted = true;
    cycle++;

    // Perform Bubble sort on odd indexed element pairs (1,2), (3,4), ...
    for (let i = 1; i <= arr.length - 2; i += 2) {
      steps.push({
        type: 'compare',
        indices: [i, i + 1],
        array: [...arr],
        metadata: {
          comparisons: ++comparisons,
          swaps,
          currentPhase: `Odd pass (cycle ${cycle}): comparing indices ${i} and ${i + 1}`
        }
      });

      if (arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swaps++;
        isSorted = false;

        steps.push({
          type: 'swap',
          indices: [i, i + 1],
          array: [...arr],
          metadata: { comparisons, swaps, currentPhase: `Swapped indices ${i} and ${i + 1} (odd pass)` }
        });
      }
    }

    // Perform Bubble sort on even indexed element pairs (0,1), (2,3), ...
    for (let i = 0; i <= arr.length - 2; i += 2) {
      steps.push({
        type: 'compare',
        indices: [i, i + 1],
        array: [...arr],
        metadata: {
          comparisons: ++comparisons,
          swaps,
          currentPhase: `Even pass (cycle ${cycle}): comparing indices ${i} and ${i + 1}`
        }
      });

      if (arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swaps++;
        isSorted = false;

        steps.push({
          type: 'swap',
          indices: [i, i + 1],
          array: [...arr],
          metadata: { comparisons, swaps, currentPhase: `Swapped indices ${i} and ${i + 1} (even pass)` }
        });
      }
    }

    // Mark end of this full cycle
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...arr],
      metadata: { comparisons, swaps, currentPhase: `Completed cycle ${cycle}` }
    });
  }

  // Final: mark all indices as sorted
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: 'set-sorted',
      indices: [i],
      array: [...arr],
      metadata: { comparisons, swaps, currentPhase: `Index ${i} in final position` }
    });
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  if (steps.length > 0 && steps[steps.length - 1].metadata) {
    steps[steps.length - 1].metadata!.executionTime = executionTime;
  }

  return steps;
};

export const oddEvenSortAlgorithm = createSortingAlgorithm(
  oddEvenSortInfo.name,
  oddEvenSortInfo.description,
  oddEvenSortInfo.complexity,
  oddEvenSortFunction
);
