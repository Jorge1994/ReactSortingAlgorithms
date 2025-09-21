# Algorithms System

This directory contains the algorithm implementations and registry system for the Sorting Algorithm Visualizer.

## 🏗️ Architecture Overview

The algorithms system follows a **clean separation pattern** with three main components:

- **`core/`** - Pure algorithm implementations (generates `SortStep[]`)
- **`info/`** - Educational content and metadata
- **Registry System** - Centralized algorithm management

## 📁 Directory Structure

```
algorithms/
├── core/                    # Algorithm implementations
│   ├── bubbleSort.ts        # Individual algorithm files
│   ├── mergeSort.ts         # ...
│   └── templateAlgorithm.ts # Factory function
├── info/                    # Educational content
│   ├── bubbleSortInfo.ts    # Algorithm metadata
│   └── ...                  # Individual info files
├── registry.ts              # Implementation registry
└── infoRegistry.ts          # Information registry
```

## 🔧 Registry System

The registry pattern provides type-safe, centralized algorithm management:

### Currently Supported Algorithms (21 Total)

**Simple Algorithms:**
- `bubble-sort` - Bubble Sort
- `selection-sort` - Selection Sort  
- `insertion-sort` - Insertion Sort
- `gnome-sort` - Gnome Sort

**Advanced Algorithms:**
- `merge-sort` - Merge Sort
- `quick-sort` - Quick Sort
- `heap-sort` - Heap Sort
- `shell-sort` - Shell Sort
- `tim-sort` - Tim Sort
- `introsort` - Introsort (Hybrid)

**Specialized Algorithms:**
- `counting-sort` - Counting Sort
- `radix-sort` - Radix Sort
- `bucket-sort` - Bucket Sort

**Variants & Improvements:**
- `cocktail-sort` - Cocktail Shaker Sort
- `odd-even-sort` - Odd-Even Sort
- `comb-sort` - Comb Sort

**Exotic Algorithms:**
- `bogo-sort` - Bogo Sort (Probabilistic)
- `bitonic-sort` - Bitonic Sort (Network)
- `stooge-sort` - Stooge Sort (Recursive)
- `pancake-sort` - Pancake Sort (Restricted)
- `cycle-sort` - Cycle Sort (Minimal Writes)

### Implementation Registry (`registry.ts`)
Maps algorithm keys to executable implementations:

```typescript
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'quick-sort': quickSortAlgorithm,
  // ...
} as const;

// Type-safe usage
const algorithm = getAlgorithm('bubble-sort');
const steps = algorithm.execute([64, 34, 25, 12, 22, 11, 90]);
```

### Information Registry (`infoRegistry.ts`)
Maps algorithm keys to educational content:

```typescript
export const algorithmInfoRegistry = {
  'bubble-sort': bubbleSortInfo,
  'quick-sort': quickSortInfo,
  // ...
} as const;

// Type-safe usage
const info = getAlgorithmInfo('bubble-sort');
console.log(info.complexity.time.average); // "O(n²)"
```

## 🚀 Quick Algorithm Addition

1. **Create implementation** in `core/yourAlgorithm.ts`
2. **Create information** in `info/yourAlgorithmInfo.ts`  
3. **Register both** in respective registry files
4. **Add examples** in `src/data/yourAlgorithmImplementations.ts`

The UI components automatically support new algorithms through the registry system.

## 📚 Key Interfaces

### SortStep Interface
```typescript
interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight';
  indices: number[];
  array: number[];
  metadata?: {
    comparisons: number;
    swaps: number;
    currentPhase?: string;
  };
}
```

### SortingAlgorithm Interface
```typescript
interface SortingAlgorithm {
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
  execute: (array: number[]) => SortStep[];
}
```

## 🎯 Benefits

- ✅ **Type Safety**: Full TypeScript integration with const assertions
- ✅ **Modularity**: Clear separation between logic and educational content
- ✅ **Testability**: Pure functions easy to unit test
- ✅ **Extensibility**: New algorithms follow established patterns
- ✅ **Maintainability**: Changes isolated to specific concerns

For detailed implementation guidelines, see [CONTRIBUTING.md](../../docs/CONTRIBUTING.md).

For complete architecture overview, see [ARCHITECTURE.md](../../docs/ARCHITECTURE.md).
