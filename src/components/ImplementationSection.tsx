import { useState } from 'react';
import { CodeTabs } from './CodeTabs';
import { getImplementations } from '../data/implementationsRegistry';
import { getActiveImplementations } from '../types/implementations';
import type { AlgorithmKey } from '../algorithms/registry';

interface ImplementationSectionProps {
  currentAlgorithm: AlgorithmKey;
}

export function ImplementationSection({ currentAlgorithm }: ImplementationSectionProps) {
  const [isImplementationExamplesExpanded, setIsImplementationExamplesExpanded] = useState(false);

  return (
    <section className="space-y-8">
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
        />
      </div>
    </section>
  );
}
