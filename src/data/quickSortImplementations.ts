import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const quickSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `# partition function
def partition(arr, low, high):
  """
  Partition the subarray arr[low..high] using the Lomuto scheme.
  Returns the index of the pivot after partitioning.
  """
  pivot = arr[high]
  i = low - 1
  for j in range(low, high):
    if arr[j] < pivot:
      i += 1
      swap(arr, i, j)
  swap(arr, i + 1, high)
  return i + 1


def swap(arr, i, j):
  """Swap two elements in-place."""
  arr[i], arr[j] = arr[j], arr[i]


def quickSort(arr, low, high):
  """
  In-place QuickSort using Lomuto partition scheme.
  """
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)

def quick_sort(arr):
    if len(arr) > 0:
        quickSort(arr, 0, len(arr) - 1)
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = quick_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")
`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class QuickSort {
  /**
   * Swap helper
   */
  private static void swap(int[] arr, int i, int j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  /**
   * Lomuto partition scheme
   */
  public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
      }
    }
    swap(arr, i + 1, high);
    return i + 1;
  }

  /**
   * QuickSort recursive implementation
   */
  public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
      int pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        if (numbers.length > 0) quickSort(numbers, 0, numbers.length - 1);
        
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
