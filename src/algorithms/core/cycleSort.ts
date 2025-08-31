import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { cycleSortInfo } from '../info/cycleSortInfo';

/**
 * Cycle Sort implementation that produces SortStep[] for visualization.
 * Based on the provided imperative implementation but instrumented to
 * emit compare/swap/set-sorted/highlight steps and metadata counters.
 */
const cycleSortFunction = (input: number[]): SortStep[] => {
  const startTime = performance.now();
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
    let item = arr[cycle_start];

    // Find position where we put the item. Count smaller elements on right.
    let pos = cycle_start;
    for (let i = cycle_start + 1; i < n; i++) {
      // emit compare for visualization
      steps.push({ type: 'compare', indices: [i, cycle_start], array: [...arr], metadata: { comparisons: ++comparisons, swaps, currentPhase: `Counting position for index ${cycle_start}` } });
      if (arr[i] < item) pos++;
    }

    // If item is already in correct position
    if (pos === cycle_start) continue;

    // ignore duplicates
    while (item === arr[pos]) pos += 1;

    // put the item to its right position (first swap/write)
    if (pos !== cycle_start) {
      const temp = item;
      item = arr[pos];
      arr[pos] = temp;
      swaps++;
      steps.push({ type: 'swap', indices: [pos, cycle_start], array: [...arr], metadata: { comparisons, swaps, currentPhase: `Placed item from ${cycle_start} to ${pos}` } });
    }

    // Rotate rest of the cycle
    while (pos !== cycle_start) {
      pos = cycle_start;

      for (let i = cycle_start + 1; i < n; i++) {
        steps.push({ type: 'compare', indices: [i, cycle_start], array: [...arr], metadata: { comparisons: ++comparisons, swaps, currentPhase: `Finding new position in rotation for index ${cycle_start}` } });
        if (arr[i] < item) pos += 1;
      }

      while (item === arr[pos]) pos += 1;

      if (item !== arr[pos]) {
        const temp = item;
        item = arr[pos];
        arr[pos] = temp;
        swaps++;
        steps.push({ type: 'swap', indices: [pos, cycle_start], array: [...arr], metadata: { comparisons, swaps, currentPhase: `Rotated item into position ${pos}` } });
      }
    }

    // mark the element at cycle_start as sorted (it ended up in its final position)
    steps.push({ type: 'set-sorted', indices: [cycle_start], array: [...arr], metadata: { comparisons, swaps, currentPhase: `Finalized position for index ${cycle_start}` } });
  }

  // Ensure all elements are marked as sorted at the end (emit final steps)
  for (let i = 0; i < n; i++) {
    steps.push({ type: 'set-sorted', indices: [i], array: [...arr], metadata: { comparisons, swaps, currentPhase: 'Array fully sorted' } });
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  if (steps.length > 0) {
    if (!steps[steps.length - 1].metadata) steps[steps.length - 1].metadata = { comparisons, swaps, executionTime };
    else steps[steps.length - 1].metadata!.executionTime = executionTime;
  }

  return steps;
};

export const cycleSort = createSortingAlgorithm(
  cycleSortInfo.name,
  cycleSortInfo.description,
  cycleSortInfo.complexity,
  cycleSortFunction
);
