import { createAlgorithmImplementation, type AlgorithmImplementations } from '../types/implementations';

export const combSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    'Python',
    `def comb_sort(arr):
    """
    Comb Sort implementation in Python
    """
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

# Example
nums = [8, 4, 1, 56, 3, -44, 23, -6, 28, 0]
print(comb_sort(nums.copy()))`,
    '.py'
  ),

  java: createAlgorithmImplementation(
  'Java',
  `import java.util.Arrays;

public class CombSort {
  /**
   * Comb Sort implementation in Java
   */
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
    int[] nums = {8, 4, 1, 56, 3, -44, 23, -6, 28, 0};
    combSort(nums);
    System.out.println(Arrays.toString(nums));
  }
}
`,
  '.java'
  )
};
