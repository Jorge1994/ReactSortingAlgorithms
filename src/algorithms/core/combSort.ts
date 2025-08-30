import { createSortingAlgorithm } from './templateAlgorithm';
import type { SortStep } from '../../types';
import { combSortInfo } from '../info/combSortInfo';

function combSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const length = arr.length;
  const shrink = 1.3;
  let gap = length;
  let sorted = false;
  let comparisons = 0;
  let swaps = 0;

  const pushCompare = (i: number, j: number) => {
    comparisons++;
    steps.push({ type: 'compare', indices: [i, j], array: [...arr], metadata: { comparisons, swaps } });
  };

  const pushSwap = (i: number, j: number) => {
    swaps++;
    steps.push({ type: 'swap', indices: [i, j], array: [...arr], metadata: { comparisons, swaps } });
  };

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true; // assume sorted, will unset if any swap occurs
    }

    for (let i = 0; i + gap < length; i++) {
      const j = i + gap;
      pushCompare(i, j);
      if (arr[i] > arr[j]) {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        pushSwap(i, j);
        sorted = false;
      }
    }
  }

  // mark all as sorted
  for (let i = 0; i < length; i++) {
    steps.push({ type: 'set-sorted', indices: [i], array: [...arr], metadata: { comparisons, swaps } });
  }

  return steps;
}

export const combSortAlgorithm = createSortingAlgorithm(
  combSortInfo.name,
  combSortInfo.description,
  combSortInfo.complexity,
  combSortSteps
);
