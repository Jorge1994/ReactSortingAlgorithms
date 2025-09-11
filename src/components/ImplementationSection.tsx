import { CodeTabs } from './CodeTabs';
import { getImplementations } from '../data/implementationsRegistry';
import { getActiveImplementations } from '../types/implementations';
import type { AlgorithmKey } from '../algorithms/registry';

interface ImplementationSectionProps {
  currentAlgorithm: AlgorithmKey;
}

export function ImplementationSection({ currentAlgorithm }: ImplementationSectionProps) {
  return (
    <section className="space-y-8">
      {/* Implementation Examples Section */}
      <div className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-600/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">💻</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-1">
                Implementations
              </h3>
            </div>
          </div>
        </div>
        
        <CodeTabs 
          examples={getActiveImplementations(getImplementations(currentAlgorithm))} 
        />
      </div>
    </section>
  );
}
