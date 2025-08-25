import { useState } from 'react';
import { type AlgorithmKey } from './algorithms/registry';
import { useSortingAnimation } from './hooks/useSortingAnimation';
import type { UseSortingAnimationReturn } from './hooks/useSortingAnimation';
import { Header } from './components/Header';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { ArrayControls } from './components/ArrayControls';
import { AnimationControls } from './components/AnimationControls';
import { StatisticsPanel } from './components/StatisticsPanel';
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
      
      <main className="w-full px-4 py-6 space-y-6">
        {/* Array Controls */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <ArrayControls
              onGenerateArray={generateNewArray}
              arraySize={arraySize}
              onArraySizeChange={changeArraySize}
            />
        </section>

        {/* Array Visualization */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 pb-4">
            <ArrayVisualizer 
              displayArray={displayArray} 
              currentStepData={currentStepData}
              steps={steps}
              currentStep={currentStep}
            />
          </div>
          
          {/* Animation Controls - Seamlessly integrated */}
          <div className="px-8 pb-4">
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
          
          <div className="px-8 pb-8 pt-2">
            <StatisticsPanel 
              currentStepData={currentStepData}
              currentStep={currentStep}
              totalSteps={steps.length}
            />

            <ColorLegend />
          </div>
        </section>

        <ImplementationSection currentAlgorithm={currentAlgorithm} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
