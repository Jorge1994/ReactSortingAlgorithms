// Simple merge sort test
function simpleMergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  console.log(`Splitting [${arr.join(',')}] into [${left.join(',')}] and [${right.join(',')}]`);
  
  const sortedLeft = simpleMergeSort(left);
  const sortedRight = simpleMergeSort(right);
  
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  console.log(`Merging [${left.join(',')}] with [${right.join(',')}]`);
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  result.push(...left.slice(i));
  result.push(...right.slice(j));
  
  console.log(`Result: [${result.join(',')}]`);
  return result;
}

// Test
const testArray = [64, 34, 25, 12];
console.log('Testing with:', testArray);
const sorted = simpleMergeSort([...testArray]);
console.log('Final result:', sorted);
console.log('Is correct?', JSON.stringify(sorted) === JSON.stringify([...testArray].sort((a,b) => a-b)));
