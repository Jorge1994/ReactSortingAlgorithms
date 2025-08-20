# Sorting Algorithm Visualizer - AI Coding Instructions

## Project Overview
React-based sorting algorithm visualizer with strict separation between algorithm logic and UI. Uses TypeScript, Vite, Tailwind CSS, React Router, and Framer Motion for educational visualization of sorting algorithms.

## Core Architecture Principles

### Modular Separation Pattern
- **Algorithm Core** (`src/algorithms/core/`): Pure algorithm implementations that generate visualization steps
- **UI Components** (`src/components/`): Only handle visualization and user interaction  
- **Animation Engine** (`src/hooks/useAnimationEngine.ts`): Bridges algorithm steps to UI rendering
- **Registry System** (`src/algorithms/registry.ts`): Centralized algorithm management

### Key Interfaces
```typescript
// Every algorithm must implement this pattern
interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight';
  indices: number[];
  array: number[];
  metadata?: { comparisons: number; swaps: number; currentPhase?: string };
}

interface SortingAlgorithm {
  name: string;
  execute: (array: number[]) => SortStep[];
  complexity: { time: { best: string; average: string; worst: string }; space: string };
}
```

## Development Workflow

### Setup Commands (PowerShell)
```powershell
# Project folder "Sorting" already exists with documentation
# Initialize React project in current directory
npm create vite@latest . -- --template react-ts
npm install react-router-dom framer-motion
npm install -D tailwindcss postcss autoprefixer @types/react-router-dom
npx tailwindcss init -p
npm run dev
```

### Algorithm Implementation Pattern
1. Create pure algorithm in `src/algorithms/core/[algorithm].ts`
2. Use `createSortingAlgorithm` factory function
3. Generate `SortStep[]` array for visualization
4. Register in `src/algorithms/registry.ts`
5. UI automatically supports new algorithm

### Color System (Tailwind Custom)
- `comparing: '#3B82F6'` (Blue) - Elements being compared
- `swapping: '#EF4444'` (Red) - Elements being swapped
- `sorted: '#10B981'` (Green) - Elements in final position
- `unsorted: '#6B7280'` (Gray) - Unprocessed elements

## Component Patterns

### Reusable Templates
- `AlgorithmInfo`: Template for algorithm documentation pages (complexity, Python code, advantages)
- `SortingVisualizer`: Accepts algorithm name as prop, renders any registered algorithm
- `CodeBlock`: Syntax-highlighted Python implementations for educational content

### Routing Structure
- `/` - Home with algorithm selector
- `/algorithm/:name` - Educational content template
- `/visualize/:name` - Visualization with controls

### Data Flow
```
User Input → Algorithm Registry → Algorithm.execute() → SortStep[] → useAnimationEngine → UI Components
```

## Testing Strategy
- Algorithm core logic is pure functions - easily unit testable
- UI components receive step data as props - testable in isolation
- Animation engine state management separate from algorithm logic

## File Organization
Never mix algorithm logic with UI concerns. Algorithm files should have zero React dependencies. Use the registry pattern to keep algorithms discoverable and the factory pattern to ensure consistent interfaces.

## Answering User Queries
All the code, functions, variables, strings, comments, and the documentation must be written in English.
The answers to the user in the chat must be in Portuguese from Portugal.
All the text in UI must be in English.
Whenever possible, maintain a modular code structure by splitting functionality into smaller, well-organized components, and avoid large monolithic files.
Do not change the UI, unless as a last resort to fix a critical issue or asked explicitly.