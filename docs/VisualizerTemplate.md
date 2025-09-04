# Visualizer Template Guide

Este documento explica como usar o `VisualizerTemplate` para criar visualizadores consistentes.

## Estrutura do Template

O `VisualizerTemplate` é um componente que encapsula a estrutura comum de todos os visualizadores, incluindo:

- Seção principal de visualização
- Controles de animação
- Painel de estatísticas
- Legenda de cores
- Controles customizados (opcionais)

## Como Usar

### 1. Importar o Template

```tsx
import { VisualizerTemplate } from './VisualizerTemplate';
```

### 2. Estrutura Básica

```tsx
export function MyVisualizer(props) {
  // Sua lógica específica aqui
  
  return (
    <VisualizerTemplate
      currentStepData={currentStepData}
      currentStep={currentStep}
      totalSteps={steps.length}
      isPlaying={isPlaying}
      speed={speed}
      onPlay={onPlay}
      onPause={onPause}
      onNext={onNext}
      onPrev={onPrev}
      onReset={handleReset}
      canPlayNext={canPlayNext}
      canPlayPrev={canPlayPrev}
      onSpeedChange={onSpeedChange}
    >
      {/* Seu conteúdo de visualização aqui */}
    </VisualizerTemplate>
  );
}
```

### 3. Props do Template

| Prop | Tipo | Descrição |
|------|------|-----------|
| `children` | `ReactNode` | Conteúdo principal da visualização |
| `currentStepData` | `SortStep` | Dados do passo atual |
| `currentStep` | `number` | Índice do passo atual |
| `totalSteps` | `number` | Total de passos |
| `isPlaying` | `boolean` | Se a animação está reproduzindo |
| `speed` | `number` | Velocidade da animação |
| `onPlay` | `() => void` | Função para iniciar reprodução |
| `onPause` | `() => void` | Função para pausar |
| `onNext` | `() => void` | Próximo passo |
| `onPrev` | `() => void` | Passo anterior |
| `onReset` | `() => void` | Resetar visualização |
| `canPlayNext` | `boolean` | Se pode avançar |
| `canPlayPrev` | `boolean` | Se pode voltar |
| `onSpeedChange` | `(speed: number) => void` | Mudar velocidade |
| `showStatistics` | `boolean` | Exibir painel de estatísticas (padrão: true) |
| `showColorLegend` | `boolean` | Exibir legenda de cores (padrão: true) |
| `customControls` | `ReactNode` | Controles customizados adicionais |

### 4. Customizações

#### Estatísticas Customizadas

Para visualizadores que precisam de estatísticas específicas, use `customControls`:

```tsx
const customStatistics = (
  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
    {/* Suas estatísticas customizadas */}
  </div>
);

return (
  <VisualizerTemplate
    // ...outras props
    showStatistics={false}
    customControls={customStatistics}
  >
    {/* conteúdo */}
  </VisualizerTemplate>
);
```

#### Reset Customizado

Para visualizadores com estado complexo, implemente sua própria função de reset:

```tsx
const handleReset = () => {
  // Limpar estado específico do visualizador
  setMyState([]);
  setMyOtherState(null);
  
  // Chamar reset do pai
  onReset();
};

return (
  <VisualizerTemplate
    // ...outras props
    onReset={handleReset}
  >
    {/* conteúdo */}
  </VisualizerTemplate>
);
```

## Exemplos de Implementação

### Visualizador Padrão (Array Básico)

O `ArrayVisualizer.tsx` é um exemplo perfeito de como usar o template para visualizadores padrão:
- Usa todas as funcionalidades básicas do template
- Implementa visualização de barras responsiva
- Suporta todos os tipos de passos de algoritmo padrão

### Visualizador Complexo (Bucket Sort)

Veja `BucketSortVisualizer.tsx` para um exemplo completo de como implementar:
- Estado complexo com múltiplos arrays
- Animações com framer-motion
- Reset customizado
- Fases específicas do algoritmo

### Visualizador com Estatísticas Customizadas (Counting Sort)

Veja `CountingSortVisualizer.tsx` para exemplo de:
- Estatísticas customizadas
- Desabilitar estatísticas padrão
- Controles adicionais

## Vantagens do Template

1. **Consistência**: Todos os visualizadores têm a mesma estrutura
2. **Manutenibilidade**: Mudanças na interface se aplicam a todos
3. **Reutilização**: Lógica de controles centralizizada
4. **Flexibilidade**: Permite customizações quando necessário
5. **Escalabilidade**: Fácil adicionar novos visualizadores
