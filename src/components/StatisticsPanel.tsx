import type { SortStep } from '../types';

interface StatisticsPanelProps {
  currentStepData?: SortStep;
  currentStep: number;
  totalSteps: number;
}

export function StatisticsPanel({ currentStepData, currentStep, totalSteps }: StatisticsPanelProps) {
  if (!currentStepData || totalSteps === 0) return null;

  return (
    <div className="flex flex-col items-center mb-8 space-y-4">
      {/* Progress indicator */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
          <span>Progress</span>
          <span>{currentStep + 1} / {totalSteps}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Statistics cards */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 min-w-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">⚖️</span>
            </div>
            <div>
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">Comparisons</div>
              <div className="text-2xl font-bold text-blue-800">{currentStepData.metadata?.comparisons || 0}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-4 min-w-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">🔄</span>
            </div>
            <div>
              <div className="text-xs font-medium text-rose-600 uppercase tracking-wide">Swaps</div>
              <div className="text-2xl font-bold text-rose-800">{currentStepData.metadata?.swaps || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
