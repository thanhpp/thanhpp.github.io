---
id: two-sum-ii-input-array-is-sorted
title: "[Medium] Two Sum II - Input Array Is Sorted"
sidebar_position: 1
tags:
    - Array
    - Two Pointers
---

## Info
- https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

```go
func twoSum(numbers []int, target int) []int {
    /* 
      Time: O(n) -> visit each element once
      Space: O(1) -> 3 extra variables
    */
    
    var (
        l = 0
        h = len(numbers) - 1
    )
    
    for l < h {
        tmp := numbers[l] + numbers[h]
        if  tmp == target {
            return []int{l+1, h+1}
        }
        
        if tmp > target {
            h--
            continue
        }
        l++
    }
    
    return nil
}
```
