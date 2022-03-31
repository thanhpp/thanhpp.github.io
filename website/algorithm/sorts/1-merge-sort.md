```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println(MergeSort([]int{2, 1}))
}

func MergeSort(arr []int) []int {
	if len(arr) < 2 {
		return arr
	}

	middle := len(arr) / 2
	left := MergeSort(arr[0:middle])
	right := MergeSort(arr[middle:len(arr)])

	return merge(left, right)
}

func merge(left, right []int) []int {
	var (
		i, j   = 0, 0
		result = make([]int, 0, len(left)+len(right))
	)

	for i < len(left) && j < len(right) {
		if left[i] < right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	for ; i < len(left); i++ {
		result = append(result, left[i])
	}

	for ; j < len(right); j++ {
		result = append(result, right[j])
	}

	return result
}

```

```rust
fn main() {
    assert_eq!(merge_sort(&vec![1, 2, 3]), vec![1, 2, 3]);
    assert_eq!(merge_sort(&vec![3, 2, 1]), vec![1, 2, 3]);
    assert_eq!(merge_sort(&vec![1]), vec![1]);
}

fn merge_sort(v: &Vec<i32>) -> Vec<i32> {
    if v.len() < 2 {
        return v.to_vec();
    }

    let middle = v.len() / 2;

    let left = merge_sort(&v[0..middle].to_vec());
    let right = merge_sort(&v[middle..v.len()].to_vec());

    merge(&left, &right)
}

fn merge(left: &Vec<i32>, right: &Vec<i32>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new();
    let mut i = 0;
    let mut j = 0;

    while i < left.len() && j < right.len() {
        if left[i] < right[j] {
            result.push(left[i]);
            i += 1;
            continue;
        }

        result.push(right[j]);
        j += 1;
    }

    while i < left.len() {
        result.push(left[i]);
        i += 1;
    }

    while j < right.len() {
        result.push(right[j]);
        j += 1;
    }

    result
}

```
