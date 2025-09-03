import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const stoogeSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def stooge_sort(arr, l=0, r=None):
    """
    Stooge Sort (educational): recursively sorts by overlapping 2/3 segments.
    Time complexity: O(n^{2.7}) approx.
    """
    if r is None:
        r = len(arr) - 1

    if l >= r:
        return arr

    # Compare and swap
    if arr[l] > arr[r]:
        arr[l], arr[r] = arr[r], arr[l]

    if r - l + 1 > 2:
        t = (r - l + 1) // 3
        stooge_sort(arr, l, r - t)
        stooge_sort(arr, l + t, r)
        stooge_sort(arr, l, r - t)

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = stooge_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class StoogeSort {

  /**
   * Stooge Sort: recursively sorts by overlapping 2/3 segments.
   * Time complexity: O(n^{2.7}) approx.
   */
  public static void stoogeSort(int[] arr, int l, int r) {
    if (l >= r) return;

    // Compare and swap
    if (arr[l] > arr[r]) {
      int tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
    }

    if (r - l + 1 > 2) {
      int t = (r - l + 1) / 3;
      stoogeSort(arr, l, r - t);
      stoogeSort(arr, l + t, r);
      stoogeSort(arr, l, r - t);
    }
  }

  public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        stoogeSort(numbers, 0, numbers.length - 1);
        
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
