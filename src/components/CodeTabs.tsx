import { useState, useEffect } from 'react';
import Prism from 'prismjs';
// Import CSS for syntax highlighting - using a better dark theme
import 'prismjs/themes/prism-tomorrow.css';
// Import language support
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-clike';
import type { AlgorithmImplementation } from '../types/implementations';

interface CodeTabsProps {
  examples: AlgorithmImplementation[];
  isExpanded?: boolean;
  title?: string;
  description?: string;
}

export function CodeTabs({ examples, isExpanded = false, title = "Implementation Examples", description }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);

  // Get the language key for Prism.js
  const getPrismLanguage = (language: string): string => {
    switch (language.toLowerCase()) {
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'javascript':
        return 'javascript';
      case 'c++':
      case 'cpp':
        return 'cpp';
      case 'c#':
      case 'csharp':
        return 'csharp';
      default:
        return 'text';
    }
  };

  // Get language icon
  const getLanguageIcon = (language: string): string => {
    switch (language.toLowerCase()) {
      case 'python':
        return '🐍';
      case 'java':
        return '☕';
      case 'javascript':
        return '🟨';
      case 'c++':
      case 'cpp':
        return '⚡';
      case 'c#':
      case 'csharp':
        return '🔷';
      default:
        return '📝';
    }
  };

  // Copy to clipboard function with feedback
  const copyToClipboard = async (text: string, tabIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [tabIndex]: true }));
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [tabIndex]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Highlight code using Prism.js
  const highlightCode = (code: string, language: string): string => {
    const prismLang = getPrismLanguage(language);
    
    try {
      if (Prism.languages[prismLang]) {
        return Prism.highlight(code, Prism.languages[prismLang], prismLang);
      }
    } catch (error) {
      console.warn('Prism highlighting failed:', error);
    }
    
    // Fallback to plain text
    return code;
  };

  useEffect(() => {
    // Re-highlight when tab changes
    Prism.highlightAll();
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Header with toggle button */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">💻</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {title}
              </h3>
              <p className="text-slate-600">
                Complete code implementations in different languages
              </p>
            </div>
          </div>
          <button
            onClick={() => setInternalExpanded(!internalExpanded)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-lg">
              {internalExpanded ? '🔼' : '🔽'}
            </span>
            {internalExpanded ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
      </div>

      {/* Content - only show if expanded */}
      {internalExpanded && (
        <div className="p-8 space-y-6">
          {/* Description Card */}
          {description && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h4 className="font-semibold text-slate-800">
                  Algorithm Implementation
                </h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {description}
              </p>
            </div>
          )}
          
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={example.language}
                onClick={() => setActiveTab(index)}
                className={`group relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl border-2 ${
                  activeTab === index
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 shadow-lg shadow-blue-500/25 scale-105'
                    : 'text-slate-700 bg-white border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {getLanguageIcon(example.language)}
                  {example.language}
                </span>
                {activeTab === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-sm opacity-50"></div>
                )}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="group relative">
            {/* Header Bar */}
            <div className="flex items-center justify-between bg-slate-800 px-6 py-4 rounded-t-xl border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-300 text-sm font-medium">
                  {examples[activeTab]?.language} Implementation
                </span>
              </div>
              
              {/* Copy Button */}
              <button
                onClick={() => copyToClipboard(examples[activeTab]?.code || '', activeTab)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 transform ${
                  copiedStates[activeTab] 
                    ? 'text-green-400 bg-green-900/50 border border-green-500/30 scale-105 animate-pulse' 
                    : 'text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 hover:scale-105'
                }`}
              >
                {copiedStates[activeTab] ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="bg-slate-900 rounded-b-xl overflow-hidden shadow-2xl">
              <pre className={`language-${getPrismLanguage(examples[activeTab]?.language || '')} m-0 p-6 overflow-x-auto text-sm leading-relaxed`}>
                <code 
                  className={`language-${getPrismLanguage(examples[activeTab]?.language || '')}`}
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(
                      examples[activeTab]?.code || '', 
                      examples[activeTab]?.language || ''
                    )
                  }}
                />
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
