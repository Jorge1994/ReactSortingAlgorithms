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

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays
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

    // Clear the merge area first (create empty spaces)
    for (let pos = left; pos <= right; pos++) {
      workingArray[pos] = -1; // Use -1 as placeholder for empty space
    }

    steps.push({
      type: 'clear-for-merge',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Cleared merge area - preparing to place elements one by one`
      }
    });

    // Now merge with gradual placement
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
      comparisons++;
      
      let selectedValue: number;
      let fromArray: string;
      
      if (L[i] <= R[j]) {
        selectedValue = L[i];
        fromArray = 'left';
        i++;
      } else {
        selectedValue = R[j];
        fromArray = 'right';
        swaps++;
        j++;
      }

      // Place the selected element
      workingArray[k] = selectedValue;
      
      steps.push({
        type: 'move',
        indices: [k],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Placing ${selectedValue} from ${fromArray} array at position ${k}`,
          fromValue: selectedValue,
          toPosition: k
        }
      });

      k++;
    }

    // Place remaining elements from left array
    while (i < n1) {
      workingArray[k] = L[i];
      
      steps.push({
        type: 'move',
        indices: [k],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Placing remaining ${L[i]} from left array at position ${k}`,
          fromValue: L[i],
          toPosition: k
        }
      });
      
      i++;
      k++;
    }

    // Place remaining elements from right array
    while (j < n2) {
      workingArray[k] = R[j];
      
      steps.push({
        type: 'move',
        indices: [k],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Placing remaining ${R[j]} from right array at position ${k}`,
          fromValue: R[j],
          toPosition: k
        }
      });
      
      j++;
      k++;
    }

    // Update the original array
    for (let pos = left; pos <= right; pos++) {
      arr[pos] = workingArray[pos];
    }

    // Show the completed merge result
    steps.push({
      type: 'temp-sorted',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Merge complete for range [${left}-${right}]: section is now sorted`
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