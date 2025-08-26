import { useState, useEffect, useCallback } from 'react';
import type { SortStep } from '../types';
import { AnimationControls } from './AnimationControls';
import { StatisticsPanel } from './StatisticsPanel';
import { ColorLegend } from './ColorLegend';

interface CountingSortVisualizerProps {
  displayArray: number[];
  steps: SortStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  canPlayNext: boolean;
  canPlayPrev: boolean;
  onSpeedChange: (speed: number) => void;
  currentStepData?: SortStep;
}

export function CountingSortVisualizer({ 
  displayArray,
  steps,
  currentStep,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  canPlayNext,
  canPlayPrev,
  onSpeedChange,
  currentStepData
}: CountingSortVisualizerProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Current state for visualization
  const [currentCountArray, setCurrentCountArray] = useState<number[]>([]);
  const [currentOutputArray, setCurrentOutputArray] = useState<number[]>([]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState<number | undefined>();
  const [countIndex, setCountIndex] = useState<number | undefined>();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateVisualizationState = useCallback((step: SortStep) => {
    setCurrentCountArray(step.metadata?.countArray ? [...step.metadata.countArray] : []);
    setCurrentOutputArray(step.metadata?.outputArray ? [...step.metadata.outputArray] : []);
    setCurrentPhase(step.metadata?.currentPhase || '');
    setHighlightedIndices([...step.indices]);
    setCurrentValue(step.metadata?.currentValue);
    setCountIndex(step.metadata?.countIndex);
  }, []);

  // Update visualization state when currentStep changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      updateVisualizationState(steps[currentStep]);
    }
  }, [currentStep, steps, updateVisualizationState]);

  const handlePlay = () => onPlay();
  const handleReset = () => onReset();

  const handleStepForward = () => onNext();

  const handleStepBackward = () => onPrev();

  const getElementColor = (index: number, arrayType: 'original' | 'output') => {
    if (arrayType === 'original' && highlightedIndices.includes(index)) {
      return '#3B82F6'; // Blue for currently processing
    }
    if (arrayType === 'output') {
      return '#10B981'; // Green for output elements
    }
    return '#6B7280'; // Gray for unprocessed
  };

  const renderCountTable = (countArray: number[]) => {
    if (countArray.length === 0) return null;

    return (
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Count Array</h4>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {/* Row for counts */}
              <tr>
                {countArray.map((count, index) => (
                  <td
                    key={`count-${index}`}
                    className={`border border-gray-300 p-2 text-center font-semibold text-sm min-w-[40px] transition-all duration-300 ${
                      countIndex === index
                        ? 'bg-red-100 border-red-400 text-red-800'
                        : 'bg-gray-50'
                    }`}
                    style={{
                      boxShadow: countIndex === index ? '0 0 10px rgba(239, 68, 68, 0.3)' : 'none'
                    }}
                  >
                    {count}
                  </td>
                ))}
              </tr>
              {/* Row for indices */}
              <tr>
                {countArray.map((_, index) => (
                  <td
                    key={`index-${index}`}
                    className="border border-gray-300 p-2 text-center text-xs text-gray-600 bg-gray-100"
                  >
                    {index}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderArray = (array: number[], title: string, arrayType: 'original' | 'output') => {
    const maxValue = Math.max(...array.filter(v => v !== undefined && v !== 0 && !isNaN(v)));
    const effectiveMaxValue = maxValue > 0 ? maxValue : 1;
    
    // Standard height for both arrays
    const containerHeight = '320px';
    const maxBarHeight = 240;
    
    return (
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">{title}</h4>
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-2xl"></div>
          
          {/* Array container */}
          <div 
            className="array-container relative w-full flex items-end justify-center px-4 sm:px-6 md:px-8 py-4"
            style={{ 
              height: containerHeight,
              paddingBottom: '40px',
              paddingTop: '20px',
              gap: array.length > 15 ? '1px' : '2px'
            }}
          >
            {array.map((value, index) => {
              const displayValue = arrayType === 'output' && (value === undefined || value === 0) ? 0 : (value || 0);
              const isEmpty = arrayType === 'output' && (value === undefined || value === 0);
              
              // Calculate reasonable width based on array size and screen
              const isMobile = windowWidth < 640;
              const isTablet = windowWidth >= 640 && windowWidth < 1024;
              
              const baseWidth = Math.max(
                1,
                Math.min(
                  isMobile ? 15 : isTablet ? 25 : 40,
                  Math.floor((windowWidth - 100) / array.length)
                )
              );
              
              return (
                <div
                  key={`${arrayType}-${index}-${value}`}
                  className="group relative flex flex-col items-center"
                  style={{ 
                    flex: '1 1 0',
                    maxWidth: `${baseWidth}px`,
                    minWidth: '1px'
                  }}
                >
                  {/* Bar */}
                  <div
                    className={`relative rounded-t-xl transition-all duration-500 ease-out`}
                    style={{
                      width: '100%',
                      height: isEmpty ? '20px' : `${Math.max(12, (Math.abs(displayValue) / effectiveMaxValue) * maxBarHeight)}px`,
                      backgroundColor: getElementColor(index, arrayType),
                      minHeight: '12px',
                      opacity: isEmpty ? 0.3 : 1,
                      boxShadow: currentValue === value && arrayType === 'original' && highlightedIndices.includes(index) 
                        ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-t-xl"></div>
                    
                    {/* Animated pulse effect for active elements */}
                    {currentValue === value && arrayType === 'original' && highlightedIndices.includes(index) && (
                      <div className="absolute inset-0 bg-white/20 rounded-t-xl animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Value at bottom - only for smaller arrays where it makes sense */}
                  {array.length <= 20 && baseWidth > 8 && (
                    <div className="mt-2 sm:mt-3 px-1 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-xs font-semibold text-slate-700">
                        {isEmpty ? '-' : displayValue}
                      </span>
                    </div>
                  )}
                  {array.length > 20 && array.length <= 40 && baseWidth > 6 && !isMobile && (
                    <div className="mt-1 sm:mt-2 text-xs text-slate-500 font-medium">
                      {isEmpty ? '-' : displayValue}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="counting-sort-visualizer">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Counting Sort Visualization
          </h2>

          {/* Current phase indicator */}
          {currentPhase && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Phase:</h3>
              <p className="text-blue-700">{currentPhase}</p>
              {currentValue !== undefined && (
                <p className="text-sm text-blue-600 mt-1">
                  Processing value: <span className="font-bold">{currentValue}</span>
                </p>
              )}
            </div>
          )}

          {/* Array visualizations */}
          <div className="space-y-6">
            {renderArray(displayArray, 'Original Array', 'original')}
            
            {currentCountArray.length > 0 && 
              renderCountTable(currentCountArray)
            }
            
            {currentOutputArray.length > 0 && 
              renderArray(currentOutputArray, 'Output Array', 'output')
            }
          </div>
        </div>

        {/* Animation controls */}
        <div className="px-8 pb-4">
          <AnimationControls
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={onPause}
            onNext={handleStepForward}
            onPrev={handleStepBackward}
            onReset={handleReset}
            canPlayNext={canPlayNext}
            canPlayPrev={canPlayPrev}
            animationSpeed={speed}
            onSpeedChange={onSpeedChange}
          />
        </div>

        {/* Statistics */}
        <div className="px-8 pb-8 pt-2">
          <StatisticsPanel
            currentStepData={currentStepData}
            currentStep={currentStep}
            totalSteps={steps.length}
          />

          <ColorLegend />
        </div>
      </div>
    </div>
  );
}
