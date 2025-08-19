import { bubbleSortAlgorithm } from './core/bubbleSort';

/**
 * Centralized registry for all sorting algorithms
 * Currently contains only Bubble Sort - other algorithms can be added here
 */
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
} as const;

export type AlgorithmKey = keyof typeof algorithmRegistry;

/**
 * Get an algorithm implementation by its key
 */
export const getAlgorithm = (key: AlgorithmKey) => {
  return algorithmRegistry[key];
};

/**
 * Get all available algorithm keys
 */
export const getAvailableAlgorithms = (): AlgorithmKey[] => {
  return Object.keys(algorithmRegistry) as AlgorithmKey[];
};
