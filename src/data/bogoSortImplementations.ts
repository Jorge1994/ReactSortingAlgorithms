import {
  createAlgorithmImplementation,
  type AlgorithmImplementations,
} from "../types/implementations";

export const bogoSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    "Python",
    `import random
def is_sorted(a):
    return all(a[i] <= a[i+1] for i in range(len(a)-1))

def bogo_sort(a):
    while not is_sorted(a):
        random.shuffle(a)
    return a

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bogo_sort(numbers.copy())
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`,
    ".py"
  ),

  java: createAlgorithmImplementation(
    "Java",
    `import java.util.Random;
import java.util.Arrays;

public class BogoSort {
  private static boolean isSorted(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) return false;
    }
    return true;
  }

  private static void shuffle(int[] arr) {
    Random rnd = new Random();
    for (int i = arr.length - 1; i > 0; i--) {
      int j = rnd.nextInt(i + 1);
      int tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }

  public static void bogoSort(int[] arr) {
    while (!isSorted(arr)) {
      shuffle(arr);
    }
  }

  public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(numbers);
        
        bogoSort(numbers);
        
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
}
`,
    ".java"
  ),

  javascript: createAlgorithmImplementation(
    "JavaScript",
    `function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function bogoSort(arr) {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = bogoSort([...numbers]);
console.log(\`Original: [\${numbers.join(', ')}]\`);
console.log(\`Sorted: [\${sortedNumbers.join(', ')}]\`);`,
    ".js"
  ),
};
