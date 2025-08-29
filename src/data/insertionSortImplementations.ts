import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const insertionSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def insertion_sort(arr):
    """
    Insertion Sort implementation in Python
    Time Complexity: O(n²) average and worst case, O(n) best case
    Space Complexity: O(1) - in-place sorting
    """
    # Start from the second element (index 1)
    for i in range(1, len(arr)):
        key = arr[i]  # Current element to be inserted
        j = i - 1     # Index of the last element in sorted portion
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert the key at its correct position
        arr[j + 1] = key
    
    return arr

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", numbers)
    
    # Sort the array
    insertion_sort(numbers)
    print("Sorted array:", numbers)`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class InsertionSort {
    
    /**
     * Insertion Sort implementation in Java
     * Time Complexity: O(n²) average and worst case, O(n) best case
     * Space Complexity: O(1) - in-place sorting
     */
    public static void insertionSort(int[] arr) {
        // Start from the second element (index 1)
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];  // Current element to be inserted
            int j = i - 1;     // Index of the last element in sorted portion
            
            // Move elements greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insert the key at its correct position
            arr[j + 1] = key;
        }
    }
    
    /**
     * Generic version that works with any Comparable type
     */
    public static <T extends Comparable<T>> void insertionSort(T[] arr) {
        for (int i = 1; i < arr.length; i++) {
            T key = arr[i];
            int j = i - 1;
            
            while (j >= 0 && arr[j].compareTo(key) > 0) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array: " + java.util.Arrays.toString(numbers));
        
        insertionSort(numbers);
        
        System.out.println("Sorted array: " + java.util.Arrays.toString(numbers));
    }
}`,
    ".java"
  ),
};
