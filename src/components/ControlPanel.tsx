interface ControlPanelProps {
  onGenerateArray: (type: 'random' | 'nearly-sorted' | 'reverse') => void;
  onRunAlgorithm: () => void;
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

export function ControlPanel({
  onGenerateArray,
  onRunAlgorithm,
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
}: ControlPanelProps) {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
      {/* Array Generation Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Generate Array
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onGenerateArray('random')}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center gap-2">
              <span className="text-2xl">🎲</span>
              <span className="font-medium">Random</span>
              <span className="text-xs opacity-80">Shuffled elements</span>
            </div>
          </button>
          
          <button
            onClick={() => onGenerateArray('nearly-sorted')}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-4 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center gap-2">
              <span className="text-2xl">📈</span>
              <span className="font-medium">Nearly Sorted</span>
              <span className="text-xs opacity-80">Almost in order</span>
            </div>
          </button>
          
          <button
            onClick={() => onGenerateArray('reverse')}
            className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl p-4 hover:from-rose-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-rose-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center gap-2">
              <span className="text-2xl">📉</span>
              <span className="font-medium">Reverse</span>
              <span className="text-xs opacity-80">Descending order</span>
            </div>
          </button>
        </div>
      </div>

      {/* Start Sorting Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Algorithm Execution
        </h3>
        <div className="flex justify-center">
          <button
            onClick={onRunAlgorithm}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white rounded-2xl px-12 py-6 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <div className="text-left">
                <div className="text-xl font-bold">Start Sorting</div>
                <div className="text-sm opacity-90">Execute algorithm</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Animation Controls Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
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
              className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mx-2"
            >
              <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
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
                <span className="text-sm font-mono text-slate-600">{animationSpeed}ms</span>
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
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
