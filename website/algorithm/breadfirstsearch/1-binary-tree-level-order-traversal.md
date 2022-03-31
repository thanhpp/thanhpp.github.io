## Info

- Link: https://leetcode.com/problems/binary-tree-level-order-traversal/

## Solution

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
    /*
        Time: O(n) -> visit each node once
        Space: O(n) -> need a queue to stores the traverse order
    */
    
    if root == nil {
        return nil
    }
    
    var (
        queue []*TreeNode
        currLevelCount = 0
        nextLevelCount = 0
        result [][]int
        resultIdx int = 0
    )
    
    // push the first node
    queue = append(queue, root)
    currLevelCount++
    result = append(result, []int{})
    
    for len(queue) != 0 {
        // pop 
        node := queue[0]
        queue = queue[1:]
        
        // check if no node is left in this level
        if currLevelCount == 0 {
            // move to the next level
            result = append(result, []int{})
            resultIdx++
            currLevelCount = nextLevelCount
            nextLevelCount = 0
        }
        
        // append the result of this level
        result[resultIdx] = append(result[resultIdx], node.Val)
        currLevelCount--
        
        // push to queue & increase the number of next level node
        if node.Left != nil {
            queue = append(queue, node.Left)
            nextLevelCount++
        }
        
        if node.Right != nil {
            queue = append(queue, node.Right)
            nextLevelCount++
        }
    }
    
    return result
}
```
