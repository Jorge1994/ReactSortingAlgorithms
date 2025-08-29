import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const bogoSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `import random
def is_sorted(a):
    return all(a[i] <= a[i+1] for i in range(len(a)-1))

def bogo_sort(a):
    while not is_sorted(a):
        random.shuffle(a)
    return a

# Example usage
arr = [3, 1, 2]
print(bogo_sort(arr))`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Random;
import java.util.Arrays;

public class BogoSort {
  private static boolean isSorted(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) return false;
    }
    return true;
  }

  private static void shuffle(int[] arr) {
    Random rnd = new Random();
    for (int i = arr.length - 1; i > 0; i--) {
      int j = rnd.nextInt(i + 1);
      int tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }

  public static void bogoSort(int[] arr) {
    while (!isSorted(arr)) {
      shuffle(arr);
    }
  }

  public static void main(String[] args) {
    int[] arr = {3, 1, 2};
    bogoSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}
`,
    ".java"
  ),
};
