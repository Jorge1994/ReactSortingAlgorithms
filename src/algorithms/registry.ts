import { bubbleSortAlgorithm } from './core/bubbleSort';
import { selectionSortAlgorithm } from './core/selectionSort';
import { insertionSort } from './core/insertionSort';
import { oddEvenSortAlgorithm } from './core/oddEvenSort';
import { mergeSort } from './core/mergeSort';
import { countingSort } from './core/countingSort';
import { radixSort } from './core/radixSort';
import { quickSortAlgorithm } from './core/quickSort';
import { gnomeSortAlgorithm } from './core/gnomeSort';
import { heapSort } from './core/heapSort';
import { cocktailSortAlgorithm } from './core/cocktailSort';
import { bogoSortAlgorithm } from './core/bogoSort';
import { stoogeSortAlgorithm } from './core/stoogeSort';
import { pancakeSortAlgorithm } from './core/pancakeSort';
import { shellSort } from './core/shellSort';
import { combSortAlgorithm } from './core/combSort';
import { cycleSort } from './core/cycleSort';
import { bitonicSort } from './core/bitonicSort';
import { bucketSort } from './core/bucketSort';
import { introsort } from './core/introsort';
import { timSortAlgorithm } from './core/timSort';

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
  'radix-sort': radixSort,
  'quick-sort': quickSortAlgorithm,
  'gnome-sort': gnomeSortAlgorithm,
  'heap-sort': heapSort,
  'cocktail-sort': cocktailSortAlgorithm,
  'odd-even-sort': oddEvenSortAlgorithm,
  'bogo-sort': bogoSortAlgorithm,
  'stooge-sort': stoogeSortAlgorithm,
  'pancake-sort': pancakeSortAlgorithm,
  'shell-sort': shellSort,
  'comb-sort': combSortAlgorithm,
  'cycle-sort': cycleSort,
  'bitonic-sort': bitonicSort,
  'bucket-sort': bucketSort,
  'introsort': introsort,
  'tim-sort': timSortAlgorithm,
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
