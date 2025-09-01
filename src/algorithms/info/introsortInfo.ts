import type { AlgorithmInfo } from '../../types';

export const introsortInfo: AlgorithmInfo = {
  name: 'Intro Sort',
  description: 'Introspective Sort (Introsort) is a hybrid sorting algorithm that provides both fast average performance and excellent worst-case performance. It begins with quicksort and switches to heapsort when the recursion depth exceeds a level based on the number of elements being sorted. For small arrays, it uses insertion sort. This design makes it ideal for real-world applications where performance guarantees are important.',
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
        best: "Achieves O(n log n) in the best case through efficient quicksort partitioning with median-of-three pivot selection, minimizing the number of comparisons needed when the array is well-distributed.",
        average: "Maintains O(n log n) average performance by primarily using quicksort, which has excellent cache performance and low constant factors, while the median-of-three pivot selection helps avoid common worst-case scenarios.",
        worst: "Guarantees O(n log n) worst-case performance by monitoring recursion depth and switching to heapsort when the depth exceeds 2×log₂(n), preventing quicksort's O(n²) worst case from ever occurring."
      },
      spaceComplexity: {
        best: "Uses O(log n) space for the recursion stack when quicksort efficiently partitions well-balanced subarrays, requiring minimal recursive calls.",
        average: "Maintains O(log n) space complexity through controlled recursion depth, with the algorithm primarily using quicksort's logarithmic stack depth.",
        worst: "Guarantees O(log n) space by limiting recursion depth to 2×log₂(n) before switching to heapsort, which operates in-place with O(1) additional space."
      }
    }
  },
  stable: false,
  inPlace: true,
  online: false,
  memoryUsage: "Uses logarithmic space for recursion stack with depth limit guarantees",
  advantages: [
    "Guaranteed O(n log n) worst-case performance while maintaining excellent average-case speed",
    "Adaptive algorithm that chooses the best sorting strategy based on input characteristics",
    "Used in real-world standard libraries (C++ std::sort, .NET Array.Sort) due to its reliability",
    "Combines the strengths of three different algorithms: quicksort, heapsort, and insertion sort",
    "Excellent cache performance due to primary use of quicksort with its good locality of reference",
    "Median-of-three pivot selection reduces the likelihood of poor pivot choices",
    "Automatic optimization for small arrays through insertion sort threshold"
  ],
  disadvantages: [
    "More complex implementation compared to simple algorithms like quicksort or heapsort alone",
    "Slightly higher constant factors due to algorithm switching overhead",
    "Not a stable sort (relative order of equal elements may change)",
    "Recursive nature may cause stack overflow on very large datasets without proper implementation",
    "The depth limit calculation and algorithm switching add computational overhead"
  ],
  useCases: [
    "General-purpose sorting in production systems where both speed and reliability are required",
    "Standard library implementations where worst-case guarantees are essential",
    "Systems programming where predictable performance is more important than optimal average case",
    "Large-scale data processing where occasional worst-case scenarios must be avoided",
    "Real-time systems that require bounded execution time guarantees",
    "Sorting implementations in high-performance computing environments"
  ],
  keyCharacteristics: [
    "Hybrid approach combining three different sorting algorithms strategically",
    "Introspective design that monitors its own performance and adapts accordingly",
    "Depth-limited recursion prevents stack overflow and performance degradation",
    "Threshold-based optimization using insertion sort for small subarrays (typically ≤ 16 elements)",
    "Median-of-three pivot selection improves partitioning quality in quicksort phase",
    "Seamless transitions between algorithms without losing sorted progress",
    "Industry-standard algorithm used in major programming language libraries"
  ],
  visualizationNotes: {
    colors: { 
      comparing: '#3B82F6',    // Blue for comparisons
      swapping: '#EF4444',     // Red for swaps  
      sorted: '#10B981',       // Green for sorted elements
      unsorted: '#6B7280'      // Gray for unsorted elements
    },
    phases: [
      "Initialization: Calculate depth limit (2 × log₂(n)) to prevent worst-case quicksort behavior",
      "Algorithm Selection: Choose sorting method based on subarray size and recursion depth",
      "Quicksort Phase: Use median-of-three pivot selection for efficient partitioning",
      "Partition Process: Move elements smaller than pivot to left, larger to right",
      "Depth Monitoring: Track recursion depth to detect potential performance degradation", 
      "Heapsort Transition: Switch to heapsort when depth limit reached to guarantee O(n log n)",
      "Heap Construction: Build max-heap structure for guaranteed logarithmic performance",
      "Heap Extraction: Extract maximum elements one by one to complete sorting",
      "Small Array Detection: Identify subarrays with 16 or fewer elements",
      "Insertion Sort Optimization: Use insertion sort for small subarrays due to low overhead",
      "Sequential Insertion: Insert each element into its correct position within sorted portion",
      "Recursive Subdivision: Divide larger problems into smaller, more manageable subproblems",
      "Performance Guarantee: Maintain O(n log n) bound regardless of input distribution",
      "Cache Optimization: Leverage quicksort's excellent memory locality for performance",
      "Adaptive Behavior: Algorithm automatically adjusts strategy based on runtime conditions",
      "Final Verification: Ensure all elements are properly positioned in sorted order"
    ]
  }
};
