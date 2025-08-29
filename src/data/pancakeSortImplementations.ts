import { createAlgorithmImplementation, type AlgorithmImplementations } from '../types/implementations';

export const pancakeSortImplementations: AlgorithmImplementations = {
  python: createAlgorithmImplementation(
    'Python',
    `def flip(arr, i):
    start = 0
    while start < i:
        arr[start], arr[i] = arr[i], arr[start]
        start += 1
        i -= 1

def find_max(arr, n):
    mi = 0
    for i in range(n):
        if arr[i] > arr[mi]:
            mi = i
    return mi

def pancake_sort(arr):
    n = len(arr)
    for curr_size in range(n, 1, -1):
        mi = find_max(arr, curr_size)
        if mi != curr_size - 1:
            flip(arr, mi)
            flip(arr, curr_size - 1)

if __name__ == '__main__':
    nums = [3, 6, 1, 5, 2, 4]
    print('Original:', nums)
    pancake_sort(nums)
    print('Sorted:  ', nums)
`,
    '.py'
  ),

  java: createAlgorithmImplementation(
    'Java',
    `public class PancakeSort {
    static void flip(int[] arr, int i) {
        int start = 0;
        while (start < i) {
            int temp = arr[start];
            arr[start] = arr[i];
            arr[i] = temp;
            start++;
            i--;
        }
    }

    static int findMax(int[] arr, int n) {
        int mi = 0;
        for (int i = 0; i < n; i++)
            if (arr[i] > arr[mi]) mi = i;
        return mi;
    }

    static void pancakeSort(int[] arr) {
        int n = arr.length;
        for (int curr_size = n; curr_size > 1; --curr_size) {
            int mi = findMax(arr, curr_size);
            if (mi != curr_size - 1) {
                flip(arr, mi);
                flip(arr, curr_size - 1);
            }
        }
    }

    // Runnable example
    public static void main(String[] args) {
        int[] nums = {3, 6, 1, 5, 2, 4};
        System.out.print("Original: ");
        for (int v : nums) System.out.print(v + " ");
        System.out.println();

        pancakeSort(nums);

        System.out.print("Sorted:   ");
        for (int v : nums) System.out.print(v + " ");
        System.out.println();
    }
}
`,
    '.java'
  )
};
