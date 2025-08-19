import { useState, useEffect } from 'react';
import Prism from 'prismjs';
// Import CSS for syntax highlighting
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
      <div className="flex border-b border-gray-200 mb-4">
        {examples.map((example, index) => (
          <button
            key={example.language}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {example.language}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <pre className={`language-${getPrismLanguage(examples[activeTab]?.language || '')} m-0 p-6 overflow-x-auto text-sm`}>
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
