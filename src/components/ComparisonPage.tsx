import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { algorithmRegistry, type AlgorithmKey } from '../algorithms/registry';
import { algorithmInfoRegistry } from '../algorithms/infoRegistry';
import { getAlgorithmIcon } from '../utils/algorithmIcons';
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
    // Normalize and quick checks for special notations (factorial, unbounded)
    const normalized = (complexity || '').trim();
    
    // Handle factorial or unbounded notations
    if (normalized.includes('!') || /factorial/i.test(normalized) || /unbound/i.test(normalized)) {
      return 'text-red-400 bg-red-900/20'; // Very Poor
    }

    // Handle underscript log notation like log_{3/2} n -> treat as logarithmic
    if (/log_\{.*\}/i.test(normalized) || /log\s*\(/i.test(normalized)) {
      return 'text-emerald-400 bg-emerald-900/20'; // Excellent (logarithmic)
    }

    // Handle unicode superscript or decimal exponents like n²·⁷ or numeric exponents 2.7
    const supExpMatch = normalized.match(/n[^\d]*([\d²³⁴⁵⁶⁷⁸⁹⁰·,.]+)/i);
    if (supExpMatch) {
      const expRaw = supExpMatch[1];
      // Normalize common superscript digits to ascii
      const supMap: Record<string,string> = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','·':'.' };
      let expNormalized = '';
      for (const ch of expRaw) {
        expNormalized += supMap[ch] ?? ch;
      }
      // replace comma with dot
      expNormalized = expNormalized.replace(',', '.');
      const num = parseFloat(expNormalized);
      if (!isNaN(num)) {
        if (num >= 3) return 'text-red-400 bg-red-900/20';
        if (num > 2) return 'text-red-400 bg-red-900/20';
        if (num === 2) return 'text-yellow-400 bg-yellow-900/20';
        if (num > 1) return 'text-blue-400 bg-blue-900/20';
      }
    }

    switch (normalized) {
      case 'O(1)': return 'text-emerald-400 bg-emerald-900/20'; // Excellent
      case 'O(log n)': return 'text-emerald-400 bg-emerald-900/20'; // Excellent
      case 'O(log_{3/2} n)': return 'text-emerald-400 bg-emerald-900/20';
      case 'O(n)': return 'text-green-400 bg-green-900/20'; // Good
      case 'O(d×n)': return 'text-green-400 bg-green-900/20'; // Good (linear when d is small)
      case 'O(n + k)': return 'text-green-400 bg-green-900/20'; // Good (linear-ish when k small)
      case 'O(n+k)': return 'text-green-400 bg-green-900/20'; // accept variant without spaces
      case 'O(k)': return 'text-teal-400 bg-teal-900/20'; // For space complexity
      case 'O(n log n)': return 'text-blue-400 bg-blue-900/20'; // Good
      case 'O(n²)': return 'text-yellow-400 bg-yellow-900/20'; // Poor
      case 'O(n³)': return 'text-orange-400 bg-orange-900/20'; // Very Poor
      case 'O(2^n)': return 'text-red-400 bg-red-900/20'; // Very Poor
      default: return 'text-slate-400 bg-slate-900/20';
    }
  };

  const getBooleanColor = (value: boolean, isGoodWhenTrue: boolean = true) => {
    if ((value && isGoodWhenTrue) || (!value && !isGoodWhenTrue)) {
      return 'text-green-400 bg-green-900/20';
    }
    return 'text-red-400 bg-red-900/20';
  };

  const isAdaptive = (algorithmName: string): boolean => {
    const adaptiveAlgorithms = ['Bubble Sort', 'Insertion Sort', 'Gnome Sort', 'Cocktail Shaker Sort'];
    return adaptiveAlgorithms.includes(algorithmName);
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
              className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:border-slate-500 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-slate-700/80 shadow-lg hover:shadow-xl mb-8"
            >
              <img 
                src="/icons/logo.png" 
                alt="SortViz Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-medium">← Back to Home</span>
            </Link>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 py-2 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent leading-tight">
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
        <div className="max-w-[95vw] mx-auto">
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
                    <th rowSpan={2} className="px-6 py-4 text-center font-bold text-slate-200 border-b border-slate-600 align-middle">
                      Algorithm
                    </th>
                    <th colSpan={3} className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      Time Complexity
                    </th>
                    <th colSpan={3} className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      Space Complexity
                    </th>
                    <th rowSpan={2} className="px-3 py-4 text-center font-bold text-slate-200 border-b border-slate-600 align-middle">
                      In-Place
                    </th>
                    <th rowSpan={2} className="px-3 py-4 text-center font-bold text-slate-200 border-b border-slate-600 align-middle">
                      Stable
                    </th>
                    <th rowSpan={2} className="px-3 py-4 text-center font-bold text-slate-200 border-b border-slate-600 align-middle">
                      Adaptive
                    </th>
                    <th rowSpan={2} className="px-3 py-4 text-center font-bold text-slate-200 border-b border-slate-600 align-middle">
                      Online
                    </th>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      <span className="text-xs text-slate-300 font-normal">Best</span>
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      <span className="text-xs text-slate-300 font-normal">Average</span>
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      <span className="text-xs text-slate-300 font-normal">Worst</span>
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      <span className="text-xs text-slate-300 font-normal">Best</span>
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      <span className="text-xs text-slate-300 font-normal">Average</span>
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-slate-200 border-b border-slate-600">
                      <span className="text-xs text-slate-300 font-normal">Worst</span>
                    </th>
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
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-2xl">{getAlgorithmIcon(algorithm)}</span>
                            <span className="font-semibold text-slate-200">
                              {algorithmRegistry[algorithm].name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.time.best)}`}>
                            {complexity.time.best}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.time.average)}`}>
                            {complexity.time.average}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.time.worst)}`}>
                            {complexity.time.worst}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.space.best)}`}>
                            {complexity.space.best}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.space.average)}`}>
                            {complexity.space.average}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor(complexity.space.worst)}`}>
                            {complexity.space.worst}
                          </span>
                        </td>
                        <td className="px-2 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(info?.inPlace || false, true)}`}>
                            {info?.inPlace ? '✓ Yes' : '✗ No'}
                          </span>
                        </td>
                        <td className="px-2 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(info?.stable || false, true)}`}>
                            {info?.stable ? '✓ Yes' : '✗ No'}
                          </span>
                        </td>
                        <td className="px-2 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(isAdaptive(algorithmRegistry[algorithm].name), true)}`}>
                            {isAdaptive(algorithmRegistry[algorithm].name) ? '✓ Yes' : '✗ No'}
                          </span>
                        </td>
                        <td className="px-2 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(info?.online || false, true)}`}>
                            {info?.online ? '✓ Yes' : '✗ No'}
                          </span>
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

      {/* Complexity and Notation Reference Guide */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">
              Complexity & Notation Reference Guide
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Time Complexity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(1)')}`}>
                      O(1)
                    </span>
                    <span className="text-slate-400 text-sm">Constant time - Best possible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(n)')}`}>
                      O(n)
                    </span>
                    <span className="text-slate-400 text-sm">Linear time - Excellent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(n log n)')}`}>
                      O(n log n)
                    </span>
                    <span className="text-slate-400 text-sm">Log-linear time - Good</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(n²)')}`}>
                      O(n²)
                    </span>
                    <span className="text-slate-400 text-sm">Quadratic time - Fair</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono ${getComplexityColor('O(2^n)')}`}>
                      O(2^n)
                    </span>
                    <span className="text-slate-400 text-sm">Exponential time - Poor</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Algorithm Properties</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(true, true)}`}>
                      ✓ In-Place
                    </span>
                    <span className="text-slate-400 text-sm">Uses O(1) extra memory</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(true, true)}`}>
                      ✓ Stable
                    </span>
                    <span className="text-slate-400 text-sm">Preserves relative order of equal elements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(true, true)}`}>
                      ✓ Adaptive
                    </span>
                    <span className="text-slate-400 text-sm">Performs better on partially sorted data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getBooleanColor(true, true)}`}>
                      ✓ Online
                    </span>
                    <span className="text-slate-400 text-sm">Can sort data as it arrives</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Notation</h4>
                <div className="space-y-3">
                  <div className="text-slate-400 text-sm">
                    <p className="mb-3 text-slate-400 text-sm">Symbols used in complexity notation:</p>
                    <ul className="space-y-2">
                      <li className="text-slate-400 text-sm">
                        <span className="font-semibold text-slate-200">n</span>: Number of elements in the array
                      </li>
                      <li className="text-slate-400 text-sm">
                        <span className="font-semibold text-slate-200">d</span>: Number of digits in the maximum number (for Radix Sort). When d is small and constant, O(d×n) approaches linear time complexity
                      </li>
                      <li className="text-slate-400 text-sm">
                        <span className="font-semibold text-slate-200">k</span>: Range of distinct integer values (max - min + 1). For Counting Sort, k affects both time O(n + k) and space O(k). Example: values 2-5 have k = 4
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-700 rounded-lg">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-slate-200">Note:</strong> The choice of sorting algorithm depends on 
                your specific requirements: data size, memory constraints, stability needs, and performance characteristics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
