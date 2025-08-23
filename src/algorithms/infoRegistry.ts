import { bubbleSortInfo } from './info/bubbleSortInfo';
import { selectionSortInfo } from './info/selectionSortInfo';
import { insertionSortInfo } from './info/insertionSortInfo';
import type { AlgorithmInfo } from '../types/algorithmInfo';

/**
 * Centralized registry for algorithm theoretical information
 * Separated from implementation registry to maintain clean architecture
 */
export const algorithmInfoRegistry = {
  'bubble-sort': bubbleSortInfo,
  'selection-sort': selectionSortInfo,
  'insertion-sort': insertionSortInfo,
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
