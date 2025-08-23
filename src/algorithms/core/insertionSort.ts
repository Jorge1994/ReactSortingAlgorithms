import type { SortStep } from '../../types/algorithm';
import { createSortingAlgorithm } from './templateAlgorithm';

/**
 * Insertion Sort Algorithm Implementation
 * 
 * Insertion sort builds the final sorted array one item at a time.
 * It works by taking elements from the unsorted portion and inserting
 * them into their correct position in the sorted portion.
 */
function insertionSortExecute(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  // Add initial state
  steps.push({
    type: 'highlight',
    indices: [0],
    array: [...arr],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: 'Starting: first element forms initial sorted portion' 
    }
  });

  // Main insertion sort loop - same logic but with swaps instead of shifts
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Highlight the key element
    steps.push({
      type: 'highlight',
      indices: [i],
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Key = ${key} (element to be inserted)` 
      }
    });

    // Move elements greater than key one position ahead using swaps
    while (j >= 0 && arr[j] > key) {
      comparisons++;
      
      // Show comparison
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Compare: ${arr[j]} > ${arr[j + 1]}? Yes, swap them` 
        }
      });

      // Swap elements instead of shifting (this avoids duplicates!)
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      swaps++;
      
      // Show the swap
      steps.push({
        type: 'swap',
        indices: [j, j + 1],
        array: [...arr],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Swapped ${arr[j + 1]} with ${arr[j]}` 
        }
      });
      
      j = j - 1;
    }

    // If we stopped because arr[j] <= arr[j+1], show that comparison
    if (j >= 0) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Compare: ${arr[j]} > ${arr[j + 1]}? No, ${key} is in correct position` 
        }
      });
    }

    // Show the element in its final position
    steps.push({
      type: 'highlight',
      indices: [j + 1],
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `${key} is now in correct position ${j + 1}` 
      }
    });

    // Show the expanded sorted portion
    const sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);
    steps.push({
      type: 'highlight',
      indices: sortedIndices,
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Elements 0-${i} are sorted relative to each other` 
      }
    });
  }

  // Final step: Mark entire array as completely sorted
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    array: [...arr],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: 'Array is completely sorted!' 
    }
  });

  // Mark entire array as sorted
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    array: [...arr],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: 'Array is completely sorted' 
    }
  });

  return steps;
}

export const insertionSort = createSortingAlgorithm(
  'Insertion Sort',
  'Builds the final sorted array one item at a time by inserting each element into its correct position in the sorted portion',
  {
    time: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    space: 'O(1)',
    justifications: {
      timeComplexity: {
        best: 'When the array is already sorted, only one comparison is made for each element (n-1 comparisons total) as no shifting is needed',
        average: 'On average, each element needs to be compared with half of the preceding elements, resulting in approximately n²/4 comparisons',
        worst: 'When the array is sorted in reverse order, each element must be compared with all preceding elements, resulting in n(n-1)/2 comparisons'
      },
      spaceComplexity: 'Uses only a constant amount of extra space for variables (key, i, j) regardless of input size, making it an in-place sorting algorithm'
    }
  },
  insertionSortExecute
);
