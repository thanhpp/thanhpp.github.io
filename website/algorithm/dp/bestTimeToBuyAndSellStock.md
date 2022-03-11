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
