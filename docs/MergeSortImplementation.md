# Merge Sort Implementation

Este documento descreve a implementação completa do algoritmo Merge Sort no visualizador de algoritmos de ordenação.

## Arquivos Implementados

### 1. Algoritmo Principal
- **`src/algorithms/core/mergeSort.ts`**: Implementação principal do Merge Sort com visualização step-by-step

### 2. Informação Teórica
- **`src/algorithms/info/mergeSortInfo.ts`**: Informações detalhadas sobre complexidade, características e casos de uso

### 3. Implementações de Código
- **`src/data/mergeSortImplementations.ts`**: Implementações em Python e Java com exemplos práticos

### 4. Registros
- **`src/algorithms/registry.ts`**: Adicionado 'merge-sort' ao registry principal
- **`src/algorithms/infoRegistry.ts`**: Adicionado informação teórica do Merge Sort
- **`src/data/implementationsRegistry.ts`**: Adicionado implementações em múltiplas linguagens

### 5. Interface de Usuário
- **`src/components/AlgorithmSelector.tsx`**: Adicionado ícone 🔀 para o Merge Sort
- **`src/components/Header.tsx`**: Atualizado para incluir o novo algoritmo

## Características do Merge Sort

### Complexidade
- **Tempo**: O(n log n) em todos os casos (melhor, médio e pior)
- **Espaço**: O(n) para arrays auxiliares + O(log n) para recursão

### Propriedades
- ✅ **Estável**: Mantém a ordem relativa de elementos iguais
- ❌ **In-place**: Requer memória adicional O(n)
- ❌ **Online**: Não pode processar dados em tempo real
- ✅ **Divide e Conquista**: Estratégia recursiva eficiente

### Vantagens
- Complexidade garantida O(n log n) independente da entrada
- Estável (mantém ordem de elementos iguais)
- Paralelizável (diferentes segmentos podem ser processados independentemente)
- Excelente para listas ligadas
- Bom desempenho de cache quando implementado corretamente

### Desvantagens
- Requer O(n) memória adicional
- Não é in-place
- Mais lento que Quick Sort em média para arrays pequenos/médios
- Overhead de criação de arrays temporários

## Como Usar

1. **No Dropdown**: Selecione "Merge Sort" no seletor de algoritmos
2. **Visualização**: Observe as fases de divisão e merge
3. **Código**: Veja implementações em Python e Java na seção "Implementações"
4. **Comparação**: Compare com outros algoritmos na tabela de comparação
5. **Detalhes**: Leia informações teóricas na seção "Detalhes do Algoritmo"

## Fases da Visualização

### 1. Divisão Recursiva
- Array é dividido recursivamente até subarrays de tamanho 1
- Visualizado com highlight das seções sendo divididas

### 2. Merge (Conquista)
- Dois subarrays ordenados são mesclados
- Comparações são destacadas em azul
- Movimentações são destacadas em vermelho
- Seções finalizadas são marcadas em verde

### 3. Finalização
- Array completo é marcado como ordenado
- Estatísticas finais são exibidas

## Implementações Incluídas

### Python
- Implementação recursiva clássica
- Função de merge separada para clareza
- Exemplos com diferentes casos de teste

### Java
- Implementação genérica com tipos Comparable
- Métodos auxiliares bem documentados
- Exemplo de uso com diferentes tipos de dados

## Testing

Para testar o Merge Sort:

```bash
npm run dev
```

1. Abra http://localhost:5173
2. Selecione "Merge Sort" no dropdown
3. Configure um array para teste
4. Execute a animação
5. Observe as fases de divisão e merge

## Performance

O Merge Sort oferece:
- **Complexidade garantida**: O(n log n) sempre
- **Estabilidade**: Elementos iguais mantêm ordem original
- **Previsibilidade**: Performance consistente independente da entrada

É ideal quando você precisa de garantias de performance ou quando a estabilidade é importante.
