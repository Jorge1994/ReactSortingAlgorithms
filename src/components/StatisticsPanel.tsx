import type { SortStep } from '../types';

interface StatisticsPanelProps {
  currentStepData?: SortStep;
  currentStep: number;
  totalSteps: number;
  showComparisonsAndSwaps?: boolean;
}

export function StatisticsPanel({ currentStepData, currentStep, totalSteps, showComparisonsAndSwaps = true }: StatisticsPanelProps) {
  if (!currentStepData || totalSteps === 0) return null;

  return (
    <div className="flex flex-col items-center mb-8 space-y-4">
      {/* Progress indicator */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
          <span>Progress</span>
          <span>{currentStep + 1} / {totalSteps}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div 
            className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Statistics cards */}
      {showComparisonsAndSwaps && (
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 min-w-[140px] shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">⚖️</span>
              </div>
              <div>
                <div className="text-xs font-medium text-blue-300 uppercase tracking-wide">Comparisons</div>
                <div className="text-2xl font-bold text-white">{currentStepData.metadata?.comparisons || 0}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 min-w-[140px] shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">🔄</span>
              </div>
              <div>
                <div className="text-xs font-medium text-rose-300 uppercase tracking-wide">Swaps</div>
                <div className="text-2xl font-bold text-white">{currentStepData.metadata?.swaps || 0}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
