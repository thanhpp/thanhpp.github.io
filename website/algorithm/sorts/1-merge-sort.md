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