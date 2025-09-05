import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const heapSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def heap_sort(arr):
    n = len(arr)
    
    # Phase 1: Build max heap from the array
    # Start from the last non-leaf node and heapify each node
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Phase 2: Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root (maximum) to end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Call heapify on the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, heap_size, root_index):
    largest = root_index
    left_child = 2 * root_index + 1
    right_child = 2 * root_index + 2
    
    # Check if left child exists and is greater than root
    if left_child < heap_size and arr[left_child] > arr[largest]:
        largest = left_child
    
    # Check if right child exists and is greater than current largest
    if right_child < heap_size and arr[right_child] > arr[largest]:
        largest = right_child
    
    # If largest is not root, swap and continue heapifying
    if largest != root_index:
        arr[root_index], arr[largest] = arr[largest], arr[root_index]
        heapify(arr, heap_size, largest)

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = heap_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    "py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class HeapSort {
    
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Phase 1: Build max heap from the array
        // Start from the last non-leaf node and heapify each node
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Phase 2: Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (maximum) to end
            swap(arr, 0, i);
            
            // Call heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int heapSize, int rootIndex) {
        int largest = rootIndex;
        int leftChild = 2 * rootIndex + 1;
        int rightChild = 2 * rootIndex + 2;
        
        // Check if left child exists and is greater than root
        if (leftChild < heapSize && arr[leftChild] > arr[largest]) {
            largest = leftChild;
        }
        
        // Check if right child exists and is greater than current largest
        if (rightChild < heapSize && arr[rightChild] > arr[largest]) {
            largest = rightChild;
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest != rootIndex) {
            swap(arr, rootIndex, largest);
            heapify(arr, heapSize, largest);
        }
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        heapSort(numbers);
        
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
  ),

  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function heapSort(arr) {
    const n = arr.length;
    
    // Phase 1: Build max heap from the array
    // Start from the last non-leaf node and heapify each node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Phase 2: Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root (maximum) to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, heapSize, rootIndex) {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;
    
    // Check if left child exists and is greater than root
    if (leftChild < heapSize && arr[leftChild] > arr[largest]) {
        largest = leftChild;
    }
    
    // Check if right child exists and is greater than current largest
    if (rightChild < heapSize && arr[rightChild] > arr[largest]) {
        largest = rightChild;
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        heapify(arr, heapSize, largest);
    }
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = heapSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
