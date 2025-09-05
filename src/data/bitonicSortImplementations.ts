import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const bitonicSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def bitonic_sort(arr):
    """
    Bitonic sort implementation in Python (in-place).
    Note: input length must be a power of two (this visualizer supports 16, 32, 64).
    """
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

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bitonic_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")
`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class BitonicSort {
    // Bitonic sort implementation in Java (in-place). Requires array length power of 2.
    public static void bitonicSort(int[] arr) {
        int n = arr.length;
        for (int k = 2; k <= n; k <<= 1) {
            for (int j = k >> 1; j > 0; j >>= 1) {
                for (int i = 0; i < n; i++) {
                    int l = i ^ j;
                    if (l > i) {
                        if (((i & k) == 0 && arr[i] > arr[l]) || (((i & k) != 0) && arr[i] < arr[l])) {
                            int tmp = arr[i];
                            arr[i] = arr[l];
                            arr[l] = tmp;
                        }
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90, 0}; // 8 elements (power of 2)
        
        System.out.println("Original array:");
        printArray(numbers);
        
        bitonicSort(numbers);
        
        System.out.println("Sorted array:");
        printArray(numbers);
    }
    
    // Helper method to print array
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
`,
    ".java"
  ),

  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function bitonicSort(arr) {
    // Bitonic sort implementation (in-place)
    // Note: input length must be a power of two
    const n = arr.length;
    let k = 2;
    
    while (k <= n) {
        let j = Math.floor(k / 2);
        while (j > 0) {
            for (let i = 0; i < n; i++) {
                const l = i ^ j;
                if (l > i) {
                    if (((i & k) === 0 && arr[i] > arr[l]) || 
                        ((i & k) !== 0 && arr[i] < arr[l])) {
                        [arr[i], arr[l]] = [arr[l], arr[i]];
                    }
                }
            }
            j = Math.floor(j / 2);
        }
        k *= 2;
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90, 0]; // 8 elements (power of 2)
const sortedNumbers = bitonicSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
