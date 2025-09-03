import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const shellSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def shell_sort(arr):
    """
    Shell Sort implementation in Python using gap = floor(gap/2) sequence
    Time Complexity: depends on gap sequence; commonly sub-quadratic in practice
    Space Complexity: O(1) - in-place sorting
    """
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = shell_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")
`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class ShellSort {
    public static void shellSort(int[] arr) {
        int n = arr.length;
        for (int gap = n/2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        shellSort(numbers);
        
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
};
