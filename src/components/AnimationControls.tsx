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
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        Playback Controls
      </h3>
      
      <div className="bg-white rounded-xl p-6 shadow-inner border border-slate-200">
        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={onPrev}
            disabled={!canPlayPrev}
            className="animation-control-button group relative flex items-center justify-center w-16 h-16 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span className="text-3xl group-disabled:opacity-30">⏮️</span>
          </button>
          
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="animation-control-button group relative flex items-center justify-center w-16 h-16 text-slate-700 transition-all duration-200 mx-4"
          >
            <span className="text-3xl">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
          
          <button
            onClick={onNext}
            disabled={!canPlayNext}
            className="animation-control-button group relative flex items-center justify-center w-16 h-16 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span className="text-3xl group-disabled:opacity-30">⏭️</span>
          </button>
          
          <div className="w-px h-10 bg-slate-300 mx-4"></div>
          
          <button
            onClick={onReset}
            className="animation-control-button group relative flex items-center justify-center w-16 h-16 text-orange-700 transition-all duration-200"
          >
            <span className="text-3xl">🔄</span>
          </button>
        </div>

        {/* Speed Control */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <span className="text-base">⚡</span>
              Animation Speed
            </label>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-300">
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
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${speedProgress}%, #e2e8f0 ${speedProgress}%, #e2e8f0 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Fast</span>
              <span>Medium</span>
              <span>Slow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
