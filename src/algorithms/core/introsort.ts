import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { introsortInfo } from '../info/introsortInfo';

/**
 * Introsort implementation that generates visualization steps
 * Pure algorithm logic separated from theoretical information
 */
const introsortFunction = (array: number[]): SortStep[] => {
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
      currentPhase: 'Initializing Introsort - Hybrid algorithm (Quicksort + Heapsort + Insertion Sort)' 
    }
  });

  function insertionSort(begin: number, end: number) {
    for (let i = begin + 1; i <= end; i++) {
      // Highlight current element being inserted
      steps.push({
        type: 'highlight',
        indices: [i],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Insertion Sort: Inserting element at position ${i}` 
        }
      });

      const key = workingArray[i];
      let j = i - 1;

      // Move elements greater than key to one position ahead
      while (j >= begin && workingArray[j] > key) {
        comparisons++;
        
        // Show comparison
        steps.push({
          type: 'compare',
          indices: [j, i],
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Insertion Sort: Comparing ${workingArray[j]} > ${key}` 
          }
        });

        // Move element
        workingArray[j + 1] = workingArray[j];
        steps.push({
          type: 'move',
          indices: [j + 1],
          array: [...workingArray],
          metadata: { 
            comparisons, 
            swaps, 
            currentPhase: `Insertion Sort: Moving ${workingArray[j + 1]} one position right` 
          }
        });
        
        j--;
      }

      // Insert key at correct position
      workingArray[j + 1] = key;
      steps.push({
        type: 'move',
        indices: [j + 1],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Insertion Sort: Placing ${key} at position ${j + 1}` 
        }
      });
    }
  }

  function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Show current node being heapified
    steps.push({
      type: 'highlight',
      indices: [i],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Heapsort: Heapifying node at index ${i}` 
      }
    });

    // Compare with left child
    if (left < n) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [largest, left],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Heapsort: Comparing parent ${workingArray[largest]} with left child ${workingArray[left]}` 
        }
      });
      
      if (workingArray[left] > workingArray[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < n) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [largest, right],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Heapsort: Comparing largest ${workingArray[largest]} with right child ${workingArray[right]}` 
        }
      });
      
      if (workingArray[right] > workingArray[largest]) {
        largest = right;
      }
    }

    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
      swaps++;
      steps.push({
        type: 'swap',
        indices: [i, largest],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Heapsort: Swapping ${workingArray[i]} with ${workingArray[largest]}` 
        }
      });

      [workingArray[i], workingArray[largest]] = [workingArray[largest], workingArray[i]];
      
      steps.push({
        type: 'highlight',
        indices: [i, largest],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Heapsort: Elements swapped, continuing heapify` 
        }
      });

      heapify(n, largest);
    }
  }

  function heapsort(begin: number, end: number) {
    const n = end - begin + 1;
    
    steps.push({
      type: 'highlight',
      indices: [begin, end],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Heapsort: Building max heap for range [${begin}, ${end}]` 
      }
    });

    // Build heap (rearrange array)
    for (let i = begin + Math.floor(n / 2) - 1; i >= begin; i--) {
      heapify(n, i - begin);
    }

    // Extract elements from heap one by one
    for (let i = end; i > begin; i--) {
      // Move current root to end
      swaps++;
      steps.push({
        type: 'swap',
        indices: [begin, i],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Heapsort: Moving max element ${workingArray[begin]} to position ${i}` 
        }
      });

      [workingArray[begin], workingArray[i]] = [workingArray[i], workingArray[begin]];
      
      // Mark as sorted
      steps.push({
        type: 'set-sorted',
        indices: [i],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Heapsort: Element ${workingArray[i]} is now in final position` 
        }
      });

      // Call heapify on the reduced heap
      heapify(i - begin, 0);
    }
  }

  function medianOfThree(a: number, b: number, c: number): number {
    comparisons += 2; // Two comparisons needed for median of three
    
    steps.push({
      type: 'compare',
      indices: [a, b, c],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Quicksort: Finding median of three elements: ${workingArray[a]}, ${workingArray[b]}, ${workingArray[c]}` 
      }
    });

    const A = workingArray[a];
    const B = workingArray[b];
    const C = workingArray[c];

    if ((A <= B && B <= C) || (C <= B && B <= A)) return b;
    if ((B <= A && A <= C) || (C <= A && A <= B)) return a;
    return c;
  }

  function partition(low: number, high: number): number {
    const pivot = workingArray[high];
    let i = low - 1;

    steps.push({
      type: 'highlight',
      indices: [high],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Quicksort: Using ${pivot} as pivot element` 
      }
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      
      steps.push({
        type: 'compare',
        indices: [j, high],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Quicksort: Comparing ${workingArray[j]} with pivot ${pivot}` 
        }
      });

      if (workingArray[j] <= pivot) {
        i++;
        if (i !== j) {
          swaps++;
          steps.push({
            type: 'swap',
            indices: [i, j],
            array: [...workingArray],
            metadata: { 
              comparisons, 
              swaps, 
              currentPhase: `Quicksort: Swapping ${workingArray[i]} with ${workingArray[j]}` 
            }
          });
          [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
        }
      }
    }

    // Place pivot in correct position
    swaps++;
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Quicksort: Placing pivot ${pivot} in final position ${i + 1}` 
      }
    });
    [workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]];

    return i + 1;
  }

  function introsortUtil(begin: number, end: number, depthLimit: number) {
    const size = end - begin + 1;

    // Use insertion sort for small arrays
    if (size < 16) {
      steps.push({
        type: 'highlight',
        indices: [begin, end],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Introsort: Small array detected (size ${size}), switching to Insertion Sort` 
        }
      });
      insertionSort(begin, end);
      return;
    }

    // Use heapsort when recursion depth limit is reached
    if (depthLimit === 0) {
      steps.push({
        type: 'highlight',
        indices: [begin, end],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Introsort: Depth limit reached, switching to Heapsort to avoid O(n²) worst case` 
        }
      });
      heapsort(begin, end);
      return;
    }

    // Use quicksort with median-of-three pivot selection
    steps.push({
      type: 'highlight',
      indices: [begin, end],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Introsort: Using Quicksort for range [${begin}, ${end}], depth limit: ${depthLimit}` 
      }
    });

    const pivot = medianOfThree(begin, begin + Math.floor(size / 2), end);
    
    // Move chosen pivot to end
    if (pivot !== end) {
      swaps++;
      steps.push({
        type: 'swap',
        indices: [pivot, end],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Quicksort: Moving median pivot to end position` 
        }
      });
      [workingArray[pivot], workingArray[end]] = [workingArray[end], workingArray[pivot]];
    }

    const partitionPoint = partition(begin, end);
    
    // Mark pivot as in correct position
    steps.push({
      type: 'set-sorted',
      indices: [partitionPoint],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: `Quicksort: Pivot ${workingArray[partitionPoint]} is now in final position` 
      }
    });

    // Recursively sort left and right partitions
    if (partitionPoint - 1 > begin) {
      introsortUtil(begin, partitionPoint - 1, depthLimit - 1);
    }
    if (partitionPoint + 1 < end) {
      introsortUtil(partitionPoint + 1, end, depthLimit - 1);
    }
  }

  // Main introsort function
  if (workingArray.length <= 1) {
    steps.push({
      type: 'set-sorted',
      indices: workingArray.length === 1 ? [0] : [],
      array: [...workingArray],
      metadata: { 
        comparisons, 
        swaps, 
        currentPhase: 'Array has 0 or 1 elements - already sorted' 
      }
    });
    return steps;
  }

  const depthLimit = 2 * Math.floor(Math.log2(workingArray.length));
  
  steps.push({
    type: 'highlight',
    indices: [0, workingArray.length - 1],
    array: [...workingArray],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: `Introsort: Starting with depth limit ${depthLimit} (2 × log₂(${workingArray.length}))` 
    }
  });

  introsortUtil(0, workingArray.length - 1, depthLimit);

  // Mark all remaining elements as sorted
  for (let i = 0; i < workingArray.length; i++) {
    const wasAlreadySorted = steps.some(step => 
      step.type === 'set-sorted' && step.indices.includes(i)
    );
    
    if (!wasAlreadySorted) {
      steps.push({
        type: 'set-sorted',
        indices: [i],
        array: [...workingArray],
        metadata: { 
          comparisons, 
          swaps, 
          currentPhase: `Final: Element ${workingArray[i]} confirmed in sorted position` 
        }
      });
    }
  }

  steps.push({
    type: 'highlight',
    indices: [],
    array: [...workingArray],
    metadata: { 
      comparisons, 
      swaps, 
      currentPhase: `Introsort Complete! Used hybrid approach: Quicksort → Heapsort → Insertion Sort` 
    }
  });

  return steps;
};

/**
 * Export the complete Introsort algorithm with separated concerns:
 * - Algorithm logic (this file)
 * - Theoretical information (introsortInfo.ts)
 */
export const introsort = createSortingAlgorithm(
  introsortInfo.name,
  introsortInfo.description,
  introsortInfo.complexity,
  introsortFunction
);
