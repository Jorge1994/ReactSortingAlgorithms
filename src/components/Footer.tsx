export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900">
      {/* Decorative elements only - no background gradient */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      <div className="relative w-full px-6 py-16 text-white">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Author info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src="/icons/logo.png" 
              alt="SortViz Logo" 
              className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg"
            />
            <div className="-mt-8">
              <p className="text-xl font-bold text-white">Interactive Sorting Algorithm Visualizer</p>
              <p className="text-sm text-slate-400 mt-1">Educational Platform</p>
            </div>
          </div>
          
          {/* Right side - Tech stack */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-lg">📅</span>
              <span className="text-orange-200">&copy; 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-lg">⚛️</span>
              <span className="text-orange-200">React & TypeScript</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-lg">🎨</span>
              <span className="text-orange-200">Tailwind CSS</span>
            </div>
          </div>
        </div>
        
        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30"></div>
        
        {/* Bottom section */}
        <div className="text-center space-y-4">
          <p className="text-purple-200 leading-relaxed max-w-3xl mx-auto">
            An interactive educational tool designed to help students and developers understand 
            sorting algorithms through beautiful visualizations and step-by-step animations.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>Educational Purpose</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>Free to Use</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
