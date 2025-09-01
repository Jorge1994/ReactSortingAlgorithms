import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortStep } from '../types';
import { getAlgorithm } from '../algorithms/registry';
import type { AlgorithmKey } from '../algorithms/registry';
import { AnimationControls } from './AnimationControls';
import { StatisticsPanel } from './StatisticsPanel';
import { ColorLegend } from './ColorLegend';

interface BucketSortVisualizerProps {
  algorithm: string;
  initialArray?: number[];
}

interface ElementPosition {
  value: number;
  originalIndex: number;
  isInOriginalArray: boolean;
  bucketIndex?: number;
  isMoving: boolean;
  isSorted: boolean;
}

export function BucketSortVisualizer({ algorithm, initialArray }: BucketSortVisualizerProps) {
  const [array, setArray] = useState<number[]>(initialArray || [64, 34, 25, 12, 22, 11, 90, 5]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);
  const intervalRef = useRef<number | undefined>(undefined);
  const timeoutsRef = useRef<Set<number>>(new Set());
  
  // Helper to track timeouts
  const createTimeout = (callback: () => void, delay: number): number => {
    const timeoutId = window.setTimeout(() => {
      timeoutsRef.current.delete(timeoutId);
      callback();
    }, delay);
    timeoutsRef.current.add(timeoutId);
    return timeoutId;
  };
  
  // Helper to clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current.clear();
  };
  
  // State for element positions and animations
  const [originalArrayElements, setOriginalArrayElements] = useState<ElementPosition[]>([]);
  const [bucketElements, setBucketElements] = useState<ElementPosition[][]>([]);
  const [numBuckets, setNumBuckets] = useState(0);

  // Initialize element positions
  useEffect(() => {
    const elements: ElementPosition[] = array.map((value, index) => ({
      value,
      originalIndex: index,
      isInOriginalArray: true,
      bucketIndex: undefined,
      isMoving: false,
      isSorted: false
    }));
    setOriginalArrayElements(elements);
  }, [array]);

  // Generate steps when array changes
  useEffect(() => {
    const algorithmImpl = getAlgorithm(algorithm as AlgorithmKey);
    if (algorithmImpl) {
      const newSteps = algorithmImpl.execute(array);
      setSteps(newSteps);
      setCurrentStep(0);
      
      // Initialize buckets from first step
      if (newSteps.length > 0 && newSteps[0].metadata?.buckets) {
        const buckets = newSteps[0].metadata.buckets;
        setNumBuckets(buckets.length);
        setBucketElements(Array.from({ length: buckets.length }, () => []));
      }
    }
  }, [array, algorithm]);

  // Animation control
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed * 10);
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      clearAllTimeouts();
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // Update element positions based on current step
  useEffect(() => {
    if (steps.length === 0 || currentStep >= steps.length) return;
    
    const currentStepData = steps[currentStep];
    const operationType = currentStepData.metadata?.operationType;
    const buckets = currentStepData.metadata?.buckets || [];
    const elementValue = currentStepData.metadata?.elementValue;
    const bucketIndex = currentStepData.metadata?.bucketIndex;

    if (operationType === 'distribute' && elementValue !== undefined && bucketIndex !== undefined) {
      // Mark element as moving in original array
      setOriginalArrayElements(prev => 
        prev.map(el => 
          el.value === elementValue && el.isInOriginalArray
            ? { ...el, isMoving: true }
            : el
        )
      );
      
      // Add element to bucket first
      createTimeout(() => {
        setBucketElements(prev => {
          const newBuckets = [...prev];
          
          // Get current elements from state
          setOriginalArrayElements(currentOriginal => {
            const movingElement = currentOriginal.find(el => 
              el.value === elementValue && el.isInOriginalArray
            );
            if (movingElement) {
              newBuckets[bucketIndex] = [...newBuckets[bucketIndex], { 
                ...movingElement, 
                isInOriginalArray: false,
                bucketIndex,
                isMoving: false 
              }];
            }
            return currentOriginal;
          });
          
          return newBuckets;
        });
        
        // Then remove element from original array
        createTimeout(() => {
          setOriginalArrayElements(prev => 
            prev.filter(el => !(el.value === elementValue && el.isInOriginalArray))
          );
        }, 200);
      }, 200);
      
    } else if (operationType === 'sort-internal') {
      // Update bucket with sorted order (but preserve isSorted state for other buckets)
      setBucketElements(prev => {
        const newBuckets = [...prev];
        buckets.forEach((bucket, idx) => {
          if (bucket.length > 0) {
            // Preserve isSorted state from previous elements in this bucket
            const existingElements = newBuckets[idx] || [];
            const wasPreviouslySorted = existingElements.length > 0 && existingElements[0].isSorted;
            
            newBuckets[idx] = bucket.map((value) => ({
              value,
              originalIndex: -1,
              isInOriginalArray: false,
              bucketIndex: idx,
              isMoving: false,
              isSorted: wasPreviouslySorted // Preserve sorted state
            }));
          }
        });
        return newBuckets;
      });
      
    } else if (operationType === 'bucket-sorted' && bucketIndex !== undefined) {
      // Mark all elements in this specific bucket as sorted
      setBucketElements(prev => {
        const newBuckets = [...prev];
        if (newBuckets[bucketIndex]) {
          newBuckets[bucketIndex] = newBuckets[bucketIndex].map(element => ({
            ...element,
            isSorted: true
          }));
        }
        return newBuckets;
      });
      
    } else if (operationType === 'concatenate' && elementValue !== undefined && bucketIndex !== undefined) {
      // Move element from bucket back to original array
      const targetIndex = currentStepData.indices[0];
      if (targetIndex !== undefined) {
        setBucketElements(prev => {
          const newBuckets = [...prev];
          const elementToMove = newBuckets[bucketIndex].find(el => el.value === elementValue);
          if (elementToMove) {
            // Mark element as moving
            newBuckets[bucketIndex] = newBuckets[bucketIndex].map(el => 
              el.value === elementValue ? { ...el, isMoving: true } : el
            );
            
            // Remove element from bucket after delay
            createTimeout(() => {
              setBucketElements(prev2 => {
                const newBuckets2 = [...prev2];
                newBuckets2[bucketIndex] = newBuckets2[bucketIndex].filter(el => el.value !== elementValue);
                return newBuckets2;
              });
              
              // Add element back to original array
              setOriginalArrayElements(prev => {
                const newArray = [...prev];
                newArray[targetIndex] = {
                  value: elementValue,
                  originalIndex: targetIndex,
                  isInOriginalArray: true,
                  bucketIndex: undefined,
                  isMoving: false,
                  isSorted: true
                };
                return newArray.sort((a, b) => a.originalIndex - b.originalIndex);
              });
            }, 400);
          }
          return newBuckets;
        });
      }
    }
  }, [currentStep, steps]);

  const currentStepData = steps[currentStep];
  const currentPhase = currentStepData?.metadata?.currentPhase || '';
  const operationType = currentStepData?.metadata?.operationType || 'distribute';

  const resetArray = () => {
    // Cancel any pending timeouts
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    clearAllTimeouts();
    
    // Reset animation state
    setCurrentStep(0);
    setIsPlaying(false);
    
    // Reset array (this will trigger the useEffect to regenerate steps)
    const newArray = initialArray || [64, 34, 25, 12, 22, 11, 90, 5];
    setArray([...newArray]); // Force new array reference to trigger useEffect
    
    // Reset bucket state
    setBucketElements([]);
    setNumBuckets(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getElementColor = (element: ElementPosition) => {
    if (element.isMoving) return '#3B82F6'; // Blue - moving
    if (element.isSorted) return '#10B981'; // Green - sorted
    if (!element.isInOriginalArray) return '#F59E0B'; // Amber - in bucket
    return '#6B7280'; // Gray - default
  };

  const isArrayEmpty = originalArrayElements.filter(el => el.isInOriginalArray).length === 0;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Algorithm Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bucket Sort Visualization</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch how elements fly from the original array to buckets, get sorted internally, 
          then fly back to their final sorted positions.
        </p>
      </div>

      {/* Current Phase Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Current Phase</h3>
        <p className="text-blue-800">{currentPhase}</p>
      </div>

      {/* Original Array */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {operationType === 'concatenate' ? 'Final Sorted Array' : 'Original Array'}
        </h3>
        <div className="flex flex-wrap gap-2 justify-center min-h-[80px] items-center">
          <AnimatePresence mode="wait">
            {isArrayEmpty && operationType !== 'concatenate' ? (
              <motion.div
                key="empty-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 italic text-lg"
              >
                All elements moved to buckets
              </motion.div>
            ) : (
              originalArrayElements
                .filter(el => el.isInOriginalArray)
                .map((element) => (
                  <motion.div
                    key={`original-${element.value}-${element.originalIndex}`}
                    className="w-16 h-16 flex items-center justify-center rounded-lg border-2 text-white font-bold"
                    style={{ backgroundColor: getElementColor(element) }}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {element.value}
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Buckets Display */}
      {numBuckets > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Buckets ({numBuckets} total)
          </h3>
          <div className="space-y-4">
            {Array.from({ length: numBuckets }, (_, bucketIndex) => (
              <motion.div
                key={`bucket-${bucketIndex}`}
                className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50"
                layout
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-20">
                    Bucket {bucketIndex}:
                  </span>
                  <div className="flex flex-wrap gap-2 min-h-[56px] items-center">
                    <AnimatePresence mode="popLayout">
                      {!bucketElements[bucketIndex] || bucketElements[bucketIndex].length === 0 ? (
                        <motion.span
                          key={`empty-${bucketIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-gray-400 italic"
                        >
                          empty
                        </motion.span>
                      ) : (
                        bucketElements[bucketIndex].map((element, elementIndex) => (
                          <motion.div
                            key={`bucket-${bucketIndex}-${element.value}-${elementIndex}`}
                            className="w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold border-2 border-white"
                            style={{ backgroundColor: getElementColor(element) }}
                            layout
                            initial={{ scale: 0, opacity: 0, x: -30 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0, opacity: 0, x: 30 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: elementIndex * 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 25
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {element.value}
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <AnimationControls
        isPlaying={isPlaying}
        onPlay={togglePlay}
        onPause={() => setIsPlaying(false)}
        onNext={stepForward}
        onPrev={stepBackward}
        onReset={resetArray}
        canPlayNext={currentStep < steps.length - 1}
        canPlayPrev={currentStep > 0}
        animationSpeed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Statistics */}
      {currentStepData && (
        <StatisticsPanel
          currentStepData={currentStepData}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      )}

      {/* Color Legend */}
      <ColorLegend />
    </div>
  );
}
