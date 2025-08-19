import { useState } from 'react';
import { CodeTabs } from './CodeTabs';
import { AlgorithmDetails } from './AlgorithmDetails';
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

      {/* Implementation Examples Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
        
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl">
          <div className="p-8 pb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <span className="text-white text-2xl">💻</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  Implementation Examples
                </h3>
                <p className="text-slate-600">
                  Complete code implementations in different languages
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 pt-0">
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h4 className="font-semibold text-slate-800">
                  {getAlgorithm(currentAlgorithm).name} Algorithm
                </h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Explore production-ready implementations of the <strong>{getAlgorithm(currentAlgorithm).name}</strong> algorithm 
                in multiple programming languages. Each implementation includes detailed comments, 
                optimization notes, and complexity analysis.
              </p>
            </div>
            <CodeTabs examples={getActiveImplementations(getImplementations(currentAlgorithm))} />
          </div>
        </div>
      </div>
    </section>
  );
}
