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
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={onPrev}
            disabled={!canPlayPrev}
            className="group relative flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
          >
            <span className="text-lg group-disabled:opacity-30">⏮️</span>
          </button>
          
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="group relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 mx-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <span className="relative text-3xl">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
          
          <button
            onClick={onNext}
            disabled={!canPlayNext}
            className="group relative flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
          >
            <span className="text-lg group-disabled:opacity-30">⏭️</span>
          </button>
          
          <div className="w-px h-8 bg-slate-300 mx-3"></div>
          
          <button
            onClick={onReset}
            className="group relative flex items-center justify-center w-12 h-12 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-lg">🔄</span>
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
