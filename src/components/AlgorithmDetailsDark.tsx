import type { AlgorithmInfo } from '../types/algorithmInfo';

interface AlgorithmDetailsProps {
  algorithmInfo: AlgorithmInfo;
  isExpanded?: boolean;
}

/**
 * Convert simple Markdown bold syntax to HTML
 */
function convertMarkdownBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Component to display detailed algorithm information
 * Uses theoretical data separated from implementation
 */
export function AlgorithmDetails({ algorithmInfo, isExpanded = false }: AlgorithmDetailsProps) {
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
                <div className="space-y-4">
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-purple-600/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-purple-300">Best Case:</span>
                      <code className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30">{algorithmInfo.complexity.space.best}</code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{algorithmInfo.complexity.justifications.spaceComplexity.best}</p>
                  </div>
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-purple-600/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-purple-300">Average Case:</span>
                      <code className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30">{algorithmInfo.complexity.space.average}</code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{algorithmInfo.complexity.justifications.spaceComplexity.average}</p>
                  </div>
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-purple-600/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-purple-300">Worst Case:</span>
                      <code className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-mono text-sm border border-purple-500/30">{algorithmInfo.complexity.space.worst}</code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{algorithmInfo.complexity.justifications.spaceComplexity.worst}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Algorithm Characteristics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-emerald-900/50 to-green-800/50 rounded-xl p-6 border border-green-700/50">
                <h4 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <span className="text-xl">⚙️</span>
                  Key Characteristics
                </h4>
                <div className="space-y-3">
                  {algorithmInfo.keyCharacteristics.map((characteristic: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-slate-300 text-sm leading-relaxed">{characteristic}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-900/50 to-orange-800/50 rounded-xl p-6 border border-orange-700/50">
                <h4 className="font-semibold text-amber-300 mb-4 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  Use Cases
                </h4>
                <div className="space-y-3">
                  {algorithmInfo.useCases.map((useCase: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-slate-300 text-sm leading-relaxed">{useCase}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Pros & Cons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-emerald-900/50 to-green-800/50 rounded-xl p-6 border border-green-700/50">
                <h4 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  Advantages
                </h4>
                <ul className="space-y-3">
                  {algorithmInfo.advantages.map((advantage: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-300 text-sm leading-relaxed">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-red-900/50 to-orange-800/50 rounded-xl p-6 border border-red-700/50">
                <h4 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
                  <span className="text-xl">❌</span>
                  Disadvantages
                </h4>
                <ul className="space-y-3">
                  {algorithmInfo.disadvantages.map((disadvantage: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-300 text-sm leading-relaxed">{disadvantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Algorithm Properties
            </h3>
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-800/50 rounded-xl p-6 border border-indigo-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    algorithmInfo.stable ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <span className="text-2xl">{algorithmInfo.stable ? '✓' : '✗'}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 mb-2">Stability</h4>
                  <p className="text-sm text-slate-400">
                    {algorithmInfo.stable ? 'Stable' : 'Unstable'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    algorithmInfo.inPlace ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <span className="text-2xl">{algorithmInfo.inPlace ? '✓' : '✗'}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 mb-2">In-Place</h4>
                  <p className="text-sm text-slate-400">
                    {algorithmInfo.inPlace ? 'In-place' : 'Not in-place'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    algorithmInfo.online ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <span className="text-2xl">{algorithmInfo.online ? '✓' : '✗'}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 mb-2">Online</h4>
                  <p className="text-sm text-slate-400">
                    {algorithmInfo.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
