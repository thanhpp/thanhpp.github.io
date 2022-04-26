---
id: maximum-subarray
title: "[EASY] Maximum subarray"
sidebar_position: 2
tags:
    - Array
    - Dynamic Programming
---

## Info 

- Link: https://leetcode.com/problems/maximum-subarray/

## Solution

```rust
pub fn max_sub_array(nums: Vec<i32>) -> i32 {
    /*
        Time: O(n) -> 1 loop
        Space: O(1) -> 2 extra variables
    */
    
    let mut dp = nums[0];
    let mut max = nums[0];

    for i in 1..nums.len() {
        if nums[i] > dp + nums[i] {
            dp = nums[i]
        } else {
            dp = dp + nums[i]
        }

        if max < dp {
            max = dp
        }
    }

    max
}
```