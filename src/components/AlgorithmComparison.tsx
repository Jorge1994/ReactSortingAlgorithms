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
  spaceBest: string;
  spaceAverage: string;
  spaceWorst: string;
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
      
      const spaceParts = {
        best: info.complexity.space.best,
        average: info.complexity.space.average,
        worst: info.complexity.space.worst
      };

      return {
        name: info.name,
        timeBest: info.complexity.time.best,
        timeAverage: info.complexity.time.average,
        timeWorst: info.complexity.time.worst,
        spaceBest: spaceParts.best,
        spaceAverage: spaceParts.average,
        spaceWorst: spaceParts.worst,
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
  const adaptiveAlgorithms = ['Bubble Sort', 'Insertion Sort', 'Gnome Sort', 'Cocktail Shaker Sort'];
    return adaptiveAlgorithms.includes(algorithmName);
  };

  // Color coding functions
  const getTimeComplexityColor = (complexity: string): string => {
    // Normalize and quick checks for special notations (factorial, unbounded)
    const normalized = (complexity || '').trim();
    // Handle factorial or unbounded notations
    if (normalized.includes('!') || /factorial/i.test(normalized) || /unbound/i.test(normalized)) {
      return 'bg-red-100 text-red-800 border-red-200'; // Very Poor
    }

    // Handle underscript log notation like log_{3/2} n -> treat as logarithmic
    if (/log_\{.*\}/i.test(normalized) || /log\s*\(/i.test(normalized)) {
      return 'bg-green-100 text-green-800 border-green-200'; // Excellent (logarithmic)
    }

    // Handle unicode superscript or decimal exponents like n²·⁷ or numeric exponents 2.7
    // If exponent >= 3 -> very poor; if between 2 and 3 -> poor; if 2 -> poor; between 1 and 2 -> yellow
  const supExpMatch = normalized.match(/n[^\d]*([\d²³⁴⁵⁶⁷⁸⁹⁰·,.]+)/i);
    if (supExpMatch) {
      const expRaw = supExpMatch[1];
      // Normalize common superscript digits to ascii (quick map for common digits)
      const supMap: Record<string,string> = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','·':'.' };
      let expNormalized = '';
      for (const ch of expRaw) {
        expNormalized += supMap[ch] ?? ch;
      }
      // replace comma with dot
      expNormalized = expNormalized.replace(',', '.');
      const num = parseFloat(expNormalized);
      if (!isNaN(num)) {
        if (num >= 3) return 'bg-red-100 text-red-800 border-red-200';
        if (num > 2) return 'bg-red-100 text-red-800 border-red-200';
        if (num === 2) return 'bg-orange-100 text-orange-800 border-orange-200';
        if (num > 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      }
    }

    switch (normalized) {
      case 'O(1)': return 'bg-green-100 text-green-800 border-green-200'; // Excellent
      case 'O(log n)': return 'bg-green-100 text-green-800 border-green-200'; // Excellent
  case 'O(log_{3/2} n)': return 'bg-green-100 text-green-800 border-green-200';
      case 'O(n)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Good
      case 'O(d×n)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Good (linear when d is small)
      case 'O(n + k)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Good (linear-ish when k small)
      case 'O(n+k)': return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // accept variant without spaces
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
      case 'O(k)': return 'bg-orange-100 text-orange-800 border-orange-200'; // Poor - depends on value range
      case 'O(n)': return 'bg-orange-100 text-orange-800 border-orange-200'; // Poor - linear space
      case 'O(n+k)': return 'bg-orange-100 text-orange-800 border-orange-200'; // Poor - linear space plus range
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
                  <th colSpan={3} className="px-4 py-2 text-center font-bold text-slate-800 border-b border-slate-300">
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
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getSpaceComplexityColor(algorithm.spaceBest)}`}>
                        {algorithm.spaceBest}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getSpaceComplexityColor(algorithm.spaceAverage)}`}>
                        {algorithm.spaceAverage}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-200">
                      <span className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold ${getSpaceComplexityColor(algorithm.spaceWorst)}`}>
                        {algorithm.spaceWorst}
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

          <div className="mt-6">
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Notation</h4>
                  <p className="text-emerald-700 leading-relaxed text-sm mb-2">Short explanation of symbols used in the table:</p>
                  <ul className="list-disc list-inside text-emerald-700 text-sm">
                    <li><span className="font-semibold">n</span>: Number of elements in the array.</li>
                    <li><span className="font-semibold">d</span>: Number of digits in the maximum number (for Radix Sort). When d is small and constant, O(d×n) approaches linear time complexity.</li>
                    <li>
                      <span className="font-semibold">k</span>: Range of distinct integer values (computed as max - min + 1). In the context of Counting Sort, k is the number of "buckets" required to count occurrences; it directly affects both time and extra space since the algorithm runs in O(n + k) time and requires O(k) additional space for the count array. Example: for values between 2 and 5, k = 5 - 2 + 1 = 4.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
