import { useState, useEffect, useCallback } from 'react';
import type { SortStep } from '../types';
import { VisualizerTemplate } from './VisualizerTemplate';

interface RadixSortStep extends SortStep {
  countArray?: number[];
  auxiliaryArray?: number[];
  currentDigit?: number;
  digitPosition?: number;
  currentValue?: number;
  countIndex?: number;
}

interface RadixSortVisualizerProps {
  displayArray: number[];
  steps: RadixSortStep[];
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

export function RadixSortVisualizer({ 
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
}: RadixSortVisualizerProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Current state for visualization
  const [currentCountArray, setCurrentCountArray] = useState<number[]>([]);
  const [currentAuxiliaryArray, setCurrentAuxiliaryArray] = useState<number[]>([]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState<number | undefined>();
  const [currentDigit, setCurrentDigit] = useState<number | undefined>();
  const [digitPosition, setDigitPosition] = useState<number | undefined>();
  const [countIndex, setCountIndex] = useState<number | undefined>();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateVisualizationState = useCallback((step: RadixSortStep) => {
    setCurrentCountArray(step.countArray ? [...step.countArray] : []);
    setCurrentAuxiliaryArray(step.auxiliaryArray ? [...step.auxiliaryArray] : []);
    setCurrentPhase(step.metadata?.currentPhase || '');
    setHighlightedIndices([...step.indices]);
    setCurrentValue(step.currentValue);
    setCurrentDigit(step.currentDigit);
    setDigitPosition(step.digitPosition);
    setCountIndex(step.countIndex);
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
      setCurrentAuxiliaryArray([]);
      setCurrentPhase('');
      setHighlightedIndices([]);
      setCurrentValue(undefined);
      setCurrentDigit(undefined);
      setDigitPosition(undefined);
      setCountIndex(undefined);
    }
  }, [steps.length, currentStep]);

  const handleReset = () => {
    // Clear all visualization state immediately
    setCurrentCountArray([]);
    setCurrentAuxiliaryArray([]);
    setCurrentPhase('');
    setHighlightedIndices([]);
    setCurrentValue(undefined);
    setCurrentDigit(undefined);
    setDigitPosition(undefined);
    setCountIndex(undefined);
    // Call the parent reset function
    onReset();
  };

  const getElementColor = (index: number, arrayType: 'main' | 'auxiliary') => {
    if (arrayType === 'main' && highlightedIndices.includes(index)) {
      return '#3B82F6'; // Blue for currently processing
    }
    if (arrayType === 'auxiliary') {
      return '#10B981'; // Green for auxiliary elements
    }
    return '#6B7280'; // Gray for unprocessed
  };

  const getDigitName = (digitPos: number | undefined) => {
    if (digitPos === undefined) return '';
    if (digitPos === 0) return 'Units';
    if (digitPos === 1) return 'Tens';
    if (digitPos === 2) return 'Hundreds';
    return `10^${digitPos}`;
  };

  const renderCountTable = (countArray: number[]) => {
    if (countArray.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">
          Count Array {digitPosition !== undefined && `(${getDigitName(digitPosition)} Digit)`}
        </h4>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex justify-center">
          <div className="inline-block">
            <table className="border-collapse">
              <tbody>
                {/* Row for counts */}
                <tr>
                  {countArray.map((count, index) => (
                    <td
                      key={`count-${index}`}
                      className={`border border-gray-300 text-center font-bold transition-all duration-300 ${
                        countIndex === index
                          ? 'bg-red-100 border-red-400 text-red-800'
                          : currentDigit === index
                          ? 'bg-blue-100 border-blue-400 text-blue-800'
                          : 'bg-white text-gray-800'
                      }`}
                      style={{
                        width: '50px',
                        height: '50px',
                        fontSize: '18px',
                        boxShadow: countIndex === index 
                          ? '0 0 10px rgba(239, 68, 68, 0.3)' 
                          : currentDigit === index 
                          ? '0 0 10px rgba(59, 130, 246, 0.3)'
                          : 'none'
                      }}
                    >
                      {count}
                    </td>
                  ))}
                </tr>
                {/* Row for digit labels */}
                <tr>
                  {countArray.map((_, index) => (
                    <td
                      key={`digit-${index}`}
                      className={`border border-gray-300 text-center font-semibold transition-all duration-300 ${
                        currentDigit === index 
                          ? 'text-blue-700 bg-blue-50' 
                          : 'text-gray-700 bg-gray-50'
                      }`}
                      style={{
                        width: '50px',
                        height: '40px',
                        fontSize: '16px'
                      }}
                    >
                      {index}
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

  const renderArray = (array: number[], title: string, arrayType: 'main' | 'auxiliary') => {
    // Use the original displayArray to calculate the maximum value for consistent height
    const maxValue = Math.max(...displayArray);
    const effectiveMaxValue = maxValue > 0 ? maxValue : 1;
    
    // Fixed height for consistent visualization
    const containerHeight = '250px'; // Increased height to accommodate digit indicators
    const maxBarHeight = 120;
    
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">{title}</h4>
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-2xl"></div>
          
          {/* Array container */}
          <div 
            className="array-container relative w-full flex items-end justify-center px-4 sm:px-6 md:px-8 py-2"
            style={{ 
              height: containerHeight,
              paddingBottom: '25px',
              paddingTop: '50px', // Increased padding to accommodate digit indicators
              gap: array.length > 15 ? '1px' : '2px'
            }}
          >
            {array.map((value, index) => {
              const displayValue = arrayType === 'auxiliary' && (value === undefined || value === 0) ? 0 : (value || 0);
              const isEmpty = arrayType === 'auxiliary' && (value === undefined || value === 0);
              
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
              
              // Show digit highlight for current value
              const showDigitHighlight = currentValue === value && 
                                       arrayType === 'main' && 
                                       highlightedIndices.includes(index) && 
                                       digitPosition !== undefined;
              
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
                      boxShadow: showDigitHighlight
                        ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-t-xl"></div>
                    
                    {/* Animated pulse effect for active elements */}
                    {showDigitHighlight && (
                      <div className="absolute inset-0 bg-white/20 rounded-t-xl animate-pulse"></div>
                    )}

                    {/* Digit highlight indicator */}
                    {showDigitHighlight && digitPosition !== undefined && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg z-20">
                        {Math.floor(displayValue / Math.pow(10, digitPosition)) % 10}
                      </div>
                    )}
                  </div>
                  
                  {/* Value at bottom - always show for radix sort since max is reasonable */}
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

  // Custom statistics and legend component for Radix Sort
  const customStatistics = (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      {steps.length > 0 && (
        <div className="flex flex-col items-center space-y-4 mb-6">
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

      {/* Custom Color Legend for Radix Sort */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Color Legend:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3B82F6' }}></div>
            <span className="text-slate-600">Processing/Analyzing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }}></div>
            <span className="text-slate-600">Count Array Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }}></div>
            <span className="text-slate-600">Auxiliary Array</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#6B7280' }}></div>
            <span className="text-slate-600">Unprocessed</span>
          </div>
        </div>
      </div>
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
      showColorLegend={false}
      showAnimationControls={false}
      customControls={customStatistics}
    >
      <div className="space-y-6">
        {/* Current phase indicator */}
        {currentPhase && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Phase:</h3>
            <p className="text-blue-700">{currentPhase}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {currentValue !== undefined && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  Processing: <span className="font-bold">{currentValue}</span>
                </span>
              )}
              {currentDigit !== undefined && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  Digit: <span className="font-bold">{currentDigit}</span>
                </span>
              )}
              {digitPosition !== undefined && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                  Position: <span className="font-bold">{getDigitName(digitPosition)}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Array visualizations */}
        <div className="space-y-2">
          {/* Main Array */}
          {renderArray(displayArray, 'Main Array', 'main')}
          
          {/* Count Array - Always visible when steps exist */}
          {steps.length > 0 && 
            renderCountTable(currentCountArray.length > 0 ? currentCountArray : Array(10).fill(0))
          }
          
          {/* Auxiliary Array - Always visible when steps exist */}
          {steps.length > 0 && 
            renderArray(
              currentAuxiliaryArray.length > 0 ? currentAuxiliaryArray : Array(displayArray.length).fill(undefined), 
              'Auxiliary Array', 
              'auxiliary'
            )
          }
        </div>
      </div>
    </VisualizerTemplate>
  );
}
