import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';

function heapSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = workingArray.length;

  // Helper function to add a step
  const addStep = (
    type: SortStep['type'],
    indices: number[],
    currentPhase?: string
  ) => {
    steps.push({
      type,
      indices,
      array: [...workingArray],
      metadata: { comparisons, swaps, currentPhase }
    });
  };

  // Helper function to heapify a subtree rooted at index i
  const heapify = (heapSize: number, rootIndex: number, phase: string) => {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    // Highlight the current root being processed
    addStep('highlight', [rootIndex], phase);

    // Check if left child exists and is greater than root
    if (leftChild < heapSize) {
      addStep('compare', [largest, leftChild], `${phase} - Comparing with left child`);
      comparisons++;
      
      if (workingArray[leftChild] > workingArray[largest]) {
        largest = leftChild;
      }
    }

    // Check if right child exists and is greater than current largest
    if (rightChild < heapSize) {
      addStep('compare', [largest, rightChild], `${phase} - Comparing with right child`);
      comparisons++;
      
      if (workingArray[rightChild] > workingArray[largest]) {
        largest = rightChild;
      }
    }

    // If largest is not root, swap and continue heapifying
    if (largest !== rootIndex) {
      addStep('swap', [rootIndex, largest], `${phase} - Swapping to maintain heap property`);
      
      // Perform the swap
      [workingArray[rootIndex], workingArray[largest]] = [workingArray[largest], workingArray[rootIndex]];
      swaps++;

      // Recursively heapify the affected subtree
      heapify(heapSize, largest, phase);
    }
  };

  // Phase 1: Build initial max heap from the array
  addStep('highlight', [], 'Phase 1: Building initial max heap');
  
  // Start from the last non-leaf node and heapify each node
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i, `Phase 1: Heapifying subtree rooted at index ${i}`);
  }

  // Phase 2: Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    addStep('highlight', [0, i], `Phase 2: Extracting maximum element to position ${i}`);
    
    // Move current root (maximum) to end
    addStep('swap', [0, i], `Phase 2: Moving maximum to sorted position`);
    [workingArray[0], workingArray[i]] = [workingArray[i], workingArray[0]];
    swaps++;

    // Mark the element as sorted
    addStep('set-sorted', [i], `Phase 2: Element at position ${i} is now sorted`);

    // Call heapify on the reduced heap
    heapify(i, 0, `Phase 2: Restoring heap property for remaining ${i} elements`);
  }

  // Mark the last element as sorted
  addStep('set-sorted', [0], 'Phase 2: Final element is sorted');

  // Final step showing the completely sorted array
  addStep('set-sorted', Array.from({ length: n }, (_, i) => i), 'Sorting complete - All elements are in their final positions');

  return steps;
}

export const heapSort = createSortingAlgorithm(
  'Heap Sort',
  'A comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.',
  {
    time: { 
      best: 'O(n log n)', 
      average: 'O(n log n)', 
      worst: 'O(n log n)' 
    },
    space: {
      best: 'O(log n)',
      average: 'O(log n)', 
      worst: 'O(log n)'
    },
    justifications: {
      timeComplexity: {
        best: "Even when the array is already sorted, Heap Sort must build the initial heap (O(n)) and then perform n-1 extract-max operations, each requiring O(log n) time to restore the heap property. This gives O(n log n) total time.",
        average: "The algorithm performs two main phases: building the initial heap takes O(n) time, and extracting n elements from the heap takes O(n log n) time since each extraction requires O(log n) time to heapify. The dominant factor is O(n log n).",
        worst: "The worst case occurs when the heap property is maximally violated after each extraction, requiring the maximum number of comparisons and swaps during heapify operations. However, this still results in O(n log n) time complexity due to the logarithmic height of the heap."
      },
      spaceComplexity: {
        best: "Standard recursive implementation requires O(log n) auxiliary space due to the recursion call stack during heapify operations, with stack depth proportional to the height of the heap.",
        average: "Best case and average case both maintain O(log n) space complexity as the heap structure ensures logarithmic depth.",
        worst: "Worst case also remains O(log n) as the heap height is always logarithmic. Alternative iterative implementation can achieve O(1) auxiliary space complexity by avoiding recursion entirely."
      }
    }
  },
  heapSortSteps
);
