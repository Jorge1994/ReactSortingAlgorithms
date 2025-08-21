import type { SortStep } from '../types';

interface ArrayVisualizerProps {
  displayArray: number[];
  currentStepData?: SortStep;
  steps: SortStep[];
  currentStep: number;
}

export function ArrayVisualizer({ displayArray, currentStepData, steps, currentStep }: ArrayVisualizerProps) {
  const getBarColor = (index: number): string => {
    // Check if this element was marked as sorted in any previous step
    const wasSorted = steps.slice(0, currentStep + 1).some(step => 
      step.type === 'set-sorted' && step.indices.includes(index)
    );
    
    if (wasSorted) {
      return '#10B981'; // emerald-500 for sorted elements
    }

    if (!currentStepData) return '#94A3B8'; // slate-400

    const { type, indices } = currentStepData;
    
    switch (type) {
      case 'compare':
        return indices.includes(index) ? '#3B82F6' : '#94A3B8'; // blue-500 for comparing
      case 'swap':
        return indices.includes(index) ? '#EF4444' : '#94A3B8'; // red-500 for swapping
      case 'set-sorted':
        return indices.includes(index) ? '#10B981' : '#94A3B8'; // emerald-500 for sorted
      case 'highlight':
        return indices.includes(index) ? '#F59E0B' : '#94A3B8'; // amber-500 for highlight
      default:
        return '#94A3B8';
    }
  };

  const getBarGlow = (index: number): string => {
    // Check if this element was marked as sorted in any previous step
    const wasSorted = steps.slice(0, currentStep + 1).some(step => 
      step.type === 'set-sorted' && step.indices.includes(index)
    );
    
    if (wasSorted) {
      return 'shadow-lg shadow-emerald-500/40';
    }

    if (!currentStepData) return '';

    const { type, indices } = currentStepData;
    
    if (indices.includes(index)) {
      switch (type) {
        case 'compare':
          return 'shadow-lg shadow-blue-500/40';
        case 'swap':
          return 'shadow-lg shadow-red-500/40';
        case 'set-sorted':
          return 'shadow-lg shadow-emerald-500/40';
        case 'highlight':
          return 'shadow-lg shadow-amber-500/40';
        default:
          return '';
      }
    }
    return '';
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-2xl"></div>
      
      {/* Array container with proper spacing for labels */}
      <div 
        className="array-container relative w-full flex items-end justify-between px-8 py-4 pt-16 max-w-6xl mx-auto"
        style={{ 
          height: displayArray.length > 50 ? '320px' : '360px',
          paddingBottom: displayArray.length > 50 ? '10px' : '40px',
          gap: displayArray.length > 80 ? '1px' : displayArray.length > 50 ? '2px' : '3px'
        }}
      >
        {displayArray.map((value, index) => {
          // Simple flex-based approach: let CSS handle the distribution
          const maxBarWidth = displayArray.length < 20 ? 50 : displayArray.length < 50 ? 20 : 10;
          const minBarWidth = 2;
          const barWidth = Math.max(minBarWidth, Math.min(maxBarWidth, 800 / displayArray.length));
          
          return (
            <div
              key={`${index}-${value}`}
              className="group relative flex flex-col items-center flex-shrink-0"
              style={{ 
                width: `${barWidth}px`
              }}
            >
              {/* Bar */}
              <div
                className={`relative rounded-t-xl transition-all duration-500 ease-out ${getBarGlow(index)}`}
                style={{
                  width: `${barWidth}px`,
                  height: `${(value / Math.max(...displayArray)) * (displayArray.length > 50 ? 200 : 250)}px`,
                  backgroundColor: getBarColor(index),
                  minHeight: displayArray.length > 75 ? '5px' : displayArray.length > 50 ? '10px' : '20px'
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-t-xl"></div>
                
                {/* Animated pulse effect for active elements */}
                {currentStepData && currentStepData.indices.includes(index) && (
                  <div className="absolute inset-0 bg-white/20 rounded-t-xl animate-pulse"></div>
                )}
              </div>
              
              {/* Value at bottom - only show for smaller arrays */}
              {displayArray.length <= 30 && (
                <div className="mt-3 px-1 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-700">{value}</span>
                </div>
              )}
              {displayArray.length > 30 && displayArray.length <= 50 && (
                <div className="mt-2 text-xs text-slate-500 font-medium">
                  {value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
