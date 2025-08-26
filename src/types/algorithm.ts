// Core interfaces for the sorting algorithm visualizer

export interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight' | 'temp-sorted' | 'move' | 'clear-for-merge';
  indices: number[];
  array: number[];
  metadata?: {
    comparisons: number;
    swaps: number;
    currentPhase?: string;
    executionTime?: number; // in milliseconds
    fromValue?: number; // for move operations
    toPosition?: number; // for move operations
    mergeSlots?: number[]; // for merge operations - original values being merged
  };
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
  justifications: {
    timeComplexity: {
      best: string;
      average: string;
      worst: string;
    };
    spaceComplexity: string;
  };
}

export interface SortingAlgorithm {
  name: string;
  description: string;
  execute: (array: number[]) => SortStep[];
  complexity: AlgorithmComplexity;
}
