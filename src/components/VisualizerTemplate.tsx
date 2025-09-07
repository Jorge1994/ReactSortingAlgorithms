import type { ReactNode } from 'react';
import type { SortStep } from '../types';
import { AnimationControls } from './AnimationControls';
import { StatisticsPanel } from './StatisticsPanel';
import { ColorLegend } from './ColorLegend';

interface VisualizerTemplateProps {
  children: ReactNode;
  currentStepData?: SortStep;
  currentStep: number;
  totalSteps: number;
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
  showStatistics?: boolean;
  showColorLegend?: boolean;
  showAnimationControls?: boolean;
  customControls?: ReactNode;
  algorithm?: string;
}

export function VisualizerTemplate({
  children,
  currentStepData,
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  canPlayNext,
  canPlayPrev,
  onSpeedChange,
  showStatistics = true,
  showColorLegend = true,
  showAnimationControls = true,
  customControls,
  algorithm
}: VisualizerTemplateProps) {
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

  return (
    <div className="w-full">
      {/* Main Visualization Content */}
      <section className="w-full overflow-hidden">
        <div className="w-full">
          {children}
        </div>
      </section>

      {/* Custom Controls (if any) */}
      {customControls && (
        <section className="px-4 mt-6">
          {customControls}
        </section>
      )}

      {/* Animation Controls */}
      {showAnimationControls && (
        <div className="px-4 mt-6">
          <AnimationControls
            isPlaying={isPlaying}
            onPlay={togglePlay}
            onPause={onPause}
            onNext={stepForward}
            onPrev={stepBackward}
            onReset={onReset}
            canPlayNext={canPlayNext}
            canPlayPrev={canPlayPrev}
            animationSpeed={speed}
            onSpeedChange={onSpeedChange}
          />
        </div>
      )}

      {/* Statistics Panel */}
      {showStatistics && currentStepData && (
        <div className="px-4 mt-6">
          <StatisticsPanel
            currentStepData={currentStepData}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
      )}

      {/* Color Legend */}
      {showColorLegend && (
        <div className="px-4 mt-6">
          <ColorLegend currentAlgorithm={algorithm} />
        </div>
      )}
    </div>
  );
}
