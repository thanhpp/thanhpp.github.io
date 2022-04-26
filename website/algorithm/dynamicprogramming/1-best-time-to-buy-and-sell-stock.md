---
id: best-time-to-buy-and-sell-stock
title: "[EASY] Best time to buy and sell stock"
sidebar_position: 1
tags:
    - Array
    - Dynamic Programming
---

## Info

- Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

## Solution

```go
func maxProfit(prices []int) int {
    /*
        Time: O(n) => 1 for loop to go through all of the prices
        Space: O(1) => 2 extra variables to store the lowestPrice & the highestProfit
    */
    
    var (
        lowestPrice     int =   prices[0] // the prices is guarenteed with length >= 1
        highestProfit   int =   0
    )
    
    // dp[i] = max(dp[i - 1], prices[i] - lowestPrice)
    for i := 1; i < len(prices); i++ {
        profit := prices[i] - lowestPrice
        if highestProfit < profit {
            highestProfit = profit
        }
        if prices[i] < lowestPrice {
            lowestPrice = prices[i]
        }
    }
    
    return highestProfit
}
```

```rust
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut lowestPrice = prices[0];
        let mut highestProfit = 0;
        
        for i in 1..prices.len() {
            let profit = prices[i] - lowestPrice;
            if profit >  highestProfit {
                highestProfit = profit
            } 
            
            if prices[i] < lowestPrice {
                lowestPrice = prices[i]
            }
            
        }
        
        return highestProfit
    }
}
```
