import { useState, useEffect } from 'react';
import { getAlgorithm } from './algorithms/registry';
import { getAlgorithmInfo } from './algorithms/infoRegistry';
import { generateRandomArray, generateNearlySortedArray, generateReverseSortedArray } from './utils/arrayGenerator';
import { CodeTabs } from './components/CodeTabs';
import { AlgorithmDetails } from './components/AlgorithmDetails';
import { bubbleSortImplementations } from './data/bubbleSortImplementations';
import { getActiveImplementations } from './types/implementations';
import type { SortStep } from './types';

function App() {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [isAlgorithmDetailsExpanded, setIsAlgorithmDetailsExpanded] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, animationSpeed);
      
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, animationSpeed]);

  const generateNewArray = (type: 'random' | 'nearly-sorted' | 'reverse' = 'random') => {
    let newArray: number[];
    
    switch (type) {
      case 'nearly-sorted':
        newArray = generateNearlySortedArray(10);
        break;
      case 'reverse':
        newArray = generateReverseSortedArray(10);
        break;
      default:
        newArray = generateRandomArray(10, 1, 100);
    }
    
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
    setIsPlaying(false);
  };

  const runBubbleSort = () => {
    const algorithm = getAlgorithm('bubble-sort');
    const sortSteps = algorithm.execute(array);
    setSteps(sortSteps);
    setCurrentStep(0);
    setIsAnimating(true);
    setIsPlaying(false);
  };

  const playAnimation = () => setIsPlaying(true);
  const pauseAnimation = () => setIsPlaying(false);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsAnimating(false);
    setIsPlaying(false);
  };

  const currentStepData = steps[currentStep];
  const displayArray = currentStepData ? currentStepData.array : array;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full p-6 bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Bubble Sort Visualizer
          </h1>
        </div>
      </header>
      
      {/* Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Array Visualization */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-8">
            {/* Bars */}
            <div className="w-full flex items-end justify-center space-x-3 h-72 mb-8">
              {displayArray.map((value, index) => {
                let barColor = 'bg-slate-400';
                
                if (currentStepData) {
                  if (currentStepData.type === 'compare' && currentStepData.indices.includes(index)) {
                    barColor = 'bg-blue-500 shadow-lg shadow-blue-500/30';
                  } else if (currentStepData.type === 'swap' && currentStepData.indices.includes(index)) {
                    barColor = 'bg-red-500 shadow-lg shadow-red-500/30';
                  } else if (currentStepData.type === 'set-sorted' && currentStepData.indices.includes(index)) {
                    barColor = 'bg-green-500 shadow-lg shadow-green-500/30';
                  }
                  
                  // Keep previously sorted elements green
                  if (steps.slice(0, currentStep + 1).some(step => 
                    step.type === 'set-sorted' && step.indices.includes(index)
                  )) {
                    barColor = 'bg-green-500 shadow-lg shadow-green-500/30';
                  }
                }
                
                return (
                  <div
                    key={`${index}-${value}`}
                    className={`${barColor} transition-all duration-300 rounded-t-lg flex items-end justify-center text-white text-sm font-bold hover:scale-105 transform-gpu`}
                    style={{
                      height: `${(value / Math.max(...displayArray)) * 240}px`,
                      width: '45px',
                      minHeight: '30px'
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
            
            {/* Step Information */}
            {currentStepData && (
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-6 py-3 text-base border border-slate-200 rounded-lg bg-white mb-4 text-slate-800 shadow-sm">
                  {currentStepData.metadata?.currentPhase}
                </div>
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                    <span className="text-blue-600">⚖️</span>
                    <span className="text-slate-700">Comparisons:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {currentStepData.metadata?.comparisons}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                    <span className="text-red-600">🔄</span>
                    <span className="text-slate-700">Swaps:</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                      {currentStepData.metadata?.swaps}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Final Statistics */}
            {steps.length > 0 && currentStep === steps.length - 1 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 mb-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-3xl">🎉</span>
                  <h3 className="font-bold text-green-800 text-xl">Sorting Complete!</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">{currentStepData?.metadata?.comparisons}</div>
                    <div className="text-sm text-green-600 uppercase tracking-wide font-medium">Comparisons</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">{currentStepData?.metadata?.swaps}</div>
                    <div className="text-sm text-green-600 uppercase tracking-wide font-medium">Swaps</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">{array.length}</div>
                    <div className="text-sm text-green-600 uppercase tracking-wide font-medium">Array Size</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">{steps.length}</div>
                    <div className="text-sm text-green-600 uppercase tracking-wide font-medium">Total Steps</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">
                      {currentStepData?.metadata?.executionTime ? 
                        `${currentStepData.metadata.executionTime.toFixed(2)}` : 
                        'N/A'
                      }
                    </div>
                    <div className="text-sm text-green-600 uppercase tracking-wide font-medium">
                      {currentStepData?.metadata?.executionTime ? 'Milliseconds' : 'Execution Time'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Color Legend */}
            <div className="flex justify-center items-center gap-8 text-sm bg-slate-50 p-6 rounded-xl border">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-lg shadow-sm"></div>
                <span className="font-medium text-slate-700">Comparing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-lg shadow-sm"></div>
                <span className="font-medium text-slate-700">Swapping</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-lg shadow-sm"></div>
                <span className="font-medium text-slate-700">Sorted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-slate-400 rounded-lg shadow-sm"></div>
                <span className="font-medium text-slate-700">Unsorted</span>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Array Generation */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <span className="text-blue-600">🎲</span>
                Generate Array
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-3">
              <button
                onClick={() => generateNewArray('random')}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 rounded-lg transition-colors"
              >
                <span>🔀</span>
                Random Array
              </button>
              <button
                onClick={() => generateNewArray('nearly-sorted')}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 border border-slate-200 bg-white hover:bg-green-50 hover:border-green-300 hover:text-green-700 rounded-lg transition-colors"
              >
                <span>📈</span>
                Nearly Sorted
              </button>
              <button
                onClick={() => generateNewArray('reverse')}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 border border-slate-200 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 rounded-lg transition-colors"
              >
                <span>📉</span>
                Reverse Order
              </button>
            </div>
          </div>

          {/* Algorithm Control */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <span className="text-green-600">⚡</span>
                Algorithm Control
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <button
                onClick={runBubbleSort}
                disabled={isAnimating}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg shadow-lg transition-all flex items-center justify-center gap-3 font-semibold"
              >
                <span>🚀</span>
                Run Bubble Sort
              </button>
              
              {steps.length > 0 && (
                <>
                  <div className="h-px bg-slate-200"></div>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={isPlaying ? pauseAnimation : playAnimation}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors text-xl"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 text-slate-800 rounded-lg transition-colors text-xl"
                    >
                      ⏮️
                    </button>
                    
                    <button
                      onClick={nextStep}
                      disabled={currentStep === steps.length - 1}
                      className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 text-slate-800 rounded-lg transition-colors text-xl"
                    >
                      ⏭️
                    </button>
                    
                    <button
                      onClick={reset}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-xl"
                    >
                      🔄
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Animation & Progress */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <span className="text-purple-600">🎬</span>
                Animation & Progress
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-6">
              {steps.length > 0 ? (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-700">Speed</span>
                      <span className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono">
                        {animationSpeed}ms
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="100"
                      value={animationSpeed}
                      onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>⚡ Fast</span>
                      <span>🐌 Slow</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-200"></div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-700">Progress</span>
                      <span className="px-2 py-1 border border-slate-200 text-slate-800 rounded text-xs font-mono">
                        {currentStep + 1} / {steps.length}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  <span className="text-4xl block mb-4">💤</span>
                  <p className="text-sm">Run algorithm to see controls</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Algorithm Details */}
        <AlgorithmDetails 
          algorithmInfo={getAlgorithmInfo('bubble-sort')} 
          isExpanded={isAlgorithmDetailsExpanded}
          onToggle={() => setIsAlgorithmDetailsExpanded(!isAlgorithmDetailsExpanded)} 
        />

        {/* Code Examples */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <span className="text-slate-600">💻</span>
              Implementation Examples
            </h3>
          </div>
          <div className="p-6 pt-0">
            <p className="text-slate-600 mb-6">
              Here are complete implementations of the Bubble Sort algorithm in different programming languages:
            </p>
            <CodeTabs examples={getActiveImplementations(bubbleSortImplementations)} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
