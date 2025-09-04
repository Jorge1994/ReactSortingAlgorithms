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
  customControls?: ReactNode;
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
  customControls
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
    <div className="w-full px-4 py-6 space-y-6">
      {/* Main Visualization Content */}
      <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 pb-4">
          {children}
        </div>
      </section>

      {/* Custom Controls (if any) */}
      {customControls && (
        <section>
          {customControls}
        </section>
      )}

      {/* Animation Controls */}
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

      {/* Statistics Panel */}
      {showStatistics && currentStepData && (
        <StatisticsPanel
          currentStepData={currentStepData}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {/* Color Legend */}
      {showColorLegend && <ColorLegend />}
    </div>
  );
}
