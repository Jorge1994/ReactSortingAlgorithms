import { useState, useEffect, useCallback } from 'react';
import type { SortStep } from '../types';
import { VisualizerTemplate } from './VisualizerTemplate';

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
  onSpeedChange
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

  // Reset visualization state when steps are cleared or reset
  useEffect(() => {
    if (steps.length === 0 || currentStep === 0) {
      setCurrentCountArray([]);
      setCurrentOutputArray([]);
      setCurrentPhase('');
      setHighlightedIndices([]);
      setCurrentValue(undefined);
      setCountIndex(undefined);
    }
  }, [steps.length, currentStep]);

  const handleReset = () => {
    // Clear all visualization state immediately
    setCurrentCountArray([]);
    setCurrentOutputArray([]);
    setCurrentPhase('');
    setHighlightedIndices([]);
    setCurrentValue(undefined);
    setCountIndex(undefined);
    // Call the parent reset function
    onReset();
  };

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

    // Find the min value to calculate the actual values being represented
    const minValue = Math.min(...displayArray);

    return (
      <div className="mb-2">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">Count Array</h4>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {/* Row for counts */}
                <tr>
                  {countArray.map((count, index) => (
                    <td
                      key={`count-${index}`}
                      className={`border border-gray-300 p-1 text-center font-bold text-sm transition-all duration-300 ${
                        countIndex === index
                          ? 'bg-red-100 border-red-400 text-red-800'
                          : 'bg-white text-gray-800'
                      }`}
                      style={{
                        minWidth: '28px',
                        minHeight: '32px',
                        boxShadow: countIndex === index ? '0 0 10px rgba(239, 68, 68, 0.3)' : 'none'
                      }}
                    >
                      {count}
                    </td>
                  ))}
                </tr>
                {/* Row for value labels - always show since we limit to 50 elements max */}
                <tr>
                  {countArray.map((_, index) => (
                    <td
                      key={`value-${index}`}
                      className="border border-gray-300 p-1 text-center text-xs font-semibold text-blue-700 bg-blue-50"
                      style={{
                        minWidth: '28px',
                        minHeight: '28px'
                      }}
                    >
                      {index + minValue}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>          
        </div>
      </div>
    );
  };

  const renderArray = (array: number[], title: string, arrayType: 'original' | 'output') => {
    const maxValue = Math.max(...array.filter(v => v !== undefined && v !== 0 && !isNaN(v)));
    const effectiveMaxValue = maxValue > 0 ? maxValue : 1;
    
    // Reduced height for better viewport fitting
    const containerHeight = '200px';
    const maxBarHeight = 120;
    
    return (
      <div className="mb-2">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">{title}</h4>
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-2xl"></div>
          
          {/* Array container */}
          <div 
            className="array-container relative w-full flex items-end justify-center px-4 sm:px-6 md:px-8 py-2"
            style={{ 
              height: containerHeight,
              paddingBottom: '25px',
              paddingTop: '15px',
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
                  
                  {/* Value at bottom - always show for counting sort since max is 50 */}
                  {array.length <= 50 && baseWidth > 6 && (
                    <div className="mt-2 sm:mt-3 px-1 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-xs font-semibold text-slate-700">
                        {isEmpty ? '-' : displayValue}
                      </span>
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

  // Custom statistics component for Counting Sort
  const customStatistics = (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      {steps.length > 0 && (
        <div className="flex flex-col items-center space-y-4">
          {/* Progress indicator */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Progress</span>
              <span>{currentStep + 1} / {steps.length}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <VisualizerTemplate
      currentStepData={steps[currentStep]}
      currentStep={currentStep}
      totalSteps={steps.length}
      isPlaying={isPlaying}
      speed={speed}
      onPlay={onPlay}
      onPause={onPause}
      onNext={onNext}
      onPrev={onPrev}
      onReset={handleReset}
      canPlayNext={canPlayNext}
      canPlayPrev={canPlayPrev}
      onSpeedChange={onSpeedChange}
      showStatistics={false}
      customControls={customStatistics}
    >
      <div className="space-y-6">
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
        <div className="space-y-1">
          {renderArray(displayArray, '', 'original')}
          
          {currentCountArray.length > 0 && 
            renderCountTable(currentCountArray)
          }
          
          {currentOutputArray.length > 0 && 
            renderArray(currentOutputArray, 'Output Array', 'output')
          }
        </div>
      </div>
    </VisualizerTemplate>
  );
}
