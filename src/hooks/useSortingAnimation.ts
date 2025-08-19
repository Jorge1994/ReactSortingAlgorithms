import { useState, useEffect } from 'react';
import { getAlgorithm, type AlgorithmKey } from '../algorithms/registry';
import { generateRandomArray, generateNearlySortedArray, generateReverseSortedArray } from '../utils/arrayGenerator';
import type { SortStep } from '../types';

export function useSortingAnimation(currentAlgorithm: AlgorithmKey) {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);

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

  const runSortingAlgorithm = () => {
    const algorithm = getAlgorithm(currentAlgorithm);
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

  return {
    // State
    array,
    steps,
    currentStep,
    isAnimating,
    isPlaying,
    animationSpeed,
    currentStepData,
    displayArray,
    
    // Actions
    generateNewArray,
    runSortingAlgorithm,
    playAnimation,
    pauseAnimation,
    nextStep,
    prevStep,
    reset,
    setAnimationSpeed,
    
    // Computed values
    canPlayNext: currentStep < steps.length - 1,
    canPlayPrev: currentStep > 0,
    isCompleted: steps.length > 0 && currentStep === steps.length - 1
  };
}
