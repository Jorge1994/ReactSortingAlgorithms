# Visualizador de Algoritmos de Sorting

## Descrição do Projeto

Uma aplicação web interativa desenvolvida em React que permite visualizar o funcionamento de diferentes algoritmos de ordenação através de barras coloridas que representam números. A aplicação mostra em tempo real como os algoritmos comparam, trocam e posicionam os elementos durante o processo de ordenação.

## Funcionalidades Principais

### Visualização
- **Barras proporcionais**: Cada número é representado por uma barra com altura proporcional ao seu valor
- **Sistema de cores**:
  - 🔵 **Azul**: Elementos sendo comparados
  - 🔴 **Vermelho**: Elementos sendo trocados/movidos
  - 🟢 **Verde**: Elementos já ordenados na posição correta
  - ⚪ **Cinza/Branco**: Elementos não processados

### Algoritmos Implementados
- **Bubble Sort**
- **Selection Sort**
- **Insertion Sort**
- **Merge Sort**
- **Quick Sort**
- **Heap Sort**

### Controles Interativos
- Seleção do algoritmo de ordenação
- Controle de velocidade da animação
- Botões: Play, Pause, Reset, Step-by-step
- Geração de array aleatório
- Configuração do tamanho do array (10-100 elementos)

### Interface
- Dashboard com estatísticas (comparações, trocas, tempo)
- Explicação textual do algoritmo selecionado
- Indicador de progresso
- Design responsivo com Tailwind CSS

### Páginas Informativas
- **Template reutilizável** para apresentação de algoritmos
- **Informações detalhadas** para cada algoritmo:
  - Descrição do funcionamento
  - Complexidade temporal (melhor, médio, pior caso)
  - Complexidade espacial
  - Implementação em código (Python)
  - Vantagens e desvantagens
  - Casos de uso recomendados
- **Navegação** entre visualização e página informativa

## Plano de Desenvolvimento

### Fase 1: Setup e Estrutura Base (1-2 dias)
1. **Configuração do ambiente**
   - Criar projeto React com Vite
   - Configurar TypeScript
   - Setup do Tailwind CSS
   - Configurar ESLint e Prettier

2. **Estrutura modular**
   - Separação clara entre lógica e UI
   - Implementações dos algoritmos independentes
   - Sistema de tipos compartilhado

3. **Estrutura de componentes base**
   - Componente principal (App)
   - Componente de visualização (SortingVisualizer)
   - Componente de controles (Controls)
   - Componente de barra (Bar)

### Fase 2: Visualização Básica (2-3 dias)
1. **Implementar componente de barras**
   - Renderização das barras
   - Sistema de cores
   - Animações suaves

2. **Geração e controle de dados**
   - Gerador de arrays aleatórios
   - Reset de estado
   - Controles básicos

3. **Componente reutilizável de visualização**
   - SortingVisualizer aceita algoritmo como prop
   - Configuração dinâmica de tamanho do array
   - Interface unificada para todos os algoritmos

### Fase 3: Algoritmos de Ordenação (3-4 dias)
1. **Implementações dos algoritmos (separadas da UI)**
   - Módulo independente para cada algoritmo
   - Interface padronizada para todos os algoritmos
   - Gerador de steps/operações para visualização

2. **Algoritmos simples**
   - Bubble Sort
   - Selection Sort
   - Insertion Sort

3. **Algoritmos avançados**
   - Merge Sort
   - Quick Sort
   - Heap Sort

4. **Sistema de animação (UI)**
   - Consumidor dos steps gerados pelos algoritmos
   - Queue de operações de visualização
   - Controle de velocidade e pause/resume

### Fase 4: Interface e UX (2-3 dias)
1. **Dashboard de informações**
   - Contador de comparações
   - Contador de trocas
   - Tempo decorrido
   - Complexidade do algoritmo

2. **Páginas informativas dos algoritmos**
   - Template reutilizável (AlgorithmInfo)
   - Implementação em Python para cada algoritmo
   - Análise de complexidade detalhada
   - Sistema de roteamento (React Router)

3. **Melhorias na interface**
   - Design responsivo com Tailwind CSS
   - Tooltips informativos
   - Seletor de algoritmos
   - Navegação entre visualização e informações

### Fase 5: Polimento e Testes (1-2 dias)
1. **Otimizações**
   - Performance das animações
   - Tratamento de edge cases
   
2. **Testes e deploy**
   - Testes unitários básicos
   - Build de produção
   - Deploy

## Ferramentas e Tecnologias

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Framer Motion** - Animações suaves

### Desenvolvimento
- **ESLint + Prettier** - Code quality
- **React DevTools** - Debug
- **VS Code** - Editor recomendado

### Deploy
- **Vercel** ou **Netlify** - Hospedagem
- **GitHub Pages** - Alternativa gratuita

## Setup do Projeto

### Pré-requisitos
```bash
# Verificar se Node.js está instalado (versão 18+)
node --version
npm --version
```

### Comandos de Setup

```powershell
# 1. Criar projeto React com Vite e TypeScript
npm create vite@latest sorting-visualizer -- --template react-ts

# 2. Navegar para o diretório
cd sorting-visualizer

# 3. Instalar dependências
npm install

# 4. Instalar dependências adicionais
npm install react-router-dom framer-motion
npm install -D @types/react-router-dom

# 5. Tailwind CSS 4 já configurado via plugin @tailwindcss/vite

# 6. Configurar ESLint e Prettier (opcional)
npm install -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 7. Iniciar servidor de desenvolvimento
npm run dev

# 8. Build para produção
npm run build

# 9. Preview da build
npm run preview
```

### Configuração do Tailwind CSS 4

**vite.config.ts** (já configurado)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**src/index.css**
```css
@import "tailwindcss";

/* Custom colors and animations */
:root {
  --color-comparing: #3b82f6;
  --color-swapping: #ef4444;
  --color-sorted: #10b981;
  --color-unsorted: #6b7280;
}

@keyframes barHeight {
  from { transform: scaleY(0.8); }
  to { transform: scaleY(1); }
}

@keyframes barColor {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.9; }
}

.bar-animation {
  animation: barHeight 0.3s ease-in-out, barColor 0.2s ease-in-out;
}
```

## Arquitetura Detalhada

### Componentes Principais

#### 1. Páginas (Roteamento)
- **Home**: Página inicial com seleção de algoritmos
- **Visualizer**: Página de visualização reutilizável
- **AlgorithmDetails**: Template reutilizável para informações do algoritmo

#### 2. Componente AlgorithmInfo (Template Reutilizável)

**Estrutura dos dados:**
```typescript
interface AlgorithmData {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  pythonCode: string;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  visualization: {
    colors: string[];
    keySteps: string[];
  };
}
```

**Template da página informativa:**
- Header com nome do algoritmo
- Seção de descrição
- Tabela de complexidade temporal/espacial
- Bloco de código Python com syntax highlighting
- Seções de vantagens/desvantagens
- Casos de uso recomendados
- Botão para ir à visualização

#### 3. SortingVisualizer (Reutilizável)

**Props aceitas:**
```typescript
interface SortingVisualizerProps {
  algorithm: string; // Nome do algoritmo
  arraySize?: number;
  speed?: number;
  onComplete?: () => void;
}
```

**Arquitetura Modular:**
- **UI Components**: Responsáveis apenas pela visualização
- **Algorithm Engine**: Lógica dos algoritmos separada
- **Step Generator**: Converte algoritmos em steps visuais
- **Animation Controller**: Gerencia a reprodução dos steps

### Separação entre Lógica e UI

#### 1. Implementações dos Algoritmos (Core)
```typescript
// src/algorithms/core/bubbleSort.ts
export interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight';
  indices: number[];
  array: number[];
  metadata?: {
    comparisons: number;
    swaps: number;
  };
}

export interface SortingAlgorithm {
  name: string;
  execute: (array: number[]) => SortStep[];
  complexity: {
    time: { best: string; average: string; worst: string };
    space: string;
  };
}

export const bubbleSortAlgorithm: SortingAlgorithm = {
  name: "Bubble Sort",
  execute: (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;

    // Lógica do algoritmo gerando steps
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        // Step de comparação
        steps.push({
          type: 'compare',
          indices: [j, j + 1],
          array: [...array],
          metadata: { comparisons: ++comparisons, swaps }
        });

        if (array[j] > array[j + 1]) {
          // Step de troca
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
            array: [...array],
            metadata: { comparisons, swaps: ++swaps }
          });
        }
      }
      
      // Marcar elemento como ordenado
      steps.push({
        type: 'set-sorted',
        indices: [array.length - i - 1],
        array: [...array],
        metadata: { comparisons, swaps }
      });
    }

    return steps;
  },
  complexity: {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)"
  }
};
```

#### 2. Registry de Algoritmos
```typescript
// src/algorithms/registry.ts
import { bubbleSortAlgorithm } from './core/bubbleSort';
import { selectionSortAlgorithm } from './core/selectionSort';
// ... outros imports

export const algorithmRegistry = {
  'bubble-sort': bubbleSortAlgorithm,
  'selection-sort': selectionSortAlgorithm,
  'insertion-sort': insertionSortAlgorithm,
  'merge-sort': mergeSortAlgorithm,
  'quick-sort': quickSortAlgorithm,
  'heap-sort': heapSortAlgorithm,
} as const;

export type AlgorithmKey = keyof typeof algorithmRegistry;

export const getAlgorithm = (key: AlgorithmKey) => {
  return algorithmRegistry[key];
};
```

#### 3. Animation Engine (UI)
```typescript
// src/hooks/useAnimationEngine.ts
export const useAnimationEngine = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SortStep[]>([]);

  const executeAlgorithm = (algorithmKey: AlgorithmKey, array: number[]) => {
    const algorithm = getAlgorithm(algorithmKey);
    const generatedSteps = algorithm.execute(array);
    setSteps(generatedSteps);
    setCurrentStep(0);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => { setCurrentStep(0); setIsPlaying(false); };
  const stepForward = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const stepBackward = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return {
    currentStep: steps[currentStep],
    isPlaying,
    progress: steps.length > 0 ? (currentStep / steps.length) * 100 : 0,
    actions: { executeAlgorithm, play, pause, reset, stepForward, stepBackward }
  };
};
```

### Sistema de Dados dos Algoritmos

**src/data/algorithmInfo.ts**
```typescript
export const algorithmsData: Record<string, AlgorithmData> = {
  bubbleSort: {
    name: "Bubble Sort",
    description: "Algoritmo de ordenação simples que...",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    pythonCode: `
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
    `,
    advantages: [
      "Simples de implementar",
      "Não requer memória adicional",
      "Algoritmo estável"
    ],
    disadvantages: [
      "Complexidade quadrática",
      "Ineficiente para arrays grandes"
    ],
    useCases: [
      "Ensino de algoritmos",
      "Arrays pequenos",
      "Quando simplicidade é prioridade"
    ]
  },
  // ... outros algoritmos
};
```

### Estrutura de Pastas Sugerida
```
sorting-visualizer/
├── public/
├── src/
│   ├── algorithms/
│   │   ├── core/
│   │   │   ├── bubbleSort.ts
│   │   │   ├── selectionSort.ts
│   │   │   ├── insertionSort.ts
│   │   │   ├── mergeSort.ts
│   │   │   ├── quickSort.ts
│   │   │   └── heapSort.ts
│   │   ├── registry.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── SortingVisualizer/
│   │   │   ├── SortingVisualizer.tsx
│   │   │   └── index.ts
│   │   ├── Controls/
│   │   │   ├── Controls.tsx
│   │   │   └── index.ts
│   │   ├── Bar/
│   │   │   ├── Bar.tsx
│   │   │   └── index.ts
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── index.ts
│   │   ├── AlgorithmSelector/
│   │   │   ├── AlgorithmSelector.tsx
│   │   │   └── index.ts
│   │   ├── AlgorithmInfo/
│   │   │   ├── AlgorithmInfo.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── index.ts
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Navigation.tsx
│   │       └── index.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Visualizer.tsx
│   │   ├── AlgorithmDetails.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAnimationEngine.ts
│   │   ├── useSortingAlgorithm.ts
│   │   └── useArrayGenerator.ts
│   ├── utils/
│   │   ├── arrayGenerator.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── data/
│   │   ├── algorithmInfo.ts
│   │   └── pythonImplementations.ts
│   ├── types/
│   │   ├── algorithm.ts
│   │   ├── ui.ts
│   │   └── index.ts
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
├── postcss.config.js
├── package.json
└── vite.config.ts
```

## Cronograma Estimado

| Fase | Duração | Tarefas Principais |
|------|---------|-------------------|
| Fase 1 | 1-2 dias | Setup, estrutura modular base |
| Fase 2 | 2-3 dias | Visualização básica e animation engine |
| Fase 3 | 3-4 dias | Implementação modular dos algoritmos |
| Fase 4 | 2-3 dias | Interface, páginas informativas e UX |
| Fase 5 | 1-2 dias | Polimento e deploy |
| **Total** | **9-14 dias** | Projeto completo |

## Implementação Modular Detalhada

### 1. Definição de Tipos Base
```typescript
// src/types/algorithm.ts
export interface SortStep {
  type: 'compare' | 'swap' | 'set-sorted' | 'highlight' | 'reset';
  indices: number[];
  array: number[];
  metadata?: {
    comparisons: number;
    swaps: number;
    currentPhase?: string;
  };
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface SortingAlgorithm {
  name: string;
  execute: (array: number[]) => SortStep[];
  complexity: AlgorithmComplexity;
  description: string;
}
```

### 2. Template de Implementação
```typescript
// src/algorithms/core/templateAlgorithm.ts
export const createSortingAlgorithm = (
  name: string,
  description: string,
  complexity: AlgorithmComplexity,
  sortFunction: (array: number[]) => SortStep[]
): SortingAlgorithm => {
  return {
    name,
    description,
    complexity,
    execute: sortFunction
  };
};
```

### 3. Exemplo de Implementação Modular
```typescript
// src/algorithms/core/selectionSort.ts
import { SortStep, AlgorithmComplexity } from '../../types/algorithm';
import { createSortingAlgorithm } from './templateAlgorithm';

const selectionSortFunction = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    
    // Destacar posição atual
    steps.push({
      type: 'highlight',
      indices: [i],
      array: [...array],
      metadata: { comparisons, swaps, currentPhase: `Buscando menor elemento para posição ${i}` }
    });

    for (let j = i + 1; j < array.length; j++) {
      // Comparar
      steps.push({
        type: 'compare',
        indices: [minIndex, j],
        array: [...array],
        metadata: { comparisons: ++comparisons, swaps }
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // Trocar se necessário
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      steps.push({
        type: 'swap',
        indices: [i, minIndex],
        array: [...array],
        metadata: { comparisons, swaps: ++swaps }
      });
    }

    // Marcar como ordenado
    steps.push({
      type: 'set-sorted',
      indices: [i],
      array: [...array],
      metadata: { comparisons, swaps }
    });
  }

  return steps;
};

const complexity: AlgorithmComplexity = {
  time: {
    best: "O(n²)",
    average: "O(n²)", 
    worst: "O(n²)"
  },
  space: "O(1)"
};

export const selectionSortAlgorithm = createSortingAlgorithm(
  "Selection Sort",
  "Encontra o menor elemento e o coloca na posição correta, repetindo o processo.",
  complexity,
  selectionSortFunction
);
```

## Próximos Passos

1. Executar os comandos de setup
2. Configurar React Router (Tailwind CSS 4 já configurado)
3. **Criar estrutura modular dos algoritmos**
   - Definir interfaces e tipos compartilhados
   - Implementar algoritmos como módulos independentes
   - Criar registry centralizado de algoritmos
4. **Implementar animation engine**
   - Hook para controle de animações
   - Sistema de steps de visualização
5. Desenvolver componente SortingVisualizer reutilizável
6. Implementar template reutilizável AlgorithmInfo
7. Implementar sistema de roteamento
8. Começar com algoritmos simples (Bubble Sort)
9. Iterar e melhorar gradualmente

## Arquitetura Modular

### Princípios da Separação
1. **Algoritmos Core**: Lógica pura, sem dependências de UI
2. **Step Generation**: Conversão da lógica em operações visuais
3. **Animation Engine**: Controle da reprodução na UI
4. **UI Components**: Apenas visualização e interação

### Vantagens da Abordagem Modular
- ✅ **Testabilidade**: Algoritmos podem ser testados independentemente
- ✅ **Reutilização**: Implementações podem ser usadas em outros contextos
- ✅ **Manutenibilidade**: Mudanças na UI não afetam a lógica dos algoritmos
- ✅ **Extensibilidade**: Fácil adição de novos algoritmos
- ✅ **Performance**: Algoritmos podem ser otimizados sem impactar a UI

### Fluxo de Dados
```
Array Input → Algorithm Core → Steps Generation → Animation Engine → UI Visualization
     ↑                                                      ↓
User Controls ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← UI Events
```

## Funcionalidades Específicas

### Navegação da Aplicação
```
Home (/) 
├── Seleção de algoritmo
├── Link para "Sobre o Algoritmo"
└── Link para "Visualizar"

Algorithm Details (/algorithm/:name)
├── Informações completas
├── Código Python
├── Complexidade
└── Botão "Visualizar"

Visualizer (/visualize/:name)
├── Controles de visualização
├── Dashboard de estatísticas
├── Link para "Sobre este Algoritmo"
└── Seletor de outros algoritmos
```

### Template de Página Informativa
- **Responsivo**: Design adaptável para mobile/desktop
- **Syntax Highlighting**: Código Python destacado
- **Tabelas**: Complexidade apresentada de forma clara
- **Navegação**: Fácil acesso à visualização
- **Consistência**: Layout padrão para todos os algoritmos

## Recursos Úteis

- [Visualgo - Sorting Algorithms](https://visualgo.net/en/sorting)
- [React Documentation](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Status**: 📋 Planejamento concluído - Pronto para desenvolvimento