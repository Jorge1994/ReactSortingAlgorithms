import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
// Note: info object is kept in ../info/cocktailSortInfo.ts for documentation and UI.
// Inline the required fields here to avoid a circular/module resolution issue during compilation.
const cocktailInfoInline = {
  name: 'Cocktail Shaker Sort',
  description:
    'A bidirectional variation of Bubble Sort that passes through the list in both directions alternately to move large elements to the end and small elements to the beginning in each full iteration.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best:
          'When the array is already sorted, the algorithm performs one forward and optionally one backward pass detecting no swaps, allowing early termination in linear time.',
        average:
          'On average, the algorithm performs about n/2 forward and backward comparisons per pass leading to O(n²) behavior similar to Bubble Sort.',
        worst:
          'In the worst case (reverse-sorted), elements must move many positions, requiring roughly n² comparisons and swaps across passes.'
      },
      spaceComplexity: {
        best: 'In-place algorithm using only a few index variables and counters.',
        average: 'No additional arrays or allocations required beyond constant temporaries.',
        worst: 'Remains O(1) as it sorts the array in place.'
      }
    }
  }
} as const;

/**
 * Cocktail Shaker Sort (bidirectional bubble sort) implementation that generates visualization steps
 */
const cocktailSortFunction = (arr: number[]): SortStep[] => {
  const startTime = performance.now();
  const steps: SortStep[] = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    let swapped = false;

    // Forward pass: bubble up the largest element to the right
    for (let j = left; j < right; j++) {
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...array],
        metadata: { comparisons: ++comparisons, swaps, currentPhase: `Forward pass: comparing ${j} and ${j + 1}` }
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...array],
          metadata: { comparisons, swaps: ++swaps, currentPhase: `Swapped indices ${j} and ${j + 1}` }
        });
      }
    }

    // Mark the rightmost element as sorted after forward pass
    steps.push({ type: 'set-sorted', indices: [right], array: [...array], metadata: { comparisons, swaps, currentPhase: `Element at index ${right} is in final position` } });
    right--;

    if (!swapped) {
      // If no swaps in forward pass, mark remaining as sorted and finish
      for (let k = left; k <= right; k++) {
        steps.push({ type: 'set-sorted', indices: [k], array: [...array], metadata: { comparisons, swaps, currentPhase: 'Array sorted (early termination after forward pass)' } });
      }
      break;
    }

    swapped = false;

    // Backward pass: bubble down the smallest element to the left
    for (let j = right; j > left; j--) {
      steps.push({
        type: 'compare',
        indices: [j - 1, j],
        array: [...array],
        metadata: { comparisons: ++comparisons, swaps, currentPhase: `Backward pass: comparing ${j - 1} and ${j}` }
      });

      if (array[j - 1] > array[j]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        swapped = true;
        steps.push({
          type: 'swap',
          indices: [j - 1, j],
          array: [...array],
          metadata: { comparisons, swaps: ++swaps, currentPhase: `Swapped indices ${j - 1} and ${j}` }
        });
      }
    }

    // Mark the leftmost element as sorted after backward pass
    steps.push({ type: 'set-sorted', indices: [left], array: [...array], metadata: { comparisons, swaps, currentPhase: `Element at index ${left} is in final position` } });
    left++;

    if (!swapped) {
      // If no swaps in backward pass, mark remaining as sorted and finish
      for (let k = left; k <= right; k++) {
        steps.push({ type: 'set-sorted', indices: [k], array: [...array], metadata: { comparisons, swaps, currentPhase: 'Array sorted (early termination after backward pass)' } });
      }
      break;
    }
  }

  // Ensure any unmarked positions are set as sorted and append execution time
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  if (steps.length === 0) {
    // Empty or single-element array - mark if needed
    if (array.length > 0) {
      steps.push({ type: 'set-sorted', indices: [0], array: [...array], metadata: { comparisons, swaps, currentPhase: 'Single element or empty array', executionTime } });
    }
  } else {
    if (steps[steps.length - 1].metadata) {
      steps[steps.length - 1].metadata!.executionTime = executionTime;
    }
  }

  return steps;
};

export const cocktailSortAlgorithm = createSortingAlgorithm(
  cocktailInfoInline.name,
  cocktailInfoInline.description,
  cocktailInfoInline.complexity,
  cocktailSortFunction
);
