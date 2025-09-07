import { useState } from 'react';
import { CodeTabs } from './CodeTabs';
import { AlgorithmDetails } from './AlgorithmDetails';
import { AlgorithmComparison } from './AlgorithmComparison';
import { getImplementations } from '../data/implementationsRegistry';
import { getActiveImplementations } from '../types/implementations';
import { getAlgorithmInfo } from '../algorithms/infoRegistry';
import type { AlgorithmKey } from '../algorithms/registry';
import { getAlgorithm } from '../algorithms/registry';

interface ImplementationSectionProps {
  currentAlgorithm: AlgorithmKey;
}

export function ImplementationSection({ currentAlgorithm }: ImplementationSectionProps) {
  const [isAlgorithmDetailsExpanded, setIsAlgorithmDetailsExpanded] = useState(false);
  const [isAlgorithmComparisonExpanded, setIsAlgorithmComparisonExpanded] = useState(false);
  const [isImplementationExamplesExpanded, setIsImplementationExamplesExpanded] = useState(false);

  return (
    <section className="space-y-8">
      {/* Algorithm Details Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '16px', alignItems: 'center' }}>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 className="text-2xl font-bold text-slate-800 mb-1" style={{ lineHeight: '1.2', margin: '0', padding: '0', textAlign: 'left' }}>
                  Algorithm Details
                </h3>
                <p className="text-slate-600">
                  Learn about complexity, advantages, and use cases
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAlgorithmDetailsExpanded(!isAlgorithmDetailsExpanded)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">
                {isAlgorithmDetailsExpanded ? '🔼' : '🔽'}
              </span>
              {isAlgorithmDetailsExpanded ? 'Collapse Details' : 'Expand Details'}
            </button>
          </div>
        </div>
        
        <AlgorithmDetails 
          algorithmInfo={getAlgorithmInfo(currentAlgorithm)} 
          isExpanded={isAlgorithmDetailsExpanded}
        />
      </div>

      {/* Algorithm Comparison Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '16px', alignItems: 'center' }}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📊</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 className="text-2xl font-bold text-slate-800 mb-1" style={{ lineHeight: '1.2', margin: '0', padding: '0', textAlign: 'left' }}>
                  Algorithm Comparison
                </h3>
                <p className="text-slate-600">
                  Compare all algorithms side by side with color-coded performance metrics
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAlgorithmComparisonExpanded(!isAlgorithmComparisonExpanded)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">
                {isAlgorithmComparisonExpanded ? '🔼' : '🔽'}
              </span>
              {isAlgorithmComparisonExpanded ? 'Collapse Comparison' : 'Expand Comparison'}
            </button>
          </div>
        </div>
        
        <AlgorithmComparison 
          isExpanded={isAlgorithmComparisonExpanded}
        />
      </div>

      {/* Implementation Examples Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '16px', alignItems: 'center' }}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💻</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 className="text-2xl font-bold text-slate-800 mb-1" style={{ lineHeight: '1.2', margin: '0', padding: '0', textAlign: 'left' }}>
                  Implementation Examples
                </h3>
                <p className="text-slate-600">
                  Explore production-ready implementations in multiple programming languages
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsImplementationExamplesExpanded(!isImplementationExamplesExpanded)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">
                {isImplementationExamplesExpanded ? '🔼' : '🔽'}
              </span>
              {isImplementationExamplesExpanded ? 'Hide Code' : 'Show Code'}
            </button>
          </div>
        </div>
        
        <CodeTabs 
          examples={getActiveImplementations(getImplementations(currentAlgorithm))} 
          isExpanded={isImplementationExamplesExpanded}
          headerless={true}
          description={`Explore production-ready implementations of the ${getAlgorithm(currentAlgorithm).name} algorithm in multiple programming languages. Each implementation includes detailed comments, optimization notes, and complexity analysis.`}
        />
      </div>
    </section>
  );
}
