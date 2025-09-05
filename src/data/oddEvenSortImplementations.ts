import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const oddEvenSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def odd_even_sort(arr):
    n = len(arr)
    is_sorted = False

    while not is_sorted:
        is_sorted = True
        # Even indexed passes
        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False

        # Odd indexed passes
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = odd_even_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class OddEvenSort {

    public static void oddEvenSort(int[] arr) {
        boolean isSorted = false;
        int n = arr.length;

        while (!isSorted) {
            isSorted = true;

            // Perform Bubble sort on odd indexed elements
            for (int i = 1; i <= n - 2; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    isSorted = false;
                }
            }

            // Perform Bubble sort on even indexed elements
            for (int i = 0; i <= n - 2; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    isSorted = false;
                }
            }
        }
    }

    // Helper method to print array
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        oddEvenSort(numbers);
        
        System.out.println("Sorted array:");
        printArray(numbers);
    }
}
`,
    ".java"
  ),

  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function oddEvenSort(arr) {
    const n = arr.length;
    let isSorted = false;
    
    while (!isSorted) {
        isSorted = true;
        
        // Even indexed passes
        for (let i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                isSorted = false;
            }
        }
        
        // Odd indexed passes
        for (let i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                isSorted = false;
            }
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = oddEvenSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
