import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { stoogeSortInfo } from '../info/stoogeSortInfo';

/**
 * Stooge Sort implementation producing visualization steps.
 * Pure algorithm logic; does not depend on React/UI.
 */
const stoogeSortFunction = (arr: number[]): SortStep[] => {
  const startTime = performance.now();
  const steps: SortStep[] = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  const compareAndMaybeSwap = (i: number, j: number, phase: string) => {
    // Compare step
    steps.push({
      type: 'compare',
      indices: [i, j],
      array: [...array],
      metadata: { comparisons: ++comparisons, swaps, currentPhase: phase }
    });

    if (array[i] > array[j]) {
      // Swap and record
      const tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      steps.push({
        type: 'swap',
        indices: [i, j],
        array: [...array],
        metadata: { comparisons, swaps: ++swaps, currentPhase: `swap-${i}-${j}` }
      });
    }
  };

  const stooge = (l: number, r: number) => {
    const phase = `stooge(${l},${r})`;
    compareAndMaybeSwap(l, r, phase);

    if (r - l + 1 > 2) {
      const t = Math.floor((r - l + 1) / 3);

      // First 2/3
      steps.push({ type: 'highlight', indices: [l, r - t], array: [...array], metadata: { comparisons, swaps, currentPhase: `${phase}: first-2/3` } });
      stooge(l, r - t);

      // Last 2/3
      steps.push({ type: 'highlight', indices: [l + t, r], array: [...array], metadata: { comparisons, swaps, currentPhase: `${phase}: last-2/3` } });
      stooge(l + t, r);

      // First 2/3 again
      steps.push({ type: 'highlight', indices: [l, r - t], array: [...array], metadata: { comparisons, swaps, currentPhase: `${phase}: first-2/3-repeat` } });
      stooge(l, r - t);
    }
  };

  // Edge cases: empty or single-element arrays
  if (array.length <= 1) {
    steps.push({ type: 'set-sorted', indices: array.map((_, i) => i), array: [...array], metadata: { comparisons, swaps } });
    const endTime = performance.now();
    if (steps.length > 0 && steps[steps.length - 1].metadata) {
      steps[steps.length - 1].metadata!.executionTime = endTime - startTime;
    }
    return steps;
  }

  stooge(0, array.length - 1);

  // Mark all indices as sorted at the end
  steps.push({ type: 'set-sorted', indices: array.map((_, i) => i), array: [...array], metadata: { comparisons, swaps } });

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  if (steps.length > 0 && steps[steps.length - 1].metadata) {
    steps[steps.length - 1].metadata!.executionTime = executionTime;
  }

  return steps;
};

export const stoogeSortAlgorithm = createSortingAlgorithm(
  stoogeSortInfo.name,
  stoogeSortInfo.description,
  stoogeSortInfo.complexity,
  stoogeSortFunction
);
