import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const countingSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def counting_sort(arr):
    """
    Sorts an array using counting sort algorithm.
    Only works with non-negative integers.
    
    Time Complexity: O(n + k) where k is the range of input
    Space Complexity: O(k) for the count array
    """
    if not arr:
        return arr
    
    # Find the range of values
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    # Initialize count array
    count = [0] * range_size
    output = [0] * len(arr)
    
    # Count occurrences of each element
    for num in arr:
        count[num - min_val] += 1
    
    # Convert to cumulative count
    for i in range(1, range_size):
        count[i] += count[i - 1]
    
    # Build output array (traverse from right to maintain stability)
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    # Copy output array back to original
    for i in range(len(arr)):
        arr[i] = output[i]
    
    return arr

# Example usage
numbers = [4, 2, 2, 8, 3, 3, 1]
print("Original:", numbers)
counting_sort(numbers)
print("Sorted:", numbers)`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class CountingSort {
    
    /**
     * Counting Sort implementation in Java
     * Works with arrays of non-negative integers
     * 
     * Time Complexity: O(n + k) where k is the range
     * Space Complexity: O(k) for count array + O(n) for output
     */
    public static void countingSort(int[] arr) {
        if (arr.length == 0) return;
        
        // Find range
        int max = Arrays.stream(arr).max().orElse(0);
        int min = Arrays.stream(arr).min().orElse(0);
        int range = max - min + 1;
        
        // Initialize count and output arrays
        int[] count = new int[range];
        int[] output = new int[arr.length];
        
        // Count each element
        for (int num : arr) {
            count[num - min]++;
        }
        
        // Convert to cumulative count
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array (right to left for stability)
        for (int i = arr.length - 1; i >= 0; i--) {
            int index = count[arr[i] - min] - 1;
            output[index] = arr[i];
            count[arr[i] - min]--;
        }
        
        // Copy back to original array
        System.arraycopy(output, 0, arr, 0, arr.length);
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Original: " + Arrays.toString(numbers));
        countingSort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
    }
}`,
    ".java"
  ),
};
