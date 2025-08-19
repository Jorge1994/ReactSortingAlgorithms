/**
 * Generate a random array of numbers for sorting visualization
 */
export const generateRandomArray = (size: number, min: number = 1, max: number = 100): number[] => {
  const array: number[] = [];
  
  for (let i = 0; i < size; i++) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    array.push(randomValue);
  }
  
  return array;
};

/**
 * Generate a nearly sorted array (helpful for testing best-case scenarios)
 */
export const generateNearlySortedArray = (size: number): number[] => {
  const array = Array.from({ length: size }, (_, i) => i + 1);
  
  // Swap a few random elements to make it "nearly" sorted
  const swaps = Math.max(1, Math.floor(size * 0.1)); // 10% of elements
  
  for (let i = 0; i < swaps; i++) {
    const index1 = Math.floor(Math.random() * size);
    const index2 = Math.floor(Math.random() * size);
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }
  
  return array;
};

/**
 * Generate a reverse sorted array (worst-case for bubble sort)
 */
export const generateReverseSortedArray = (size: number): number[] => {
  return Array.from({ length: size }, (_, i) => size - i);
};
