import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

const MIN_MERGE = 32;

function minRunLength(n: number): number {
  // Becomes 1 if any 1 bits are shifted off
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}

function timSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;
  let swaps = 0;

  const n = workingArray.length;
  if (n <= 1) return steps;

  // Add initial state
  steps.push({
    type: 'highlight',
    indices: [],
    array: [...workingArray],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: 'Initial State - Starting Tim Sort' 
    }
  });

  const minRun = minRunLength(MIN_MERGE);

  // Phase 1: Sort individual subarrays of size minRun using insertion sort
  for (let i = 0; i < n; i += minRun) {
    const left = i;
    const right = Math.min(i + MIN_MERGE - 1, n - 1);
    
    // Highlight the current run being sorted
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Insertion Sort Phase - Sorting run ${Math.floor(i / minRun) + 1}` 
      }
    });

    // Insertion sort for this run
    for (let j = left + 1; j <= right; j++) {
      const temp = workingArray[j];
      let k = j - 1;

      // Compare phase
      while (k >= left && workingArray[k] > temp) {
        comparisons++;
        steps.push({
          type: 'compare',
          indices: [k, j],
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Insertion Sort - Comparing elements in run` 
          }
        });

        // Move element (like a swap but with insertion logic)
        workingArray[k + 1] = workingArray[k];
        swaps++;
        steps.push({
          type: 'move',
          indices: [k, k + 1],
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Insertion Sort - Moving element to correct position` 
          }
        });
        k--;
      }
      
      // Insert the element in its correct position
      workingArray[k + 1] = temp;
      if (k + 1 !== j) {
        steps.push({
          type: 'move',
          indices: [k + 1],
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Insertion Sort - Placing element in final position` 
          }
        });
      }
    }

    // Mark this run as temporarily sorted
    steps.push({
      type: 'temp-sorted',
      indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Run ${Math.floor(i / minRun) + 1} sorted - Ready for merging` 
      }
    });
  }

  // Phase 2: Start merging from size minRun
  let mergePhase = 1;
  for (let size = minRun; size < n; size = 2 * size) {
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Merge Phase ${mergePhase} - Merging runs of size ${size}` 
      }
    });

    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        // Highlight the two runs being merged
        const leftRun = Array.from({ length: mid - left + 1 }, (_, idx) => left + idx);
        const rightRun = Array.from({ length: right - mid }, (_, idx) => mid + 1 + idx);
        
        steps.push({
          type: 'highlight',
          indices: [...leftRun, ...rightRun],
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Preparing to merge runs [${left}-${mid}] and [${mid + 1}-${right}]` 
          }
        });

        // Merge the two runs
        const len1 = mid - left + 1;
        const len2 = right - mid;
        const leftArray = new Array(len1);
        const rightArray = new Array(len2);

        // Copy data to temp arrays
        for (let x = 0; x < len1; x++) {
          leftArray[x] = workingArray[left + x];
        }
        for (let x = 0; x < len2; x++) {
          rightArray[x] = workingArray[mid + 1 + x];
        }

        let i = 0, j = 0, k = left;

        // Merge the temp arrays back
        while (i < len1 && j < len2) {
          comparisons++;
          steps.push({
            type: 'compare',
            indices: [left + i, mid + 1 + j],
            array: [...workingArray],
            metadata: { 
              comparisons, 
              swaps, 
              currentPhase: `Merging - Comparing elements from left and right runs` 
            }
          });

          if (leftArray[i] <= rightArray[j]) {
            workingArray[k] = leftArray[i];
            steps.push({
              type: 'move',
              indices: [k],
              array: [...workingArray],
              metadata: { 
                comparisons, 
                swaps, 
                currentPhase: `Merging - Placing element from left run` 
              }
            });
            i++;
          } else {
            workingArray[k] = rightArray[j];
            steps.push({
              type: 'move',
              indices: [k],
              array: [...workingArray],
              metadata: { 
                comparisons, 
                swaps, 
                currentPhase: `Merging - Placing element from right run` 
              }
            });
            j++;
          }
          k++;
        }

        // Copy remaining elements of leftArray, if any
        while (i < len1) {
          workingArray[k] = leftArray[i];
          steps.push({
            type: 'move',
            indices: [k],
            array: [...workingArray],
            metadata: { 
              comparisons, 
              swaps, 
              currentPhase: `Merging - Copying remaining elements from left run` 
            }
          });
          k++;
          i++;
        }

        // Copy remaining elements of rightArray, if any
        while (j < len2) {
          workingArray[k] = rightArray[j];
          steps.push({
            type: 'move',
            indices: [k],
            array: [...workingArray],
            metadata: { 
              comparisons, 
              swaps, 
              currentPhase: `Merging - Copying remaining elements from right run` 
            }
          });
          k++;
          j++;
        }

        // Mark merged section as temporarily sorted
        steps.push({
          type: 'temp-sorted',
          indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Merge complete - Section [${left}-${right}] is now sorted` 
          }
        });
      }
    }
    mergePhase++;
  }

  // Mark final array as completely sorted
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: n }, (_, idx) => idx),
    array: [...workingArray],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: 'Tim Sort Complete - Array is fully sorted' 
    }
  });

  return steps;
}

export const timSort = createSortingAlgorithm(
  'Tim Sort',
  'Hybrid sorting algorithm that combines insertion sort for small runs and merge sort for larger sequences, achieving excellent performance on real-world data',
  {
    time: { 
      best: 'O(n)', 
      average: 'O(n log n)', 
      worst: 'O(n log n)' 
    },
    space: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    justifications: {
      timeComplexity: {
        best: "When the array has many pre-existing ordered runs, Tim Sort can achieve linear time by identifying and merging these natural sequences efficiently",
        average: "In typical cases, Tim Sort performs merge operations on runs of size 32-64, resulting in O(n log n) comparisons and merges",
        worst: "Even when no natural runs exist, Tim Sort creates artificial runs using insertion sort and merges them in O(n log n) time"
      },
      spaceComplexity: {
        best: "Requires O(n) auxiliary space for temporary arrays during merge operations",
        average: "Requires O(n) auxiliary space for temporary arrays during merge operations", 
        worst: "Requires O(n) auxiliary space for temporary arrays during merge operations"
      }
    }
  },
  timSortSteps
);
