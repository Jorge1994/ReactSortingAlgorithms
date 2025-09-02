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

interface Run {
  start: number;
  length: number;
  isNatural: boolean;
}

function detectSingleRunAtPosition(array: number[], start: number, steps: SortStep[], comparisons: { value: number }, swaps: { value: number }): Run {
  if (start >= array.length) {
    return { start, length: 0, isNatural: false };
  }
  
  let end = start;
  
  // Single element is always a run
  if (start === array.length - 1) {
    return { start, length: 1, isNatural: true };
  }
  
  // Detect if sequence is ascending or descending at current position
  if (array[start] <= array[start + 1]) {
    // Ascending sequence - detect full natural run
    while (end < array.length - 1 && array[end] <= array[end + 1]) {
      comparisons.value++;
      steps.push({
        type: 'compare',
        indices: [end, end + 1],
        array: [...array],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Detecting run at position ${start} - Checking ascending sequence` 
        }
      });
      end++;
    }
  } else {
    // Descending sequence - detect and reverse
    while (end < array.length - 1 && array[end] > array[end + 1]) {
      comparisons.value++;
      steps.push({
        type: 'compare',
        indices: [end, end + 1],
        array: [...array],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Detecting run at position ${start} - Checking descending sequence` 
        }
      });
      end++;
    }
    
    // Reverse the descending sequence to make it ascending
    let left = start;
    let right = end;
    while (left < right) {
      [array[left], array[right]] = [array[right], array[left]];
      swaps.value++;
      steps.push({
        type: 'swap',
        indices: [left, right],
        array: [...array],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Reversing descending sequence at position ${start}` 
        }
      });
      left++;
      right--;
    }
  }
  
  const runLength = end - start + 1;
  const isNaturalRun = runLength >= 2;
  
  return { start, length: runLength, isNatural: isNaturalRun };
}

function extendRunToMinLength(array: number[], run: Run, minRun: number, steps: SortStep[], comparisons: { value: number }, swaps: { value: number }): Run {
  if (run.length >= minRun) {
    return run; // Already long enough
  }
  
  // Extend run to minRun length using binary insertion sort
  const targetLength = Math.min(minRun, array.length - run.start);
  const endPos = run.start + targetLength - 1;
  
  // Use insertion sort to extend the run
  for (let i = run.start + run.length; i <= endPos; i++) {
    const key = array[i];
    let left = run.start;
    let right = i;
    
    // Binary search for insertion position
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      comparisons.value++;
      steps.push({
        type: 'compare',
        indices: [mid, i],
        array: [...array],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: 'Extending run - Binary search for insertion position' 
        }
      });
      
      if (array[mid] <= key) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    // Shift elements and insert
    let j = i;
    while (j > left) {
      array[j] = array[j - 1];
      swaps.value++;
      steps.push({
        type: 'move',
        indices: [j - 1, j],
        array: [...array],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: 'Extending run - Shifting elements for insertion' 
        }
      });
      j--;
    }
    array[left] = key;
    
    steps.push({
      type: 'move',
      indices: [left],
      array: [...array],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: 'Extending run - Inserting element in position' 
      }
    });
  }
  
  return { start: run.start, length: targetLength, isNatural: false };
}

function timSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  const comparisons = { value: 0 };
  const swaps = { value: 0 };

  const n = workingArray.length;
  if (n <= 1) return steps;

  // Add initial state
  steps.push({
    type: 'highlight',
    indices: [],
    array: [...workingArray],
    metadata: { 
      comparisons: comparisons.value, 
      swaps: swaps.value, 
      currentPhase: 'Tim Sort - Starting sequential processing from left to right' 
    }
  });

  const minRun = minRunLength(n);
  const processedRuns: Run[] = [];
  let currentPos = 0;

  // Process array sequentially from left to right
  while (currentPos < n) {
    // Detect run at current position
    steps.push({
      type: 'highlight',
      indices: [currentPos],
      array: [...workingArray],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: `Processing position ${currentPos} - Detecting run` 
      }
    });

    const run = detectSingleRunAtPosition(workingArray, currentPos, steps, comparisons, swaps);
    
    // Highlight detected run
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: run.length }, (_, i) => run.start + i),
      array: [...workingArray],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: `Run detected: ${run.isNatural ? 'Natural' : 'Single element'} (length: ${run.length})` 
      }
    });

    // Process the run immediately
    if (run.isNatural && run.length >= minRun) {
      // Natural run is already good - mark as sorted
      steps.push({
        type: 'temp-sorted',
        indices: Array.from({ length: run.length }, (_, idx) => run.start + idx),
        array: [...workingArray],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Natural run preserved (${run.length} elements)` 
        }
      });
      processedRuns.push(run);
    } else {
      // Extend run to minimum length using insertion sort
      steps.push({
        type: 'highlight',
        indices: Array.from({ length: run.length }, (_, idx) => run.start + idx),
        array: [...workingArray],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Extending small run from ${run.length} to minimum ${minRun} elements` 
        }
      });
      
      const extendedRun = extendRunToMinLength(workingArray, run, minRun, steps, comparisons, swaps);
      
      steps.push({
        type: 'temp-sorted',
        indices: Array.from({ length: extendedRun.length }, (_, idx) => extendedRun.start + idx),
        array: [...workingArray],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Run completed and sorted (${extendedRun.length} elements)` 
        }
      });
      
      processedRuns.push(extendedRun);
    }

    // Tim Sort strategy: intelligent merging based on stack invariants
    if (processedRuns.length >= 2) {
      const lastRun = processedRuns[processedRuns.length - 1];
      const secondLastRun = processedRuns[processedRuns.length - 2];
      
      // Tim Sort merge conditions (more sophisticated for larger arrays)
      let shouldMerge = false;
      let mergeReason = '';
      
      // Condition 1: Adjacent runs should be merged
      if (secondLastRun.start + secondLastRun.length === lastRun.start) {
        // For smaller arrays (< 500), merge when similar size
        if (n < 500) {
          const sizeDifference = Math.abs(lastRun.length - secondLastRun.length);
          shouldMerge = sizeDifference <= Math.min(lastRun.length, secondLastRun.length) * 0.5;
          mergeReason = 'Small array - similar size merge';
        } 
        // For larger arrays, use Tim Sort stack invariants
        else {
          // Maintain stack invariants: merge if we have too many pending runs
          if (processedRuns.length >= 3) {
            const thirdLastRun = processedRuns[processedRuns.length - 3];
            // Check Tim Sort invariants: X > Y + Z and Y > Z
            shouldMerge = thirdLastRun.length <= secondLastRun.length + lastRun.length ||
                         secondLastRun.length <= lastRun.length;
            mergeReason = 'Large array - stack invariant maintenance';
          } else if (processedRuns.length === 2) {
            // Only merge if runs are reasonably balanced
            shouldMerge = Math.min(secondLastRun.length, lastRun.length) >= minRun * 0.7;
            mergeReason = 'Large array - balanced runs';
          }
        }
      }
      
      if (shouldMerge) {
        steps.push({
          type: 'highlight',
          indices: [
            ...Array.from({ length: secondLastRun.length }, (_, idx) => secondLastRun.start + idx),
            ...Array.from({ length: lastRun.length }, (_, idx) => lastRun.start + idx)
          ],
          array: [...workingArray],
          metadata: { 
            comparisons: comparisons.value, 
            swaps: swaps.value, 
            currentPhase: `${mergeReason}: ${secondLastRun.length} + ${lastRun.length} → ${secondLastRun.length + lastRun.length} elements` 
          }
        });

        // Perform merge
        const left = secondLastRun.start;
        const mid = secondLastRun.start + secondLastRun.length - 1;
        const right = lastRun.start + lastRun.length - 1;
        
        mergeArrays(workingArray, left, mid, right, steps, comparisons, swaps);
        
        // Replace the two runs with the merged run
        const mergedRun: Run = {
          start: left,
          length: right - left + 1,
          isNatural: false
        };
        
        // Remove the last two runs and add the merged one
        processedRuns.splice(-2, 2, mergedRun);
        
        steps.push({
          type: 'temp-sorted',
          indices: Array.from({ length: mergedRun.length }, (_, idx) => mergedRun.start + idx),
          array: [...workingArray],
          metadata: { 
            comparisons: comparisons.value, 
            swaps: swaps.value, 
            currentPhase: `Merged block completed (${mergedRun.length} elements)` 
          }
        });
      }
    }

    // Move to next position
    currentPos = run.start + (run.length >= minRun ? run.length : minRun);
  }

  // Phase 2: Final merge using Tim Sort stack collapse
  while (processedRuns.length > 1) {
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...workingArray],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: `Final collapse phase - ${processedRuns.length} runs remaining` 
      }
    });

    // Tim Sort stack collapse: merge the most appropriate pair
    let mergeIndex = 0;
    
    if (processedRuns.length >= 3) {
      // Find best merge point using Tim Sort heuristics
      for (let i = 0; i < processedRuns.length - 1; i++) {
        const currentRun = processedRuns[i];
        const nextRun = processedRuns[i + 1];
        
        // Prefer merging adjacent runs of more balanced size
        if (currentRun.start + currentRun.length === nextRun.start) {
          const sizeRatio = Math.min(currentRun.length, nextRun.length) / Math.max(currentRun.length, nextRun.length);
          if (sizeRatio > 0.5) { // More balanced runs
            mergeIndex = i;
            break;
          }
        }
      }
    }
    
    const leftRun = processedRuns[mergeIndex];
    const rightRun = processedRuns[mergeIndex + 1];
    
    // Highlight the runs being merged
    const leftIndices = Array.from({ length: leftRun.length }, (_, idx) => leftRun.start + idx);
    const rightIndices = Array.from({ length: rightRun.length }, (_, idx) => rightRun.start + idx);
    
    const mergeDescription = processedRuns.length === 2 ? 
      'Final merge of two main blocks' : 
      `Collapsing stack: merging runs of ${leftRun.length} and ${rightRun.length} elements`;
    
    steps.push({
      type: 'highlight',
      indices: [...leftIndices, ...rightIndices],
      array: [...workingArray],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: mergeDescription
      }
    });

    // Perform merge
    const left = leftRun.start;
    const mid = leftRun.start + leftRun.length - 1;
    const right = rightRun.start + rightRun.length - 1;
    
    mergeArrays(workingArray, left, mid, right, steps, comparisons, swaps);
    
    // Replace the two runs with the merged result
    const mergedRun: Run = {
      start: left,
      length: right - left + 1,
      isNatural: false
    };
    
    processedRuns.splice(mergeIndex, 2, mergedRun);
  }

  // Mark final array as completely sorted
  steps.push({
    type: 'set-sorted',
    indices: Array.from({ length: n }, (_, idx) => idx),
    array: [...workingArray],
    metadata: { 
      comparisons: comparisons.value, 
      swaps: swaps.value, 
      currentPhase: 'Tim Sort Complete - Array sorted using sequential processing' 
    }
  });

  return steps;
}

function mergeArrays(arr: number[], left: number, mid: number, right: number, steps: SortStep[], comparisons: { value: number }, swaps: { value: number }): void {
  const len1 = mid - left + 1;
  const len2 = right - mid;
  const leftArray = new Array(len1);
  const rightArray = new Array(len2);

  // Copy data to temp arrays
  for (let x = 0; x < len1; x++) {
    leftArray[x] = arr[left + x];
  }
  for (let x = 0; x < len2; x++) {
    rightArray[x] = arr[mid + 1 + x];
  }

  let i = 0, j = 0, k = left;

  // Merge the temp arrays back
  while (i < len1 && j < len2) {
    comparisons.value++;
    steps.push({
      type: 'compare',
      indices: [left + i, mid + 1 + j],
      array: [...arr],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: `Merging - Comparing elements from left and right runs` 
      }
    });

    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      steps.push({
        type: 'move',
        indices: [k],
        array: [...arr],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Merging - Placing element from left run` 
        }
      });
      i++;
    } else {
      arr[k] = rightArray[j];
      steps.push({
        type: 'move',
        indices: [k],
        array: [...arr],
        metadata: { 
          comparisons: comparisons.value, 
          swaps: swaps.value, 
          currentPhase: `Merging - Placing element from right run` 
        }
      });
      j++;
    }
    k++;
  }

  // Copy remaining elements of leftArray, if any
  while (i < len1) {
    arr[k] = leftArray[i];
    steps.push({
      type: 'move',
      indices: [k],
      array: [...arr],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
        currentPhase: `Merging - Copying remaining elements from left run` 
      }
    });
    k++;
    i++;
  }

  // Copy remaining elements of rightArray, if any
  while (j < len2) {
    arr[k] = rightArray[j];
    steps.push({
      type: 'move',
      indices: [k],
      array: [...arr],
      metadata: { 
        comparisons: comparisons.value, 
        swaps: swaps.value, 
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
    array: [...arr],
    metadata: { 
      comparisons: comparisons.value, 
      swaps: swaps.value, 
      currentPhase: `Merge complete - Section [${left}-${right}] is now sorted` 
    }
  });
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
