import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const cocktailSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def cocktail_shaker_sort(arr):
    """
    Cocktail Shaker Sort implementation in Python (bidirectional bubble sort)
    Time Complexity: O(n²) worst/average, O(n) best
    Space Complexity: O(1)
    """
    n = len(arr)
    if n <= 1:
        return arr

    left = 0
    right = n - 1

    while left < right:
        swapped = False

        # Forward pass
        for i in range(left, right):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        right -= 1

        if not swapped:
            break

        swapped = False

        # Backward pass
        for i in range(right, left, -1):
            if arr[i - 1] > arr[i]:
                arr[i - 1], arr[i] = arr[i], arr[i - 1]
                swapped = True
        left += 1

        if not swapped:
            break

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = cocktail_shaker_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class CocktailShakerSort {

    /**
     * Cocktail Shaker Sort (bidirectional bubble sort) in Java
     * Time Complexity: O(n^2) worst/average, O(n) best
     * Space Complexity: O(1)
     */
    public static void cocktailShakerSort(int[] arr) {
        int n = arr.length;
        if (n <= 1) return;

        int left = 0;
        int right = n - 1;

        while (left < right) {
            boolean swapped = false;

            // Forward pass
            for (int i = left; i < right; i++) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    swapped = true;
                }
            }
            right--;

            if (!swapped) break;

            swapped = false;

            // Backward pass
            for (int i = right; i > left; i--) {
                if (arr[i - 1] > arr[i]) {
                    swap(arr, i - 1, i);
                    swapped = true;
                }
            }
            left++;

            if (!swapped) break;
        }
    }

    private static void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        cocktailShakerSort(numbers);
        
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
}`,
    ".java"
  ),
};
