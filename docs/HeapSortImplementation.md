# Implementação do Heap Sort

## Resumo da Implementação

O algoritmo **Heap Sort** foi implementado com sucesso no projeto de visualização de algoritmos de ordenação. A implementação segue completamente a arquitetura estabelecida do projeto e inclui todos os componentes necessários.

## Arquivos Criados/Modificados

### 1. Algoritmo Core
- **`src/algorithms/core/heapSort.ts`** - Implementação principal do algoritmo
  - Função `heapSortSteps()` que gera os passos da visualização
  - Função auxiliar `heapify()` para manter a propriedade do heap
  - Duas fases distintas: construção do heap e extração de elementos
  - Rastreamento detalhado de comparações e trocas

### 2. Informações Teóricas
- **`src/algorithms/info/heapSortInfo.ts`** - Informação detalhada do algoritmo
  - Descrição completa do algoritmo
  - Complexidades de tempo e espaço com justificativas
  - Propriedades: não estável, in-place, não online
  - Vantagens, desvantagens, casos de uso
  - Notas de visualização com fases detalhadas

### 3. Implementações de Código
- **`src/data/heapSortImplementations.ts`** - Implementações em Python e Java
  - **Python**: Implementação básica e limpa
  - **Java**: Implementação orientada a objetos com métodos auxiliares

### 4. Registros Atualizados
- **`src/algorithms/registry.ts`** - Registra o algoritmo como `'heap-sort'`
- **`src/algorithms/infoRegistry.ts`** - Registra as informações teóricas
- **`src/data/implementationsRegistry.ts`** - Registra as implementações de código

### 5. Visualização
- **`src/utils/algorithmIcons.ts`** - Adiciona ícone 🌲 para representar a estrutura de árvore do heap

## Características Técnicas

### Complexidade
- **Tempo**: O(n log n) em todos os casos (melhor, médio e pior)
- **Espaço**: O(1) - ordenação in-place
- **Estabilidade**: Não estável
- **Adaptativo**: Não (não se beneficia de dados parcialmente ordenados)

### Fases do Algoritmo

#### Fase 1: Construção do Max Heap
1. Inicia no último nó não-folha (índice n/2-1)
2. Aplica heapify para cada nó em direção ao root
3. Garante que a propriedade do max heap seja satisfeita

#### Fase 2: Extração de Elementos
1. Move o elemento máximo (root) para sua posição final
2. Reduz o tamanho do heap
3. Restaura a propriedade do heap com heapify
4. Repete até que apenas um elemento reste

### Visualização Detalhada

O algoritmo inclui 14 fases de visualização que explicam:
- Como o array representa um heap binário
- O processo de construção do heap inicial
- Como a propriedade do heap é mantida
- O processo de extração repetida do máximo
- Como a região ordenada cresce gradualmente

## Implementações Incluídas

### Python
```python
def heap_sort(arr):
    """Implementação básica do Heap Sort"""
    n = len(arr)
    
    # Fase 1: Construir max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Fase 2: Extrair elementos
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
```

### Java
```java
public static void heapSort(int[] arr) {
    int n = arr.length;
    
    // Fase 1: Construir max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Fase 2: Extrair elementos
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}
```

## Integração com o Sistema

O Heap Sort está agora totalmente integrado ao sistema:

1. **Disponível no seletor de algoritmos** com ícone 🌲
2. **Incluído na tabela de comparação** de algoritmos
3. **Suporte completo à visualização** com cores e fases
4. **Implementações de código** disponíveis em Python e Java
5. **Informações teóricas detalhadas** acessíveis via interface

## Benefícios da Implementação

- **Performance garantida**: O(n log n) em todos os casos
- **Eficiente em memória**: Ordenação in-place com O(1) espaço
- **Educativo**: Visualização clara da estrutura de heap
- **Comparável**: Facilita comparação com outros algoritmos
- **Código limpo**: Implementações bem documentadas e testadas

O Heap Sort agora está pronto para uso no projeto, fornecendo uma excelente opção para situações que requerem performance consistente e uso eficiente de memória.
