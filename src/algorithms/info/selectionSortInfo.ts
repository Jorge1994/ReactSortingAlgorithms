import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const selectionSortInfo: AlgorithmInfo = {
  name: 'Selection Sort',
  description: 'Selection sort is a simple comparison-based sorting algorithm that works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning.',
  
  complexity: {
    time: {
      best: 'O(n²)',
      average: 'O(n²)', 
      worst: 'O(n²)'
    },
    space: 'O(1)'
  },
  
  advantages: [
    'Simple implementation and easy to understand',
    'In-place sorting (uses O(1) extra memory)',
    'Performs well on small datasets',
    'Minimizes the number of swaps (at most n-1 swaps)',
    'Can be useful when write operations are expensive'
  ],
  
  disadvantages: [
    'O(n²) time complexity makes it inefficient for large datasets',
    'Not stable (relative order of equal elements may change)',
    'Not adaptive (performance doesn\'t improve on partially sorted arrays)',
    'More comparisons than insertion sort on average'
  ],
  
  useCases: [
    'Small datasets (typically less than 50 elements)',
    'When memory is limited (constant space complexity)',
    'When the cost of swapping is high but comparison is cheap',
    'Educational purposes to understand sorting concepts',
    'When you need to minimize the number of writes to memory'
  ],
  
  keyCharacteristics: [
    'In-place: Uses only O(1) extra memory',
    'Not stable: May change relative order of equal elements',
    'Not adaptive: Always performs O(n²) comparisons',
    'Comparison-based: Uses element comparisons to sort',
    'Selection-based: Repeatedly selects minimum element'
  ],
  
  visualizationNotes: {
    colors: {
      comparing: 'Blue bars indicate elements being compared',
      swapping: 'Red bars show elements being swapped',
      sorted: 'Green bars represent elements in their final sorted position',
      unsorted: 'Gray bars show elements not yet processed'
    },
    phases: [
      'Find minimum element in unsorted portion',
      'Swap minimum with first unsorted element',
      'Mark current position as sorted',
      'Move to next position and repeat'
    ]
  }
};
