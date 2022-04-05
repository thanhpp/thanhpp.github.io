## Info

- Link: https://leetcode.com/problems/binary-search/

```go
func search(nums []int, target int) int {
    /*
        Time: O(log2(n)) -> reduce the search size by 2 each iteration
        Space: O(1) -> 2 extra variables
    */
    
    if len(nums) == 1 {
        if nums[0] == target {
            return 0
        }
        return -1
    }
    
    var (
        l = 0
        h = len(nums) - 1
    )
    
    for l <= h {
        m := l + (h - l) / 2
        if nums[m] == target {
            return m
        }
        
        if nums[m] < target {
            l = m + 1
            continue
        }
        
        h = m - 1
    }
    
    return -1
}
```
