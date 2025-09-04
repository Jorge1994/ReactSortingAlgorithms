interface CombinedControlsProps {
  // Array Controls props
  onGenerateArray: (type: 'random' | 'nearly-sorted' | 'reverse') => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  maxSize?: number;
  selectedAlgorithm?: string;
  
  // Animation Controls props
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

export function CombinedControls({
  onGenerateArray,
  arraySize,
  onArraySizeChange,
  maxSize = 100,
  selectedAlgorithm,
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
}: CombinedControlsProps) {
  // If bitonic sort is selected, only allow sizes 16, 32 or 64
  const isBitonic = selectedAlgorithm === 'bitonic-sort';
  const bitonicAllowed = [16, 32, 64];

  const handleSizeChange = (value: number) => {
    if (isBitonic) {
      // Snap to the nearest allowed size
      let nearest = bitonicAllowed[0];
      let minDiff = Math.abs(value - nearest);
      for (const s of bitonicAllowed) {
        const d = Math.abs(value - s);
        if (d < minDiff) {
          minDiff = d;
          nearest = s;
        }
      }
      onArraySizeChange(nearest);
    } else {
      onArraySizeChange(value);
    }
  };

  // Calculate progress percentages for sliders
  const arraySizeProgress = ((arraySize - 5) / (maxSize - 5)) * 100;
  const speedProgress = ((animationSpeed - 50) / (2000 - 50)) * 100;

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Array Controls Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            Array Configuration
          </h3>
          
          {/* Array Size Control */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="array-size" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <span className="text-base">📏</span>
                Array Size
              </label>
              <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg border border-slate-300">
                <span className="text-sm font-mono text-slate-600">{arraySize} elements</span>
              </div>
            </div>
            <div className="relative pb-2">
              <input
                id="array-size"
                type="range"
                min="5"
                max={maxSize}
                value={arraySize}
                onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${arraySizeProgress}%, #e2e8f0 ${arraySizeProgress}%, #e2e8f0 100%)`
                }}
              />
              <div className="relative flex text-xs text-slate-500 mt-1">
                <span style={{ position: 'absolute', left: '0%', transform: 'translateX(0%)' }}>5</span>
                <span style={{ position: 'absolute', left: '47.37%', transform: 'translateX(-50%)' }}>{Math.floor(maxSize / 2)}</span>
                <span style={{ position: 'absolute', left: '100%', transform: 'translateX(-100%)' }}>{maxSize}</span>
              </div>
            </div>
          </div>

          {/* Array Generation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onGenerateArray('random')}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-1">
                <span className="text-xl">🎲</span>
                <span className="font-medium text-sm">Random</span>
                <span className="text-xs opacity-80">Shuffled elements</span>
              </div>
            </button>
            
            <button
              onClick={() => onGenerateArray('nearly-sorted')}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-3 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-1">
                <span className="text-xl">📈</span>
                <span className="font-medium text-sm">Nearly Sorted</span>
                <span className="text-xs opacity-80">Almost in order</span>
              </div>
            </button>
            
            <button
              onClick={() => onGenerateArray('reverse')}
              className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl p-3 hover:from-rose-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-rose-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-1">
                <span className="text-xl">📉</span>
                <span className="font-medium text-sm">Reverse</span>
                <span className="text-xs opacity-80">Descending order</span>
              </div>
            </button>
          </div>

          {/* Bitonic Sort Info */}
          {isBitonic && (
            <div className="mt-3 text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <span className="font-medium">⚠️ Bitonic Sort:</span> Requires array sizes: {bitonicAllowed.join(', ')}. The slider will snap to the nearest allowed size.
            </div>
          )}
        </div>

        {/* Animation Controls Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Animation Controls
          </h3>

          {/* Main Controls */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={onPrev}
                disabled={!canPlayPrev}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
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
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-xl">⏭️</span>
              </button>
              
              <div className="w-px h-8 bg-slate-300 mx-2"></div>
              
              <button
                onClick={onReset}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-orange-600 hover:text-orange-700 hover:border-orange-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-xl">🔄</span>
              </button>
            </div>
          </div>

          {/* Speed Control */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
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
      </div>
    </div>
  );
}
