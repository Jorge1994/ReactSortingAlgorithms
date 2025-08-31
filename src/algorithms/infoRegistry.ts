import { bubbleSortInfo } from './info/bubbleSortInfo';
import { selectionSortInfo } from './info/selectionSortInfo';
import { insertionSortInfo } from './info/insertionSortInfo';
import { mergeSortInfo } from './info/mergeSortInfo';
import { countingSortInfo } from './info/countingSortInfo';
import { radixSortInfo } from './info/radixSortInfo';
import { quickSortInfo } from './info/quickSortInfo';
import { gnomeSortInfo } from './info/gnomeSortInfo';
import { heapSortInfo } from './info/heapSortInfo';
import { cocktailSortInfo } from './info/cocktailSortInfo';
import { bogoSortInfo } from './info/bogoSortInfo';
import { stoogeSortInfo } from './info/stoogeSortInfo';
import { oddEvenSortInfo } from './info/oddEvenSortInfo';
import { pancakeSortInfo } from './info/pancakeSortInfo';
import { shellSortInfo } from './info/shellSortInfo';
import { combSortInfo } from './info/combSortInfo';
import { cycleSortInfo } from './info/cycleSortInfo';
import { bitonicSortInfo } from './info/bitonicSortInfo';
import type { AlgorithmInfo } from '../types/algorithmInfo';

/**
 * Centralized registry for algorithm theoretical information
 * Separated from implementation registry to maintain clean architecture
 */
export const algorithmInfoRegistry = {
  'bubble-sort': bubbleSortInfo,
  'selection-sort': selectionSortInfo,
  'insertion-sort': insertionSortInfo,
  'merge-sort': mergeSortInfo,
  'counting-sort': countingSortInfo,
  'radix-sort': radixSortInfo,
  'quick-sort': quickSortInfo,
  'gnome-sort': gnomeSortInfo,
  'heap-sort': heapSortInfo,
  'cocktail-sort': cocktailSortInfo,
  'odd-even-sort': oddEvenSortInfo,
  'bogo-sort': bogoSortInfo,
  'stooge-sort': stoogeSortInfo,
  'pancake-sort': pancakeSortInfo,
  'shell-sort': shellSortInfo,
  'comb-sort': combSortInfo,
  'cycle-sort': cycleSortInfo,
  'bitonic-sort': bitonicSortInfo,
} as const;

export type AlgorithmInfoKey = keyof typeof algorithmInfoRegistry;

/**
 * Get algorithm theoretical information by its key
 */
export const getAlgorithmInfo = (key: AlgorithmInfoKey): AlgorithmInfo => {
  return algorithmInfoRegistry[key];
};

/**
 * Get all available algorithm info keys
 */
export const getAvailableAlgorithmInfos = (): AlgorithmInfoKey[] => {
  return Object.keys(algorithmInfoRegistry) as AlgorithmInfoKey[];
};
