import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const timSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def min_run_length(n):
    """Compute a good value for minimum run length.
    If n < 32, return n (no slicing).
    Otherwise, return an int k, 32 <= k <= 64, such that
    n/k is close to, but strictly less than, an exact power of 2.
    """
    r = 0
    while n >= 32:
        r |= n & 1
        n >>= 1
    return n + r

def insertion_sort(arr, left, right):
    """Sort arr[left:right+1] using insertion sort."""
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, left, mid, right):
    """Merge sorted subarrays arr[left:mid+1] and arr[mid+1:right+1]."""
    # Create temp arrays for the two subarrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    # Merge the temp arrays back into arr[left:right+1]
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        k += 1
        i += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        k += 1
        j += 1

def tim_sort(arr):
    """Simplified Tim Sort implementation."""
    n = len(arr)
    min_run = min_run_length(n)
    
    # Sort individual subarrays of size min_run
    for start in range(0, n, min_run):
        end = min(start + min_run - 1, n - 1)
        insertion_sort(arr, start, end)
    
    # Start merging from size min_run
    size = min_run
    while size < n:
        # Pick starting point of left sub array
        for start in range(0, n, size * 2):
            # Calculate mid point and end point
            mid = start + size - 1
            end = min(start + size * 2 - 1, n - 1)
            
            # Merge subarrays if mid is smaller than end
            if mid < end:
                merge(arr, start, mid, end)
        
        size *= 2
    
    return arr

# Example usage
if __name__ == "__main__":
    test_array = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30]
    print("Original array:", test_array)
    
    sorted_array = tim_sort(test_array.copy())
    print("Sorted array:", sorted_array)`,
    "py"
  ),
  
  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Arrays;

public class TimSort {
    private static final int MIN_MERGE = 32;
    
    public static int minRunLength(int n) {
        // Calculate minimum run length
        int r = 0;
        while (n >= MIN_MERGE) {
            r |= (n & 1);
            n >>= 1;
        }
        return n + r;
    }
    
    public static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i - 1;
            
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }
    
    public static void merge(int[] arr, int left, int mid, int right) {
        // Create temporary arrays
        int len1 = mid - left + 1;
        int len2 = right - mid;
        
        int[] leftArr = new int[len1];
        int[] rightArr = new int[len2];
        
        // Copy data to temporary arrays
        System.arraycopy(arr, left, leftArr, 0, len1);
        System.arraycopy(arr, mid + 1, rightArr, 0, len2);
        
        // Merge the temporary arrays
        int i = 0, j = 0, k = left;
        
        while (i < len1 && j < len2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < len1) {
            arr[k] = leftArr[i];
            k++;
            i++;
        }
        
        while (j < len2) {
            arr[k] = rightArr[j];
            k++;
            j++;
        }
    }
    
    public static void timSort(int[] arr) {
        int n = arr.length;
        int minRun = minRunLength(n);
        
        // Sort individual subarrays of size minRun
        for (int i = 0; i < n; i += minRun) {
            int right = Math.min(i + minRun - 1, n - 1);
            insertionSort(arr, i, right);
        }
        
        // Start merging from size minRun
        for (int size = minRun; size < n; size = 2 * size) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min(left + 2 * size - 1, n - 1);
                
                if (mid < right) {
                    merge(arr, left, mid, right);
                }
            }
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] testArray = {64, 34, 25, 12, 22, 11, 90, 5, 77, 30};
        
        System.out.println("Original array: " + Arrays.toString(testArray));
        timSort(testArray);
        System.out.println("Sorted array: " + Arrays.toString(testArray));
    }
}`,
    "java"
  )
};
