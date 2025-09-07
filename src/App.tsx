import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { type AlgorithmKey, algorithmRegistry } from './algorithms/registry';
import { useSortingAnimation } from './hooks/useSortingAnimation';
import type { UseSortingAnimationReturn } from './hooks/useSortingAnimation';
import { ModernHeader } from './components/ModernHeader';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { CountingSortVisualizer } from './components/CountingSortVisualizer';
import { RadixSortVisualizer } from './components/RadixSortVisualizer';
import { BucketSortVisualizer } from './components/BucketSortVisualizer';
import { CombinedControls } from './components/CombinedControls';
import { ImplementationSection } from './components/ImplementationSection';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ComparisonPage } from './components/ComparisonPage';
import { GlossaryPage } from './components/GlossaryPage';
import { AlgorithmDetailsPage } from './components/AlgorithmDetailsPage';

function VisualizerPage() {
  const { algorithm } = useParams<{ algorithm?: string }>();
  const navigate = useNavigate();
  
  // Validate and set algorithm from URL
  const getAlgorithmFromUrl = (urlAlgorithm?: string): AlgorithmKey => {
    if (urlAlgorithm && urlAlgorithm in algorithmRegistry) {
      return urlAlgorithm as AlgorithmKey;
    }
    return 'bubble-sort'; // fallback
  };
  
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmKey>(
    getAlgorithmFromUrl(algorithm)
  );

  // Update algorithm when URL changes
  useEffect(() => {
    const newAlgorithm = getAlgorithmFromUrl(algorithm);
    if (newAlgorithm !== currentAlgorithm) {
      setCurrentAlgorithm(newAlgorithm);
    }
  }, [algorithm, currentAlgorithm]);

  const hookResult: UseSortingAnimationReturn = useSortingAnimation(currentAlgorithm);
  
  const {
    displayArray,
    steps,
    currentStep,
    isPlaying,
    animationSpeed,
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
    navigate(`/visualize/${algorithmKey}`);
    
    // Limit array size for counting sort
    if (algorithmKey === 'counting-sort' && arraySize > 50) {
      changeArraySize(50);
    }
    
    // Reset the visualization when switching algorithms
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <ModernHeader 
        currentAlgorithm={currentAlgorithm} 
        onAlgorithmChange={handleAlgorithmChange}
      />
      
      <main className="w-full px-2 py-4 space-y-4">
        {/* Combined Controls - Array and Animation */}
        <section className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
            <CombinedControls
              onGenerateArray={generateNewArray}
              arraySize={arraySize}
              onArraySizeChange={changeArraySize}
              maxSize={currentAlgorithm === 'counting-sort' || currentAlgorithm === 'bucket-sort' ? 50 : 100}
              selectedAlgorithm={currentAlgorithm}
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
        </section>

        {/* Array Visualization */}
        <section className="w-full">
          {currentAlgorithm === 'counting-sort' ? (
            <CountingSortVisualizer 
              displayArray={displayArray}
              steps={steps}
              currentStep={currentStep}
              isPlaying={isPlaying}
              speed={animationSpeed}
              onPlay={playAnimation}
              onPause={pauseAnimation}
              onNext={nextStep}
              onPrev={prevStep}
              onReset={reset}
              canPlayNext={canPlayNext}
              canPlayPrev={canPlayPrev}
              onSpeedChange={setAnimationSpeed}
            />
          ) : currentAlgorithm === 'radix-sort' ? (
            <RadixSortVisualizer 
              displayArray={displayArray}
              steps={steps}
              currentStep={currentStep}
              isPlaying={isPlaying}
              speed={animationSpeed}
              onPlay={playAnimation}
              onPause={pauseAnimation}
              onNext={nextStep}
              onPrev={prevStep}
              onReset={reset}
              canPlayNext={canPlayNext}
              canPlayPrev={canPlayPrev}
              onSpeedChange={setAnimationSpeed}
            />
          ) : currentAlgorithm === 'bucket-sort' ? (
            <BucketSortVisualizer 
              displayArray={displayArray}
              steps={steps}
              currentStep={currentStep}
              isPlaying={isPlaying}
              speed={animationSpeed}
              onPlay={playAnimation}
              onPause={pauseAnimation}
              onNext={nextStep}
              onPrev={prevStep}
              onReset={reset}
              canPlayNext={canPlayNext}
              canPlayPrev={canPlayPrev}
              onSpeedChange={setAnimationSpeed}
            />
          ) : (
            <ArrayVisualizer 
              displayArray={displayArray} 
              steps={steps}
              currentStep={currentStep}
              isPlaying={isPlaying}
              speed={animationSpeed}
              onPlay={playAnimation}
              onPause={pauseAnimation}
              onNext={nextStep}
              onPrev={prevStep}
              onReset={reset}
              canPlayNext={canPlayNext}
              canPlayPrev={canPlayPrev}
              onSpeedChange={setAnimationSpeed}
            />
          )}
        </section>

        <ImplementationSection currentAlgorithm={currentAlgorithm} />
      </main>

      <Footer />
    </div>
  );
}

// Component to scroll to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily disable smooth scrolling
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Use multiple methods to ensure it works
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Restore original scroll behavior after a short delay
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 100);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visualize/:algorithm" element={<VisualizerPage />} />
        <Route path="/algorithm/:algorithm" element={<AlgorithmDetailsPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </>
  );
}

export default App;
