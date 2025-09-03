import type { AlgorithmInfo } from '../../types';

export const heapSortInfo: AlgorithmInfo = {
  name: 'Heap Sort',
  description: '**Heap Sort** is a comparison-based sorting algorithm that leverages the binary heap data structure to achieve consistent O(n log n) performance. Built upon the foundation of **Selection Sort\'s** concept of repeatedly finding and placing the minimum element, **Heap Sort** dramatically improves efficiency by using a heap to quickly identify the maximum element in each iteration. The algorithm operates in two main phases: first, it transforms the input array into a max heap where each parent node is greater than its children; then, it repeatedly extracts the maximum element (root of the heap) and places it at the end of the array while maintaining the heap property for the remaining elements. This approach combines the best aspects of **merge sort\'s** guaranteed performance with **insertion sort\'s** in-place operation. Unlike **Quick Sort**, **Heap Sort** never degrades beyond O(n log n), making it suitable for real-time systems where predictable performance is crucial.',
  stable: false,
  inPlace: true,
  online: false,
  memoryUsage: 'O(log n) due to recursive call stack. However, auxiliary space can be O(1) for iterative implementation',
  complexity: {
    time: { 
      best: 'O(n log n)', 
      average: 'O(n log n)', 
      worst: 'O(n log n)' 
    },
    space: {
      best: 'O(log n)',
      average: 'O(log n)', 
      worst: 'O(log n)'
    },
    justifications: {
      timeComplexity: {
        best: "Even when the array is already sorted, Heap Sort must build the initial heap (O(n)) and then perform n-1 extract-max operations, each requiring O(log n) time to restore the heap property. This gives O(n log n) total time.",
        average: "The algorithm performs two main phases: building the initial heap takes O(n) time, and extracting n elements from the heap takes O(n log n) time since each extraction requires O(log n) time to heapify. The dominant factor is O(n log n).",
        worst: "The worst case occurs when the heap property is maximally violated after each extraction, requiring the maximum number of comparisons and swaps during heapify operations. However, this still results in O(n log n) time complexity due to the logarithmic height of the heap."
      },
      spaceComplexity: {
        best: "Standard recursive implementation requires O(log n) auxiliary space due to the recursion call stack during heapify operations, with stack depth proportional to the height of the heap.",
        average: "Average case maintains O(log n) space complexity as the heap structure ensures logarithmic depth for all heapify operations.",
        worst: "Worst case also remains O(log n) as the heap height is always logarithmic. Alternative iterative implementation can achieve O(1) auxiliary space complexity by avoiding recursion entirely."
      }
    }
  },
  advantages: [
    "Guaranteed O(n log n) time complexity in all cases - no worst-case degradation",
    "In-place sorting - can achieve O(1) auxiliary space with iterative implementation", 
    "Not dependent on the initial order of elements - consistent performance",
    "Can be used as a building block for other algorithms like heap-based priority queues",
    "Stable performance makes it suitable for real-time systems",
    "Does not require additional memory allocation unlike merge sort"
  ],
  disadvantages: [
    "Not a stable sort - equal elements may be reordered relative to their original positions",
    "Generally slower than quicksort in practice despite same average complexity",
    "Poor cache locality due to heap structure access patterns",
    "More complex to implement correctly than simpler algorithms",
    "The constant factors in the O(n log n) complexity are relatively high",
    "Not adaptive - doesn't take advantage of existing order in the input"
  ],
  useCases: [
    "When guaranteed O(n log n) performance is required regardless of input",
    "In memory-constrained environments where O(1) space complexity is crucial",
    "For implementing priority queues and heap-based data structures",
    "In real-time systems where predictable performance is essential",
    "When you need an in-place sort with good worst-case guarantees",
    "As part of hybrid sorting algorithms for specific ranges"
  ],
  keyCharacteristics: [
    "Uses a binary heap data structure built within the original array",
    "Two-phase algorithm: heap construction followed by repeated extraction",
    "Each extraction maintains the heap property through heapification",
    "Parent-child relationships follow the heap property (parent ≥ children for max heap)",
    "The heap shrinks with each extraction until only one element remains",
    "Heapify operation has O(log n) complexity due to tree height"
  ],
  visualizationNotes: {
    colors: { 
      comparing: '#3B82F6',  // Blue - elements being compared
      swapping: '#EF4444',   // Red - elements being swapped  
      sorted: '#10B981',     // Green - elements in final sorted position
      unsorted: '#6B7280'    // Gray - unprocessed elements
    },
    phases: [
      "Initial Array: The unsorted input array is displayed with all elements in gray, ready to be transformed into a heap structure",
      
      "Understanding Heap Structure: Visualize how the array represents a binary heap where for index i, left child is at 2i+1 and right child is at 2i+2",
      
      "Building Max Heap: Starting from the last non-leaf node (index n/2-1), perform heapify operations going backwards to index 0",

      "Heapify Process: For each node, compare with its children and swap with the larger child if heap property is violated, then recursively heapify affected subtree",

      "Heap Property Verification: Ensure every parent node is greater than or equal to its children, creating a complete max heap structure",

      "Heap Construction Complete: The array now represents a valid max heap with the largest element at the root (index 0)",

      "Extract Maximum: Move the root element (maximum) to the end of the array, effectively placing it in its final sorted position",

      "Reduce Heap Size: Decrease the heap size by 1, excluding the newly sorted element from further heap operations",

      "Restore Heap Property: Place the last heap element at the root and heapify downward to restore the max heap property",

      "Heapify Downward: Compare the new root with its children and swap with the larger child, continuing until heap property is restored",

      "Iteration Continue: Repeat the extract-maximum process for the remaining heap elements, gradually building the sorted region",

      "Heap Shrinkage: With each extraction, the heap gets smaller while the sorted region at the end grows larger",

      "Final Extractions: Continue until only one element remains in the heap, which is automatically in its correct position",
      
      "Sorting Complete: All elements are now in their final sorted positions, displayed in green to indicate the successful completion of heap sort"
    ]
  }
};
