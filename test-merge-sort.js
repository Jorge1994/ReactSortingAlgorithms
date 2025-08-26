// Test script to verify merge sort logic
import { mergeSort } from '../src/algorithms/core/mergeSort.js';

// Test with a simple array
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log('Original array:', testArray);

const steps = mergeSort.execute(testArray);
console.log('Total steps:', steps.length);

// Print first few steps to see what's happening
steps.slice(0, 10).forEach((step, index) => {
  console.log(`Step ${index}:`, {
    type: step.type,
    indices: step.indices,
    array: step.array,
    phase: step.metadata?.currentPhase
  });
});

// Print final array
console.log('Final array:', steps[steps.length - 1].array);
console.log('Is sorted?', steps[steps.length - 1].array.every((val, i, arr) => i === 0 || arr[i-1] <= val));
