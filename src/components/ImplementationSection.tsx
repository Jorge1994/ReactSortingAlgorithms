import { CodeTabs } from './CodeTabs';
import { getImplementations } from '../data/implementationsRegistry';
import { getActiveImplementations } from '../types/implementations';
import type { AlgorithmKey } from '../algorithms/registry';

interface ImplementationSectionProps {
  currentAlgorithm: AlgorithmKey;
}

export function ImplementationSection({ currentAlgorithm }: ImplementationSectionProps) {
  return (
    <section className="mt-12">
      {/* Implementation Examples Section */}
      <div className="px-4">
        <div className="max-w-4xl bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100">
              Implementations
            </h3>
          </div>
          
          <CodeTabs 
            examples={getActiveImplementations(getImplementations(currentAlgorithm))} 
          />
        </div>
      </div>
    </section>
  );
}
