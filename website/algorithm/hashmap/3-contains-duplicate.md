---
id: contains-duplicate
title: "[EASY] Contains Duplicate"
sidebar_position: 3
tags:
    - Array
    - HashTable
---

## Information
- Link: https://leetcode.com/problems/contains-duplicate/
- Level: Easy
- Tags: Array, Hash Table

## Solution
```go
func containsDuplicate(nums []int) bool {
    /*
        Time: O(n) - map add & get are O(1), 1 for loop
        Space: O(n) - 1 extra map size n
    */
    
    // struct{} costs no extra memory
    var m = make(map[int]struct{})
    
    for i := range nums {
        if _, ok := m[nums[i]]; ok {
            return true
        }
        m[nums[i]] = struct{}{}
    }
    
    return false
}
```

```rust
impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        /*
            Time: O(n) - map add & get are O(1), 1 for loop
            Space: O(n) - 1 extra map size n
        */
        
        // HashSet costs less memory than HashMap
        let mut m = std::collections::HashSet::new();
        
        for elem in nums {
            // contains check
            if m.contains(&elem) {
                return true
            }
            m.insert(elem);
        }
        
        return false
    }
}
```