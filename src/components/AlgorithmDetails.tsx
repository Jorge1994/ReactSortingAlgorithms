import type { AlgorithmInfo } from '../types/algorithmInfo';

interface AlgorithmDetailsProps {
  algorithmInfo: AlgorithmInfo;
  isExpanded?: boolean;
  onToggle?: () => void;
}

/**
 * Component to display detailed algorithm information
 * Uses theoretical data separated from implementation
 */
export function AlgorithmDetails({ algorithmInfo, isExpanded = false, onToggle }: AlgorithmDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div 
        className={`p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer ${onToggle ? 'hover:from-blue-600 hover:to-blue-700' : ''}`}
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{algorithmInfo.name}</h2>
          {onToggle && (
            <span className="text-2xl transform transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          )}
        </div>
        <p className="text-blue-100 mt-1">{algorithmInfo.description}</p>
      </div>

      {/* Content */}
      {(isExpanded || !onToggle) && (
        <div className="p-6 space-y-6">
          {/* Complexity Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Complexity Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Time Complexity</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><span className="font-medium">Best:</span> {algorithmInfo.complexity.time.best}</li>
                  <li><span className="font-medium">Average:</span> {algorithmInfo.complexity.time.average}</li>
                  <li><span className="font-medium">Worst:</span> {algorithmInfo.complexity.time.worst}</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Space Complexity</h4>
                <p className="text-sm text-gray-600">{algorithmInfo.complexity.space}</p>
              </div>
            </div>
          </div>

          {/* Key Characteristics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Characteristics</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {algorithmInfo.keyCharacteristics.map((characteristic, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 mt-1">•</span>
                  {characteristic}
                </li>
              ))}
            </ul>
          </div>

          {/* Visualization Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Visualization Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Colors */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Color Coding</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">{algorithmInfo.visualizationNotes.colors.comparing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-600">{algorithmInfo.visualizationNotes.colors.swapping}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-600">{algorithmInfo.visualizationNotes.colors.sorted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="text-gray-600">{algorithmInfo.visualizationNotes.colors.unsorted}</span>
                  </div>
                </div>
              </div>

              {/* Phases */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Algorithm Phases</h4>
                <ul className="space-y-1">
                  {algorithmInfo.visualizationNotes.phases.map((phase, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">{index + 1}.</span>
                      {phase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">✅ Advantages</h3>
              <ul className="space-y-2">
                {algorithmInfo.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-3">❌ Disadvantages</h3>
              <ul className="space-y-2">
                {algorithmInfo.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    {disadvantage}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Use Cases</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {algorithmInfo.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-purple-500 mt-1">•</span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
