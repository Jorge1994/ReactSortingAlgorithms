import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const bucketSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def bucket_sort(arr):
    """
    Sorts an array using bucket sort algorithm.
    
    Time Complexity: O(n + k) average, O(n²) worst case
    Space Complexity: O(n + k)
    """
    if len(arr) <= 1:
        return arr
    
    # Calculate number of buckets (adaptive formula)
    def calculate_buckets(size):
        if size <= 10:
            return max(2, size // 2)
        elif size <= 25:
            return size // 3
        elif size <= 50:
            return int(size ** 0.5)
        else:
            return min(10, int(size ** 0.5))
    
    num_buckets = calculate_buckets(len(arr))
    
    # Find min and max for range calculation
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val
    
    # Create empty buckets
    buckets = [[] for _ in range(num_buckets)]
    
    # Distribute elements into buckets
    for num in arr:
        if range_val == 0:
            bucket_index = 0  # All elements are the same
        else:
            bucket_index = int((num - min_val) / range_val * (num_buckets - 1))
            bucket_index = min(bucket_index, num_buckets - 1)
        buckets[bucket_index].append(num)
    
    # Sort individual buckets using insertion sort
    for bucket in buckets:
        insertion_sort(bucket)
    
    # Concatenate sorted buckets
    sorted_array = []
    for bucket in buckets:
        sorted_array.extend(bucket)
    
    return sorted_array

def insertion_sort(arr):
    """Helper function: Insertion sort for individual buckets"""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bucket_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    "py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.*;

public class BucketSort {
    
    /**
     * Generic bucket sort implementation for Double values
     * @param arr Array of Double values to sort
     * @return Sorted array
     */
    public static List<Double> bucketSort(List<Double> arr) {
        if (arr.size() <= 1) {
            return new ArrayList<>(arr);
        }
        
        // Calculate number of buckets
        int numBuckets = calculateOptimalBuckets(arr.size());
        
        // Find min and max values
        double minVal = Collections.min(arr);
        double maxVal = Collections.max(arr);
        double range = maxVal - minVal;
        
        // Create buckets
        List<List<Double>> buckets = new ArrayList<>();
        for (int i = 0; i < numBuckets; i++) {
            buckets.add(new ArrayList<>());
        }
        
        // Distribute elements into buckets
        for (Double num : arr) {
            int bucketIndex;
            if (range == 0) {
                bucketIndex = 0;
            } else {
                bucketIndex = (int) ((num - minVal) / range * (numBuckets - 1));
                bucketIndex = Math.min(bucketIndex, numBuckets - 1);
            }
            buckets.get(bucketIndex).add(num);
        }
        
        // Sort individual buckets
        for (List<Double> bucket : buckets) {
            Collections.sort(bucket);
        }
        
        // Concatenate sorted buckets
        List<Double> result = new ArrayList<>();
        for (List<Double> bucket : buckets) {
            result.addAll(bucket);
        }
        
        return result;
    }
    
    private static int calculateOptimalBuckets(int size) {
        if (size <= 10) return Math.max(2, size / 2);
        if (size <= 25) return size / 3;
        if (size <= 50) return (int) Math.sqrt(size);
        return Math.min(10, (int) Math.sqrt(size));
    }
    
    public static void main(String[] args) {
        List<Double> numbers = Arrays.asList(
            64.5, 34.2, 25.8, 12.1, 22.9, 11.3, 90.7, 5.4
        );
        
        System.out.println("Original: " + numbers);
        List<Double> sorted = bucketSort(numbers);
        System.out.println("Sorted: " + sorted);
        
        // Verify sorting
        boolean isSorted = true;
        for (int i = 1; i < sorted.size(); i++) {
            if (sorted.get(i - 1) > sorted.get(i)) {
                isSorted = false;
                break;
            }
        }
        System.out.println("Is sorted: " + isSorted);
    }
}`,
    "java"
  )
};
