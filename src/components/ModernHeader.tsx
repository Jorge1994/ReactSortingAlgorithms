import { Link } from 'react-router-dom';
import type { AlgorithmKey } from '../algorithms/registry';
import { getAlgorithm } from '../algorithms/registry';
import { AlgorithmSelector } from './AlgorithmSelector';
import { AlgorithmIcon } from '../utils/AlgorithmIcon';

interface ModernHeaderProps {
  currentAlgorithm: AlgorithmKey;
  onAlgorithmChange: (algorithmKey: AlgorithmKey) => void;
}

export function ModernHeader({ currentAlgorithm, onAlgorithmChange }: ModernHeaderProps) {
  // Function to scroll to top when navigating
  const handleNavigation = () => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 100);
  };

  return (
    <header className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white border-b border-slate-700">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="relative">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 h-20 border-b border-slate-700/50">
          {/* Logo and Home Link */}
          <Link 
            to="/"
            onClick={handleNavigation}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src="/icons/logo.png" 
              alt="SortViz - Interactive Sorting Algorithm Visualizer" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/comparison"
              onClick={handleNavigation}
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Comparison
            </Link>
            <Link
              to="/glossary"
              onClick={handleNavigation}
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Glossary
            </Link>
            <Link
              to={`/algorithm/${currentAlgorithm}`}
              onClick={handleNavigation}
              className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Learn More
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Algorithm Information Section */}
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Algorithm icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <AlgorithmIcon algorithmKey={currentAlgorithm} size="4xl" />
            </div>
            
            {/* Main title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              {getAlgorithm(currentAlgorithm).name}
            </h2>
            
            {/* Subtitle */}
            <div className="flex items-center justify-center gap-3 text-lg text-slate-300 mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-400"></span>
              <span className="font-light">Interactive Visualization</span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-400"></span>
            </div>
            
            {/* Algorithm Selector */}
            <div className="flex justify-center">
              <AlgorithmSelector
                currentAlgorithm={currentAlgorithm}
                onAlgorithmChange={onAlgorithmChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
