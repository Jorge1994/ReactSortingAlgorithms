import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

/**
 * Gnome Sort implementation generating visualization steps.
 * Pure algorithm (no React) and compatible with the project's SortStep model.
 */
const gnomeSortFunction = (arr: number[]): SortStep[] => {
  const start = performance.now();
  const array = [...arr];
  const steps: SortStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  let index = 0;
  const n = array.length;

  while (index < n) {
    // If at start, advance
    if (index === 0) {
      index = 1; // follow the provided algorithm: set to 1 then continue
      continue;
    }

    // Compare array[index] with array[index - 1]
    steps.push({
      type: 'compare',
      indices: [index - 1, index],
      array: [...array],
      metadata: { comparisons: ++comparisons, swaps, currentPhase: `Comparing positions ${index - 1} and ${index}` }
    });

    if (array[index] >= array[index - 1]) {
      // In order, advance
      index += 1;
      steps.push({
        type: 'highlight',
        indices: [index - 1],
        array: [...array],
        metadata: { comparisons, swaps, currentPhase: `Elements at ${index - 2}..${index - 1} in order, advancing` }
      });
    } else {
      // Swap and step back
      const i = index;
      const j = index - 1;
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      swaps += 1;

      steps.push({
        type: 'swap',
        indices: [j, i],
        array: [...array],
        metadata: { comparisons, swaps, currentPhase: `Swapped positions ${j} and ${i}` }
      });

      index -= 1;
    }
  }

  // Mark all elements as sorted at the end
  for (let i = 0; i < array.length; i++) {
    steps.push({
      type: 'set-sorted',
      indices: [i],
      array: [...array],
      metadata: { comparisons, swaps, currentPhase: `Finalized element at index ${i}` }
    });
  }

  const end = performance.now();
  const executionTime = end - start;
  if (steps.length > 0 && steps[steps.length - 1].metadata) {
    steps[steps.length - 1].metadata!.executionTime = executionTime;
  }

  return steps;
};

export const gnomeSortAlgorithm = createSortingAlgorithm(
  'Gnome Sort',
  'Gnome Sort is a simple, intuitive sorting algorithm similar to insertion sort but using swaps to move elements to their correct position by stepping backwards when necessary.',
  {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    justifications: {
      timeComplexity: {
        best: 'Occurs when the array is already sorted; the algorithm makes a single pass and performs only O(n) comparisons with no swaps.',
        average: 'On average elements move backwards multiple times via swaps; behaviour resembles insertion sort and results in O(n²) operations.',
        worst: 'When the array is reverse sorted, every element must be swapped many times to reach its final position, producing O(n²) time.'
      },
      spaceComplexity: 'Only a constant number of extra variables are used (indices and counters), so auxiliary space is O(1).'
    }
  },
  gnomeSortFunction
);
