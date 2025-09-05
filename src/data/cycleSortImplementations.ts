import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const cycleSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def cycle_sort(arr):
    """In-place Cycle Sort: returns the sorted array and minimizes memory writes."""
    n = len(arr)
    writes = 0
    for cycle_start in range(0, n - 1):
        item = arr[cycle_start]

        # Find position where we put the item
        pos = cycle_start
        for i in range(cycle_start + 1, n):
            if arr[i] < item:
                pos += 1

        # If item is already in correct position
        if pos == cycle_start:
            continue

        # Skip duplicates
        while item == arr[pos]:
            pos += 1

        # Put the item to its right position
        if pos != cycle_start:
            arr[pos], item = item, arr[pos]
            writes += 1

        # Rotate rest of the cycle
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            if item != arr[pos]:
                arr[pos], item = item, arr[pos]
                writes += 1

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = cycle_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class CycleSort {
    // In-place Cycle Sort implementation
    public static void cycleSort(int[] arr) {
        int n = arr.length;
        int writes = 0;

        for (int cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
            int item = arr[cycle_start];

            int pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++) {
                if (arr[i] < item) pos++;
            }

            if (pos == cycle_start) continue;

            while (item == arr[pos]) pos++;

            if (pos != cycle_start) {
                int temp = item;
                item = arr[pos];
                arr[pos] = temp;
                writes++;
            }

            while (pos != cycle_start) {
                pos = cycle_start;
                for (int i = cycle_start + 1; i < n; i++) {
                    if (arr[i] < item) pos++;
                }
                while (item == arr[pos]) pos++;
                if (item != arr[pos]) {
                    int temp = item;
                    item = arr[pos];
                    arr[pos] = temp;
                    writes++;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        cycleSort(numbers);
        
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
    `function cycleSort(arr) {
    // In-place Cycle Sort: minimizes memory writes
    const n = arr.length;
    let writes = 0;
    
    for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
        let item = arr[cycleStart];
        
        // Find position where we put the item
        let pos = cycleStart;
        for (let i = cycleStart + 1; i < n; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }
        
        // If item is already in correct position
        if (pos === cycleStart) {
            continue;
        }
        
        // Skip duplicates
        while (item === arr[pos]) {
            pos++;
        }
        
        // Put the item to its right position
        if (pos !== cycleStart) {
            [arr[pos], item] = [item, arr[pos]];
            writes++;
        }
        
        // Rotate rest of the cycle
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }
            while (item === arr[pos]) {
                pos++;
            }
            if (item !== arr[pos]) {
                [arr[pos], item] = [item, arr[pos]];
                writes++;
            }
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = cycleSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
