export function ColorLegend() {
  const legendItems = [
    { color: 'bg-blue-500', label: 'Comparing', icon: '👀', description: 'Elements being compared' },
    { color: 'bg-red-500', label: 'Swapping', icon: '🔄', description: 'Elements being swapped' },
    { color: 'bg-emerald-500', label: 'Sorted', icon: '✅', description: 'Elements in final position' },
    { color: 'bg-slate-400', label: 'Unsorted', icon: '⏳', description: 'Elements waiting to be processed' }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center justify-center gap-2">
          <span className="text-xl">🎨</span>
          Color Legend
        </h3>
        <p className="text-sm text-slate-600 mt-1">Understanding the visualization colors</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {legendItems.map((item) => (
          <div 
            key={item.label}
            className="group bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 ${item.color} rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200`}></div>
                <span className="text-xl">{item.icon}</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
                <div className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
