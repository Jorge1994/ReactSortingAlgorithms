import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const selectionSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def selection_sort(arr):
    """
    Selection Sort implementation in Python
    Time Complexity: O(n²) for all cases
    Space Complexity: O(1) - in-place sorting
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n - 1):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", numbers)
    
    selection_sort(numbers)
    print("Sorted array:", numbers)`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class SelectionSort {
    
    /**
     * Selection Sort implementation in Java
     * Time Complexity: O(n²) for all cases
     * Space Complexity: O(1) - in-place sorting
     */
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in remaining unsorted array
            int minIdx = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // Swap the found minimum element with the first element
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array: " + java.util.Arrays.toString(numbers));
        
        selectionSort(numbers);
        
        System.out.println("Sorted array: " + java.util.Arrays.toString(numbers));
    }
}`,
    ".java"
  ),
};
