---
sidebar_position: 1
id: two-sum
title: [Easy] Two sum
tags:
  - HashMap
  - Array
---

# info
- Link: https://leetcode.com/problems/two-sum/
- Level: Easy
- Tags: Array, Hashmap

```go
func twoSum(nums []int, target int) []int {
    /*
        Time: O(n) - a single for loop, assume that add & get from the map is O(1)
        Space: O(n) - create a new map to stores values & indexes
    */
    
    var m = make(map[int]int) // value - index
    for i := range nums {
        idx, ok := m[target-nums[i]] // check if the target - current elem is existed in the map
        if ok {
            return []int{idx, i}
        }
        
        m[nums[i]] = i // add the current elem to the map
    }
    return nil
}
```

```rust
use std::collections::{HashMap};

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        /*
        Time: O(n) - a single for loop, assume that add & get from the map is O(1)
        Space: O(n) - create a new map to stores values & indexes
        */
        
        // m: Hashmap<i32, i32>
        let mut m = HashMap::new();
        
        for i in 0..nums.len() {
            // the hashmap get function takes a ref and returns a ref
            match m.get(&(target - nums[i])) {          
                Some(&v) => return vec!(v, i as i32),  
                None => {
                    m.insert(nums[i], i as i32);
                    continue;
                }
            }
        }
        
        // an empty vec is returned if no solution exist
        return Vec::new();
    }
}
```