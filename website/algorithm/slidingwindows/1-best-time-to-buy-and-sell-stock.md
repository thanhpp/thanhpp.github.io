---
id: best-time-to-buy-and-sell-stock-sliding-windows
title: "[EASY] Best time to buy and sell stock"
sidebar_position: 1
tags:
    - Array
    - Sliding Windows
---

## Info

- https://leetcode.com/problems/best-time-to-buy-and-sell-stock

## Solution

```go
func maxProfit(prices []int) int {
    /*
        Time: O(n) - the right pointer visit each element once
        Space: O(1) - 3 extra variables
    */
    
    // need at least 2 days to buy & sell
    if len(prices) < 2 {
        return 0
    }
    
    var (
        l, r = 0, 1
        maxP = 0
    )
    
    for r < len(prices) {
        if tmp := prices[r] - prices[l]; tmp > maxP {
            maxP = tmp
        }
        
        // check if we can buy at a lower price
        if prices[r] < prices[l] {
            l = r
            r = r+1 // the sell day should be at least 1 day after
            continue
        }
        
        // try the next day
        r += 1
    }
    
    return maxP
}
```