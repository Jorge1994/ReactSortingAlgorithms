import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const heapSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def heap_sort(arr):
    """
    Sorts an array using the heap sort algorithm.
    
    Time Complexity: O(n log n) in all cases
    Space Complexity: O(1) - in-place sorting
    
    Args:
        arr: List of comparable elements to sort
    
    Returns:
        None (sorts in-place)
    """
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

def heapify(arr, heap_size, root_index):
    """
    Maintains the max heap property for a subtree rooted at root_index.
    
    Args:
        arr: The array representing the heap
        heap_size: Size of the heap
        root_index: Index of the root of the subtree to heapify
    """
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
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    original = numbers.copy()
    heap_sort(numbers)
    print(f"Original: {original}")
    print(f"Sorted: {numbers}")`,
    "py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class HeapSort {
    
    /**
     * Sorts an array using the heap sort algorithm.
     * 
     * Time Complexity: O(n log n) in all cases
     * Space Complexity: O(1) - in-place sorting
     * 
     * @param arr array to be sorted
     */
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
    
    /**
     * Maintains the max heap property for a subtree rooted at rootIndex.
     * 
     * @param arr the array representing the heap
     * @param heapSize size of the heap
     * @param rootIndex index of the root of the subtree to heapify
     */
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
    
    /**
     * Utility method to swap two elements in an array.
     * 
     * @param arr the array
     * @param i first index
     * @param j second index
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    /**
     * Test method to demonstrate heap sort functionality.
     */
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        int[] original = Arrays.copyOf(numbers, numbers.length);
        
        heapSort(numbers);
        
        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Sorted: " + Arrays.toString(numbers));
    }
}`,
    "java"
  ),
};
