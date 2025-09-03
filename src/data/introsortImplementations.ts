import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const introsortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `import math

def introsort(arr):
    """
    Introspective Sort - Hybrid algorithm combining quicksort, heapsort, and insertion sort
    """
    if len(arr) <= 1:
        return arr
    
    # Calculate depth limit: 2 * floor(log2(n))
    depth_limit = 2 * int(math.log2(len(arr)))
    introsort_util(arr, 0, len(arr) - 1, depth_limit)
    return arr

def introsort_util(arr, begin, end, depth_limit):
    """
    Main recursive introsort function with depth monitoring
    """
    size = end - begin + 1
    
    # Use insertion sort for small arrays (< 16 elements)
    if size < 16:
        insertion_sort(arr, begin, end)
        return
    
    # Use heapsort when depth limit is reached (prevent O(n²) worst case)
    if depth_limit == 0:
        heapsort(arr, begin, end)
        return
    
    # Use quicksort with median-of-three pivot selection
    pivot_index = median_of_three(arr, begin, begin + size // 2, end)
    
    # Move pivot to end for partitioning
    arr[pivot_index], arr[end] = arr[end], arr[pivot_index]
    
    # Partition and recursively sort
    partition_point = partition(arr, begin, end)
    
    # Recursively sort left and right partitions
    introsort_util(arr, begin, partition_point - 1, depth_limit - 1)
    introsort_util(arr, partition_point + 1, end, depth_limit - 1)

def median_of_three(arr, a, b, c):
    """
    Find median of three elements for better pivot selection
    """
    if (arr[a] <= arr[b] <= arr[c]) or (arr[c] <= arr[b] <= arr[a]):
        return b
    elif (arr[b] <= arr[a] <= arr[c]) or (arr[c] <= arr[a] <= arr[b]):
        return a
    else:
        return c

def partition(arr, low, high):
    """
    Standard quicksort partitioning
    """
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def insertion_sort(arr, begin, end):
    """
    Insertion sort for small subarrays
    """
    for i in range(begin + 1, end + 1):
        key = arr[i]
        j = i - 1
        
        while j >= begin and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key

def heapify(arr, n, i, offset):
    """
    Heapify a subtree rooted at index i
    """
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Compare with left child
    if left < n and arr[offset + left] > arr[offset + largest]:
        largest = left
    
    # Compare with right child
    if right < n and arr[offset + right] > arr[offset + largest]:
        largest = right
    
    # If largest is not root, swap and continue heapifying
    if largest != i:
        arr[offset + i], arr[offset + largest] = arr[offset + largest], arr[offset + i]
        heapify(arr, n, largest, offset)

def heapsort(arr, begin, end):
    """
    Heapsort for guaranteed O(n log n) performance
    """
    n = end - begin + 1
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i, begin)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root to end
        arr[begin], arr[begin + i] = arr[begin + i], arr[begin]
        
        # Heapify the reduced heap
        heapify(arr, i, 0, begin)

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = introsort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    "py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.*;

public class IntroSort {
    private static final int INSERTION_SORT_THRESHOLD = 16;
    
    public static <T extends Comparable<T>> void sort(T[] arr) {
        if (arr.length <= 1) return;
        
        int depthLimit = 2 * (int) Math.floor(Math.log(arr.length) / Math.log(2));
        introsortUtil(arr, 0, arr.length - 1, depthLimit);
    }
    
    private static <T extends Comparable<T>> void introsortUtil(T[] arr, int begin, int end, int depthLimit) {
        int size = end - begin + 1;
        
        // Use insertion sort for small arrays
        if (size < INSERTION_SORT_THRESHOLD) {
            insertionSort(arr, begin, end);
            return;
        }
        
        // Use heapsort when depth limit is reached
        if (depthLimit == 0) {
            heapsort(arr, begin, end);
            return;
        }
        
        // Use quicksort with median-of-three
        int pivot = medianOfThree(arr, begin, begin + size / 2, end);
        swap(arr, pivot, end);
        
        int partitionPoint = partition(arr, begin, end);
        
        // Recursive calls
        if (partitionPoint - 1 > begin) {
            introsortUtil(arr, begin, partitionPoint - 1, depthLimit - 1);
        }
        if (partitionPoint + 1 < end) {
            introsortUtil(arr, partitionPoint + 1, end, depthLimit - 1);
        }
    }
    
    private static <T extends Comparable<T>> int medianOfThree(T[] arr, int a, int b, int c) {
        T A = arr[a], B = arr[b], C = arr[c];
        
        if ((A.compareTo(B) <= 0 && B.compareTo(C) <= 0) || 
            (C.compareTo(B) <= 0 && B.compareTo(A) <= 0)) {
            return b;
        }
        if ((B.compareTo(A) <= 0 && A.compareTo(C) <= 0) || 
            (C.compareTo(A) <= 0 && A.compareTo(B) <= 0)) {
            return a;
        }
        return c;
    }
    
    private static <T extends Comparable<T>> int partition(T[] arr, int low, int high) {
        T pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j].compareTo(pivot) <= 0) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static <T extends Comparable<T>> void insertionSort(T[] arr, int begin, int end) {
        for (int i = begin + 1; i <= end; i++) {
            T key = arr[i];
            int j = i - 1;
            
            while (j >= begin && arr[j].compareTo(key) > 0) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
    }
    
    private static <T extends Comparable<T>> void heapsort(T[] arr, int begin, int end) {
        int n = end - begin + 1;
        
        // Build heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, begin);
        }
        
        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            swap(arr, begin, begin + i);
            heapify(arr, i, 0, begin);
        }
    }
    
    private static <T extends Comparable<T>> void heapify(T[] arr, int n, int i, int offset) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[offset + left].compareTo(arr[offset + largest]) > 0) {
            largest = left;
        }
        
        if (right < n && arr[offset + right].compareTo(arr[offset + largest]) > 0) {
            largest = right;
        }
        
        if (largest != i) {
            swap(arr, offset + i, offset + largest);
            heapify(arr, n, largest, offset);
        }
    }
    
    private static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    // Performance testing
    public static void main(String[] args) {
        Integer[] numbers = {64, 34, 25, 12, 22, 11, 90, 88, 5, 76, 50, 3};
        String[] words = {"banana", "apple", "cherry", "date", "elderberry"};
        
        System.out.println("Before sorting numbers: " + Arrays.toString(numbers));
        sort(numbers);
        System.out.println("After sorting numbers: " + Arrays.toString(numbers));
        
        System.out.println("\\nBefore sorting words: " + Arrays.toString(words));
        sort(words);
        System.out.println("After sorting words: " + Arrays.toString(words));
    }
}`,
    "java"
  )
};
