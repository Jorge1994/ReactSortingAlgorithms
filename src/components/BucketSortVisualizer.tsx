import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortStep } from '../types';
import { AnimationControls } from './AnimationControls';
import { StatisticsPanel } from './StatisticsPanel';
import { ColorLegend } from './ColorLegend';

interface ElementPosition {
  value: number;
  originalIndex: number;
  isInOriginalArray: boolean;
  bucketIndex?: number;
  isMoving?: boolean;
  isSorted?: boolean;
  elementId: string; // Add unique identifier
}

interface BucketSortVisualizerProps {
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

export function BucketSortVisualizer({ 
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
}: BucketSortVisualizerProps) {
  const timeoutsRef = useRef<Set<number>>(new Set());
  
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
    const elements: ElementPosition[] = displayArray.map((value, index) => ({
      value,
      originalIndex: index,
      isInOriginalArray: true,
      bucketIndex: undefined,
      isMoving: false,
      isSorted: false,
      elementId: `element-${index}-${value}`
    }));
    setOriginalArrayElements(elements);
  }, [displayArray]);

  // Initialize buckets from steps
  useEffect(() => {
    if (steps.length > 0 && steps[0].metadata?.buckets) {
      const buckets = steps[0].metadata.buckets;
      setNumBuckets(buckets.length);
      setBucketElements(Array.from({ length: buckets.length }, () => []));
    }
  }, [steps]);

  // Update element positions based on current step - COMPLETELY REBUILD STATE FROM STEP
  useEffect(() => {
    if (steps.length === 0 || currentStep >= steps.length) return;
    
    const currentStepData = steps[currentStep];
    const operationType = currentStepData.metadata?.operationType;
    const buckets = currentStepData.metadata?.buckets || [];
    const bucketIndex = currentStepData.metadata?.bucketIndex;

    // Handle different operation types
    if (operationType === 'distribute') {
      // Rebuild bucket elements from step metadata during distribution phase
      setBucketElements(() => {
        const newBuckets = Array(numBuckets).fill(null).map(() => [] as ElementPosition[]);
        
        buckets.forEach((bucket, idx) => {
          bucket.forEach((value, elementIdx) => {
            const elementId = `bucket-${idx}-${elementIdx}-${value}`;
            newBuckets[idx].push({
              value,
              originalIndex: -1, // Will be set later during concatenation
              isInOriginalArray: false,
              bucketIndex: idx,
              isMoving: false,
              isSorted: false,
              elementId
            });
          });
        });
        
        return newBuckets;
      });
      
      // For distribution, show only elements that haven't been distributed yet
      // Use the step index to determine how many elements have been processed
      const elementsDistributed = Math.floor(currentStep / 2); // Each element has 2 steps (highlight + place)
      
      setOriginalArrayElements(() => {
        // Get original full array from initialization
        const originalArray = displayArray;
        
        // Show only elements that haven't been distributed yet
        const remainingElements = originalArray.slice(elementsDistributed);
        
        return remainingElements.map((value, index) => ({
          value,
          originalIndex: elementsDistributed + index,
          isInOriginalArray: true,
          bucketIndex: undefined,
          isMoving: false,
          isSorted: false,
          elementId: `element-${elementsDistributed + index}-${value}`
        }));
      });
      
    } else if (operationType === 'sort-internal') {
      // During sorting internal, update bucket contents while preserving element IDs
      setBucketElements(prev => {
        const newBuckets = [...prev];
        
        buckets.forEach((bucket, idx) => {
          if (newBuckets[idx]) {
            // Update the order and contents of this bucket while preserving IDs
            const updatedBucket: ElementPosition[] = bucket.map((value, elementIdx) => {
              // Try to find existing element with same value in this bucket
              const existingElement = newBuckets[idx].find(el => el.value === value);
              if (existingElement) {
                return existingElement;
              }
              // If not found, create new element (shouldn't happen during sort-internal)
              return {
                value,
                originalIndex: -1,
                isInOriginalArray: false,
                bucketIndex: idx,
                isMoving: false,
                isSorted: false,
                elementId: `bucket-${idx}-${elementIdx}-${value}`
              };
            });
            newBuckets[idx] = updatedBucket;
          }
        });
        
        return newBuckets;
      });
      
      // Ensure original array stays empty during internal sorting
      setOriginalArrayElements([]);
      
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
      
      // Ensure original array stays empty until concatenation phase
      setOriginalArrayElements([]);
      
    } else if (operationType === 'concatenate') {
      // During concatenation, elements should move from buckets back to array progressively
      const currentArray = currentStepData?.array || [];
      const buckets = currentStepData?.metadata?.buckets || [];
      const currentPhase = currentStepData?.metadata?.currentPhase || '';
      
      // Check if this is the initial concatenation step
      if (currentPhase === 'Concatenation: Combining sorted buckets into final array') {
        // Initial concatenation step - keep array empty, buckets full
        setOriginalArrayElements([]);
        setBucketElements(() => {
          const newBuckets: ElementPosition[][] = [];
          buckets.forEach((bucket, idx) => {
            newBuckets[idx] = bucket.map((value, elementIdx) => ({
              value,
              originalIndex: -1,
              isInOriginalArray: false,
              bucketIndex: idx,
              isMoving: false,
              isSorted: true,
              elementId: `bucket-${idx}-${elementIdx}-${value}`
            }));
          });
          return newBuckets;
        });
      } else if (currentPhase === 'Completed: Array is now sorted') {
        // Final completion step - show full array, empty buckets
        setOriginalArrayElements(() => {
          return currentArray.map((value, index) => ({
            value,
            originalIndex: index,
            isInOriginalArray: true,
            bucketIndex: -1,
            isMoving: false,
            isSorted: true,
            elementId: `final-${index}-${value}`
          }));
        });
        
        // Set all buckets to empty
        setBucketElements(() => {
          const newBuckets: ElementPosition[][] = [];
          buckets.forEach((_, idx) => {
            newBuckets[idx] = [];
          });
          return newBuckets;
        });
      } else {
        // Progressive concatenation - show only the elements that should be in final array at this step
        // and remove them from buckets
        
        // Extract the placed elements count from step index or metadata
        const targetIndex = currentStepData?.indices?.[0];
        const finalArrayLength = targetIndex !== undefined ? targetIndex + 1 : currentArray.length;
        
        // Build the progressive final array in bucket order (bucket 0 first, then bucket 1, etc.)
        setOriginalArrayElements(() => {
          const finalElements = [];
          let elementsPlaced = 0;
          
          // Iterate through buckets in order and add elements sequentially
          for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
            const bucket = buckets[bucketIdx];
            for (let elementIdx = 0; elementIdx < bucket.length; elementIdx++) {
              if (elementsPlaced < finalArrayLength) {
                finalElements.push({
                  value: bucket[elementIdx],
                  originalIndex: elementsPlaced,
                  isInOriginalArray: true,
                  bucketIndex: -1,
                  isMoving: false,
                  isSorted: true,
                  elementId: `final-${elementsPlaced}-${bucket[elementIdx]}`
                });
                elementsPlaced++;
              } else {
                break;
              }
            }
            if (elementsPlaced >= finalArrayLength) break;
          }
          return finalElements;
        });
        
        // Update buckets to remove elements that have been moved to final array
        setBucketElements(() => {
          const newBuckets: ElementPosition[][] = [];
          let elementsPlacedSoFar = 0;
          
          buckets.forEach((bucket, bucketIdx) => {
            newBuckets[bucketIdx] = [];
            
            bucket.forEach((value, elementIdx) => {
              // Only keep elements that haven't been moved to final array yet
              // Elements are moved in order: bucket 0 completely, then bucket 1, etc.
              if (elementsPlacedSoFar >= finalArrayLength) {
                // This element hasn't been moved to final array yet, keep it in bucket
                newBuckets[bucketIdx].push({
                  value,
                  originalIndex: -1,
                  isInOriginalArray: false,
                  bucketIndex: bucketIdx,
                  isMoving: false,
                  isSorted: true,
                  elementId: `bucket-${bucketIdx}-${elementIdx}-${value}`
                });
              }
              // Always increment counter to track position in concatenation sequence
              elementsPlacedSoFar++;
            });
          });
          
          return newBuckets;
        });
      }
    }
  }, [currentStep, steps, numBuckets, displayArray]);

  const currentStepData = steps[currentStep];
  const currentPhase = currentStepData?.metadata?.currentPhase || '';
  const operationType = currentStepData?.metadata?.operationType || 'distribute';

  const resetArray = () => {
    // Cancel any pending timeouts
    clearAllTimeouts();
    
    // Use the parent's reset function
    onReset();
    
    // Reset bucket state
    setBucketElements([]);
    setNumBuckets(0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const stepForward = () => {
    if (canPlayNext) {
      onNext();
    }
  };

  const stepBackward = () => {
    if (canPlayPrev) {
      onPrev();
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
            <AnimatePresence>
              {originalArrayElements
                .filter(el => el.isInOriginalArray)
                .map((element) => (
                  <motion.div
                    key={element.elementId}
                    className="w-12 h-12 flex items-center justify-center rounded-lg border-2 text-white font-bold"
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
                ))}
            </AnimatePresence>
          )}
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
                  <div className="flex flex-wrap gap-2 h-[40px] items-center">
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
                            className="w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold border-2 border-white"
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
        onPause={onPause}
        onNext={stepForward}
        onPrev={stepBackward}
        onReset={resetArray}
        canPlayNext={canPlayNext}
        canPlayPrev={canPlayPrev}
        animationSpeed={speed}
        onSpeedChange={onSpeedChange}
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
