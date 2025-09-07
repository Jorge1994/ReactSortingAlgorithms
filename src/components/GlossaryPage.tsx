import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface TechnicalTerm {
  term: string;
  definition: string;
  examples?: string[];
  icon: string;
}

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

export function GlossaryPage() {
  // Function to scroll to top when navigating
  const handleNavigation = () => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              onClick={handleNavigation}
              className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:border-slate-500 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-slate-700/80 shadow-lg hover:shadow-xl mb-8"
            >
              <span className="text-2xl font-bold">←</span>
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-relaxed py-4">
              <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                Technical Glossary
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Understanding key concepts in sorting algorithms. These terms will help you better comprehend 
              algorithm characteristics and performance implications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {technicalTerms.map((term, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/10"
              >
                {/* Background gradient animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/0 to-slate-400/0 group-hover:from-slate-500/5 group-hover:to-slate-400/5 transition-all duration-500 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">{term.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors duration-300">
                        {term.term}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300">
                    {term.definition}
                  </p>
                  
                  {term.examples && (
                    <div className="space-y-3">
                      <h5 className="font-semibold text-slate-400 text-sm uppercase tracking-wide">
                        Examples:
                      </h5>
                      <ul className="space-y-3">
                        {term.examples.map((example, exampleIndex) => (
                          <li 
                            key={exampleIndex}
                            className="text-sm text-slate-400 bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500/50 group-hover:bg-slate-700/70 group-hover:text-slate-300 transition-all duration-300"
                          >
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <h4 className="font-semibold text-blue-200 mb-3 text-lg">Pro Tip</h4>
                <p className="text-blue-100 leading-relaxed">
                  When choosing a sorting algorithm, consider these properties together. For example, 
                  if you need to sort objects and preserve their original order for equal elements, 
                  choose a stable algorithm. If memory is limited, prioritize in-place algorithms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
