import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { algorithmRegistry, type AlgorithmKey } from '../algorithms/registry';
import { algorithmInfoRegistry } from '../algorithms/infoRegistry';
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

export function ComparisonPage() {
  const algorithms = Object.keys(algorithmRegistry) as AlgorithmKey[];

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'o(n)':
        return 'text-green-400 bg-green-900/20';
      case 'o(n log n)':
        return 'text-blue-400 bg-blue-900/20';
      case 'o(n²)':
      case 'o(n^2)':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'o(n³)':
      case 'o(n^3)':
        return 'text-orange-400 bg-orange-900/20';
      case 'o(2^n)':
        return 'text-red-400 bg-red-900/20';
      case 'o(1)':
        return 'text-emerald-400 bg-emerald-900/20';
      case 'o(k)':
        return 'text-teal-400 bg-teal-900/20';
      default:
        return 'text-slate-400 bg-slate-900/20';
    }
  };

  const getStabilityColor = (algorithm: AlgorithmKey) => {
    const stableAlgorithms = ['bubble-sort', 'insertion-sort', 'merge-sort', 'counting-sort', 'radix-sort', 'tim-sort'];
    return stableAlgorithms.includes(algorithm) 
      ? 'text-green-400 bg-green-900/20' 
      : 'text-red-400 bg-red-900/20';
  };

  const getStabilityText = (algorithm: AlgorithmKey) => {
    const stableAlgorithms = ['bubble-sort', 'insertion-sort', 'merge-sort', 'counting-sort', 'radix-sort', 'tim-sort'];
    return stableAlgorithms.includes(algorithm) ? 'Stable' : 'Unstable';
  };

  const algorithmCategories = {
    'Simple Sorting': ['bubble-sort', 'selection-sort', 'insertion-sort'],
    'Efficient Sorting': ['quick-sort', 'merge-sort', 'heap-sort'],
    'Specialized Sorting': ['counting-sort', 'radix-sort', 'bucket-sort'],
    'Advanced Sorting': ['shell-sort', 'tim-sort', 'introsort']
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="relative py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Algorithm Comparison
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive analysis and comparison of sorting algorithm performance characteristics, 
              complexity, and practical applications
            </p>
          </motion.div>
        </div>
      </header>

      {/* Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-700 to-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold text-slate-200">Algorithm</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-slate-200">Best Case</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-slate-200">Average Case</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-slate-200">Worst Case</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-slate-200">Space</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-slate-200">Stability</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-slate-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithms.map((algorithm, index) => {
                    const info = algorithmInfoRegistry[algorithm];
                    const complexity = info?.complexity || algorithmRegistry[algorithm].complexity;
                    
                    return (
                      <motion.tr
                        key={algorithm}
                        className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            <span className="font-semibold text-slate-200">
                              {algorithmRegistry[algorithm].name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.time.best)}`}>
                            {complexity.time.best}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.time.average)}`}>
                            {complexity.time.average}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.time.worst)}`}>
                            {complexity.time.worst}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(
                            typeof complexity.space === 'string' ? complexity.space : complexity.space.worst
                          )}`}>
                            {typeof complexity.space === 'string' ? complexity.space : complexity.space.worst}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStabilityColor(algorithm)}`}>
                            {getStabilityText(algorithm)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            to={`/visualize/${algorithm}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
                          >
                            Visualize
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Performance Analysis
            </h2>
            <p className="text-lg text-slate-300">
              Understanding the practical implications of different complexity classes
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {Object.entries(algorithmCategories).map(([category, algorithms]) => (
              <motion.div
                key={category}
                variants={fadeInUp}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-200"
              >
                <h3 className="text-xl font-bold mb-4 text-slate-200">{category}</h3>
                <div className="space-y-3">
                  {algorithms.map((algorithm) => (
                    <div key={algorithm} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">
                        {algorithmRegistry[algorithm as AlgorithmKey].name}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        getComplexityColor(algorithmRegistry[algorithm as AlgorithmKey].complexity.time.average)
                      }`}>
                        {algorithmRegistry[algorithm as AlgorithmKey].complexity.time.average}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Complexity Legend */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">
              Complexity Reference Guide
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Time Complexity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(1)')}`}>
                      O(1)
                    </span>
                    <span className="text-slate-400">Constant time - Best possible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(n)')}`}>
                      O(n)
                    </span>
                    <span className="text-slate-400">Linear time - Excellent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(n log n)')}`}>
                      O(n log n)
                    </span>
                    <span className="text-slate-400">Log-linear time - Good</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(n²)')}`}>
                      O(n²)
                    </span>
                    <span className="text-slate-400">Quadratic time - Fair</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(2^n)')}`}>
                      O(2^n)
                    </span>
                    <span className="text-slate-400">Exponential time - Poor</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Algorithm Properties</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 bg-green-900/20 px-3 py-1 rounded-full text-sm font-semibold">
                      Stable
                    </span>
                    <span className="text-slate-400">Preserves relative order of equal elements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 bg-red-900/20 px-3 py-1 rounded-full text-sm font-semibold">
                      Unstable
                    </span>
                    <span className="text-slate-400">May change relative order of equal elements</span>
                  </div>
                  <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <strong className="text-slate-200">Note:</strong> The choice of sorting algorithm depends on 
                      your specific requirements: data size, memory constraints, stability needs, and performance characteristics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
