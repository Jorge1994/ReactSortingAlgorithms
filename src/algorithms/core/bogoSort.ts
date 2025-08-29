import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { bogoSortInfo } from '../info/bogoSortInfo';

/**
 * Fisher-Yates shuffle that records swap steps for visualization
 */
function fisherYatesShuffle(arr: number[], steps: SortStep[], swapsRef: { v: number }) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i !== j) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
      swapsRef.v++;
      steps.push({
        type: 'swap',
        indices: [i, j],
        array: [...arr],
        metadata: { comparisons: 0, swaps: swapsRef.v, currentPhase: `shuffle-swap-${swapsRef.v}` }
      });
    }
  }
}

const bogoSortFunction = (arr: number[]): SortStep[] => {
  const startTime = performance.now();
  const steps: SortStep[] = [];
  const array = [...arr];
  let comparisons = 0;
  const swapsRef = { v: 0 };

  const maxAttempts = 10000; // safety cap to avoid infinite loops in UI
  let attempts = 0;

  const isSortedWithSteps = (a: number[]) => {
    for (let i = 1; i < a.length; i++) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [i - 1, i],
        array: [...a],
        metadata: { comparisons, swaps: swapsRef.v, currentPhase: `check-${i - 1}-${i}` }
      });
      if (a[i - 1] > a[i]) return false;
    }
    return true;
  };

  // initial check
  if (isSortedWithSteps(array)) {
    steps.push({ type: 'set-sorted', indices: array.map((_, i) => i), array: [...array], metadata: { comparisons, swaps: swapsRef.v } });
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    if (steps.length > 0 && steps[steps.length - 1].metadata) {
      steps[steps.length - 1].metadata!.executionTime = executionTime;
    }
    return steps;
  }

  while (!isSortedWithSteps(array) && attempts < maxAttempts) {
    attempts++;
    fisherYatesShuffle(array, steps, swapsRef);
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...array],
      metadata: { comparisons, swaps: swapsRef.v, currentPhase: `shuffle-attempt-${attempts}` }
    });
  }

  if (isSortedWithSteps(array)) {
    steps.push({ type: 'set-sorted', indices: array.map((_, i) => i), array: [...array], metadata: { comparisons, swaps: swapsRef.v, executionTime: attempts } });
  } else {
    steps.push({ type: 'highlight', indices: [], array: [...array], metadata: { comparisons, swaps: swapsRef.v, currentPhase: 'stopped-max-attempts' } });
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  if (steps.length > 0 && steps[steps.length - 1].metadata) {
    steps[steps.length - 1].metadata!.executionTime = executionTime;
  }

  return steps;
};

export const bogoSortAlgorithm = createSortingAlgorithm(
  bogoSortInfo.name,
  bogoSortInfo.description,
  bogoSortInfo.complexity,
  bogoSortFunction
);
