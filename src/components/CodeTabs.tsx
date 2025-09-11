import { useState, useEffect, type ReactNode } from 'react';
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
}

export function CodeTabs({ examples }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

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

  // Format language display (Title casing and special cases)
  const formatLanguageDisplay = (language: string | undefined): string => {
    if (!language) return '';
    const l = language.trim().toLowerCase();
    switch (l) {
      case 'javascript':
      case 'js':
        return 'JavaScript';
      case 'typescript':
      case 'ts':
        return 'TypeScript';
      case 'python':
        return 'Python';
      case 'java':
        return 'Java';
      case 'c++':
      case 'cpp':
        return 'C++';
      case 'c#':
      case 'csharp':
        return 'C#';
      case 'ruby':
        return 'Ruby';
      case 'go':
        return 'Go';
      case 'rust':
        return 'Rust';
      default:
        return language.charAt(0).toUpperCase() + language.slice(1);
    }
  };

  // Get language icon element (tries .svg then falls back to .png)
  const getLanguageIcon = (language: string): ReactNode => {
    const lang = language.toLowerCase().trim();

    const mapFilename = (l: string) => {
      if (l === 'c++' || l === 'cpp') return 'cpp';
      if (l === 'c#' || l === 'csharp') return 'csharp';
      if (l === 'js' || l === 'javascript') return 'js';
      if (l === 'ts' || l === 'typescript') return 'typescript';
      // normalize spaces and non-alphanumeric to hyphen
      return l.replace(/[^a-z0-9]+/g, '-');
    };

    const filename = mapFilename(lang);
    const srcSvg = `/icons/languages/${filename}.svg`;
    const srcPng = `/icons/languages/${filename}.png`;

    // Return an <img> that will try SVG then PNG
    return (
      <img
        src={srcSvg}
        alt={`${language} icon`}
        className="w-5 h-5 object-contain"
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          if (!t.dataset.retry) {
            t.dataset.retry = '1';
            t.src = srcPng;
          }
        }}
      />
    );
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
      {/* Tab Headers */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="flex justify-between items-center">
          <div className="flex overflow-x-auto scrollbar-hide">
            {examples.map((example, index) => (
              <button
                key={example.language}
                onClick={() => setActiveTab(index)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === index
                    ? 'text-orange-400 bg-slate-700 border-b-2 border-orange-400'
                    : 'text-slate-300 hover:text-slate-200 hover:bg-slate-700/50 border-b-2 border-transparent'
                }`}
              >
                {getLanguageIcon(example.language)}
                <span>{formatLanguageDisplay(example.language)}</span>
              </button>
            ))}
          </div>
          
          {/* Copy Button - moved to tab header area */}
          <div className="px-4">
            <button
              onClick={() => copyToClipboard(examples[activeTab]?.code || '', activeTab)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
                copiedStates[activeTab] 
                  ? 'text-green-400 bg-green-500/10 border border-green-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-slate-600'
              }`}
            >
              {copiedStates[activeTab] ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Code Content - direct display without header */}
      <div className="bg-slate-900">
        <pre className={`language-${getPrismLanguage(examples[activeTab]?.language || '')} m-0 p-4 overflow-x-auto text-sm leading-relaxed`}>
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
  );
}
