export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 text-white">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Author info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-xs">✨</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Paulo J.S. Ferreira</h3>
              <p className="text-purple-200">Sorting Algorithm Visualizer</p>
              <p className="text-sm text-slate-400 mt-1">Educational Software Engineer</p>
            </div>
          </div>
          
          {/* Right side - Tech stack */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-lg">📅</span>
              <span className="text-purple-200">&copy; 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-lg">⚛️</span>
              <span className="text-purple-200">React & TypeScript</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-lg">🎨</span>
              <span className="text-purple-200">Tailwind CSS</span>
            </div>
          </div>
        </div>
        
        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        
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
      
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-50 to-transparent"></div>
    </footer>
  );
}
