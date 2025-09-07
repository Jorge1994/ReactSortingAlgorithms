import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type AlgorithmKey } from '../algorithms/registry';
import { algorithmInfoRegistry } from '../algorithms/infoRegistry';
import { Footer } from './Footer';
import type { AlgorithmInfo } from '../types/algorithmInfo';

/**
 * Convert simple Markdown bold syntax to HTML
 */
function convertMarkdownBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Algorithm Details Component for Dark Theme
 */
function AlgorithmDetails({ algorithmInfo, isExpanded = false }: { algorithmInfo: AlgorithmInfo; isExpanded?: boolean }) {
  return (
    <div className="bg-slate-800 overflow-hidden">
      {/* Content - only show if expanded */}
      {isExpanded && (
        <div className="p-8 space-y-8 bg-gradient-to-br from-slate-800 to-slate-700 text-white">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Description
            </h3>
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-6 border border-slate-600">
              <p 
                className="text-slate-300 leading-relaxed text-base"
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownBold(algorithmInfo.description)
                }}
              />
            </div>
          </div>

          {/* Complexity Analysis */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Complexity Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-700/50">
                <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  Time Complexity
                </h4>
                <div className="space-y-4">
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-blue-600/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-300">Best Case:</span>
                      <code className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded font-mono text-sm border border-blue-500/30">{algorithmInfo.complexity.time.best}</code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{algorithmInfo.complexity.justifications.timeComplexity.best}</p>
                  </div>
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-blue-600/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-300">Average Case:</span>
                      <code className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded font-mono text-sm border border-blue-500/30">{algorithmInfo.complexity.time.average}</code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{algorithmInfo.complexity.justifications.timeComplexity.average}</p>
                  </div>
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-blue-600/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-300">Worst Case:</span>
                      <code className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded font-mono text-sm border border-blue-500/30">{algorithmInfo.complexity.time.worst}</code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{algorithmInfo.complexity.justifications.timeComplexity.worst}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700/50">
                <h4 className="font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <span className="text-xl">💾</span>
                  Space Complexity
                </h4>
                {/* Replicate Time Complexity mechanics for Space Complexity: Best / Average / Worst */}
                <div className="space-y-4">
                  {(() => {
                    const spaceInfo = algorithmInfo.complexity.space;
                    const spaceJustInfo = algorithmInfo.complexity.justifications.spaceComplexity;

                    // Extract complexity codes directly from the new structure
                    const bestCode = spaceInfo.best || 'Unknown';
                    const averageCode = spaceInfo.average || 'Unknown';
                    const worstCode = spaceInfo.worst || 'Unknown';

                    // Extract justifications directly from the new structure
                    const bestJust = spaceJustInfo.best || '';
                    const avgJust = spaceJustInfo.average || '';
                    const worstJust = spaceJustInfo.worst || '';

                    return (
                      <>
                        <div className="bg-slate-700/80 rounded-lg p-4 border border-purple-600/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-purple-300">Best Case:</span>
                            <code className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30">{bestCode}</code>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{bestJust}</p>
                        </div>

                        <div className="bg-slate-700/80 rounded-lg p-4 border border-purple-600/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-purple-300">Average Case:</span>
                            <code className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30">{averageCode}</code>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{avgJust}</p>
                        </div>

                        <div className="bg-slate-700/80 rounded-lg p-4 border border-purple-600/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-purple-300">Worst Case:</span>
                            <code className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30">{worstCode}</code>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{worstJust}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Properties */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Algorithm Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-800/50 rounded-xl p-6 border border-green-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${algorithmInfo.stable ? 'bg-green-500' : 'bg-red-500'}`}>
                    <span className="text-white text-sm font-bold">{algorithmInfo.stable ? '✓' : '✗'}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200">Stability</h4>
                </div>
                <div className="space-y-2">
                  <p className={`font-medium ${algorithmInfo.stable ? 'text-green-400' : 'text-red-400'}`}>
                    {algorithmInfo.stable ? 'Stable Algorithm' : 'Not Stable'}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {algorithmInfo.stable 
                      ? 'Preserves the relative order of equal elements during sorting'
                      : 'May change the relative order of equal elements during sorting'
                    }
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/50 to-indigo-800/50 rounded-xl p-6 border border-blue-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${algorithmInfo.inPlace ? 'bg-blue-500' : 'bg-orange-500'}`}>
                    <span className="text-white text-sm font-bold">{algorithmInfo.inPlace ? '✓' : '✗'}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200">Memory Usage</h4>
                </div>
                <div className="space-y-2">
                  <p className={`font-medium ${algorithmInfo.inPlace ? 'text-blue-400' : 'text-orange-400'}`}>
                    {algorithmInfo.inPlace ? 'In-Place Algorithm' : 'Requires Additional Memory'}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {algorithmInfo.memoryUsage ? algorithmInfo.memoryUsage : (
                      algorithmInfo.inPlace 
                        ? 'Sorts elements within the original array using only O(1) extra space'
                        : 'Requires additional memory proportional to the input size'
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/50 to-violet-800/50 rounded-xl p-6 border border-purple-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${algorithmInfo.online ? 'bg-purple-500' : 'bg-gray-500'}`}>
                    <span className="text-white text-sm font-bold">{algorithmInfo.online ? '✓' : '✗'}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200">Online Processing</h4>
                </div>
                <div className="space-y-2">
                  <p className={`font-medium ${algorithmInfo.online ? 'text-purple-400' : 'text-gray-400'}`}>
                    {algorithmInfo.online ? 'Online Algorithm' : 'Offline Algorithm'}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {algorithmInfo.online 
                      ? 'Can process data as it arrives without requiring the complete dataset'
                      : 'Requires the complete dataset to be available before processing'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Characteristics */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Key Characteristics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {algorithmInfo.keyCharacteristics.map((characteristic, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-700 rounded-lg border border-slate-600 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-300 leading-relaxed">{characteristic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Phases */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Algorithm Phases
            </h3>
            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600 shadow-sm">
              <div className="space-y-4">
                {algorithmInfo.visualizationNotes.phases.map((phase, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg border border-slate-500 hover:shadow-md transition-shadow duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-grow text-left">
                      <span className="text-slate-200 leading-relaxed">
                        <span className="font-bold text-slate-100">
                          {phase.split(':')[0]}:
                        </span>
                        <span className="font-medium ml-1">
                          {phase.split(':').slice(1).join(':').trim()}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-900/50 to-green-800/50 rounded-xl p-6 border border-emerald-700/50">
              <h3 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Advantages
              </h3>
              <div className="space-y-3">
                {algorithmInfo.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/80 rounded-lg border border-emerald-600/30">
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">+</span>
                    </div>
                    <span className="text-emerald-300 leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-900/50 to-red-800/50 rounded-xl p-6 border border-rose-700/50">
              <h3 className="text-xl font-bold text-rose-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Disadvantages
              </h3>
              <div className="space-y-3">
                {algorithmInfo.disadvantages.map((disadvantage, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/80 rounded-lg border border-rose-600/30">
                    <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">-</span>
                    </div>
                    <span className="text-rose-300 leading-relaxed">{disadvantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Recommended Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {algorithmInfo.useCases.map((useCase, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-900/50 to-purple-800/50 rounded-lg border border-indigo-700/50 hover:shadow-md transition-shadow duration-200">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">💡</span>
                  </div>
                  <span className="text-indigo-300 leading-relaxed font-medium">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function AlgorithmDetailsPage() {
  const { algorithm } = useParams<{ algorithm: string }>();
  
  if (!algorithm || !(algorithm in algorithmInfoRegistry)) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Algorithm Not Found</h1>
          <p className="text-slate-400 mb-8">The requested algorithm could not be found.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const algorithmKey = algorithm as AlgorithmKey;
  const algorithmInfo = algorithmInfoRegistry[algorithmKey];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="relative py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                ← Back to Home
              </Link>
              
              <Link
                to={`/visualize/${algorithmKey}`}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Visualize Algorithm
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                {algorithmInfo.name}
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive analysis and implementation details for {algorithmInfo.name.toLowerCase()}
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Algorithm Details */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <AlgorithmDetails algorithmInfo={algorithmInfo} isExpanded={true} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
