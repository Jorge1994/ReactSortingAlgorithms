interface ArrayControlsProps {
  onGenerateArray: (type: 'random' | 'nearly-sorted' | 'reverse') => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  maxSize?: number; // Optional max size limit
  selectedAlgorithm?: string; // optional algorithm key to allow custom UI behavior
}

export function ArrayControls({
  onGenerateArray,
  arraySize,
  onArraySizeChange,
  maxSize = 100 // Default to 100 if not specified
  , selectedAlgorithm
}: ArrayControlsProps) {
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
  // Calculate progress percentage for slider fill
  const arraySizeProgress = ((arraySize - 5) / (maxSize - 5)) * 100;

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
      {/* Array Size Control Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          Array Size
        </h3>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="array-size" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <span className="text-base">📏</span>
              Array Size
            </label>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-300">
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
      </div>

      {/* Array Generation Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        {/* If bitonic sort is selected, show allowed sizes */}
        {isBitonic && (
          <div className="mt-3 text-sm text-slate-600">
            Bitonic sort requires array sizes: {bitonicAllowed.join(', ')}. The slider will snap to the nearest allowed size.
          </div>
        )}
      </div>
    </div>
  );
}
