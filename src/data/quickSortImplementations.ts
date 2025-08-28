import { createAlgorithmImplementation, type AlgorithmImplementations } from '../types/implementations';

export const quickSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
  'Python',
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


# Example usage
if __name__ == "__main__":
  test = [64, 34, 25, 12, 22, 11, 90]
  original = test.copy()
  if len(test) > 0:
    quickSort(test, 0, len(test) - 1)
  print(f"Original: {original} -> Sorted: {test}")
`,
  '.py'
  ),

  javascript: createAlgorithmImplementation(
    'JavaScript',
    `// Simple functional Quick Sort (not in-place)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return quickSort(left).concat(middle, quickSort(right));
}

// Example usage
if (typeof require !== 'undefined' && require.main === module) {
  const tests = [[], [1], [3,1,2], [5,4,3,2,1], [2,3,2,1,3]];
  tests.forEach(t => console.log('Original:', t, 'Sorted:', quickSort(t.slice())));
}
`,
    '.js'
  ),

  java: createAlgorithmImplementation(
    'Java',
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
    // Single example array (before -> after)
    int[] test = {64, 34, 25, 12, 22, 11, 90};
    int[] original = Arrays.copyOf(test, test.length);
    if (test.length > 0) quickSort(test, 0, test.length - 1);
    System.out.println("Original: " + Arrays.toString(original) + " -> Sorted: " + Arrays.toString(test));
  }
}
`,
  '.java'
  )
};
