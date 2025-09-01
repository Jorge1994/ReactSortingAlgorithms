# Introsort Implementation

## Overview

O **Introsort** (Introspective Sort) foi implementado com sucesso no projeto React Sorting Algorithms! Este algoritmo híbrido combina o melhor de três algoritmos diferentes:

- **Quicksort**: Para performance rápida na maioria dos casos
- **Heapsort**: Para garantir O(n log n) no pior caso
- **Insertion Sort**: Para otimização em arrays pequenos

## Características da Implementação

### 🎯 **Algoritmo Adaptativo**
- Monitoriza a profundidade da recursão
- Muda automaticamente de estratégia quando necessário
- Garante sempre O(n log n) mesmo no pior caso

### 🔄 **Fases de Execução**
1. **Análise Inicial**: Calcula limite de profundidade (2 × log₂(n))
2. **Quicksort**: Algoritmo principal com median-of-three pivot
3. **Monitorização**: Verifica se atingiu o limite de profundidade
4. **Heapsort**: Ativado quando o limite é excedido
5. **Insertion Sort**: Para arrays pequenos (< 16 elementos)

### 🎨 **Visualização Melhorada**
- **Azul**: Comparações entre elementos
- **Vermelho**: Trocas/swaps de elementos
- **Violeta**: Movimentações de elementos
- **Verde**: Elementos finalmente ordenados
- **Âmbar**: Elementos destacados (pivot, etc.)

### 📊 **Complexidade Garantida**
- **Tempo**: O(n log n) em todos os casos
- **Espaço**: O(log n) para a stack de recursão
- **Estabilidade**: Não é estável
- **In-place**: Sim, ordena no próprio array

## Casos de Uso

### ✅ **Ideal Para:**
- Sistemas de produção onde performance previsível é crítica
- Bibliotecas padrão de linguagens (C++ std::sort, .NET Array.Sort)
- Processamento de grandes volumes de dados
- Aplicações em tempo real com restrições de tempo

### 🚀 **Vantagens Principais:**
1. **Performance Híbrida**: Combina velocidade do quicksort com garantias do heapsort
2. **Prevenção de Pior Caso**: Nunca degrada para O(n²)
3. **Otimização Automática**: Adapta-se às características dos dados
4. **Uso Industrial**: Algoritmo usado em bibliotecas reais

## Como Testar

1. Abra o visualizador no navegador
2. Selecione "Introsort" na lista de algoritmos
3. Configure o tamanho do array (recomendado: 20-50 elementos)
4. Observe as diferentes fases:
   - **Início**: Cálculo do limite de profundidade
   - **Quicksort**: Particionamento com median-of-three
   - **Transições**: Mudanças automáticas de algoritmo
   - **Finalização**: Todos elementos ordenados

## Comparação com Outros Algoritmos

| Algoritmo | Melhor | Médio | Pior | Espaço | Estável |
|-----------|--------|-------|------|---------|---------|
| **Introsort** | O(n log n) | O(n log n) | **O(n log n)** | O(log n) | ❌ |
| Quicksort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Heapsort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |

## Implementações Incluídas

- **Python**: Implementação completa com todas as otimizações
- **Java**: Versão com generics e type safety
- **JavaScript**: Com monitorização de performance

O Introsort representa o estado da arte em algoritmos de ordenação para uso geral, combinando eficiência prática com garantias teóricas sólidas!
