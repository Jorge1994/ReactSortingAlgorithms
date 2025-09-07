export function ColorLegend() {
  const legendItems = [
    { color: 'bg-blue-500', label: 'Comparing', description: 'Elements being compared' },
    { color: 'bg-red-500', label: 'Swapping', description: 'Elements being swapped' },
    { color: 'bg-violet-500', label: 'Moving', description: 'Elements being moved to new positions (Merge Sort)' },
    { color: 'bg-amber-500', label: 'Highlighting', description: 'Current section or special element' },
    { color: 'bg-emerald-400', label: 'Temp Sorted', description: 'Temporarily sorted sections (Merge Sort)' },
    { color: 'bg-emerald-500', label: 'Sorted', description: 'Elements in final position' },
    { color: 'bg-slate-400', label: 'Unsorted', description: 'Elements waiting to be processed' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-4">
        <h3 className="text-sm font-medium text-white mb-3 text-center flex items-center justify-center gap-2">
          <span className="text-base">🎨</span>
          Color Legend
        </h3>
        
        <div className="flex flex-wrap justify-center gap-2">
          {legendItems.map((item) => (
            <div 
              key={item.label}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-white/10 transition-colors duration-200 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${item.color} rounded-sm`}></div>
                <span className="text-xs font-medium text-white">{item.label}</span>
              </div>
              <span className="text-xs text-slate-300 text-center leading-tight">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
