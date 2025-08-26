import { bubbleSortImplementations } from './bubbleSortImplementations';
import { selectionSortImplementations } from './selectionSortImplementations';
import { insertionSortImplementations } from './insertionSortImplementations';
import { mergeSortImplementations } from './mergeSortImplementations';
import { countingSortImplementations } from './countingSortImplementations';
import type { AlgorithmImplementations } from '../types/implementations';
import type { AlgorithmKey } from '../algorithms/registry';

/**
 * Centralized registry for algorithm implementations in different languages
 */
export const implementationsRegistry: Record<AlgorithmKey, AlgorithmImplementations> = {
  'bubble-sort': bubbleSortImplementations,
  'selection-sort': selectionSortImplementations,
  'insertion-sort': insertionSortImplementations,
  'merge-sort': mergeSortImplementations,
  'counting-sort': countingSortImplementations,
} as const;

/**
 * Get algorithm implementations by algorithm key
 */
export const getImplementations = (algorithmKey: AlgorithmKey): AlgorithmImplementations => {
  return implementationsRegistry[algorithmKey];
};
