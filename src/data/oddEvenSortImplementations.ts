import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const oddEvenSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def odd_even_sort(arr):
    """
    Odd-Even (Brick) Sort implementation in Python
    Time Complexity: O(n²) average/worst, O(n) best
    Space Complexity: O(1)
    """
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
if __name__ == '__main__':
    numbers = [3, 2, 5, 1, 4]
    print('Original:', numbers)
    odd_even_sort(numbers)
    print('Sorted:', numbers)
`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class OddEvenSort {
    // Odd-Even (Brick) Sort implementation in Java
    // Time Complexity: O(n^2) average/worst, O(n) best
    // Time Complexity: O(n²) average/worst, O(n) best
    // Space Complexity: O(1)

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

    private static void printArray(int[] arr) {
        for (int v : arr) System.out.print(v + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        int[] numbers = {3, 2, 5, 1, 4};

        System.out.print("Original: ");
        printArray(numbers);

        oddEvenSort(numbers);

        System.out.print("Sorted:   ");
        printArray(numbers);
    }
}
`,
    ".java"
  ),
};
