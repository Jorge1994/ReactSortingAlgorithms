import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const countingSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def counting_sort(arr):

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
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = counting_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class CountingSort {
    
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
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        countingSort(numbers);
        
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

  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    // Find the range of values
    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    const range = maxVal - minVal + 1;
    
    // Initialize count array
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences of each element
    for (const num of arr) {
        count[num - minVal]++;
    }
    
    // Convert to cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (traverse from right to maintain stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const index = count[arr[i] - minVal] - 1;
        output[index] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    // Copy output array back to original
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = countingSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
