interface ArrayControlsProps {
  onGenerateArray: (type: 'random' | 'nearly-sorted' | 'reverse') => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
}

export function ArrayControls({
  onGenerateArray,
  arraySize,
  onArraySizeChange
}: ArrayControlsProps) {
  // Calculate progress percentage for slider fill
  const arraySizeProgress = ((arraySize - 5) / (100 - 5)) * 100;

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

      {/* Array Size Control Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          Array Size
        </h3>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-6">
            <label htmlFor="array-size" className="text-sm font-medium text-slate-600 min-w-fit">
              Elements: {arraySize}
            </label>
            <div className="flex-1">
              <input
                id="array-size"
                type="range"
                min="5"
                max="100"
                value={arraySize}
                onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${arraySizeProgress}%, #e2e8f0 ${arraySizeProgress}%, #e2e8f0 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
