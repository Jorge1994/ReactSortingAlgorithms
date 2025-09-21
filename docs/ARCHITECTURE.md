# Project Architecture

This document provides a comprehensive overview of the Sorting Algorithm Visualizer's technical architecture, design patterns, and implementation details.

## 🏗️ High-Level Architecture

The project follows a **Clean Architecture** pattern with strict separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        UI Layer                              │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │    Components   │  │   Visualizers    │  │   Routes    │ │
│  └─────────────────┘  └──────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                   Animation Layer                           │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ Animation Hooks │  │   Step Manager   │  │ State Logic │ │
│  └─────────────────┘  └──────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                   Business Layer                            │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │   Registries    │  │ Algorithm Core   │  │   Types     │ │
│  └─────────────────┘  └──────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                              │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │  Algorithm Info │  │ Implementations  │  │   Utils     │ │
│  └─────────────────┘  └──────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure and Responsibilities

### Core Directories

#### `/src/algorithms/`
**Purpose**: Pure algorithm implementations and metadata
- **`core/`**: Algorithm implementations that generate `SortStep[]` arrays
- **`info/`**: Educational content and theoretical information
- **`registry.ts`**: Maps algorithm keys to executable implementations
- **`infoRegistry.ts`**: Maps algorithm keys to educational content

#### `/src/components/`
**Purpose**: React UI components for visualization and interaction
- **Visualizers**: `ArrayVisualizer.tsx`, `CountingSortVisualizer.tsx`, etc.
- **Controls**: `AnimationControls.tsx`, `ArrayControls.tsx`
- **Layout**: `ModernHeader.tsx`, `Footer.tsx`
- **Educational**: `AlgorithmDetailsPage.tsx`, `ComparisonPage.tsx`

#### `/src/data/`
**Purpose**: Static data and configuration
- **Implementation examples**: Code samples in multiple programming languages
- **Registry**: Central mapping of algorithm keys to implementation examples

#### `/src/types/`
**Purpose**: TypeScript type definitions
- **Core interfaces**: `SortStep`, `SortingAlgorithm`, `AlgorithmInfo`
- **Component props**: Interface definitions for React components

#### `/src/hooks/`
**Purpose**: Custom React hooks for state management and animations
- **Animation logic**: Managing step-by-step visualization
- **State management**: Controlling visualization flow

#### `/src/utils/`
**Purpose**: Helper functions and utilities
- **Array generation**: Creating random test arrays
- **Algorithm icons**: Visual representations for UI

## 🔄 Data Flow Architecture

### Algorithm Execution Flow

```
User Input (Array + Algorithm)
        ↓
Registry Lookup (algorithm key)
        ↓
Algorithm.execute(array)
        ↓
SortStep[] Generation
        ↓
Animation Hook Processing
        ↓
UI Component Rendering
        ↓
Visual Representation
```

### Information Flow

```
Algorithm Key
        ↓
Info Registry Lookup
        ↓
AlgorithmInfo Object
        ↓
Educational Components
        ↓
Formatted Display
```

## 🎯 Key Design Patterns

### 1. Registry Pattern
**Purpose**: Centralized algorithm management with type safety

```typescript
// Implementation Registry
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'quick-sort': quickSortAlgorithm,
  // ...
} as const;

// Usage
const algorithm = getAlgorithm('bubble-sort');
const steps = algorithm.execute([3, 1, 4, 1, 5]);
```

**Benefits**:
- Type-safe algorithm access
- Easy addition of new algorithms
- Centralized algorithm catalog
- Consistent interface across all algorithms

### 2. Factory Pattern
**Purpose**: Consistent algorithm creation with shared structure

```typescript
// Template factory function
export const createSortingAlgorithm = (
  name: string,
  description: string,
  complexity: AlgorithmComplexity,
  executeFunction: (array: number[]) => SortStep[]
): SortingAlgorithm => ({
  name,
  description,
  complexity,
  execute: executeFunction
});

// Usage in algorithm files
export const bubbleSort = createSortingAlgorithm(
  bubbleSortInfo.name,
  bubbleSortInfo.description,
  bubbleSortInfo.complexity,
  bubbleSortSteps
);
```

**Benefits**:
- Consistent algorithm interface
- Shared validation and error handling
- Simplified algorithm creation
- Enforced structure compliance

### 3. Hook Pattern for Animation
**Purpose**: Reusable animation logic across different visualizers

```typescript
// Custom hook for sorting animations
const useSortingAnimation = (algorithm: string, array: number[]) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SortStep[]>([]);
  
  // Animation logic
  return { currentStep, isPlaying, steps, controls };
};

// Usage in components
const ArrayVisualizer = ({ algorithm }) => {
  const { currentStep, isPlaying, steps, controls } = useSortingAnimation(
    algorithm, 
    array
  );
  
  return <div>{/* Visualization JSX */}</div>;
};
```

**Benefits**:
- Reusable animation logic
- Consistent state management
- Isolated complexity
- Easy testing and debugging

### 4. Component Composition
**Purpose**: Flexible UI construction with reusable parts

```typescript
// Composed visualizer structure
<VisualizerTemplate algorithm={algorithm}>
  <ArrayVisualizer algorithm={algorithm} />
  <AnimationControls onPlay={play} onPause={pause} />
  <StatisticsPanel comparisons={stats.comparisons} swaps={stats.swaps} />
  <ColorLegend />
</VisualizerTemplate>
```

**Benefits**:
- Reusable UI components
- Flexible layout composition
- Separation of concerns
- Easy customization

## 🧩 Interface Definitions

### Core Algorithm Interface

```typescript
interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight';
  indices: number[];           // Indices being operated on
  array: number[];            // Current array state
  metadata?: {
    comparisons: number;      // Total comparisons so far
    swaps: number;           // Total swaps so far
    currentPhase?: string;   // Educational phase description
  };
}

interface SortingAlgorithm {
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
  execute: (array: number[]) => SortStep[];
}

interface AlgorithmComplexity {
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
```

### Educational Information Interface

```typescript
interface AlgorithmInfo {
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  keyCharacteristics: string[];
  visualizationNotes: {
    phases: string[];          // Detailed educational phases
  };
}
```

## 🎨 Visualization Architecture

### Color System
The project uses a consistent color scheme across all visualizers:

```typescript
const visualizationColors = {
  comparing: '#3B82F6',    // Blue - elements being compared
  swapping: '#EF4444',     // Red - elements being swapped
  sorted: '#10B981',       // Green - elements in final position
  unsorted: '#6B7280',     // Gray - unprocessed elements
  highlighting: '#F59E0B'   // Amber - special highlighting
};
```

### Animation States
Each visualization step maps to specific visual states:

1. **Compare State**: Highlight elements being compared in blue
2. **Swap State**: Show elements being swapped in red with animation
3. **Sorted State**: Mark elements in final position as green
4. **Highlight State**: Special emphasis for algorithm-specific operations

### Responsive Design
- **Mobile First**: Optimized for touch interfaces
- **Scalable Bars**: Proportional sizing based on screen dimensions
- **Adaptive Controls**: Touch-friendly buttons and sliders
- **Flexible Layout**: Grid system that adapts to different screen sizes

## 🔧 Performance Considerations

### Algorithm Implementation
- **Step Generation**: Balance between educational detail and performance
- **Memory Usage**: Each step stores full array state for visualization
- **Optimization**: Consider step reduction for very large arrays
- **Early Termination**: Support for algorithms that can terminate early

### UI Performance
- **Virtual Scrolling**: For large arrays (planned feature)
- **Animation Throttling**: Smooth 60fps animations
- **Component Memoization**: Prevent unnecessary re-renders
- **Lazy Loading**: Algorithm implementations loaded on demand

### State Management
- **Immutable Updates**: Prevent accidental state mutations
- **Batched Updates**: Group related state changes
- **Memory Cleanup**: Proper cleanup of animation timers
- **Efficient Diffing**: Minimize DOM updates during animations

## 🧪 Testing Strategy

### Unit Testing
- **Algorithm Core**: Test pure functions with various inputs
- **Step Generation**: Verify correct SortStep sequences
- **Edge Cases**: Empty arrays, single elements, duplicates
- **Complexity Validation**: Ensure step counts match theoretical complexity

### Integration Testing
- **Registry System**: Test algorithm lookup and execution
- **Component Integration**: Test props flow and event handling
- **Animation Flow**: Test step progression and state transitions
- **Routing**: Test navigation between algorithm pages

### Visual Testing
- **Cross-Browser**: Ensure consistent rendering
- **Responsive Design**: Test on various screen sizes
- **Animation Smoothness**: Verify 60fps performance
- **Color Accessibility**: Test contrast ratios and color-blind support

## 🔐 Type Safety

### Strict TypeScript Configuration
- **Strict Mode**: All strict TypeScript options enabled
- **No Implicit Any**: Explicit typing required everywhere
- **Strict Null Checks**: Proper null/undefined handling
- **No Unused Variables**: Clean, maintainable codebase

### Registry Type Safety
```typescript
// Type-safe registry with const assertions
export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'quick-sort': quickSortAlgorithm,
} as const;

// Derived types for type safety
export type AlgorithmKey = keyof typeof algorithmRegistry;
export type AlgorithmNames = typeof algorithmRegistry[AlgorithmKey]['name'];
```

### Component Props Interface
```typescript
interface ArrayVisualizerProps {
  algorithm: AlgorithmKey;        // Type-safe algorithm selection
  array: number[];               // Input array
  onStepChange?: (step: number) => void;  // Optional callbacks
  animationSpeed?: number;       // Animation configuration
}
```

## 🚀 Extensibility

### Adding New Algorithms
The architecture supports easy algorithm addition:

1. **Create Implementation**: Pure function in `src/algorithms/core/`
2. **Add Information**: Educational content in `src/algorithms/info/`
3. **Register Both**: Update both registry files
4. **Add Examples**: Code implementations in `src/data/`
5. **UI Automatic**: Existing components automatically support new algorithms

### Custom Visualizers
For algorithms requiring special visualization:

1. **Create Component**: Custom visualizer in `src/components/`
2. **Extend Interface**: Add new SortStep types if needed
3. **Update Routing**: Conditional rendering based on algorithm
4. **Maintain Consistency**: Follow existing UI patterns

### Future Enhancements
Architecture designed to support:
- **Additional Languages**: More code implementation examples
- **Advanced Analytics**: Performance profiling and statistics
- **Interactive Tutorials**: Step-by-step learning modes
- **Algorithm Comparison**: Side-by-side visualization
- **Custom Input**: User-defined arrays and test cases

## 📈 Scalability Considerations

### Algorithm Scale
- **Registry Growth**: Efficient lookups with object maps
- **Memory Management**: Lazy loading of algorithm implementations
- **Code Splitting**: Dynamic imports for large algorithms
- **Caching**: Memoization of expensive computations

### UI Scale
- **Component Library**: Reusable, composable components
- **State Management**: Scalable patterns for complex state
- **Bundle Optimization**: Tree shaking and code splitting
- **Performance Monitoring**: Real-time performance tracking

### Educational Content Scale
- **Content Management**: Structured, maintainable documentation
- **Multi-language Support**: Internationalization ready
- **Content Validation**: Automated checks for consistency
- **Version Control**: Tracked changes in educational content

This architecture provides a solid foundation for the Sorting Algorithm Visualizer while maintaining flexibility for future enhancements and educational improvements.