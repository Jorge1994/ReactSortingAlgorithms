import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const mergeSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def merge_sort(arr):
    """
    Sorts an array using the merge sort algorithm.
    
    Args:
        arr: List of comparable elements to sort
    
    Returns:
        Sorted list in ascending order
    
    Time Complexity: O(n log n) in all cases
    Space Complexity: O(n) for auxiliary arrays
    """
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    # Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # Merge the sorted halves
    return merge(left_sorted, right_sorted)

def merge(left, right):
    """
    Merges two sorted arrays into a single sorted array.
    
    Args:
        left: First sorted array
        right: Second sorted array
    
    Returns:
        Merged sorted array
    """
    result = []
    i = j = 0
    
    # Compare elements and merge in sorted order
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = merge_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.*;

public class MergeSort {
    
    /**
     * Generic merge sort implementation for any Comparable type.
     * 
     * @param <T> Type that implements Comparable
     * @param arr Array to sort
     * @return New sorted array
     * 
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    public static <T extends Comparable<T>> T[] mergeSort(T[] arr) {
        if (arr == null || arr.length <= 1) {
            return arr;
        }
        
        // Create a copy to avoid modifying the original
        T[] result = Arrays.copyOf(arr, arr.length);
        mergeSortHelper(result, 0, arr.length - 1);
        return result;
    }
    
    /**
     * Recursive helper method for merge sort.
     * 
     * @param <T> Type that implements Comparable
     * @param arr Array to sort
     * @param left Starting index
     * @param right Ending index
     */
    private static <T extends Comparable<T>> void mergeSortHelper(
            T[] arr, int left, int right) {
        
        if (left < right) {
            // Prevent integer overflow
            int mid = left + (right - left) / 2;
            
            // Recursively sort both halves
            mergeSortHelper(arr, left, mid);
            mergeSortHelper(arr, mid + 1, right);
            
            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
    
    /**
     * Merges two sorted subarrays into a single sorted array.
     * 
     * @param <T> Type that implements Comparable
     * @param arr Array containing both subarrays
     * @param left Start index of first subarray
     * @param mid End index of first subarray
     * @param right End index of second subarray
     */
    @SuppressWarnings("unchecked")
    private static <T extends Comparable<T>> void merge(
            T[] arr, int left, int mid, int right) {
        
        // Calculate sizes of subarrays
        int leftSize = mid - left + 1;
        int rightSize = right - mid;
        
        // Create temporary arrays
        T[] leftArray = (T[]) new Comparable[leftSize];
        T[] rightArray = (T[]) new Comparable[rightSize];
        
        // Copy data to temporary arrays
        System.arraycopy(arr, left, leftArray, 0, leftSize);
        System.arraycopy(arr, mid + 1, rightArray, 0, rightSize);
        
        // Merge the temporary arrays back
        int i = 0, j = 0, k = left;
        
        while (i < leftSize && j < rightSize) {
            if (leftArray[i].compareTo(rightArray[j]) <= 0) {
                arr[k++] = leftArray[i++];
            } else {
                arr[k++] = rightArray[j++];
            }
        }
        
        // Copy remaining elements
        while (i < leftSize) {
            arr[k++] = leftArray[i++];
        }
        
        while (j < rightSize) {
            arr[k++] = rightArray[j++];
        }
    }
    
    public static void main(String[] args) {
        Integer[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        Integer[] sorted = mergeSort(numbers);
        
        System.out.println("Sorted array:");
        printArray(sorted);
    }
    
    // Helper method to print array
    public static void printArray(Integer[] arr) {
        for (Integer value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}`,
    ".java"
  ),
};
