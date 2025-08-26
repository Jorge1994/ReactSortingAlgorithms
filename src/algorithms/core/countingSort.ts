import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

function countingSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const originalArray = [...array]; // Keep original unchanged
  const comparisons = 0;
  const swaps = 0;
  
  if (array.length === 0) return steps;

  // Find the maximum element to determine the range
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;

  // Initialize count array
  const countArray = new Array(range).fill(0);
  const outputArray = new Array(array.length);

  // Phase 1: Count occurrences of each element
  steps.push({
    type: 'counting-phase',
    indices: [],
    array: [...originalArray], // Keep original unchanged
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Initializing count array and finding range',
      countArray: [...countArray],
      outputArray: [...outputArray]
    }
  });

  // Count each element
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const countIndex = value - min;
    countArray[countIndex]++;
    
    steps.push({
      type: 'count-increment',
      indices: [i],
      array: [...originalArray], // Keep original unchanged
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Counting element ${value} at position ${i}`,
        countArray: [...countArray],
        outputArray: [...outputArray],
        currentValue: value,
        countIndex
      }
    });
  }

  // Phase 2: Transform count array to cumulative sum
  steps.push({
    type: 'counting-phase',
    indices: [],
    array: [...originalArray], // Keep original unchanged
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Converting to cumulative count array',
      countArray: [...countArray],
      outputArray: [...outputArray]
    }
  });

  for (let i = 1; i < countArray.length; i++) {
    countArray[i] += countArray[i - 1];
    
    steps.push({
      type: 'count-prefix',
      indices: [],
      array: [...originalArray], // Keep original unchanged
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Building cumulative count: count[${i}] = ${countArray[i]}`,
        countArray: [...countArray],
        outputArray: [...outputArray],
        countIndex: i
      }
    });
  }

  // Phase 3: Build output array
  steps.push({
    type: 'counting-phase',
    indices: [],
    array: [...originalArray], // Keep original unchanged
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Building sorted output array',
      countArray: [...countArray],
      outputArray: [...outputArray]
    }
  });

  // Process from right to left to maintain stability
  for (let i = array.length - 1; i >= 0; i--) {
    const value = array[i];
    const countIndex = value - min;
    const outputIndex = countArray[countIndex] - 1;
    
    outputArray[outputIndex] = value;
    countArray[countIndex]--;
    
    steps.push({
      type: 'count-placement',
      indices: [i],
      array: [...originalArray], // Keep original unchanged
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Placing element ${value} from position ${i} to output position ${outputIndex}`,
        countArray: [...countArray],
        outputArray: [...outputArray],
        currentValue: value,
        countIndex
      }
    });
  }

  // Final step: Algorithm complete - original stays unchanged, result is in output
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: array.length }, (_, i) => i),
    array: [...originalArray], // Keep original unchanged - result is in output array
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Counting sort complete - result shown in output array',
      countArray: [...countArray],
      outputArray: [...outputArray]
    }
  });

  return steps;
}

export const countingSort = createSortingAlgorithm(
  'Counting Sort',
  'A non-comparison based sorting algorithm that counts the number of objects having distinct key values',
  {
    time: { 
      best: 'O(n + k)', 
      average: 'O(n + k)', 
      worst: 'O(n + k)' 
    },
    space: 'O(k)',
    justifications: {
      timeComplexity: {
        best: "Linear time in all cases because we always need to count all n elements and process k possible values. No comparisons between elements are needed.",
        average: "Consistently O(n + k) as the algorithm always performs the same operations: counting n elements, computing cumulative sums for k values, and placing n elements in output.",
        worst: "Still O(n + k) even with large ranges because the algorithm's performance depends only on input size n and range k, not on the arrangement of elements."
      },
      spaceComplexity: "Requires O(k) additional space for the count array where k is the range of input values (max - min + 1), plus O(n) for the output array."
    }
  },
  countingSortSteps
);
