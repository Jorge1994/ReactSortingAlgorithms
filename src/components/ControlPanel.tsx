import { ArrayControls } from './ArrayControls';
import { AnimationControls } from './AnimationControls';

interface ControlPanelProps {
  onGenerateArray: (type: 'random' | 'nearly-sorted' | 'reverse') => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  isPlaying: boolean;
  canPlayNext: boolean;
  canPlayPrev: boolean;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
}

export function ControlPanel({
  onGenerateArray,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  isPlaying,
  canPlayNext,
  canPlayPrev,
  animationSpeed,
  onSpeedChange,
  arraySize,
  onArraySizeChange
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      <ArrayControls
        onGenerateArray={onGenerateArray}
        arraySize={arraySize}
        onArraySizeChange={onArraySizeChange}
      />
      
      <AnimationControls
        onPlay={onPlay}
        onPause={onPause}
        onNext={onNext}
        onPrev={onPrev}
        onReset={onReset}
        isPlaying={isPlaying}
        canPlayNext={canPlayNext}
        canPlayPrev={canPlayPrev}
        animationSpeed={animationSpeed}
        onSpeedChange={onSpeedChange}
      />
    </div>
  );
}
