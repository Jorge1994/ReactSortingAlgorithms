import type { AlgorithmInfo } from '../types/algorithmInfo';

interface AlgorithmDetailsProps {
  algorithmInfo: AlgorithmInfo;
  isExpanded?: boolean;
}

/**
 * Component to display detailed algorithm information
 * Uses theoretical data separated from implementation
 */
export function AlgorithmDetails({ algorithmInfo, isExpanded = false }: AlgorithmDetailsProps) {
  return (
    <div className="bg-white overflow-hidden">
      {/* Content - only show if expanded */}
      {isExpanded && (
        <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white">
          {/* Complexity Analysis */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Complexity Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  Time Complexity
                </h4>
                <div className="space-y-4">
                  <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-700">Best Case:</span>
                      <code className="bg-blue-200 text-blue-800 px-2 py-1 rounded font-mono text-sm">{algorithmInfo.complexity.time.best}</code>
                    </div>
                    <p className="text-sm text-blue-600 leading-relaxed">{algorithmInfo.complexity.justifications.timeComplexity.best}</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-700">Average Case:</span>
                      <code className="bg-blue-200 text-blue-800 px-2 py-1 rounded font-mono text-sm">{algorithmInfo.complexity.time.average}</code>
                    </div>
                    <p className="text-sm text-blue-600 leading-relaxed">{algorithmInfo.complexity.justifications.timeComplexity.average}</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-700">Worst Case:</span>
                      <code className="bg-blue-200 text-blue-800 px-2 py-1 rounded font-mono text-sm">{algorithmInfo.complexity.time.worst}</code>
                    </div>
                    <p className="text-sm text-blue-600 leading-relaxed">{algorithmInfo.complexity.justifications.timeComplexity.worst}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">💾</span>
                  Space Complexity
                </h4>
                <div className="bg-white/80 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-center mb-4">
                    <code className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-mono text-lg font-bold">{algorithmInfo.complexity.space}</code>
                  </div>
                  <p className="text-sm text-purple-600 leading-relaxed">{algorithmInfo.complexity.justifications.spaceComplexity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Characteristics */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Key Characteristics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {algorithmInfo.keyCharacteristics.map((characteristic, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 leading-relaxed">{characteristic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Phases */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Algorithm Phases
            </h3>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="space-y-4">
                {algorithmInfo.visualizationNotes.phases.map((phase, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-grow text-left">
                      <span className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-slate-900">
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
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Advantages
              </h3>
              <div className="space-y-3">
                {algorithmInfo.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg border border-emerald-100">
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">+</span>
                    </div>
                    <span className="text-emerald-800 leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-6 border border-rose-200">
              <h3 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Disadvantages
              </h3>
              <div className="space-y-3">
                {algorithmInfo.disadvantages.map((disadvantage, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg border border-rose-100">
                    <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">-</span>
                    </div>
                    <span className="text-rose-800 leading-relaxed">{disadvantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Recommended Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {algorithmInfo.useCases.map((useCase, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow duration-200">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">💡</span>
                  </div>
                  <span className="text-indigo-800 leading-relaxed font-medium">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
