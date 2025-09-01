import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

function calculateOptimalBuckets(arraySize: number): number {
  if (arraySize <= 10) {
    return Math.max(2, Math.floor(arraySize / 2)); // Min 2, max 5 buckets
  } else if (arraySize <= 25) {
    return Math.floor(arraySize / 3); // ~3-8 buckets
  } else if (arraySize <= 50) {
    return Math.floor(Math.sqrt(arraySize)); // ~5-7 buckets
  } else {
    return Math.min(10, Math.floor(Math.sqrt(arraySize))); // Max 10 buckets
  }
}

function bucketSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;
  let swaps = 0;

  if (array.length <= 1) {
    return steps;
  }

  // Calculate number of buckets
  const numBuckets = calculateOptimalBuckets(array.length);
  
  // Find min and max values for bucket range calculation
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);
  const range = maxValue - minValue;
  
  // Initialize buckets
  const buckets: number[][] = Array.from({ length: numBuckets }, () => []);
  
  // Initial state
  steps.push({
    type: 'bucket-operation',
    indices: [],
    array: [...workingArray],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Initialization: Creating buckets',
      buckets: buckets.map(bucket => [...bucket]),
      operationType: 'distribute'
    }
  });

  // Phase 1: Distribution - distribute elements into buckets
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    
    // Calculate bucket index
    let bucketIndex;
    if (range === 0) {
      bucketIndex = 0; // All elements are the same
    } else {
      bucketIndex = Math.floor(((value - minValue) / range) * (numBuckets - 1));
      bucketIndex = Math.min(bucketIndex, numBuckets - 1); // Ensure max value goes to last bucket
    }
    
    // Highlight element being distributed
    steps.push({
      type: 'highlight',
      indices: [i],
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Distribution: Moving element ${value} to bucket ${bucketIndex}`,
        buckets: buckets.map(bucket => [...bucket]),
        bucketIndex,
        elementValue: value,
        operationType: 'distribute'
      }
    });
    
    // Add element to bucket
    buckets[bucketIndex].push(value);
    
    // Show element moved to bucket
    steps.push({
      type: 'bucket-operation',
      indices: [i],
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Distribution: Element ${value} placed in bucket ${bucketIndex}`,
        buckets: buckets.map(bucket => [...bucket]),
        bucketIndex,
        elementValue: value,
        operationType: 'distribute'
      }
    });
  }

  // Phase 2: Internal sorting - sort each bucket using insertion sort
  for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
    if (buckets[bucketIdx].length <= 1) {
      // Single element or empty buckets are already sorted
      if (buckets[bucketIdx].length === 1) {
        steps.push({
          type: 'bucket-operation',
          indices: [],
          array: [...workingArray],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Internal Sorting: Bucket ${bucketIdx} has only one element - already sorted`,
            buckets: buckets.map(bucket => [...bucket]),
            bucketIndex: bucketIdx,
            operationType: 'bucket-sorted'
          }
        });
      }
      continue;
    }
    
    const bucket = buckets[bucketIdx];
    
    steps.push({
      type: 'bucket-operation',
      indices: [],
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Internal Sorting: Sorting bucket ${bucketIdx} with ${bucket.length} elements`,
        buckets: buckets.map(bucket => [...bucket]),
        bucketIndex: bucketIdx,
        operationType: 'sort-internal'
      }
    });
    
    // Perform insertion sort on this bucket with detailed steps
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      
      // Show element being inserted
      steps.push({
        type: 'bucket-operation',
        indices: [],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Internal Sorting: Inserting ${key} in bucket ${bucketIdx}`,
          buckets: buckets.map(bucket => [...bucket]),
          bucketIndex: bucketIdx,
          elementValue: key,
          operationType: 'sort-internal'
        }
      });
      
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        comparisons++;
        swaps++;
        
        steps.push({
          type: 'bucket-operation',
          indices: [],
          array: [...workingArray],
          metadata: {
            comparisons,
            swaps,
            currentPhase: `Internal Sorting: Moving ${bucket[j + 1]} in bucket ${bucketIdx}`,
            buckets: buckets.map(bucket => [...bucket]),
            bucketIndex: bucketIdx,
            operationType: 'sort-internal'
          }
        });
        
        j--;
      }
      bucket[j + 1] = key;
      
      steps.push({
        type: 'bucket-operation',
        indices: [],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Internal Sorting: Placed ${key} at position ${j + 1} in bucket ${bucketIdx}`,
          buckets: buckets.map(bucket => [...bucket]),
          bucketIndex: bucketIdx,
          elementValue: key,
          operationType: 'sort-internal'
        }
      });
    }
    
    // Add step to indicate this bucket is now sorted
    steps.push({
      type: 'bucket-operation',
      indices: [],
      array: [...workingArray],
      metadata: {
        comparisons,
        swaps,
        currentPhase: `Internal Sorting: Bucket ${bucketIdx} is now sorted`,
        buckets: buckets.map(bucket => [...bucket]),
        bucketIndex: bucketIdx,
        operationType: 'bucket-sorted'
      }
    });
  }

  // Phase 3: Concatenation - combine sorted buckets back into array
  let resultIndex = 0;
  
  steps.push({
    type: 'bucket-operation',
    indices: [],
    array: [...workingArray],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Concatenation: Combining sorted buckets into final array',
      buckets: buckets.map(bucket => [...bucket]),
      operationType: 'concatenate'
    }
  });

  for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
    for (let elemIdx = 0; elemIdx < buckets[bucketIdx].length; elemIdx++) {
      const value = buckets[bucketIdx][elemIdx];
      
      // Show element moving from bucket to final position
      steps.push({
        type: 'bucket-operation',
        indices: [resultIndex],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Concatenation: Moving ${value} from bucket ${bucketIdx} to position ${resultIndex}`,
          buckets: buckets.map(bucket => [...bucket]),
          bucketIndex: bucketIdx,
          elementValue: value,
          operationType: 'concatenate'
        }
      });
      
      workingArray[resultIndex] = value;
      
      steps.push({
        type: 'set-sorted',
        indices: [resultIndex],
        array: [...workingArray],
        metadata: {
          comparisons,
          swaps,
          currentPhase: `Concatenation: Element ${value} placed at final position ${resultIndex}`,
          buckets: buckets.map(bucket => [...bucket]),
          bucketIndex: bucketIdx,
          elementValue: value,
          operationType: 'concatenate'
        }
      });
      
      resultIndex++;
    }
  }

  // Final state - all elements sorted
  steps.push({
    type: 'bucket-operation',
    indices: Array.from({ length: workingArray.length }, (_, i) => i),
    array: [...workingArray],
    metadata: {
      comparisons,
      swaps,
      currentPhase: 'Completed: Array is now sorted',
      buckets: buckets.map(bucket => [...bucket]),
      operationType: 'concatenate'
    }
  });

  return steps;
}

export const bucketSort = createSortingAlgorithm(
  'Bucket Sort',
  'A distribution sorting algorithm that divides elements into buckets, sorts each bucket individually using insertion sort, then concatenates the sorted buckets.',
  {
    time: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    space: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    justifications: {
      timeComplexity: {
        best: 'When elements are uniformly distributed across buckets, each bucket has O(n/k) elements. Insertion sort on each bucket takes O((n/k)²), and with k buckets: O(k × (n/k)²) = O(n²/k). If k = n, then O(n²/n) = O(n). Total: O(n) for distribution + O(n) for sorting = O(n + k).',
        average: 'With uniform distribution, expected time is O(n + k) where k is the number of buckets. The distribution phase takes O(n) and sorting k buckets with average n/k elements each takes O(n + k).',
        worst: 'When all elements fall into the same bucket, bucket sort degenerates to insertion sort on the entire array, giving O(n²) time complexity.'
      },
      spaceComplexity: {
        best: 'Requires space for k buckets plus the original array, giving O(n + k) space complexity.',
        average: 'Requires space for k buckets plus the original array, giving O(n + k) space complexity.',
        worst: 'Requires space for k buckets plus the original array, giving O(n + k) space complexity.'
      }
    }
  },
  bucketSortSteps
);
