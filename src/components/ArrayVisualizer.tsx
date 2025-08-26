import { useEffect, useState } from 'react';
import type { SortStep } from '../types';

interface ArrayVisualizerProps {
  displayArray: number[];
  currentStepData?: SortStep;
  steps: SortStep[];
  currentStep: number;
}

export function ArrayVisualizer({ displayArray, currentStepData, steps, currentStep }: ArrayVisualizerProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getBarColor = (index: number): string => {
    // Check if this element was marked as finally sorted in any previous step
    const wasFinallySorted = steps.slice(0, currentStep + 1).some(step => 
      step.type === 'set-sorted' && step.indices.includes(index)
    );
    
    if (wasFinallySorted) {
      return '#10B981'; // emerald-500 for finally sorted elements
    }

    // Check if this element is temporarily sorted in current step
    const isTempSorted = currentStepData?.type === 'temp-sorted' && 
                        currentStepData.indices.includes(index);
    
    if (isTempSorted) {
      return '#34D399'; // emerald-400 for temporarily sorted elements
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
      case 'temp-sorted':
        return indices.includes(index) ? '#34D399' : '#94A3B8'; // emerald-400 for temp sorted
      case 'highlight':
        return indices.includes(index) ? '#F59E0B' : '#94A3B8'; // amber-500 for highlight
      default:
        return '#94A3B8';
    }
  };

  const getBarGlow = (index: number): string => {
    // Check if this element was marked as finally sorted in any previous step
    const wasFinallySorted = steps.slice(0, currentStep + 1).some(step => 
      step.type === 'set-sorted' && step.indices.includes(index)
    );
    
    if (wasFinallySorted) {
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
        case 'temp-sorted':
          return 'shadow-lg shadow-emerald-400/40';
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
        className="array-container relative w-full flex items-end justify-center px-4 sm:px-6 md:px-8 py-4 pt-8 sm:pt-12 md:pt-16"
        style={{ 
          height: displayArray.length > 75 ? '250px' : displayArray.length > 50 ? '320px' : displayArray.length > 30 ? '380px' : '420px',
          paddingBottom: displayArray.length > 50 ? '10px' : '40px',
          gap: displayArray.length > 80 ? '0.5px' : displayArray.length > 50 ? '1px' : '2px'
        }}
      >
        {displayArray.map((value, index) => {
          // Let CSS flexbox handle the distribution naturally
          const isMobile = windowWidth < 640;
          const isTablet = windowWidth >= 640 && windowWidth < 1024;
          
          // Calculate reasonable width based on array size and screen
          const baseWidth = Math.max(
            1,
            Math.min(
              isMobile ? 15 : isTablet ? 25 : 40,
              Math.floor((windowWidth - 100) / displayArray.length) // Simple division with margin
            )
          );
          
          return (
            <div
              key={`${index}-${value}`}
              className="group relative flex flex-col items-center"
              style={{ 
                flex: '1 1 0',
                maxWidth: `${baseWidth}px`,
                minWidth: '1px'
              }}
            >
              {/* Bar */}
              <div
                className={`relative rounded-t-xl transition-all duration-500 ease-out ${getBarGlow(index)}`}
                style={{
                  width: '100%',
                  height: `${(value / Math.max(...displayArray)) * (
                    displayArray.length > 75 
                      ? (isMobile ? 160 : isTablet ? 180 : 200)
                      : displayArray.length > 50 
                      ? (isMobile ? 180 : isTablet ? 220 : 240)
                      : displayArray.length > 30 
                      ? (isMobile ? 200 : isTablet ? 260 : 280)
                      : (isMobile ? 220 : isTablet ? 280 : 320)
                  )}px`,
                  backgroundColor: getBarColor(index),
                  minHeight: displayArray.length > 100 ? '4px' : displayArray.length > 75 ? '6px' : displayArray.length > 50 ? '8px' : '12px'
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-t-xl"></div>
                
                {/* Animated pulse effect for active elements */}
                {currentStepData && currentStepData.indices.includes(index) && (
                  <div className="absolute inset-0 bg-white/20 rounded-t-xl animate-pulse"></div>
                )}
              </div>
              
              {/* Value at bottom - only for smaller arrays where it makes sense */}
              {displayArray.length <= 20 && baseWidth > 8 && (
                <div className="mt-2 sm:mt-3 px-1 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-700">{value}</span>
                </div>
              )}
              {displayArray.length > 20 && displayArray.length <= 40 && baseWidth > 6 && !isMobile && (
                <div className="mt-1 sm:mt-2 text-xs text-slate-500 font-medium">
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
