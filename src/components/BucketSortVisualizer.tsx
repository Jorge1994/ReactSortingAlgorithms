import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortStep } from '../types';
import { VisualizerTemplate } from './VisualizerTemplate';

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

  // Initialize buckets from steps - ONLY when we have steps available
  useEffect(() => {
    if (steps.length > 0) {
      // Look for bucket metadata in any of the early steps
      let bucketsFound = false;
      for (let i = 0; i < Math.min(5, steps.length); i++) {
        const stepBuckets = steps[i].metadata?.buckets;
        if (stepBuckets && Array.isArray(stepBuckets)) {
          setNumBuckets(stepBuckets.length);
          setBucketElements(Array.from({ length: stepBuckets.length }, () => []));
          bucketsFound = true;
          break;
        }
      }
      
      if (!bucketsFound) {
        setNumBuckets(0);
        setBucketElements([]);
      }
    }
  }, [steps]);

  // Clear buckets when we reset (no steps but we had buckets before)
  useEffect(() => {
    if (steps.length === 0 && numBuckets > 0) {
      setNumBuckets(0);
      setBucketElements([]);
    }
  }, [steps.length, numBuckets]);

  // Update element positions based on current step - COMPLETELY REBUILD STATE FROM STEP
  useEffect(() => {
    if (steps.length === 0 || currentStep >= steps.length) return;
    
    // If we're at step 0 after a reset, clear all bucket states
    if (currentStep === 0) {
      setBucketElements(() => {
        if (numBuckets > 0) {
          return Array.from({ length: numBuckets }, () => []);
        }
        return [];
      });
      
      // Reset original array to initial state
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
      return;
    }
    
    const currentStepData = steps[currentStep];
    const operationType = currentStepData.metadata?.operationType;
    const buckets = currentStepData.metadata?.buckets || [];
    const bucketIndex = currentStepData.metadata?.bucketIndex;

    // Handle different operation types
    if (operationType === 'distribute') {
      // Rebuild bucket elements from step metadata during distribution phase
      setBucketElements(() => {
        if (numBuckets <= 0) return [];
        
        const newBuckets = Array.from({ length: numBuckets }, () => [] as ElementPosition[]);
        
        buckets.forEach((bucket, idx) => {
          if (bucket && Array.isArray(bucket) && idx < numBuckets && newBuckets[idx]) {
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
          }
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
        if (!prev || prev.length === 0) return [];
        
        const newBuckets = [...prev];
        
        buckets.forEach((bucket, idx) => {
          if (bucket && Array.isArray(bucket) && idx < newBuckets.length && newBuckets[idx]) {
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
        if (!prev || prev.length === 0) return [];
        
        const newBuckets = [...prev];
        if (bucketIndex >= 0 && bucketIndex < newBuckets.length && newBuckets[bucketIndex]) {
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
            if (bucket && Array.isArray(bucket)) {
              newBuckets[idx] = bucket.map((value, elementIdx) => ({
                value,
                originalIndex: -1,
                isInOriginalArray: false,
                bucketIndex: idx,
                isMoving: false,
                isSorted: true,
                elementId: `bucket-${idx}-${elementIdx}-${value}`
              }));
            }
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
            if (bucket && Array.isArray(bucket)) {
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
            
            if (bucket && Array.isArray(bucket)) {
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
            }
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
    
    // Reset all bucket and element state first
    setBucketElements([]);
    setNumBuckets(0);
    setOriginalArrayElements([]);
    
    // Use the parent's reset function
    onReset();
  };

  const getElementColor = (element: ElementPosition) => {
    if (element.isMoving) return '#3B82F6'; // Blue - moving
    if (element.isSorted) return '#10B981'; // Green - sorted
    if (!element.isInOriginalArray) return '#F59E0B'; // Amber - in bucket
    return '#6B7280'; // Gray - default
  };

  const isArrayEmpty = originalArrayElements.filter(el => el.isInOriginalArray).length === 0;

  return (
    <VisualizerTemplate
      currentStepData={currentStepData}
      currentStep={currentStep}
      totalSteps={steps.length}
      isPlaying={isPlaying}
      speed={speed}
      onPlay={onPlay}
      onPause={onPause}
      onNext={onNext}
      onPrev={onPrev}
      onReset={resetArray}
      canPlayNext={canPlayNext}
      canPlayPrev={canPlayPrev}
      onSpeedChange={onSpeedChange}
      showAnimationControls={false}
    >
      <div className="space-y-6">
        {/* Current Phase Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-1">Current Phase</h3>
          <p className="text-blue-800">{currentPhase}</p>
        </div>

        {/* Original Array */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {operationType === 'concatenate' ? 'Final Sorted Array' : 'Original Array'}
          </h3>
          <div 
            className="w-full min-h-[48px] flex justify-center items-center"
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '48px'
            }}
          >
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
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  maxWidth: '100%'
                }}
              >
                {originalArrayElements
                  .filter(el => el.isInOriginalArray)
                  .map((element) => (
                    <motion.div
                      key={element.elementId}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border-2 text-white font-bold"
                      style={{ 
                        backgroundColor: getElementColor(element),
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }
                      }}
                      exit={{ 
                        scale: 0, 
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {element.value}
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Buckets Display */}
        {(numBuckets > 0 || steps.length > 0) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Buckets ({numBuckets} total)
            </h3>
            {numBuckets > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: numBuckets }, (_, bucketIndex) => (
                <motion.div
                  key={`bucket-${bucketIndex}`}
                  className="p-3 rounded-lg border-2 border-gray-200 bg-white min-h-[120px] flex flex-col"
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-3">
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                      Bucket {bucketIndex}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-start gap-2">
                    <AnimatePresence mode="popLayout">
                      {!bucketElements[bucketIndex] || !Array.isArray(bucketElements[bucketIndex]) || bucketElements[bucketIndex].length === 0 ? (
                        <motion.span
                          key={`empty-${bucketIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-gray-400 italic text-sm mt-4"
                        >
                          empty
                        </motion.span>
                      ) : (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {bucketElements[bucketIndex].map((element, elementIndex) => (
                            <motion.div
                              key={`bucket-${bucketIndex}-${element.value}-${elementIndex}`}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-white font-bold border-2 border-white text-sm"
                              style={{ backgroundColor: getElementColor(element) }}
                              layout
                              initial={{ scale: 0, opacity: 0, y: -20 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{ scale: 0, opacity: 0, y: 20 }}
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
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 italic">
                Buckets will appear when algorithm starts
              </div>
            )}
          </div>
        )}
      </div>
    </VisualizerTemplate>
  );
}
