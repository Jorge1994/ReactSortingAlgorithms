import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

const allowedSizes = [16, 32, 64];

const bitonicSortFunction = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const n = arr.length;

  if (!allowedSizes.includes(n)) {
    // Return a single informative step if the size is invalid for Bitonic Sort
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...arr],
      metadata: {
        comparisons: 0,
        swaps: 0,
        currentPhase: `Bitonic sort requires size ${allowedSizes.join(', ')}. Received ${n}.`
      }
    });
    return steps;
  }

  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  // Implementation adapted from the provided JS routine but producing visualization steps
  for (let k = 2; k <= n; k *= 2) {
    for (let j = Math.floor(k / 2); j > 0; j = Math.floor(j / 2)) {
      for (let i = 0; i < n; i++) {
        const l = i ^ j;
        if (l > i) {
          // Compare step
          steps.push({
            type: 'compare',
            indices: [i, l],
            array: [...array],
            metadata: { comparisons: ++comparisons, swaps, currentPhase: `Comparing indices ${i} and ${l}` }
          });

          const cond1 = ((i & k) === 0) && (array[i] > array[l]);
          const cond2 = ((i & k) !== 0) && (array[i] < array[l]);

          if (cond1 || cond2) {
            // Perform swap and emit swap step
            const temp = array[i];
            array[i] = array[l];
            array[l] = temp;
            swaps++;

            steps.push({
              type: 'swap',
              indices: [i, l],
              array: [...array],
              metadata: { comparisons, swaps, currentPhase: `Swapped indices ${i} and ${l}` }
            });
          }
        }
      }
    }
  }

  // Mark all elements as sorted at the end
  for (let idx = 0; idx < n; idx++) {
    steps.push({
      type: 'set-sorted',
      indices: [idx],
      array: [...array],
      metadata: { comparisons, swaps, currentPhase: `Element ${idx} in final position` }
    });
  }

  return steps;
};

export const bitonicSort = createSortingAlgorithm(
  'Bitonic Sort',
  'Parallel-friendly bitonic sort — only works for array sizes that are powers of two. This implementation supports sizes 16, 32 and 64.',
  {
    time: { best: 'O(n log^2 n)', average: 'O(n log^2 n)', worst: 'O(n log^2 n)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'Bitonic sort performs log n stages each containing O(n log n) compare-exchange operations in this implementation, resulting in O(n log^2 n).',
        average: 'Same as best for this data-oblivious network-based algorithm.',
        worst: 'Same as best; bitonic is data-oblivious and stage-based.'
      },
      spaceComplexity: {
        best: 'Uses constant extra memory (in-place compare-exchange).',
        average: 'Uses constant extra memory (in-place compare-exchange).',
        worst: 'Uses constant extra memory (in-place compare-exchange).'
      }
    }
  },
  bitonicSortFunction
);
