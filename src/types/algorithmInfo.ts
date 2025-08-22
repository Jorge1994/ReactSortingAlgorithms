import type { AlgorithmComplexity } from './algorithm';

/**
 * Interface for algorithm theoretical information
 * Separated from implementation to maintain clean architecture
 */
export interface AlgorithmInfo {
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
  stable: boolean;
  inPlace: boolean;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  keyCharacteristics: string[];
  visualizationNotes: {
    colors: {
      comparing: string;
      swapping: string;
      sorted: string;
      unsorted: string;
    };
    phases: string[];
  };
}
