// Core interfaces for the sorting algorithm visualizer

export interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight';
  indices: number[];
  array: number[];
  metadata?: {
    comparisons: number;
    swaps: number;
    currentPhase?: string;
    executionTime?: number; // in milliseconds
  };
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface SortingAlgorithm {
  name: string;
  description: string;
  execute: (array: number[]) => SortStep[];
  complexity: AlgorithmComplexity;
}
