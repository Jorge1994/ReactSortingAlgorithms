import { createAlgorithmImplementation } from "../types/implementations";

export const gnomeSortImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `def gnome_sort(arr):
    i = 1
    n = len(arr)

    while i < n:
        if arr[i - 1] <= arr[i]:
            i += 1
        else:
            arr[i - 1], arr[i] = arr[i], arr[i - 1]
            if i > 1:
                i -= 1
            else:
                i += 1

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = gnome_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `public class GnomeSort {

    public static void gnomeSort(int[] arr) {
        int i = 1;
        int n = arr.length;

        while (i < n) {
            if (arr[i - 1] <= arr[i]) {
                i++;
            } else {
                swap(arr, i - 1, i);
                if (i > 1) i--;
                else i++;
            }
        }
    }

    private static void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        gnomeSort(numbers);
        
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
    `function gnomeSort(arr) {
    let i = 1;
    const n = arr.length;
    
    while (i < n) {
        if (arr[i - 1] <= arr[i]) {
            i++;
        } else {
            [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
            if (i > 1) {
                i--;
            } else {
                i++;
            }
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = gnomeSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
