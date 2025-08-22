import { useState } from 'react';
import { CodeTabs } from './CodeTabs';
import { AlgorithmDetails } from './AlgorithmDetails';
import { TechnicalGlossary } from './TechnicalGlossary';
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
  const [isTechnicalGlossaryExpanded, setIsTechnicalGlossaryExpanded] = useState(false);

  return (
    <section className="space-y-8">
      {/* Algorithm Details Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
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

      {/* Technical Glossary Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📖</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  Technical Glossary
                </h3>
                <p className="text-slate-600">
                  Essential sorting algorithm terms and concepts explained
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsTechnicalGlossaryExpanded(!isTechnicalGlossaryExpanded)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">
                {isTechnicalGlossaryExpanded ? '🔼' : '🔽'}
              </span>
              {isTechnicalGlossaryExpanded ? 'Collapse Glossary' : 'Expand Glossary'}
            </button>
          </div>
        </div>
        
        <TechnicalGlossary 
          isExpanded={isTechnicalGlossaryExpanded}
        />
      </div>

      {/* Implementation Examples Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CodeTabs 
          examples={getActiveImplementations(getImplementations(currentAlgorithm))} 
          title="Implementation Examples"
          description={`Explore production-ready implementations of the ${getAlgorithm(currentAlgorithm).name} algorithm in multiple programming languages. Each implementation includes detailed comments, optimization notes, and complexity analysis.`}
        />
      </div>
    </section>
  );
}
