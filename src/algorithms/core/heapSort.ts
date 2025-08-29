import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { heapSortInfo } from '../info/heapSortInfo';

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
  heapSortInfo.name,
  heapSortInfo.description,
  heapSortInfo.complexity,
  heapSortSteps
);
