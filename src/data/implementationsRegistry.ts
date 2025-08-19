import { bubbleSortImplementations } from './bubbleSortImplementations';
import type { AlgorithmImplementations } from '../types/implementations';
import type { AlgorithmKey } from '../algorithms/registry';

/**
 * Centralized registry for algorithm implementations in different languages
 */
export const implementationsRegistry: Record<AlgorithmKey, AlgorithmImplementations> = {
  'bubble-sort': bubbleSortImplementations,
} as const;

/**
 * Get algorithm implementations by algorithm key
 */
export const getImplementations = (algorithmKey: AlgorithmKey): AlgorithmImplementations => {
  return implementationsRegistry[algorithmKey];
};
