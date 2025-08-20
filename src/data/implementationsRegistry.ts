import { bubbleSortImplementations } from './bubbleSortImplementations';
import { selectionSortImplementations } from './selectionSortImplementations';
import type { AlgorithmImplementations } from '../types/implementations';
import type { AlgorithmKey } from '../algorithms/registry';

/**
 * Centralized registry for algorithm implementations in different languages
 */
export const implementationsRegistry: Record<AlgorithmKey, AlgorithmImplementations> = {
  'bubble-sort': bubbleSortImplementations,
  'selection-sort': selectionSortImplementations,
} as const;

/**
 * Get algorithm implementations by algorithm key
 */
export const getImplementations = (algorithmKey: AlgorithmKey): AlgorithmImplementations => {
  return implementationsRegistry[algorithmKey];
};
