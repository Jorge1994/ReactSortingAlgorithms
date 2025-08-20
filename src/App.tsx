import { useState } from 'react';
import { type AlgorithmKey } from './algorithms/registry';
import { useSortingAnimation } from './hooks/useSortingAnimation';
import type { UseSortingAnimationReturn } from './hooks/useSortingAnimation';
import { Header } from './components/Header';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { ArrayControls } from './components/ArrayControls';
import { AnimationControls } from './components/AnimationControls';
import { StatisticsPanel } from './components/StatisticsPanel';
import { CompletionStats } from './components/CompletionStats';
import { ColorLegend } from './components/ColorLegend';
import { ImplementationSection } from './components/ImplementationSection';
import { Footer } from './components/Footer';

function App() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmKey>('bubble-sort');

  const hookResult: UseSortingAnimationReturn = useSortingAnimation(currentAlgorithm);
  
  const {
    displayArray,
    steps,
    currentStep,
    isPlaying,
    animationSpeed,
    currentStepData,
    generateNewArray,
    playAnimation,
    pauseAnimation,
    nextStep,
    prevStep,
    reset,
    setAnimationSpeed,
    canPlayNext,
    canPlayPrev,
    isCompleted,
    arraySize,
    changeArraySize
  } = hookResult;

  const handleAlgorithmChange = (algorithmKey: AlgorithmKey) => {
    setCurrentAlgorithm(algorithmKey);
    // Reset the visualization when switching algorithms
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        currentAlgorithm={currentAlgorithm} 
        onAlgorithmChange={handleAlgorithmChange}
      />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Array Visualization */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <ArrayVisualizer 
              displayArray={displayArray} 
              currentStepData={currentStepData}
              steps={steps}
              currentStep={currentStep}
            />
            
            <StatisticsPanel 
              currentStepData={currentStepData}
              currentStep={currentStep}
              totalSteps={steps.length}
            />

            {/* Final Statistics */}
            {isCompleted && currentStepData && (
              <CompletionStats 
                currentStepData={currentStepData}
                arrayLength={displayArray.length}
              />
            )}

            <ColorLegend />
          </div>
        </section>

        {/* Controls */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-8 space-y-6">
            <ArrayControls
              onGenerateArray={generateNewArray}
              arraySize={arraySize}
              onArraySizeChange={changeArraySize}
            />
            
            <AnimationControls
              onPlay={playAnimation}
              onPause={pauseAnimation}
              onNext={nextStep}
              onPrev={prevStep}
              onReset={reset}
              isPlaying={isPlaying}
              canPlayNext={canPlayNext}
              canPlayPrev={canPlayPrev}
              animationSpeed={animationSpeed}
              onSpeedChange={setAnimationSpeed}
            />
          </div>
        </section>

        <ImplementationSection currentAlgorithm={currentAlgorithm} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
