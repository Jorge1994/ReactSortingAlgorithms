// Debug script to test merge sort step by step
// Run this in browser console to debug the merge sort

function debugMergeSort() {
  // Import the merge sort algorithm
  // This would need to be adapted to run in browser
  console.log('Testing merge sort with simple array...');
  
  const testArray = [3, 1, 4, 2];
  console.log('Original array:', testArray);
  
  // Simulate the merge sort steps manually
  console.log('\n=== Expected merge sort behavior ===');
  console.log('1. Split [3,1,4,2] into [3,1] and [4,2]');
  console.log('2. Split [3,1] into [3] and [1]');
  console.log('3. Merge [3] and [1] → [1,3]');
  console.log('4. Split [4,2] into [4] and [2]');
  console.log('5. Merge [4] and [2] → [2,4]');
  console.log('6. Merge [1,3] and [2,4] → [1,2,3,4]');
  
  // Test if array values are preserved
  const originalValues = testArray.slice().sort((a, b) => a - b);
  console.log('\nOriginal values sorted:', originalValues);
  console.log('All unique values:', [...new Set(testArray)].sort((a, b) => a - b));
}

// Test with duplicate values
function testDuplicates() {
  console.log('\n=== Testing with duplicates ===');
  const testArray = [3, 1, 3, 2];
  console.log('Array with duplicates:', testArray);
  console.log('Expected result:', testArray.slice().sort((a, b) => a - b));
}

debugMergeSort();
testDuplicates();
