// Interface to define algorithm implementations
export interface AlgorithmImplementation {
  language: string;
  code: string;
  fileExtension: string;
}

// Helper function to create algorithm implementations
export function createAlgorithmImplementation(
  language: string, 
  code: string, 
  fileExtension: string
): AlgorithmImplementation {
  return {
    language,
    code,
    fileExtension
  };
}

// Type for collection of algorithm implementations
export type AlgorithmImplementations = {
  [key: string]: AlgorithmImplementation;
};

// Function to get active implementations (facilitates addition/removal)
export function getActiveImplementations(implementations: AlgorithmImplementations): AlgorithmImplementation[] {
  // For now, returns only Python and Java
  // To add more languages, just include the key here
  const activeLanguages = ['python', 'java'];
  
  return activeLanguages
    .filter(lang => implementations[lang])
    .map(lang => implementations[lang]);
}
