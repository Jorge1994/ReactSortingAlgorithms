import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { pancakeSortInfo } from '../info/pancakeSortInfo';

/**
 * Pancake Sort implementation that generates visualization steps
 * Uses flip operations to bring the maximum element to the front and then to its final position
 */
const pancakeSortSteps = (input: number[]): SortStep[] => {
  const startTime = performance.now();
  const arr = [...input];
  const steps: SortStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  const n = arr.length;

  // helper: reverse arr[0..i]
  function flip(a: number[], i: number) {
    let start = 0;
    while (start < i) {
      // comparison highlight for visualization
      steps.push({
        type: 'compare',
        indices: [start, i],
        array: [...a],
        metadata: { comparisons: ++comparisons, swaps, currentPhase: `Flipping: comparing indices ${start} and ${i}` }
      });

      const tmp = a[start];
      a[start] = a[i];
      a[i] = tmp;
      swaps++;

      steps.push({
        type: 'swap',
        indices: [start, i],
        array: [...a],
        metadata: { comparisons, swaps, currentPhase: `Flipped indices ${start} and ${i}` }
      });

      start++;
      i--;
    }
  }

  function findMax(a: number[], m: number) {
    let mi = 0;
    for (let i = 0; i < m; i++) {
      steps.push({
        type: 'compare',
        indices: [i, mi],
        array: [...a],
        metadata: { comparisons: ++comparisons, swaps, currentPhase: `Searching max in range 0..${m - 1}: comparing ${i} and ${mi}` }
      });

      if (a[i] > a[mi]) {
        mi = i;
      }
    }
    return mi;
  }

  // initial state
  steps.push({ type: 'highlight', indices: [], array: [...arr], metadata: { comparisons, swaps, currentPhase: 'Starting Pancake Sort' } });

  for (let curr_size = n; curr_size > 1; curr_size--) {
    const mi = findMax(arr, curr_size);

    // If max is not at its position, move it
    if (mi !== curr_size - 1) {
      // bring max to front if it's not already at front
      if (mi > 0) {
        flip(arr, mi);
      }

      // bring it to its final position
      flip(arr, curr_size - 1);

      steps.push({
        type: 'highlight',
        indices: [curr_size - 1],
        array: [...arr],
        metadata: { comparisons, swaps, currentPhase: `Placed max at index ${curr_size - 1}` }
      });
    } else {
      // nothing to do for this size, still mark progress
      steps.push({ type: 'highlight', indices: [curr_size - 1], array: [...arr], metadata: { comparisons, swaps, currentPhase: `Max already at index ${curr_size - 1}` } });
    }
  }

  // mark all as sorted
  for (let i = 0; i < n; i++) {
    steps.push({ type: 'set-sorted', indices: [i], array: [...arr], metadata: { comparisons, swaps, currentPhase: `Index ${i} in final position` } });
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  if (steps.length > 0 && steps[steps.length - 1].metadata) {
    steps[steps.length - 1].metadata!.executionTime = executionTime;
  }

  return steps;
};

export const pancakeSortAlgorithm = createSortingAlgorithm(
  pancakeSortInfo.name,
  pancakeSortInfo.description,
  pancakeSortInfo.complexity,
  pancakeSortSteps
);
