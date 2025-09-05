import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const pancakeSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def flip(arr, i):
    start = 0
    while start < i:
        arr[start], arr[i] = arr[i], arr[start]
        start += 1
        i -= 1

def find_max(arr, n):
    mi = 0
    for i in range(n):
        if arr[i] > arr[mi]:
            mi = i
    return mi

def pancake_sort(arr):
    n = len(arr)
    for curr_size in range(n, 1, -1):
        mi = find_max(arr, curr_size)
        if mi != curr_size - 1:
            flip(arr, mi)
            flip(arr, curr_size - 1)
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = pancake_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")
`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class PancakeSort {
    static void flip(int[] arr, int i) {
        int start = 0;
        while (start < i) {
            int temp = arr[start];
            arr[start] = arr[i];
            arr[i] = temp;
            start++;
            i--;
        }
    }

    static int findMax(int[] arr, int n) {
        int mi = 0;
        for (int i = 0; i < n; i++)
            if (arr[i] > arr[mi]) mi = i;
        return mi;
    }

    static void pancakeSort(int[] arr) {
        int n = arr.length;
        for (int curr_size = n; curr_size > 1; --curr_size) {
            int mi = findMax(arr, curr_size);
            if (mi != curr_size - 1) {
                flip(arr, mi);
                flip(arr, curr_size - 1);
            }
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        pancakeSort(numbers);
        
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
    `function flip(arr, i) {
    let start = 0;
    while (start < i) {
        [arr[start], arr[i]] = [arr[i], arr[start]];
        start++;
        i--;
    }
}

function findMax(arr, n) {
    let mi = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] > arr[mi]) {
            mi = i;
        }
    }
    return mi;
}

function pancakeSort(arr) {
    const n = arr.length;
    for (let currSize = n; currSize > 1; currSize--) {
        const mi = findMax(arr, currSize);
        if (mi !== currSize - 1) {
            flip(arr, mi);
            flip(arr, currSize - 1);
        }
    }
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = pancakeSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
