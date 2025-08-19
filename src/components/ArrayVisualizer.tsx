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
      <div className="relative w-full flex items-end justify-center gap-2 p-8 pt-16 pb-20" style={{ height: '400px' }}>
        {displayArray.map((value, index) => (
          <div
            key={`${index}-${value}`}
            className="group relative flex flex-col items-center"
          >
            {/* Value label on top */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="bg-slate-800 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                {value}
              </div>
            </div>
            
            {/* Bar */}
            <div
              className={`relative w-8 md:w-12 rounded-t-xl transition-all duration-500 ease-out transform group-hover:scale-110 ${getBarGlow(index)}`}
              style={{
                height: `${(value / Math.max(...displayArray)) * 250}px`,
                backgroundColor: getBarColor(index),
                minHeight: '20px'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-t-xl"></div>
              
              {/* Animated pulse effect for active elements */}
              {currentStepData && currentStepData.indices.includes(index) && (
                <div className="absolute inset-0 bg-white/20 rounded-t-xl animate-pulse"></div>
              )}
            </div>
            
            {/* Value at bottom */}
            <div className="mt-3 px-2 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
              <span className="text-sm font-semibold text-slate-700">{value}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-30"></div>
      <div className="absolute top-8 right-6 w-2 h-2 bg-purple-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-4 left-8 w-4 h-4 bg-emerald-400 rounded-full opacity-20"></div>
    </div>
  );
}
