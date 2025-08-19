import type { SortingAlgorithm, AlgorithmComplexity, SortStep } from '../../types';

/**
 * Factory function to create a sorting algorithm with consistent interface
 */
export const createSortingAlgorithm = (
  name: string,
  description: string,
  complexity: AlgorithmComplexity,
  sortFunction: (array: number[]) => SortStep[]
): SortingAlgorithm => {
  return {
    name,
    description,
    complexity,
    execute: sortFunction
  };
};
