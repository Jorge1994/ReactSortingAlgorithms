import { useState } from 'react';
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
      staggerChildren: 0.05
    }
  }
};

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Algorithm",
    definition: "A step-by-step procedure or formula for solving a problem. In sorting, it's a systematic method for arranging elements in a specific order.",
    category: "General",
    examples: ["Bubble Sort", "Quick Sort", "Merge Sort"],
    relatedTerms: ["Complexity", "Efficiency", "Implementation"]
  },
  {
    term: "Big O Notation",
    definition: "A mathematical notation used to describe the limiting behavior of a function when the argument tends towards a particular value or infinity. It describes the worst-case scenario for algorithm performance.",
    category: "Complexity",
    examples: ["O(n)", "O(n log n)", "O(n²)"],
    relatedTerms: ["Time Complexity", "Space Complexity", "Asymptotic Analysis"]
  },
  {
    term: "Comparison-based Sorting",
    definition: "Sorting algorithms that work by comparing elements and making decisions based on these comparisons. They have a theoretical lower bound of O(n log n) for average case.",
    category: "Algorithm Types",
    examples: ["Quick Sort", "Merge Sort", "Heap Sort"],
    relatedTerms: ["Non-comparison Sorting", "Decision Tree", "Lower Bound"]
  },
  {
    term: "Divide and Conquer",
    definition: "An algorithmic paradigm that solves a problem by breaking it into smaller subproblems, solving them recursively, and combining their solutions.",
    category: "Paradigms",
    examples: ["Merge Sort", "Quick Sort"],
    relatedTerms: ["Recursion", "Subproblem", "Merge"]
  },
  {
    term: "In-place Sorting",
    definition: "A sorting algorithm that uses only a constant amount of additional memory space beyond the input array. The sorting is done within the original array.",
    category: "Memory Usage",
    examples: ["Bubble Sort", "Selection Sort", "Quick Sort"],
    relatedTerms: ["Space Complexity", "Memory Efficient", "Auxiliary Space"]
  },
  {
    term: "Stable Sorting",
    definition: "A sorting algorithm that maintains the relative order of records with equal keys. If two elements are equal, their original order is preserved.",
    category: "Properties",
    examples: ["Merge Sort", "Bubble Sort", "Insertion Sort"],
    relatedTerms: ["Unstable Sorting", "Relative Order", "Equal Elements"]
  },
  {
    term: "Time Complexity",
    definition: "A measure of the amount of time an algorithm takes to complete as a function of the input size. It describes how runtime scales with input size.",
    category: "Complexity",
    examples: ["O(1) - Constant", "O(n) - Linear", "O(n²) - Quadratic"],
    relatedTerms: ["Big O Notation", "Runtime Analysis", "Asymptotic Behavior"]
  },
  {
    term: "Space Complexity",
    definition: "A measure of the amount of memory space an algorithm uses as a function of the input size, including both the space for the input and any auxiliary space.",
    category: "Complexity",
    examples: ["O(1) - Constant space", "O(n) - Linear space", "O(log n) - Logarithmic space"],
    relatedTerms: ["Auxiliary Space", "In-place", "Memory Usage"]
  },
  {
    term: "Pivot",
    definition: "An element chosen from the array in partition-based sorting algorithms like Quick Sort. The array is rearranged so elements smaller than the pivot come before it.",
    category: "Techniques",
    examples: ["Quick Sort pivot selection", "Median-of-three pivot"],
    relatedTerms: ["Partitioning", "Quick Sort", "Divide and Conquer"]
  },
  {
    term: "Merge",
    definition: "The process of combining two or more sorted sequences into a single sorted sequence while maintaining the sorted order.",
    category: "Techniques",
    examples: ["Merge Sort merging step", "Two-way merge", "Multi-way merge"],
    relatedTerms: ["Merge Sort", "Divide and Conquer", "Sorted Subsequences"]
  },
  {
    term: "Heap",
    definition: "A specialized tree-based data structure that satisfies the heap property. In a max heap, parent nodes are greater than their children.",
    category: "Data Structures",
    examples: ["Binary Heap", "Max Heap", "Min Heap"],
    relatedTerms: ["Heap Sort", "Priority Queue", "Binary Tree"]
  },
  {
    term: "Adaptive Algorithm",
    definition: "An algorithm that performs better on inputs that are already partially sorted. It takes advantage of existing order in the data.",
    category: "Properties",
    examples: ["Insertion Sort", "Bubble Sort with early termination"],
    relatedTerms: ["Best Case", "Partially Sorted", "Early Termination"]
  },
  {
    term: "Non-comparison Sorting",
    definition: "Sorting algorithms that don't rely on comparing elements but use other properties like the actual values or their distribution.",
    category: "Algorithm Types",
    examples: ["Counting Sort", "Radix Sort", "Bucket Sort"],
    relatedTerms: ["Linear Time", "Integer Sorting", "Distribution Sort"]
  },
  {
    term: "Recursion",
    definition: "A programming technique where a function calls itself to solve smaller instances of the same problem until reaching a base case.",
    category: "Techniques",
    examples: ["Merge Sort recursive calls", "Quick Sort partitioning"],
    relatedTerms: ["Base Case", "Stack Overflow", "Divide and Conquer"]
  },
  {
    term: "Worst Case",
    definition: "The scenario that causes an algorithm to take the maximum possible time or space. Used to analyze the upper bound of algorithm performance.",
    category: "Analysis",
    examples: ["Quick Sort: O(n²) with poor pivot", "Bubble Sort: O(n²) reverse sorted"],
    relatedTerms: ["Best Case", "Average Case", "Big O Notation"]
  },
  {
    term: "Best Case",
    definition: "The scenario that causes an algorithm to perform optimally, taking the minimum possible time or space for the given input size.",
    category: "Analysis",
    examples: ["Insertion Sort: O(n) already sorted", "Bubble Sort: O(n) already sorted"],
    relatedTerms: ["Worst Case", "Average Case", "Adaptive Algorithm"]
  },
  {
    term: "Average Case",
    definition: "The expected performance of an algorithm over all possible inputs of a given size, typically calculated using probabilistic analysis.",
    category: "Analysis",
    examples: ["Quick Sort: O(n log n) random input", "Hash table: O(1) average lookup"],
    relatedTerms: ["Expected Value", "Probabilistic Analysis", "Random Input"]
  },
  {
    term: "Partitioning",
    definition: "The process of rearranging array elements around a pivot such that elements smaller than the pivot come before it and larger elements come after.",
    category: "Techniques",
    examples: ["Quick Sort partitioning", "Lomuto partition", "Hoare partition"],
    relatedTerms: ["Pivot", "Quick Sort", "Two Pointers"]
  },
  {
    term: "External Sorting",
    definition: "Sorting algorithms designed for data that doesn't fit in main memory and must be stored on external storage devices like hard drives.",
    category: "Specialized",
    examples: ["External Merge Sort", "Polyphase Sort"],
    relatedTerms: ["Internal Sorting", "Secondary Storage", "I/O Complexity"]
  },
  {
    term: "Locality of Reference",
    definition: "The tendency of a processor to access the same set of memory locations repetitively over a short period of time, affecting cache performance.",
    category: "Performance",
    examples: ["Sequential access patterns", "Merge Sort cache efficiency"],
    relatedTerms: ["Cache Performance", "Spatial Locality", "Temporal Locality"]
  }
];

const categories = Array.from(new Set(glossaryTerms.map(term => term.category))).sort();

export function GlossaryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="relative py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-teal-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-8"
            >
              ← Back to Home
            </Link>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              Technical Glossary
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive dictionary of computer science and algorithm terminology 
              with clear definitions and practical examples
            </p>
          </motion.div>
        </div>
      </header>

      {/* Search and Filter Controls */}
      <section className="py-8 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                🔍
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {filteredTerms.map((termData) => (
              <motion.div
                key={termData.term}
                variants={fadeInUp}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="lg:flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-slate-200">
                        {termData.term}
                      </h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-teal-600/20 to-green-600/20 text-teal-400 rounded-full text-sm font-medium border border-teal-600/30">
                        {termData.category}
                      </span>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {termData.definition}
                    </p>

                    {termData.examples && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-400 mb-2">Examples:</h4>
                        <div className="flex flex-wrap gap-2">
                          {termData.examples.map((example, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-sm"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {termData.relatedTerms && (
                      <div>
                        <h4 className="text-sm font-semibold text-slate-400 mb-2">Related Terms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {termData.relatedTerms.map((related, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSearchTerm(related)}
                              className="px-3 py-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-teal-600 hover:to-green-600 text-slate-300 hover:text-white rounded-lg text-sm transition-all duration-200"
                            >
                              {related}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredTerms.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">No terms found</h3>
              <p className="text-slate-400">
                Try adjusting your search or selecting a different category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
