import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { radixSortInfo } from '../info/radixSortInfo';

interface RadixSortStep extends SortStep {
  countArray?: number[];
  auxiliaryArray?: number[];
  currentDigit?: number;
  digitPosition?: number;
  currentValue?: number;
  countIndex?: number;
}

/**
 * Radix Sort implementation that generates visualization steps
 * Pure algorithm logic separated from theoretical information
 */
const radixSortFunction = (array: number[]): RadixSortStep[] => {
  const startTime = performance.now();
  const steps: RadixSortStep[] = [];
  const workingArray = [...array];
  let comparisons = 0;

  // Find the maximum number to determine number of digits
  const maxNum = Math.max(...workingArray);
  const maxDigits = Math.floor(Math.log10(Math.abs(maxNum))) + 1;

  // Initial step
  steps.push({
    type: 'highlight',
    indices: [],
    array: [...workingArray],
    countArray: [],
    auxiliaryArray: [],
    metadata: {
      comparisons: 0,
      swaps: 0,
      currentPhase: `Starting Radix Sort. Array has ${workingArray.length} elements. Maximum number: ${maxNum} (${maxDigits} digits)`
    }
  });

  for (let digitPos = 0; digitPos < maxDigits; digitPos++) {
    const divisor = Math.pow(10, digitPos);
    const digitName = digitPos === 0 ? 'units' : digitPos === 1 ? 'tens' : digitPos === 2 ? 'hundreds' : `10^${digitPos}`;
    
    // Phase start
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: workingArray.length }, (_, i) => i),
      array: [...workingArray],
      countArray: Array(10).fill(0),
      auxiliaryArray: Array(workingArray.length).fill(undefined),
      digitPosition: digitPos,
      metadata: {
        comparisons,
        swaps: 0,
        currentPhase: `Starting ${digitName} digit pass (digit position ${digitPos + 1}/${maxDigits})`
      }
    });

    // Phase 1: Count occurrences of each digit
    const countArray = Array(10).fill(0);
    
    for (let i = 0; i < workingArray.length; i++) {
      const digit = Math.floor(workingArray[i] / divisor) % 10;
      countArray[digit]++;
      
      steps.push({
        type: 'compare',
        indices: [i],
        array: [...workingArray],
        countArray: [...countArray],
        auxiliaryArray: Array(workingArray.length).fill(undefined),
        currentValue: workingArray[i],
        currentDigit: digit,
        countIndex: digit,
        digitPosition: digitPos,
        metadata: {
          comparisons: ++comparisons,
          swaps: 0,
          currentPhase: `Analyzing element ${workingArray[i]}: ${digitName} digit is ${digit}. Count[${digit}] = ${countArray[digit]}`
        }
      });
    }

    // Phase 2: Transform count array to cumulative positions
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...workingArray],
      countArray: [...countArray],
      auxiliaryArray: Array(workingArray.length).fill(undefined),
      digitPosition: digitPos,
      metadata: {
        comparisons,
        swaps: 0,
        currentPhase: `Converting counts to cumulative positions for stable sorting`
      }
    });

    for (let i = 1; i < 10; i++) {
      countArray[i] += countArray[i - 1];
      
      steps.push({
        type: 'highlight',
        indices: [],
        array: [...workingArray],
        countArray: [...countArray],
        auxiliaryArray: Array(workingArray.length).fill(undefined),
        countIndex: i,
        digitPosition: digitPos,
        metadata: {
          comparisons,
          swaps: 0,
          currentPhase: `Cumulative position[${i}] = ${countArray[i]} (sum of counts 0 to ${i})`
        }
      });
    }

    // Phase 3: Place elements in auxiliary array (right to left for stability)
    const auxiliaryArray = Array(workingArray.length).fill(undefined);
    
    for (let i = workingArray.length - 1; i >= 0; i--) {
      const digit = Math.floor(workingArray[i] / divisor) % 10;
      const position = countArray[digit] - 1;
      
      auxiliaryArray[position] = workingArray[i];
      countArray[digit]--;
      
      steps.push({
        type: 'swap',
        indices: [i, position],
        array: [...workingArray],
        countArray: [...countArray],
        auxiliaryArray: [...auxiliaryArray],
        currentValue: workingArray[i],
        currentDigit: digit,
        countIndex: digit,
        digitPosition: digitPos,
        metadata: {
          comparisons,
          swaps: 0,
          currentPhase: `Placing element ${workingArray[i]} (digit ${digit}) at position ${position} in auxiliary array`
        }
      });
    }

    // Phase 4: Transfer auxiliary array back to main array
    steps.push({
      type: 'highlight',
      indices: [],
      array: [...workingArray],
      countArray: Array(10).fill(0), // Keep count array visible but reset
      auxiliaryArray: [...auxiliaryArray],
      digitPosition: digitPos,
      metadata: {
        comparisons,
        swaps: 0,
        currentPhase: `Transferring sorted elements from auxiliary array back to main array`
      }
    });

    for (let i = 0; i < workingArray.length; i++) {
      workingArray[i] = auxiliaryArray[i];
      
      steps.push({
        type: 'swap',
        indices: [i],
        array: [...workingArray],
        countArray: Array(10).fill(0), // Keep count array visible but reset
        auxiliaryArray: Array(workingArray.length).fill(undefined),
        digitPosition: digitPos,
        metadata: {
          comparisons,
          swaps: 0,
          currentPhase: `Moved element ${workingArray[i]} to position ${i} in main array`
        }
      });
    }

    // End of pass
    steps.push({
      type: 'highlight',
      indices: Array.from({ length: workingArray.length }, (_, i) => i),
      array: [...workingArray],
      countArray: Array(10).fill(0), // Keep count array visible but reset
      auxiliaryArray: Array(workingArray.length).fill(undefined),
      digitPosition: digitPos,
      metadata: {
        comparisons,
        swaps: 0,
        currentPhase: `Completed ${digitName} digit pass. Array is now sorted by ${digitName} digit.`
      }
    });
  }

  // Final step - mark all as sorted
  for (let i = 0; i < workingArray.length; i++) {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    steps.push({
      type: 'set-sorted',
      indices: [i],
      array: [...workingArray],
      countArray: Array(10).fill(0), // Keep count array visible but reset
      auxiliaryArray: Array(workingArray.length).fill(undefined),
      metadata: {
        comparisons,
        swaps: 0,
        currentPhase: 'Radix Sort completed! All elements are now in their final sorted positions.',
        executionTime: i === workingArray.length - 1 ? executionTime : undefined
      }
    });
  }

  return steps;
};

/**
 * Export the complete Radix Sort algorithm with separated concerns:
 * - Algorithm logic (this file)
 * - Theoretical information (radixSortInfo.ts)
 */
export const radixSort = createSortingAlgorithm(
  radixSortInfo.name,
  radixSortInfo.description,
  radixSortInfo.complexity,
  radixSortFunction
);
