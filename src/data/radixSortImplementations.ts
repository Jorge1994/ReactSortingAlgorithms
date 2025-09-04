import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const radixSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def radix_sort(arr):
    if not arr or len(arr) <= 1:
        return arr
    
    # Find the maximum number to determine number of digits
    max_num = max(arr)
    
    # Perform counting sort for every digit
    # Start from least significant digit (units place)
    exp = 1  # Current digit position (1 = units, 10 = tens, etc.)
    
    while max_num // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n  # Auxiliary array
    count = [0] * 10  # Count array for digits 0-9
    
    # Count occurrences of each digit
    for i in range(n):
        digit = (arr[i] // exp) % 10
        count[digit] += 1
    
    # Convert counts to cumulative positions
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array in stable manner (right to left)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    # Copy output array back to original array
    for i in range(n):
        arr[i] = output[i]

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = radix_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    "python"
  ),
  
  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function radixSort(arr) {
    /**
     * Radix Sort implementation in JavaScript
     * @param {number[]} arr - Array of positive integers to sort
     * @returns {number[]} - Sorted array
     */
    if (!arr || arr.length <= 1) return arr;
    
    // Find maximum number to determine digit count
    const maxNum = Math.max(...arr);
    const maxDigits = Math.floor(Math.log10(maxNum)) + 1;
    
    console.log(\`Sorting \${arr.length} elements with max \${maxNum} (\${maxDigits} digits)\`);
    
    // Process each digit position
    for (let digitPos = 0; digitPos < maxDigits; digitPos++) {
        const divisor = Math.pow(10, digitPos);
        const digitName = digitPos === 0 ? 'units' : 
                         digitPos === 1 ? 'tens' : 
                         digitPos === 2 ? 'hundreds' : \`10^\${digitPos}\`;
        
        console.log(\`\\nProcessing \${digitName} digit (position \${digitPos})\`);
        countingSortByDigit(arr, divisor, digitPos);
    }
    
    return arr;
}

function countingSortByDigit(arr, divisor, digitPos) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Phase 1: Count digit occurrences
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / divisor) % 10;
        count[digit]++;
    }
    
    // Phase 2: Convert to cumulative positions
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Phase 3: Place elements stably (right to left)
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / divisor) % 10;
        const position = count[digit] - 1;
        output[position] = arr[i];
        count[digit]--;
    }
    
    // Phase 4: Copy back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Example usage
const testArray = [170, 45, 75, 90, 2, 802, 24, 66];
console.log('Original array:', testArray);
radixSort(testArray);
console.log('Final sorted array:', testArray);`,
    "js"
  ),
  
  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class RadixSort {
    
    public static void radixSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }
        
        // Find the maximum number to determine number of digits
        int maxNum = findMax(arr);
        
        // Perform counting sort for every digit
        // Start from least significant digit (units place)
        for (int exp = 1; maxNum / exp > 0; exp *= 10) {
            countingSortByDigit(arr, exp);
        }
    }
    
    private static int findMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
    
    private static void countingSortByDigit(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];  // Auxiliary array
        int[] count = new int[10];  // Count array for digits 0-9
        
        // Initialize count array
        Arrays.fill(count, 0);
        
        // Count occurrences of each digit
        for (int i = 0; i < n; i++) {
            int digit = (arr[i] / exp) % 10;
            count[digit]++;
        }
        
        // Convert counts to cumulative positions
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array in stable manner (right to left)
        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        
        // Copy output array back to original array
        System.arraycopy(output, 0, arr, 0, n);
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        radixSort(numbers);
        
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
    "java"
  )
};
