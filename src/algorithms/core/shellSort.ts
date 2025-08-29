import type { SortStep } from '../../types/algorithm';
import { createSortingAlgorithm } from './templateAlgorithm';
import { shellSortInfo } from '../info/shellSortInfo';

/**
 * Shell Sort implementation that generates visualization steps
 * Uses the simple gap sequence: floor(gap/2) starting from n/2
 */
function shellSortExecute(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Initial state
  steps.push({
    type: 'highlight',
    indices: [],
    array: [...arr],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Starting Shell Sort'
    }
  });

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Mark the beginning of a new gap phase
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...arr],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Gap = ${gap}`
      }
    });

    for (let i = gap; i < n; i += 1) {
      const temp = arr[i];
      let j = i;

      // Highlight the element being inserted for this pass
      steps.push({
        type: 'highlight',
        indices: [i],
        array: [...arr],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Consider element at index ${i} (value ${temp})`
        }
      });

      // Shift earlier gap-sorted elements up until the correct location for temp is found
      while (j >= gap && arr[j - gap] > temp) {
        comparisons++;

        // Show comparison
        steps.push({
          type: 'compare',
          indices: [j - gap, j],
          array: [...arr],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Compare indices ${j - gap} and ${j}`
          }
        });

        // Move element up by gap
        arr[j] = arr[j - gap];
        swaps++;
        steps.push({
          type: 'swap',
          indices: [j, j - gap],
          array: [...arr],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Shifted value from ${j - gap} to ${j}`
          }
        });

        j -= gap;
      }

      // If we broke out because comparison was false and j >= gap, still record that comparison
      if (j >= gap && arr[j - gap] <= temp) {
        comparisons++;
        steps.push({
          type: 'compare',
          indices: [j - gap, j],
          array: [...arr],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Compare indices ${j - gap} and ${j} (no shift needed)`
          }
        });
      }

      // Place temp at its correct position
      arr[j] = temp;
      steps.push({
        type: 'swap',
        indices: [j, i],
        array: [...arr],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Placed value ${temp} at index ${j}`
        }
      });
    }
  }

  // Final: mark all as sorted
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    array: [...arr],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Array is completely sorted'
    }
  });

  return steps;
}

export const shellSort = createSortingAlgorithm(
  shellSortInfo.name,
  shellSortInfo.description,
  shellSortInfo.complexity,
  shellSortExecute
);
