// Interface para definir implementações de algoritmos
export interface AlgorithmImplementation {
  language: string;
  code: string;
  fileExtension: string;
}

// Função helper para criar implementações de algoritmos
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

// Tipo para coleção de implementações de um algoritmo
export type AlgorithmImplementations = {
  [key: string]: AlgorithmImplementation;
};

// Função para obter as implementações ativas (facilita adição/remoção)
export function getActiveImplementations(implementations: AlgorithmImplementations): AlgorithmImplementation[] {
  // Por agora, retorna apenas Python e Java
  // Para adicionar mais linguagens, basta incluir a chave aqui
  const activeLanguages = ['python', 'java'];
  
  return activeLanguages
    .filter(lang => implementations[lang])
    .map(lang => implementations[lang]);
}
