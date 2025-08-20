import { useState, useEffect } from 'react';
import type { AlgorithmKey } from '../algorithms/registry';
import { algorithmRegistry, getAvailableAlgorithms } from '../algorithms/registry';

interface AlgorithmSelectorProps {
  currentAlgorithm: AlgorithmKey;
  onAlgorithmChange: (algorithmKey: AlgorithmKey) => void;
}

export function AlgorithmSelector({ currentAlgorithm, onAlgorithmChange }: AlgorithmSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const availableAlgorithms = getAvailableAlgorithms();
  const currentAlgorithmData = algorithmRegistry[currentAlgorithm];

  // Close dropdown when currentAlgorithm changes or component mounts
  useEffect(() => {
    setIsOpen(false);
  }, [currentAlgorithm]);

  // Ensure dropdown is closed on mount
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const getAlgorithmIcon = (algorithmKey: AlgorithmKey): string => {
    const icons: Record<AlgorithmKey, string> = {
      'bubble-sort': '🫧',
      'selection-sort': '🎯',
    };
    return icons[algorithmKey] || '⚡';
  };

  const handleAlgorithmSelect = (algorithmKey: AlgorithmKey) => {
    setIsOpen(false); // Close dropdown first
    setTimeout(() => {
      onAlgorithmChange(algorithmKey);
    }, 100); // Increase delay to ensure UI updates
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Current Algorithm Button */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/15 transition-all duration-300 group min-w-[280px] sm:min-w-[320px]"
      >
        <span className="text-2xl">{getAlgorithmIcon(currentAlgorithm)}</span>
        <div className="text-left flex-1">
          <div className="font-semibold text-lg">{currentAlgorithmData.name}</div>
        </div>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-[9999] animate-in slide-in-from-top-2 duration-200">
          <div className="p-4">
            <div className="text-sm font-semibold text-slate-700 px-2 py-3 border-b border-slate-100 mb-4 text-center">
              Select Algorithm
            </div>
            <div className="space-y-2">
              {availableAlgorithms.map((algorithmKey) => {
                const algorithm = algorithmRegistry[algorithmKey];
                const isSelected = algorithmKey === currentAlgorithm;
                
                return (
                  <button
                    key={algorithmKey}
                    onClick={() => handleAlgorithmSelect(algorithmKey)}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200 text-left group hover:bg-gray-50 border-2 border-transparent hover:shadow-sm bg-white"
                  >
                    <span className="text-2xl flex-shrink-0">{getAlgorithmIcon(algorithmKey)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg truncate text-white">
                        {algorithm.name}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="text-green-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                  )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/5" 
          onClick={handleBackdropClick}
        />
      )}
    </div>
  );
}
