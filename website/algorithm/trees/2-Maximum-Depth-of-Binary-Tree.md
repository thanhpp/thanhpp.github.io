---
id: maximum-depth-of-binary-tree
title: "[EASY] Maximum Depth of Binary Tree"
sidebar_position: 1
tags:
    - Tree
    - Depth-First Search
---

## Info

- Leetcode: https://leetcode.com/problems/maximum-depth-of-binary-tree/
- Level: Easy
- Tags: Tree, Depth-First Search

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
func maxDepth(root *TreeNode) int {
    /*
        Time: O(n) visit every node once
        Space: O(1) 1 extra variable
        Recursive to preserve the currLevel value
    */
    max := 0
    
    visit(root, 0, &max)
    
    return max
}

func visit(node *TreeNode, currLevel int, max *int) {
    if node == nil {
        return
    }
    
    currLevel++
    
    if *max < currLevel {
        *max = currLevel
    }
    
    visit(node.Left, currLevel, max)
    visit(node.Right, currLevel, max)
}
```