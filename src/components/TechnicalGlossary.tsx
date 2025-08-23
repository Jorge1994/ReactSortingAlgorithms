interface TechnicalTerm {
  term: string;
  definition: string;
  examples?: string[];
  icon: string;
}

interface TechnicalGlossaryProps {
  isExpanded?: boolean;
}

/**
 * Component to display technical terms and definitions related to sorting algorithms
 * Uses the same expandable style as other sections for consistency
 */
export function TechnicalGlossary({ isExpanded = false }: TechnicalGlossaryProps) {
  const technicalTerms: TechnicalTerm[] = [
    {
      term: "Stable Sorting Algorithm",
      definition: "A sorting algorithm is stable if it preserves the relative order of equal elements. When two elements have the same key value, a stable sort ensures that the element that appeared first in the original array will also appear first in the sorted array.",
      examples: [
        "If you sort students by grade, stable sorting ensures students with the same grade maintain their original alphabetical order",
        "Bubble Sort is stable because it only swaps adjacent elements when the left > right",
        "Selection Sort is not stable because it can move an element over other equal elements during swapping"
      ],
      icon: "⚖️"
    },
    {
      term: "In-Place Sorting Algorithm",
      definition: "An in-place sorting algorithm sorts the elements within the original array without requiring additional memory proportional to the input size. It uses only a constant amount O(1) of extra memory space for variables like loop counters and temporary storage for swaps.",
      examples: [
        "Bubble Sort is in-place because it only needs a few variables for swapping and loop control",
        "Selection Sort is in-place as it only requires variables to track the minimum element index",
        "Merge Sort is NOT in-place because it requires O(n) additional space for merging arrays"
      ],
      icon: "💾"
    },
    {
      term: "Big O Notation",
      definition: "Big O notation is a mathematical notation used to describe the upper bound of an algorithm's growth rate. It expresses how the runtime or space requirements of an algorithm scale with the input size (n), focusing on the worst-case scenario and ignoring constant factors and lower-order terms.",
      examples: [
        "O(1) means constant time - performance doesn't change with input size",
        "O(n) means linear growth - doubling input size doubles the time",
        "O(n²) means quadratic growth - doubling input size quadruples the time",
        "O(log n) means logarithmic growth - very efficient, even for large inputs",
        "Big O helps compare algorithms independently of hardware or implementation details"
      ],
      icon: "📈"
    },
    {
      term: "Time Complexity",
      definition: "Time complexity describes how the runtime of an algorithm grows relative to the size of the input (n). It's expressed using Big O notation to show the worst-case, average-case, and best-case scenarios.",
      examples: [
        "O(1) - Constant time: accessing an array element",
        "O(n) - Linear time: searching through an unsorted array",
        "O(n²) - Quadratic time: nested loops processing each pair of elements",
        "O(log n) - Logarithmic time: binary search in a sorted array"
      ],
      icon: "⏱️"
    },
    {
      term: "Space Complexity",
      definition: "Space complexity measures the amount of additional memory an algorithm needs relative to the input size. It includes memory for variables, data structures, and function call stacks, but excludes the input data itself.",
      examples: [
        "O(1) - Constant space: using only a few variables regardless of input size",
        "O(n) - Linear space: creating an array or list proportional to input size",
        "O(log n) - Logarithmic space: recursive algorithms with balanced call stacks"
      ],
      icon: "🗃️"
    },
    {
      term: "Adaptive Algorithm",
      definition: "An adaptive sorting algorithm performs better (faster) when the input is already partially sorted. It can detect and take advantage of existing order in the data to reduce the number of operations needed.",
      examples: [
        "Bubble Sort with early termination is adaptive - it stops when no swaps are needed",
        "Insertion Sort is highly adaptive - nearly sorted arrays require fewer shifts",
        "Selection Sort is not adaptive - it always performs the same number of comparisons"
      ],
      icon: "🔄"
    },
    {
      term: "Comparison-Based Sorting",
      definition: "A comparison-based sorting algorithm sorts elements by comparing them using a comparison operator (like <, >, or =). The sorting decision is made based solely on the relative order determined by these comparisons.",
      examples: [
        "Bubble Sort compares adjacent elements to decide whether to swap",
        "Selection Sort compares elements to find the minimum",
        "Non-comparison sorts like Counting Sort use element values directly, not comparisons"
      ],
      icon: "🔍"
    },
    {
      term: "Online Algorithm",
      definition: "An online algorithm can process input data as it arrives, without needing to see the entire dataset beforehand. For sorting, this means the algorithm can start sorting elements before all data has been received.",
      examples: [
        "Insertion Sort is online - you can insert new elements into an already sorted portion",
        "Selection Sort is not online - it needs to scan the entire unsorted portion to find the minimum",
        "Useful for real-time data processing and streaming applications"
      ],
      icon: "📡"
    },
    {
      term: "Best/Average/Worst Case Analysis",
      definition: "Performance analysis considers three scenarios: best case (optimal input), average case (typical input), and worst case (most challenging input). Each scenario can have different time and space complexity.",
      examples: [
        "Bubble Sort: Best O(n) when already sorted, Worst O(n²) when reverse sorted",
        "Insertion Sort: Best O(n) for sorted arrays, Worst O(n²) for reverse sorted",
        "Selection Sort: Always O(n²) regardless of input - no best/worst case difference"
      ],
      icon: "📊"
    },
    {
      term: "Internal vs External Sorting",
      definition: "Internal sorting works entirely in main memory (RAM), while external sorting handles datasets too large for memory by using secondary storage (disk). Internal sorting is faster but limited by available RAM.",
      examples: [
        "Internal: Sorting 1000 numbers in RAM using Bubble Sort",
        "External: Sorting millions of records that don't fit in memory, requiring disk I/O",
        "Most educational sorting algorithms assume internal sorting"
      ],
      icon: "💿"
    },
    {
      term: "Iterative vs Recursive Implementation",
      definition: "Iterative algorithms use loops to repeat operations, while recursive algorithms call themselves with smaller subproblems. Both approaches can solve the same problems but have different memory and performance characteristics.",
      examples: [
        "Iterative: Using for/while loops like in Bubble Sort and Selection Sort",
        "Recursive: Algorithm calls itself with smaller arrays (common in Merge Sort)",
        "Iterative typically uses less memory (no function call stack)"
      ],
      icon: "🔄"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Content - only show if expanded */}
      {isExpanded && (
        <div className="p-8 space-y-6 bg-gradient-to-br from-slate-50 to-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Technical Glossary</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Understanding key concepts in sorting algorithms. These terms will help you better comprehend 
              algorithm characteristics and performance implications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technicalTerms.map((term, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-xl">{term.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">
                      {term.term}
                    </h4>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-4">
                  {term.definition}
                </p>
                
                {term.examples && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">
                      Examples:
                    </h5>
                    <ul className="space-y-2">
                      {term.examples.map((example, exampleIndex) => (
                        <li 
                          key={exampleIndex}
                          className="text-sm text-slate-600 bg-slate-100 rounded-lg p-3 border-l-4 border-indigo-500"
                        >
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Pro Tip</h4>
                <p className="text-blue-700 leading-relaxed">
                  When choosing a sorting algorithm, consider these properties together. For example, 
                  if you need to sort objects and preserve their original order for equal elements, 
                  choose a stable algorithm. If memory is limited, prioritize in-place algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
