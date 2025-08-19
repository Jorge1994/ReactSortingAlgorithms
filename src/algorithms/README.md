# Algorithms Architecture

This folder implements a clean separation between algorithm implementations and theoretical information following the project's modular architecture principles.

## Structure

```
algorithms/
├── core/                    # Pure algorithm implementations
│   ├── bubbleSort.ts        # Bubble sort implementation (generates SortSteps)
│   ├── selectionSort.ts     # Selection sort implementation  
│   ├── insertionSort.ts     # Insertion sort implementation
│   ├── mergeSort.ts         # Merge sort implementation
│   ├── quickSort.ts         # Quick sort implementation
│   ├── heapSort.ts          # Heap sort implementation
│   └── templateAlgorithm.ts # Factory function for algorithm creation
├── info/                    # Theoretical information
│   ├── bubbleSortInfo.ts    # Bubble sort theoretical data
│   ├── selectionSortInfo.ts # Selection sort theoretical data
│   ├── insertionSortInfo.ts # Insertion sort theoretical data
│   ├── mergeSortInfo.ts     # Merge sort theoretical data
│   ├── quickSortInfo.ts     # Quick sort theoretical data
│   ├── heapSortInfo.ts      # Heap sort theoretical data
│   └── index.ts             # Export all algorithm info
├── registry.ts              # Implementation registry
└── infoRegistry.ts          # Information registry
```

## Separation of Concerns

### Core Implementations (`core/`)
- **Purpose**: Pure algorithm logic that generates visualization steps
- **Dependencies**: Only TypeScript types, no React/UI dependencies
- **Output**: Array of `SortStep` objects for visualization
- **Focus**: Algorithm efficiency and step generation

### Theoretical Information (`info/`)
- **Purpose**: Educational content and algorithm metadata
- **Content**: Complexity analysis, advantages/disadvantages, use cases
- **Format**: Structured data following `AlgorithmInfo` interface
- **Focus**: Learning and understanding

### Registry System
- **Implementation Registry**: Maps algorithm keys to executable functions
- **Information Registry**: Maps algorithm keys to theoretical data
- **Benefits**: Centralized management, type safety, easy extension

## Adding New Algorithms

### 1. Create Implementation (`core/newAlgorithm.ts`)
```typescript
import type { SortStep } from '../../types';
import { createSortingAlgorithm } from './templateAlgorithm';
import { newAlgorithmInfo } from '../info/newAlgorithmInfo';

const newAlgorithmFunction = (arr: number[]): SortStep[] => {
  // Pure algorithm logic generating steps
  const steps: SortStep[] = [];
  // ... implementation
  return steps;
};

export const newAlgorithmAlgorithm = createSortingAlgorithm(
  newAlgorithmInfo.name,
  newAlgorithmInfo.description,
  newAlgorithmInfo.complexity,
  newAlgorithmFunction
);
```

### 2. Create Information (`info/newAlgorithmInfo.ts`)
```typescript
import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const newAlgorithmInfo: AlgorithmInfo = {
  name: "New Algorithm",
  description: "Algorithm description",
  complexity: { /* complexity data */ },
  advantages: [ /* advantages */ ],
  disadvantages: [ /* disadvantages */ ],
  useCases: [ /* use cases */ ],
  keyCharacteristics: [ /* characteristics */ ],
  visualizationNotes: { /* visualization notes */ }
};
```

### 3. Register in Both Registries
```typescript
// In registry.ts
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'new-algorithm': newAlgorithmAlgorithm, // Add here
} as const;

// In infoRegistry.ts  
export const algorithmInfoRegistry = {
  'bubble-sort': bubbleSortInfo,
  'new-algorithm': newAlgorithmInfo, // Add here
} as const;
```

## Usage Examples

### Get Algorithm Implementation
```typescript
import { getAlgorithm } from './registry';

const algorithm = getAlgorithm('bubble-sort');
const steps = algorithm.execute([64, 34, 25, 12, 22, 11, 90]);
```

### Get Algorithm Information
```typescript
import { getAlgorithmInfo } from './infoRegistry';

const info = getAlgorithmInfo('bubble-sort');
console.log(info.complexity.time.average); // "O(n²)"
console.log(info.advantages); // Array of advantages
```

## Benefits of This Architecture

1. **Clean Separation**: Algorithm logic separate from educational content
2. **Testability**: Pure functions easy to unit test
3. **Reusability**: Implementations can be used outside UI context  
4. **Maintainability**: Changes to info don't affect algorithm performance
5. **Type Safety**: TypeScript ensures consistent interfaces
6. **Extensibility**: New algorithms follow established patterns

## Testing Strategy

- **Unit Tests**: Test pure algorithm functions with various inputs
- **Integration Tests**: Test registry system and type consistency
- **UI Tests**: Test step generation creates valid visualization data

## Performance Considerations

- Implementations focus on step generation, not algorithm optimization
- Each step includes full array state for visualization
- Memory usage scales with array size and algorithm complexity
- Consider step reduction strategies for very large arrays
