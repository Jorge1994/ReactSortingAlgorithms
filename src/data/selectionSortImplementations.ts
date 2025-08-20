import { createAlgorithmImplementation, type AlgorithmImplementations } from '../types/implementations';

export const selectionSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    'Python',
    `def selection_sort(arr):
    """
    Selection Sort implementation in Python
    Time Complexity: O(n²)
    Space Complexity: O(1)
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
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# sorted_numbers = selection_sort(numbers)
# print(f"Sorted array: {sorted_numbers}")

def selection_sort_optimized(arr):
    """
    Optimized Selection Sort with bidirectional selection
    Finds both min and max in each pass, reducing iterations by half
    """
    left = 0
    right = len(arr) - 1
    
    while left < right:
        min_idx = left
        max_idx = left
        
        # Find both minimum and maximum in one pass
        for i in range(left, right + 1):
            if arr[i] < arr[min_idx]:
                min_idx = i
            elif arr[i] > arr[max_idx]:
                max_idx = i
        
        # Place minimum at the left
        arr[left], arr[min_idx] = arr[min_idx], arr[left]
        
        # If maximum was at the left position, it's now at min_idx
        if max_idx == left:
            max_idx = min_idx
        
        # Place maximum at the right
        arr[right], arr[max_idx] = arr[max_idx], arr[right]
        
        left += 1
        right -= 1
    
    return arr`,
    'py'
  ),

  java: createAlgorithmImplementation(
    'Java',
    `public class SelectionSort {
    
    /**
     * Selection Sort implementation in Java
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
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
    
    /**
     * Optimized Selection Sort with bidirectional selection
     */
    public static void selectionSortOptimized(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            int minIdx = left;
            int maxIdx = left;
            
            // Find both minimum and maximum in one pass
            for (int i = left; i <= right; i++) {
                if (arr[i] < arr[minIdx]) {
                    minIdx = i;
                } else if (arr[i] > arr[maxIdx]) {
                    maxIdx = i;
                }
            }
            
            // Swap minimum to left position
            if (minIdx != left) {
                int temp = arr[left];
                arr[left] = arr[minIdx];
                arr[minIdx] = temp;
            }
            
            // If maximum was at left position, it's now at minIdx
            if (maxIdx == left) {
                maxIdx = minIdx;
            }
            
            // Swap maximum to right position
            if (maxIdx != right) {
                int temp = arr[right];
                arr[right] = arr[maxIdx];
                arr[maxIdx] = temp;
            }
            
            left++;
            right--;
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        selectionSort(numbers);
        
        System.out.println("Sorted array:");
        printArray(numbers);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}`,
    'java'
  )
};
