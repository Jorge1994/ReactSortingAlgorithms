// Core interfaces for the sorting algorithm visualizer

export interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight' | 'temp-sorted' | 'move' | 'clear-for-merge' | 'counting-phase' | 'count-increment' | 'count-prefix' | 'count-placement';
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
    countArray?: number[]; // for counting sort - count array
    outputArray?: number[]; // for counting sort - output array
    currentValue?: number; // for counting sort - current value being processed
    countIndex?: number; // for counting sort - index in count array
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
