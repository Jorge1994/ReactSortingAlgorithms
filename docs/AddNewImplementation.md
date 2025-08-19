# Adding New Programming Language Implementations

This guide explains how to add new programming language implementations to the Bubble Sort visualizer.

## Overview

The project uses a modular architecture that makes adding new languages straightforward. You only need to:
1. Add the implementation code
2. Import the Prism.js language support
3. Update the language mapping
4. Update the active languages list

## Step-by-Step Guide

### 1. Add Implementation Code

Open `src/data/bubbleSortImplementations.ts` and add your new language implementation:

```typescript
// Example: Adding C++ implementation
cpp: createAlgorithmImplementation(
  'C++',
  `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original array: ";
    for (int num : numbers) cout << num << " ";
    cout << endl;
    
    bubbleSort(numbers);
    
    cout << "Sorted array: ";
    for (int num : numbers) cout << num << " ";
    cout << endl;
    
    return 0;
}`,
  '.cpp'
),
```

### 2. Add Prism.js Language Support

In `src/components/CodeTabs.tsx`, import the Prism.js component for your language:

```typescript
// Add this import at the top
import 'prismjs/components/prism-cpp';
```

**Available Prism.js language components:**
- `prism-cpp` - C++
- `prism-csharp` - C#
- `prism-javascript` - JavaScript
- `prism-typescript` - TypeScript
- `prism-go` - Go
- `prism-rust` - Rust
- `prism-swift` - Swift
- `prism-kotlin` - Kotlin
- And many more...

### 3. Update Language Mapping

In the `getPrismLanguage` function, add your language mapping:

```typescript
const getPrismLanguage = (language: string): string => {
  switch (language.toLowerCase()) {
    case 'python':
      return 'python';
    case 'java':
      return 'java';
    case 'c++':
    case 'cpp':
      return 'cpp';        // <- Add this
    case 'javascript':
      return 'javascript';
    case 'c#':
    case 'csharp':
      return 'csharp';
    default:
      return 'text';
  }
};
```

### 4. Enable the Language

In `src/types/implementations.ts`, add your language to the active list:

```typescript
export function getActiveImplementations(implementations: AlgorithmImplementations): AlgorithmImplementation[] {
  // Add your new language key here
  const activeLanguages = ['python', 'java', 'cpp']; // <- Add 'cpp'
  
  return activeLanguages
    .filter(lang => implementations[lang])
    .map(lang => implementations[lang]);
}
```

## Complete Example: Adding JavaScript

Here's a complete example of adding JavaScript support:

### 1. Add to `bubbleSortImplementations.ts`:

```typescript
javascript: createAlgorithmImplementation(
  'JavaScript',
  `function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);

bubbleSort(numbers);
console.log('Sorted:', numbers);`,
  '.js'
),
```

### 2. Add to `CodeTabs.tsx` imports:

```typescript
import 'prismjs/components/prism-javascript';
```

### 3. Update language mapping:

```typescript
case 'javascript':
  return 'javascript';
```

### 4. Enable in active languages:

```typescript
const activeLanguages = ['python', 'java', 'javascript'];
```

## Best Practices

### Code Quality
- **Include comments** explaining the algorithm
- **Add time/space complexity** in comments
- **Provide example usage** with sample data
- **Follow language conventions** (naming, formatting)

### Implementation Guidelines
- **Use the same array**: `[64, 34, 25, 12, 22, 11, 90]`
- **Include optimization**: Early termination when no swaps occur
- **Add helpful comments** for educational purposes
- **Show both input and output** in examples

### Testing
1. **Check syntax highlighting** - Verify colors appear correctly
2. **Test tab switching** - Make sure the new tab works
3. **Verify code runs** - Ensure the implementation is correct
4. **Check responsiveness** - Test on different screen sizes

## Available Languages

You can add any language supported by Prism.js. Popular options include:

| Language | Prism Component | Key |
|----------|----------------|-----|
| C++ | `prism-cpp` | `cpp` |
| C# | `prism-csharp` | `csharp` |
| JavaScript | `prism-javascript` | `javascript` |
| TypeScript | `prism-typescript` | `typescript` |
| Go | `prism-go` | `go` |
| Rust | `prism-rust` | `rust` |
| Swift | `prism-swift` | `swift` |
| Kotlin | `prism-kotlin` | `kotlin` |
| PHP | `prism-php` | `php` |
| Ruby | `prism-ruby` | `ruby` |

## Troubleshooting

### Language not highlighting
- Check if you imported the correct Prism.js component
- Verify the language key in `getPrismLanguage` function
- Ensure the language is in the active list

### Tab not appearing
- Check if the language is added to `activeLanguages` array
- Verify the implementation exists in the data file

### Syntax errors
- Use TypeScript to catch errors early
- Test the implementation independently
- Check for proper string escaping in template literals

## File Structure

```
src/
├── data/
│   └── bubbleSortImplementations.ts    # Add implementations here
├── types/
│   └── implementations.ts              # Update active languages
├── components/
│   └── CodeTabs.tsx                    # Add Prism imports & mapping
└── docs/
    └── AddNewImplementation.md         # This guide
```

## Example Commit Message

When adding a new language, use a clear commit message:

```
feat: Add C++ implementation with syntax highlighting

- Add C++ bubble sort implementation
- Import prism-cpp for syntax highlighting  
- Update language mapping for C++
- Enable C++ in active languages list
```

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all imports are correct
3. Test with a simple implementation first
4. Refer to existing implementations as examples

The modular architecture makes this process straightforward once you understand the pattern!
