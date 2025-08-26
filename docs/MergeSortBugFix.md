# Merge Sort - Correção do Problema das Barras Duplicadas

## 🐛 Problema Identificado

Durante a animação do Merge Sort, algumas barras estavam a aparecer com valores duplicados antes das trocas, causando confusão visual onde elementos assumiam valores de outros elementos temporariamente.

## 🔍 Causa do Problema

O problema estava na implementação custom que eu tinha criado, onde:

1. **Referências cruzadas**: Os arrays temporários e o workingArray estavam a partilhar referências
2. **Snapshots prematuros**: Os snapshots eram capturados durante modificações parciais
3. **Lógica complexa**: A implementação não seguia o padrão clássico testado do Merge Sort

## ✅ Solução Implementada

Substituí a implementação por uma versão baseada no **algoritmo clássico de Merge Sort**, conforme sugerido:

### Características da Nova Implementação

```typescript
function merge(arr: number[], left: number, mid: number, right: number): void {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temp arrays - ISOLADOS e INDEPENDENTES
  const L = new Array(n1);
  const R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  // Merge logic segue o padrão clássico
  // ...
}
```

### Principais Melhorias

1. **Arrays Temporários Isolados**
   - `L` e `R` são completamente independentes
   - Não há referências cruzadas com o array principal
   - Cada cópia é feita de forma explícita

2. **Lógica Linear e Previsível**
   - Segue exatamente o algoritmo clássico
   - Sem otimizações prematuras que causavam bugs
   - Cada step é determinístico

3. **Snapshots Consistentes**
   - `workingArray` mantém sempre o estado correto
   - Snapshots são tirados em momentos seguros
   - Não há estados intermediários corruptos

4. **Sincronização Correta**
   - `arr` e `workingArray` são atualizados simultaneamente
   - Eliminadas discrepâncias temporárias
   - Visualização reflete o estado real

## 📊 Resultados

Após a implementação:

- ✅ **Não há mais barras duplicadas** durante a animação
- ✅ **Valores permanecem únicos** e corretos
- ✅ **Visualização é consistente** com o algoritmo real
- ✅ **Performance mantida** O(n log n)
- ✅ **Estabilidade garantida** (elementos iguais mantêm ordem)

## 🧪 Como Testar

1. Seleciona Merge Sort no dropdown
2. Gera um array com valores distintos
3. Executa a animação
4. Observa que nenhuma barra assume temporariamente o valor de outra
5. Confirma que o resultado final está correto

## 📝 Lições Aprendidas

1. **Simplicidade > Complexidade**: O algoritmo clássico funciona melhor que otimizações prematuras
2. **Isolamento de dados**: Arrays temporários devem ser completamente independentes
3. **Estados consistentes**: Nunca capturar snapshots durante modificações parciais
4. **Teste com casos específicos**: Arrays com valores únicos revelam problemas de duplicação

A implementação agora segue fielmente o algoritmo Merge Sort padrão, garantindo que a visualização seja uma representação accurada do processo real de ordenação.
