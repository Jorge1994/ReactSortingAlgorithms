import type { AlgorithmKey } from '../algorithms/registry';
import { getAlgorithm } from '../algorithms/registry';
import { AlgorithmSelector } from './AlgorithmSelector';

interface HeaderProps {
  currentAlgorithm: AlgorithmKey;
  onAlgorithmChange: (algorithmKey: AlgorithmKey) => void;
}

export function Header({ currentAlgorithm, onAlgorithmChange }: HeaderProps) {
  const getAlgorithmIcon = (algorithmKey: AlgorithmKey): string => {
    const icons: Record<AlgorithmKey, string> = {
      'bubble-sort': '🫧',
      'selection-sort': '🎯',
      'insertion-sort': '📝',
    };
    return icons[algorithmKey] || '⚡';
  };

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="relative w-full px-6 py-12">
        <div className="text-center">
          {/* App Name */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-purple-200 mb-2">
              Sorting Algorithm Visualizer
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>
          
          {/* Algorithm icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <span className="text-4xl">{getAlgorithmIcon(currentAlgorithm)}</span>
          </div>
          
          {/* Main title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            {getAlgorithm(currentAlgorithm).name}
          </h1>
          
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3 text-xl text-purple-200 mb-6">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-purple-400"></span>
            <span className="font-light">Interactive Visualizer</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-purple-400"></span>
          </div>
          
          {/* Algorithm Selector */}
          <div className="flex justify-center mb-6">
            <AlgorithmSelector 
              currentAlgorithm={currentAlgorithm}
              onAlgorithmChange={onAlgorithmChange}
            />
          </div>
          
          {/* Description */}
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Watch algorithms come to life through interactive visualization. 
            Understand sorting techniques step by step with real-time animations.
          </p>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </header>
  );
}
