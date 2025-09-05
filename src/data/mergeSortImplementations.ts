import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const mergeSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def merge_sort(arr):
   
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
    `import java.util.Arrays;

public class MergeSort {
    
    public static int[] mergeSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return Arrays.copyOf(arr, arr.length);
        }
        
        // Create a copy to avoid modifying the original
        int[] result = Arrays.copyOf(arr, arr.length);
        mergeSortHelper(result, 0, arr.length - 1);
        return result;
    }
    
    private static void mergeSortHelper(int[] arr, int left, int right) {
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
    
    private static void merge(int[] arr, int left, int mid, int right) {
        // Calculate sizes of subarrays
        int leftSize = mid - left + 1;
        int rightSize = right - mid;
        
        // Create temporary arrays
        int[] leftArray = new int[leftSize];
        int[] rightArray = new int[rightSize];
        
        // Copy data to temporary arrays
        for (int i = 0; i < leftSize; i++) {
            leftArray[i] = arr[left + i];
        }
        for (int j = 0; j < rightSize; j++) {
            rightArray[j] = arr[mid + 1 + j];
        }
        
        // Merge the temporary arrays back
        int i = 0, j = 0, k = left;
        
        while (i < leftSize && j < rightSize) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < leftSize) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }
        
        while (j < rightSize) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        int[] sorted = mergeSort(numbers);
        
        System.out.println("Sorted array:");
        printArray(sorted);
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

  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function mergeSort(arr) {
    if (arr.length <= 1) {
        return [...arr];
    }
    
    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);
    
    // Recursively sort both halves
    const leftSorted = mergeSort(leftHalf);
    const rightSorted = mergeSort(rightHalf);
    
    // Merge the sorted halves
    return merge(leftSorted, rightSorted);
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;
    
    // Compare elements and merge in sorted order
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    result.push(...left.slice(i));
    result.push(...right.slice(j));
    
    return result;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
