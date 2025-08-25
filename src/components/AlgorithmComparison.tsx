import { getAvailableAlgorithmInfos, getAlgorithmInfo } from '../algorithms/infoRegistry';
import type { AlgorithmInfo } from '../types/algorithmInfo';

interface AlgorithmComparisonProps {
  isExpanded?: boolean;
}

interface ComparisonData {
  name: string;
  timeBest: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
  inPlace: boolean;
  stable: boolean;
  adaptive: boolean;
  online: boolean;
}

/**
 * Component to compare all sorting algorithms in a table format
 * Uses color coding to indicate performance characteristics
 */
export function AlgorithmComparison({ isExpanded = false }: AlgorithmComparisonProps) {
  // Get comparison data for all algorithms
  const getComparisonData = (): ComparisonData[] => {
    return getAvailableAlgorithmInfos().map(key => {
      const info: AlgorithmInfo = getAlgorithmInfo(key);
      return {
        name: info.name,
        timeBest: info.complexity.time.best,
        timeAverage: info.complexity.time.average,
        timeWorst: info.complexity.time.worst,
        space: info.complexity.space,
        inPlace: info.inPlace,
        stable: info.stable,
        adaptive: isAdaptive(info.name), // We'll determine this based on algorithm characteristics
        online: info.online
      };
    });
  };

  // Determine if an algorithm is adaptive based on its characteristics
  const isAdaptive = (algorithmName: string): boolean => {
    // Adaptive algorithms perform better on partially sorted data
    const adaptiveAlgorithms = ['Bubble Sort', 'Insertion Sort'];
    return adaptiveAlgorithms.includes(algorithmName);
  };

  // Color coding functions
  const getTimeComplexityColor = (complexity: string): string => {
    switch (complexity) {
      case 'O(1)': return 'bg-green-100 text-green-800 border-green-200'; // Excellent
      case 'O(log n)': return 'bg-green-100 text-green-800 border-green-200'; // Excellent
      case 'O(n)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Good
      case 'O(n log n)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Good
      case 'O(n²)': return 'bg-orange-100 text-orange-800 border-orange-200'; // Poor
      case 'O(n³)': return 'bg-red-100 text-red-800 border-red-200'; // Very Poor
      case 'O(2^n)': return 'bg-red-100 text-red-800 border-red-200'; // Very Poor
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpaceComplexityColor = (complexity: string): string => {
    switch (complexity) {
      case 'O(1)': return 'bg-green-100 text-green-800 border-green-200'; // Excellent - constant space
      case 'O(log n)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Good - logarithmic space
      case 'O(n)': return 'bg-orange-100 text-orange-800 border-orange-200'; // Poor - linear space
      case 'O(n²)': return 'bg-red-100 text-red-800 border-red-200'; // Very Poor - quadratic space
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBooleanColor = (value: boolean, isGoodWhenTrue: boolean): string => {
    if ((value && isGoodWhenTrue) || (!value && !isGoodWhenTrue)) {
      return 'bg-green-100 text-green-800 border-green-200'; // Good
    }
    return 'bg-red-100 text-red-800 border-red-200'; // Bad
  };

  const comparisonData = getComparisonData();

  return (
    <div className="bg-white overflow-hidden">
      {/* Content - only show if expanded */}
      {isExpanded && (
        <div className="p-8 space-y-6 bg-gradient-to-br from-slate-50 to-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Algorithm Comparison</h3>
            <div className="text-slate-600 max-w-3xl mx-auto">
              <p className="mb-2">Compare all sorting algorithms side by side. Colors indicate performance:</p>
              <p>
                <span className="mx-1 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Green = Excellent</span> <span className="mx-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Yellow = Good</span> <span className="mx-1 px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">Orange = Poor</span> <span className="mx-1 px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Red = Very Poor</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                  <th rowSpan={2} className="px-6 py-4 text-center font-bold text-slate-800 border-b border-slate-300 align-middle">
                    Algorithm
                  </th>
                  <th colSpan={3} className="px-4 py-2 text-center font-bold text-slate-800 border-b border-slate-300">
                    Time Complexity
                  </th>
                  <th rowSpan={2} className="px-4 py-4 text-center font-bold text-slate-800 border-b border-slate-300 align-middle">
                    Space Complexity
                  </th>
                  <th rowSpan={2} className="px-4 py-4 text-center font-bold text-slate-800 border-b border-slate-300 align-middle">
                    In-Place
                  </th>
                  <th rowSpan={2} className="px-4 py-4 text-center font-bold text-slate-800 border-b border-slate-300 align-middle">
                    Stable
                  </th>
                  <th rowSpan={2} className="px-4 py-4 text-center font-bold text-slate-800 border-b border-slate-300 align-middle">
                    Adaptive
                  </th>
                  <th rowSpan={2} className="px-4 py-4 text-center font-bold text-slate-800 border-b border-slate-300 align-middle">
                    Online
                  </th>
                </tr>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                  <th className="px-4 py-2 text-center font-bold text-slate-800 border-b border-slate-300">
                    <span className="text-xs text-slate-600 font-normal">Best</span>
                  </th>
                  <th className="px-4 py-2 text-center font-bold text-slate-800 border-b border-slate-300">
                    <span className="text-xs text-slate-600 font-normal">Average</span>
                  </th>
                  <th className="px-4 py-2 text-center font-bold text-slate-800 border-b border-slate-300">
                    <span className="text-xs text-slate-600 font-normal">Worst</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((algorithm, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-slate-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800 border-b border-slate-200 text-center">
                      {algorithm.name}
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getTimeComplexityColor(algorithm.timeBest)}`}>
                        {algorithm.timeBest}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getTimeComplexityColor(algorithm.timeAverage)}`}>
                        {algorithm.timeAverage}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getTimeComplexityColor(algorithm.timeWorst)}`}>
                        {algorithm.timeWorst}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getSpaceComplexityColor(algorithm.space)}`}>
                        {algorithm.space}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border text-sm font-semibold ${getBooleanColor(algorithm.inPlace, true)}`}>
                        {algorithm.inPlace ? '✓ Yes' : '✗ No'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border text-sm font-semibold ${getBooleanColor(algorithm.stable, true)}`}>
                        {algorithm.stable ? '✓ Yes' : '✗ No'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border text-sm font-semibold ${getBooleanColor(algorithm.adaptive, true)}`}>
                        {algorithm.adaptive ? '✓ Yes' : '✗ No'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border text-sm font-semibold ${getBooleanColor(algorithm.online, true)}`}>
                        {algorithm.online ? '✓ Yes' : '✗ No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Reading the Table</h4>
                  <p className="text-blue-700 leading-relaxed text-sm">
                    This table helps you choose the right algorithm for your needs. Consider both time and space complexity, 
                    and whether you need stability or in-place sorting for your specific use case.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Quick Guide</h4>
                  <p className="text-purple-700 leading-relaxed text-sm">
                    For small datasets: any algorithm works. For large datasets: avoid O(n²) algorithms. 
                    Need stability? Choose stable algorithms. Limited memory? Choose in-place algorithms.
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
