interface AnimationControlsProps {
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
}

export function AnimationControls({
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  isPlaying,
  canPlayNext,
  canPlayPrev,
  animationSpeed,
  onSpeedChange
}: AnimationControlsProps) {
  // Calculate progress percentage for slider fill
  const speedProgress = ((animationSpeed - 50) / (2000 - 50)) * 100;

  return (
    <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200/50">
      {/* Main Controls */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <button
          onClick={onPrev}
          disabled={!canPlayPrev}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="text-xl">⏮️</span>
        </button>
        
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={!canPlayNext}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="text-xl">⏭️</span>
        </button>
        
        <div className="w-px h-8 bg-slate-300 mx-2"></div>
        
        <button
          onClick={onReset}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200 text-orange-600 hover:text-orange-700 hover:border-orange-200 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="text-xl">🔄</span>
        </button>
      </div>

      {/* Speed Control */}
      <div className="bg-white/80 rounded-lg p-4 border border-slate-200/50">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <span className="text-base">⚡</span>
            Animation Speed
          </label>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg">
            <span className="text-sm font-mono text-slate-600">{animationSpeed} ms</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={animationSpeed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${speedProgress}%, #e2e8f0 ${speedProgress}%, #e2e8f0 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Fast</span>
            <span>Medium</span>
            <span>Slow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
