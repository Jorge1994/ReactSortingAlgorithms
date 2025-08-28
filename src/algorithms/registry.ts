import { bubbleSortAlgorithm } from './core/bubbleSort';
import { selectionSortAlgorithm } from './core/selectionSort';
import { insertionSort } from './core/insertionSort';
import { mergeSort } from './core/mergeSort';
import { countingSort } from './core/countingSort';
import { quickSortAlgorithm } from './core/quickSort';
import { gnomeSortAlgorithm } from './core/gnomeSort';

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
  'quick-sort': quickSortAlgorithm,
  'gnome-sort': gnomeSortAlgorithm,
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
