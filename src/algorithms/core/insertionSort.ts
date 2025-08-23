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
      currentPhase: 'Starting with first element (trivially sorted portion)' 
    }
  });

  // Start from the second element (index 1)
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Highlight the element being inserted
    steps.push({
      type: 'compare',
      indices: [i],
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Selecting element ${key} to insert into sorted portion` 
      }
    });

    // Move elements greater than key one position ahead
    while (j >= 0) {
      comparisons++;
      
      // Compare current element with key
      steps.push({
        type: 'compare',
        indices: [j, i],
        array: [...arr],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Comparing ${arr[j]} with ${key}` 
        }
      });

      if (arr[j] > key) {
        // Shift element to the right
        arr[j + 1] = arr[j];
        swaps++;
        
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Shifting ${arr[j]} to position ${j + 1}` 
          }
        });
        
        j--;
      } else {
        break;
      }
    }

    // Insert the key at its correct position
    arr[j + 1] = key;
    
    // Show the insertion step
    steps.push({
      type: 'highlight',
      indices: [j + 1],
      array: [...arr],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Inserted ${key} at position ${j + 1}` 
      }
    });
  }

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
