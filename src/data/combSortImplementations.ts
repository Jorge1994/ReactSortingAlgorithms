import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const combSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def comb_sort(arr):
    shrink = 1.3
    n = len(arr)
    gap = n
    sorted = False

    while not sorted:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted = True

        for i in range(0, n - gap):
            j = i + gap
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]
                sorted = False

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = comb_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class CombSort {

  public static void combSort(int[] arr) {
    int n = arr.length;
    double shrink = 1.3;
    int gap = n;
    boolean sorted = false;

    while (!sorted) {
      gap = (int) (gap / shrink);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }

      for (int i = 0; i + gap < n; i++) {
        int j = i + gap;
        if (arr[i] > arr[j]) {
          int tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
          sorted = false;
        }
      }
    }
  }

  public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        combSort(numbers);
        
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
