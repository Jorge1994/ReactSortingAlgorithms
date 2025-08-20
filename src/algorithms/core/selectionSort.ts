import { createSortingAlgorithm } from './templateAlgorithm';
import type { SortStep } from '../../types/algorithm';

/**
 * Selection Sort Algorithm Implementation
 * 
 * Selection sort works by finding the minimum element from the unsorted portion
 * and placing it at the beginning. This process continues until the entire array is sorted.
 * 
 * Time Complexity:
 * - Best Case: O(n²) - Even if array is sorted, we still need to check all elements
 * - Average Case: O(n²) - Typical performance
 * - Worst Case: O(n²) - Maximum comparisons needed
 * 
 * Space Complexity: O(1) - Only uses a constant amount of extra space
 */
function* selectionSortGenerator(array: number[]): Generator<SortStep> {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Traverse through all array elements
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the remaining unsorted array
    let minIndex = i;
    
    // Highlight the current position as the initial minimum
    yield {
      type: 'highlight',
      indices: [i],
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Finding minimum in range [${i}, ${n-1}]` 
      }
    };

    // Search for the minimum element in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      // Compare current element with current minimum
      yield {
        type: 'compare',
        indices: [minIndex, j],
        array: [...arr],
        metadata: { 
          comparisons: ++comparisons, 
          swaps, 
          currentPhase: `Comparing ${arr[minIndex]} with ${arr[j]}` 
        }
      };

      // Update minimum index if a smaller element is found
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        
        // Highlight the new minimum
        yield {
          type: 'highlight',
          indices: [minIndex],
          array: [...arr],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `New minimum found: ${arr[minIndex]}` 
          }
        };
      }
    }

    // Swap the found minimum element with the first element (if different)
    if (minIndex !== i) {
      // Show the swap operation
      yield {
        type: 'swap',
        indices: [i, minIndex],
        array: [...arr],
        metadata: { 
          comparisons, 
          swaps: ++swaps, 
          currentPhase: `Swapping ${arr[i]} with ${arr[minIndex]}` 
        }
      };

      // Perform the actual swap
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    // Mark the current position as sorted
    yield {
      type: 'set-sorted',
      indices: [i],
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Position ${i} is now sorted with value ${arr[i]}` 
      }
    };
  }

  // Mark the last element as sorted (it's automatically in the correct position)
  yield {
    type: 'set-sorted',
    indices: [n - 1],
    array: [...arr],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: 'Sorting completed!' 
    }
  };
}

/**
 * Selection Sort Algorithm execution function
 */
const executeSelectionSort = (array: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const generator = selectionSortGenerator(array);
  
  for (const step of generator) {
    steps.push(step);
  }
  
  return steps;
};

/**
 * Selection Sort Algorithm
 * 
 * An in-place comparison sorting algorithm that divides the input list into
 * a sorted and unsorted region, and repeatedly selects the smallest element
 * from the unsorted region to place at the end of the sorted region.
 */
export const selectionSortAlgorithm = createSortingAlgorithm(
  'Selection Sort',
  'An in-place comparison sorting algorithm that repeatedly selects the smallest element from the unsorted region and places it at the beginning.',
  {
    time: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    space: 'O(1)'
  },
  executeSelectionSort
);
