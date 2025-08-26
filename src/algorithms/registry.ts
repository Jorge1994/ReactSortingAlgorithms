import { bubbleSortAlgorithm } from './core/bubbleSort';
import { selectionSortAlgorithm } from './core/selectionSort';
import { insertionSort } from './core/insertionSort';
import { mergeSort } from './core/mergeSort';
import { countingSort } from './core/countingSort';

/**
 * Centralized registry for all sorting algorithms
 * Contains all available sorting algorithm implementations
 */
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'selection-sort': selectionSortAlgorithm,
  'insertion-sort': insertionSort,
  'merge-sort': mergeSort,
  'counting-sort': countingSort,
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
