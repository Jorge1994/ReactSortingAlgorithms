import type { AlgorithmImplementations } from '../types/implementations';

export const bitonicSortImplementations: AlgorithmImplementations = {
  python: {
    language: 'python',
    code: `def bitonic_sort(arr):
    n = len(arr)
    k = 2
    while k <= n:
        j = k // 2
        while j > 0:
            for i in range(n):
                l = i ^ j
                if l > i:
                    if ((i & k) == 0 and arr[i] > arr[l]) or ((i & k) != 0 and arr[i] < arr[l]):
                        arr[i], arr[l] = arr[l], arr[i]
            j //= 2
        k *= 2
    return arr
`,
    fileExtension: '.py'
  }
};
