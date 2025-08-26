import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

/**
 * Merge Sort implementation with careful visualization steps
 * Time Complexity: O(n log n) for all cases
 * Space Complexity: O(n) for temporary arrays
 * Stable: Yes, maintains relative order of equal elements
 * In-place: No, requires additional memory for merging
 */

function mergeSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;
  let swaps = 0;

  // Add initial state
  steps.push({
    type: 'highlight',
    indices: [],
    array: [...workingArray],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Initial array - starting divide and conquer approach'
    }
  });

  function mergeSort(arr: number[], left: number, right: number): void {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);

    // Show division phase
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Dividing: Splitting array from index ${left} to ${right} at position ${mid}`
      }
    });

    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  function merge(arr: number[], left: number, mid: number, right: number): void {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays - exactly like the classic implementation
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }

    // Show the arrays being merged (before state)
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `About to merge: Left [${L.join(', ')}] with Right [${R.join(', ')}]`
      }
    });

    // Create the merged sequence without modifying the original positions
    const mergedSequence = [];
    let i = 0, j = 0;

    // Build the merged sequence
    while (i < n1 && j < n2) {
      comparisons++;
      
      if (L[i] <= R[j]) {
        mergedSequence.push(L[i]);
        i++;
      } else {
        mergedSequence.push(R[j]);
        swaps++;
        j++;
      }
    }

    // Add remaining elements
    while (i < n1) {
      mergedSequence.push(L[i]);
      i++;
    }
    while (j < n2) {
      mergedSequence.push(R[j]);
      j++;
    }

    // Now update ALL positions at once - atomic operation
    for (let pos = 0; pos < mergedSequence.length; pos++) {
      arr[left + pos] = mergedSequence[pos];
      workingArray[left + pos] = mergedSequence[pos];
    }

    // Show the completed merge result
    steps.push({
      type: 'temp-sorted',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Merge complete: [${L.join(', ')}] + [${R.join(', ')}] → [${mergedSequence.join(', ')}]`
      }
    });
  }

  // Start the merge sort process
  mergeSort(workingArray, 0, array.length - 1);

  // Final step - mark entire array as sorted
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: array.length }, (_, i) => i),
    array: [...workingArray],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Merge Sort complete - entire array is sorted'
    }
  });

  return steps;
}

export const mergeSort = createSortingAlgorithm(
  'Merge Sort',
  'A divide-and-conquer algorithm that recursively divides the array into halves, sorts them separately, and then merges them back together in sorted order.',
  {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    space: 'O(n)',
    justifications: {
      timeComplexity: {
        best: 'The array is always divided into log n levels, and each level requires O(n) operations to merge, regardless of initial order',
        average: 'Consistently divides the problem into halves (log n levels) with O(n) merge operations at each level',
        worst: 'Even with reverse-sorted input, the divide-and-conquer approach maintains O(n log n) due to balanced splitting and linear merging'
      },
      spaceComplexity: 'Requires O(n) additional space for temporary arrays during the merge process, plus O(log n) space for the recursion stack'
    }
  },
  mergeSortSteps
);