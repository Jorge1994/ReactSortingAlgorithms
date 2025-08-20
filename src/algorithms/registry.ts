import { bubbleSortAlgorithm } from './core/bubbleSort';
import { selectionSortAlgorithm } from './core/selectionSort';

/**
 * Centralized registry for all sorting algorithms
 * Contains all available sorting algorithm implementations
 */
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'selection-sort': selectionSortAlgorithm,
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
