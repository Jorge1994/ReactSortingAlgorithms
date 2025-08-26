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

    // Show the arrays being merged
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Merging: Left [${L.join(', ')}] with Right [${R.join(', ')}]`
      }
    });

    let i = 0, j = 0;
    let k = left;

    // Merge the temp arrays back into arr[left..right]
    while (i < n1 && j < n2) {
      comparisons++;

      // Show comparison
      steps.push({
        type: 'compare',
        indices: [k],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Comparing ${L[i]} vs ${R[j]} for position ${k}`
        }
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        workingArray[k] = L[i];
        
        steps.push({
          type: 'swap',
          indices: [k],
          array: [...workingArray],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Placed ${L[i]} at position ${k}`
          }
        });
        
        i++;
      } else {
        arr[k] = R[j];
        workingArray[k] = R[j];
        swaps++;
        
        steps.push({
          type: 'swap',
          indices: [k],
          array: [...workingArray],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Placed ${R[j]} at position ${k}`
          }
        });
        
        j++;
      }
      k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
      arr[k] = L[i];
      workingArray[k] = L[i];
      
      steps.push({
        type: 'swap',
        indices: [k],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Copying remaining element ${L[i]} from left subarray`
        }
      });
      
      i++;
      k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
      arr[k] = R[j];
      workingArray[k] = R[j];
      
      steps.push({
        type: 'swap',
        indices: [k],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Copying remaining element ${R[j]} from right subarray`
        }
      });
      
      j++;
      k++;
    }

    // Show completed merge
    steps.push({
      type: 'temp-sorted',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Merge complete: Section [${left}-${right}] is now sorted`
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
