import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const insertionSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def insertion_sort(arr):

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
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = insertion_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class InsertionSort {
    
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
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        insertionSort(numbers);
        
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
    `function insertionSort(arr) {
    // Start from the second element (index 1)
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];  // Current element to be inserted
        let j = i - 1;       // Index of the last element in sorted portion
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert the key at its correct position
        arr[j + 1] = key;
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = insertionSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
