import { useState, useEffect } from 'react';
import { getAlgorithm, type AlgorithmKey } from '../algorithms/registry';
import { generateRandomArray, generateNearlySortedArray, generateReverseSortedArray } from '../utils/arrayGenerator';
import type { SortStep } from '../types';

export interface UseSortingAnimationReturn {
  // State
  array: number[];
  steps: SortStep[];
  currentStep: number;
  isAnimating: boolean;
  isPlaying: boolean;
  animationSpeed: number;
  currentStepData: SortStep;
  displayArray: number[];
  arraySize: number;
  
  // Actions
  generateNewArray: (type?: 'random' | 'nearly-sorted' | 'reverse') => void;
  runSortingAlgorithm: () => void;
  playAnimation: () => void;
  pauseAnimation: () => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  setAnimationSpeed: (speed: number) => void;
  changeArraySize: (size: number) => void;
  
  // Computed values
  canPlayNext: boolean;
  canPlayPrev: boolean;
  isCompleted: boolean;
}

export function useSortingAnimation(currentAlgorithm: AlgorithmKey): UseSortingAnimationReturn {
  const [arraySize, setArraySize] = useState(15);
  const [array, setArray] = useState<number[]>(() => generateRandomArray(15, 1, 100));
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
        newArray = generateNearlySortedArray(arraySize);
        break;
      case 'reverse':
        newArray = generateReverseSortedArray(arraySize);
        break;
      default:
        newArray = generateRandomArray(arraySize, 1, 100);
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

  const changeArraySize = (newSize: number) => {
    setArraySize(newSize);
    // Generate new array with the new size
    const newArray = generateRandomArray(newSize, 1, 100);
    setArray(newArray);
    setSteps([]);
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
    arraySize,
    
    // Actions
    generateNewArray,
    runSortingAlgorithm,
    playAnimation,
    pauseAnimation,
    nextStep,
    prevStep,
    reset,
    setAnimationSpeed,
    changeArraySize,
    
    // Computed values
    canPlayNext: currentStep < steps.length - 1,
    canPlayPrev: currentStep > 0,
    isCompleted: steps.length > 0 && currentStep === steps.length - 1
  };
}
