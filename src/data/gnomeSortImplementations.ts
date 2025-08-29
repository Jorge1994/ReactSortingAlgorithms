import { createAlgorithmImplementation } from "../types/implementations";

export const gnomeSortImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def gnome_sort(arr):
    """
    Simple Gnome Sort implementation in Python.
    Time Complexity: O(n²) worst/average, O(n) best
    Space Complexity: O(1)
    """
    i = 1
    n = len(arr)

    while i < n:
        if arr[i - 1] <= arr[i]:
            i += 1
        else:
            arr[i - 1], arr[i] = arr[i], arr[i - 1]
            if i > 1:
                i -= 1
            else:
                i += 1

    return arr

# Example usage
numbers = [34, 2, 78, 1, 45, 90, 12]
sorted_numbers = gnome_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class GnomeSort {

    /**
     * Simple Gnome Sort implementation in Java
     * Time Complexity: O(n²) worst/average, O(n) best
     * Space Complexity: O(1)
     */
    public static void gnomeSort(int[] arr) {
        int i = 1;
        int n = arr.length;

        while (i < n) {
            if (arr[i - 1] <= arr[i]) {
                i++;
            } else {
                swap(arr, i - 1, i);
                if (i > 1) i--;
                else i++;
            }
        }
    }

    private static void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    public static void main(String[] args) {
        int[] numbers = {34, 2, 78, 1, 45, 90, 12};

        System.out.println("Original array:");
        printArray(numbers);

        gnomeSort(numbers);

        System.out.println("Sorted array:");
        printArray(numbers);
    }

    private static void printArray(int[] arr) {
        for (int v : arr) System.out.print(v + " ");
        System.out.println();
    }
}`,
    ".java"
  ),
};
