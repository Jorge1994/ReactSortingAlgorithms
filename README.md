# Sorting Algorithm Visualizer

A React-based interactive web application that visualizes sorting algorithms through animated color-coded bars, making it easy to understand how different sorting algorithms work step by step.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Features

### Visual Learning
- **Proportional bars**: Each number represented by a bar with height proportional to its value
- **Color-coded operations**:
  - 🔵 **Blue**: Elements being compared
  - 🔴 **Red**: Elements being swapped/moved
  - 🟢 **Green**: Elements in final sorted position
  - ⚪ **Gray**: Unprocessed elements

### Supported Algorithms
- **Simple Algorithms**: Bubble Sort, Selection Sort, Insertion Sort
- **Advanced Algorithms**: Merge Sort, Quick Sort, Heap Sort
- **Specialized Algorithms**: Bucket Sort, Counting Sort, Radix Sort
- **Exotic Algorithms**: Bogo Sort, Bitonic Sort, Shell Sort, and more

### Interactive Controls
- Play/Pause/Reset controls
- Step-by-step execution
- Adjustable animation speed
- Customizable array size (10-100 elements)
- Random array generation

### Educational Content
- Detailed algorithm descriptions
- Time and space complexity analysis
- Code implementations in multiple languages
- Advantages, disadvantages, and use cases
- Algorithm comparison tables

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sorting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

## 🏗️ Project Structure

```
src/
├── algorithms/          # Algorithm implementations and info
│   ├── core/           # Pure algorithm logic (generates SortSteps)
│   ├── info/           # Educational content and metadata
│   ├── registry.ts     # Algorithm implementation registry
│   └── infoRegistry.ts # Algorithm information registry
├── components/         # React UI components
│   ├── *Visualizer.tsx # Algorithm-specific visualizers
│   ├── ArrayVisualizer.tsx # Standard array visualization
│   └── ...
├── data/              # Implementation examples and configurations
├── hooks/             # Custom React hooks for animations
├── types/             # TypeScript type definitions
└── utils/             # Helper functions and utilities
```

## 🎨 Architecture

The project follows a **clean separation architecture**:

- **Algorithm Core**: Pure functions that generate visualization steps
- **UI Components**: Handle visualization and user interaction
- **Animation Engine**: Bridges algorithm steps to UI rendering
- **Registry System**: Centralized algorithm management

This design ensures:
- ✅ **Modularity**: Easy to add new algorithms
- ✅ **Testability**: Pure functions for algorithm logic
- ✅ **Maintainability**: Separation of concerns
- ✅ **Type Safety**: Full TypeScript integration

## 📚 Documentation

- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Guide for adding new algorithms
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Detailed technical architecture
- **[src/algorithms/README.md](src/algorithms/README.md)** - Algorithm system overview

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for:
- How to add new sorting algorithms
- Code style guidelines
- Development workflow
- Testing requirements

### Quick Algorithm Addition
1. Implement in `src/algorithms/core/`
2. Add information in `src/algorithms/info/`
3. Register in both registries
4. Add code examples in `src/data/`

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Routing**: React Router
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier

## 📊 Supported Algorithms

| Algorithm | Time Complexity | Space | Stable | Visualizer |
|-----------|----------------|-------|--------|------------|
| Bubble Sort | O(n²) | O(1) | ✅ | Standard |
| Selection Sort | O(n²) | O(1) | ❌ | Standard |
| Insertion Sort | O(n²) | O(1) | ✅ | Standard |
| Merge Sort | O(n log n) | O(n) | ✅ | Standard |
| Quick Sort | O(n log n) | O(log n) | ❌ | Standard |
| Heap Sort | O(n log n) | O(1) | ❌ | Standard |
| Counting Sort | O(n + k) | O(k) | ✅ | Specialized |
| Radix Sort | O(nk) | O(n + k) | ✅ | Specialized |
| Bucket Sort | O(n + k) | O(n) | ✅ | Specialized |

## 📖 Educational Use

This tool is designed for:
- Computer Science students learning sorting algorithms
- Educators teaching algorithm analysis
- Self-learners exploring data structures and algorithms
- Anyone curious about how sorting works under the hood

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Algorithm implementations based on standard computer science literature
- Color scheme inspired by educational visualization principles
- Built with modern React ecosystem best practices