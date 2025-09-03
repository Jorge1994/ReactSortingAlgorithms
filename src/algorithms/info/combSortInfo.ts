import type { AlgorithmInfo } from '../../types/algorithmInfo';

export const combSortInfo: AlgorithmInfo = {
  name: 'Comb Sort',
  description: 'Comb Sort is an ingenious improvement over Bubble Sort that addresses one of its major performance bottlenecks: the slow movement of small elements from the end of the array (known as "turtles"). While Bubble Sort only compares adjacent elements, Comb Sort introduces a gap between compared elements, starting with a large gap that gradually shrinks. The gap is typically reduced by a factor of 1.3 each iteration until it reaches 1, at which point the algorithm performs a final Bubble Sort pass. This approach allows small elements to move quickly toward the beginning of the array and large elements to settle toward the end much faster than traditional Bubble Sort. The magic number 1.3 was empirically determined to provide optimal performance across various datasets. Comb Sort demonstrates how a simple modification to Bubble Sort can yield significant performance improvements while maintaining algorithmic simplicity.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    justifications: {
      timeComplexity: {
        best: 'When input is nearly sorted and the gap quickly reduces, comparisons are near linearithmic.',
        average: 'Depends on shrink factor; generally better than bubble sort but can approach quadratic behavior.',
        worst: 'In worst case the algorithm behaves similar to bubble sort with O(n^2) comparisons and swaps.'
      },
      spaceComplexity: {
        best: 'Comb Sort only uses a few counters and indices.',
        average: 'O(1) auxiliary space.',
        worst: 'O(1) auxiliary space.'
      }
    }
  },

  stable: false,
  inPlace: true,
  online: false,

  advantages: ['Faster than bubble sort for many inputs', 'Simple to implement', 'In-place and constant extra memory'],
  disadvantages: ['Not stable', 'Worst-case still O(n²)'],
  useCases: ['Educational comparisons with bubble and shell sorts', 'Small to medium arrays where simplicity is desired'],
  keyCharacteristics: ['Gap-based comparisons', 'Shrinking gap factor (commonly 1.3)'],
  visualizationNotes: {
    colors: {
      comparing: 'Blue bars indicate elements being compared',
      swapping: 'Red bars show elements being swapped',
      sorted: 'Green bars represent elements in final position',
      unsorted: 'Gray bars are unprocessed elements'
    },
    phases: [
      'Initial Setup: Display the unsorted array and set the initial gap to the length of the array. Explain the purpose of the gap — to compare non-adjacent elements and move distant "turtles" quickly.',
      'Choose Shrink Factor: Introduce the shrink factor (commonly 1.3). Demonstrate how the gap will be divided by the shrink factor each pass to gradually focus comparisons.',
      'First Gap Pass: With a large gap, compare elements gap positions apart (index i and i+gap). Visually highlight the pair being compared.',
      'Swap for Out-of-Order Pairs: When a compared pair is out-of-order, swap them and show the immediate visual effect; explain how large gaps move elements faster than adjacent swaps.',
      'Repeat Across Array: Continue these gap-based comparisons across the entire array for the current gap. Count and display comparisons and swaps to emphasise cost.',
      'Gap Reduction: After completing a pass, reduce the gap by dividing by the shrink factor and round/down to integer. Show the new gap value to students and explain why we reduce the gap.',
      'Small Gap Behaviour: As the gap decreases, comparisons become closer (more local). Visualise how previously moved elements now require fewer local swaps to reach final order.',
      'Final Phase (gap == 1): When gap becomes 1, Comb Sort behaves like Bubble Sort — perform adjacent comparisons and swaps until no swaps occur. Emphasise this final clean-up pass.',
      'Sorted Detection: Explain the sorted boolean: we assume sorted when gap==1 and no swaps happened in a full pass; if a swap occurs, another pass is needed. Visualise the iteration that clears remaining disorder.',
      'Marking Sorted Elements: Step-by-step mark elements as sorted when they are in final position (or after final pass). Use green highlighting to show final placements.',
      'Complexity Insights: After the animation, pause and explain how the shrink factor affects comparisons and why Comb Sort often outperforms plain Bubble Sort but can still be O(n²) in the worst case.',
      'Common Variations & Pitfalls: Discuss different shrink factors, rounding choices, and why Comb Sort is not stable (swaps can change relative order of equal keys). Relate these to what was seen in the visualization.'
    ]
  }
};

