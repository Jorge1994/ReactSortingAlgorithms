import { createSortingAlgorithm } from './templateAlgorithm';
import type { SortStep } from '../../types';

function quickSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  const pushStep = (type: SortStep['type'], indices: number[], metadata?: Partial<SortStep['metadata']>) => {
    steps.push({
      type,
      indices: [...indices],
      array: [...arr],
      metadata: {
        comparisons,
        swaps,
        ...(metadata || {})
      }
    });
  };

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    // highlight pivot
    pushStep('highlight', [high], { currentPhase: 'pivot' });

    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      comparisons++;
      pushStep('compare', [j, high], { currentPhase: 'compare-with-pivot' });
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          // perform swap through helper to keep steps consistent
          swapIndices(i, j);
        }
      }
    }
    // place pivot at correct position
    if (i + 1 !== high) {
      swapIndices(i + 1, high);
    }

    // pivot is in final position
    pushStep('set-sorted', [i + 1], { currentPhase: 'pivot-placed' });
    return i + 1;
  };

  const swapIndices = (a: number, b: number) => {
    swaps++;
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
    pushStep('swap', [a, b]);
  };

  const quick = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quick(low, pi - 1);
      quick(pi + 1, high);
    } else if (low === high) {
      // single element - mark as sorted
      pushStep('set-sorted', [low], { currentPhase: 'single-element' });
    }
  };

  if (arr.length > 0) {
    quick(0, arr.length - 1);
  }

  // final pass to ensure all elements marked as sorted
  pushStep('set-sorted', arr.map((_, idx) => idx), { currentPhase: 'complete' });

  return steps;
}

export const quickSortAlgorithm = createSortingAlgorithm(
  'Quick Sort',
  'In-place quick sort using Lomuto partition scheme. Suitable for visualization with comparisons and swaps, marking pivots and final positions.',
  {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
    space: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)'
    },
    justifications: {
      timeComplexity: {
        best: 'Balanced partitions give n log n behavior because each level of recursion processes all n elements and there are log n levels.',
        average: 'Random data typically yields balanced partitions on average, producing n log n comparisons/swaps.',
        worst: 'Already sorted or adversarial pivots produce O(n^2) when partitions are maximally unbalanced.'
      },
      spaceComplexity: {
        best: 'Recursion stack depth in best case is O(log n) due to balanced partitions.',
        average: 'Average case maintains O(log n) stack depth for most random inputs.',
        worst: 'Worst-case O(n) occurs for highly unbalanced partitions when poor pivot selection creates deep recursion.'
      }
    }
  },
  quickSortSteps
);
