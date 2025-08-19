import { useState, useEffect } from 'react';
import { getAlgorithm } from './algorithms/registry';
import { generateRandomArray, generateNearlySortedArray, generateReverseSortedArray } from './utils/arrayGenerator';
import { CodeTabs } from './components/CodeTabs';
import { bubbleSortImplementations } from './data/bubbleSortImplementations';
import { getActiveImplementations } from './types/implementations';
import type { SortStep } from './types';

function App() {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500); // milliseconds

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

  const playAnimation = () => {
    setIsPlaying(true);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

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
    <div className="fixed inset-0 w-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header fixo */}
      <div className="flex-shrink-0 w-full p-4 bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Bubble Sort Visualizer
        </h1>
      </div>
      
      {/* Conteúdo scrollável */}
      <div className="flex-1 w-full overflow-y-auto p-4">
        {/* Array Visualization */}
        <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="w-full flex items-end justify-center space-x-2 h-64 mb-6">
            {displayArray.map((value, index) => {
              let barColor = 'bg-gray-400'; // default
              
              if (currentStepData) {
                if (currentStepData.type === 'compare' && currentStepData.indices.includes(index)) {
                  barColor = 'bg-blue-500'; // comparing
                } else if (currentStepData.type === 'swap' && currentStepData.indices.includes(index)) {
                  barColor = 'bg-red-500'; // swapping
                } else if (currentStepData.type === 'set-sorted' && currentStepData.indices.includes(index)) {
                  barColor = 'bg-green-500'; // sorted
                }
                
                // Keep previously sorted elements green
                if (steps.slice(0, currentStep + 1).some(step => 
                  step.type === 'set-sorted' && step.indices.includes(index)
                )) {
                  barColor = 'bg-green-500';
                }
              }
              
              return (
                <div
                  key={`${index}-${value}`}
                  className={`${barColor} transition-colors duration-300 rounded-t flex items-end justify-center text-white text-sm font-bold`}
                  style={{
                    height: `${(value / Math.max(...displayArray)) * 200}px`,
                    width: '40px',
                    minHeight: '20px'
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
          
          {/* Step Information */}
          {currentStepData && (
            <div className="text-center text-gray-600 mb-6">
              <p className="font-semibold text-lg">{currentStepData.metadata?.currentPhase}</p>
              <p className="text-base mt-2">
                Comparisons: {currentStepData.metadata?.comparisons} | 
                Swaps: {currentStepData.metadata?.swaps}
              </p>
            </div>
          )}

          {/* Color Legend */}
          <div className="flex justify-center items-center gap-8 text-base bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded"></div>
              <span className="font-medium text-gray-700">Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-500 rounded"></div>
              <span className="font-medium text-gray-700">Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded"></div>
              <span className="font-medium text-gray-700">Sorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="font-medium text-gray-700">Unsorted</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            {/* Array Generation Controls */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Generate Array</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => generateNewArray('random')}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Random
                </button>
                <button
                  onClick={() => generateNewArray('nearly-sorted')}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Nearly Sorted
                </button>
                <button
                  onClick={() => generateNewArray('reverse')}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Reverse Order
                </button>
              </div>
            </div>

            {/* Algorithm Controls */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Algorithm Control</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={runBubbleSort}
                  disabled={isAnimating}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors font-semibold text-sm"
                >
                  Run Bubble Sort
                </button>
                
                {steps.length > 0 && (
                  <>
                    <button
                      onClick={isPlaying ? pauseAnimation : playAnimation}
                      className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
                    >
                      {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                    </button>
                    
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 transition-colors text-sm"
                    >
                      ← Previous
                    </button>
                    
                    <button
                      onClick={nextStep}
                      disabled={currentStep === steps.length - 1}
                      className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 transition-colors text-sm"
                    >
                      Next →
                    </button>
                    
                    <button
                      onClick={reset}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Reset
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            {/* Speed Control */}
            {steps.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Animation Speed</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Slow</span>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">Fast</span>
                  <span className="text-sm text-gray-500 min-w-[60px]">
                    {animationSpeed}ms
                  </span>
                </div>
              </div>
            )}
            
            {steps.length > 0 && (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Progress</h3>
                <p className="text-gray-600 mb-2 text-sm">
                  Step {currentStep + 1} of {steps.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Info & Statistics */}
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">About Bubble Sort</h2>
          <p className="text-gray-600 mb-4 text-sm">
            {getAlgorithm('bubble-sort').description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Time Complexity</h3>
              <ul className="text-gray-600 space-y-1 text-xs">
                <li><span className="font-medium">Best case:</span> {getAlgorithm('bubble-sort').complexity.time.best}</li>
                <li><span className="font-medium">Average case:</span> {getAlgorithm('bubble-sort').complexity.time.average}</li>
                <li><span className="font-medium">Worst case:</span> {getAlgorithm('bubble-sort').complexity.time.worst}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Space Complexity</h3>
              <p className="text-gray-600 text-xs">
                <span className="font-medium">Space:</span> {getAlgorithm('bubble-sort').complexity.space}
              </p>
            </div>
          </div>

          {/* Code Implementations Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Implementation Examples</h3>
            <CodeTabs examples={getActiveImplementations(bubbleSortImplementations)} />
          </div>

          {/* Final Statistics */}
          {steps.length > 0 && currentStep === steps.length - 1 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-3 text-base">🎉 Sorting Complete!</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{currentStepData?.metadata?.comparisons}</div>
                  <div className="text-xs text-green-600">Total Comparisons</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{currentStepData?.metadata?.swaps}</div>
                  <div className="text-xs text-green-600">Total Swaps</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{array.length}</div>
                  <div className="text-xs text-green-600">Array Size</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{steps.length}</div>
                  <div className="text-xs text-green-600">Total Steps</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
