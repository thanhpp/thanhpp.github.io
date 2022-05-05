---
id: min-stack
title: "[EASY] Min Stack"
sidebar_position: 2
tags:
    - Stack
---

## Info

- Leetcode: https://leetcode.com/problems/min-stack/
- Level: Easy
- Tags: Stack

## Solution 

```go
/*
    Space: O(2n) - 2 arrays
    Time: O(1) for all operations
    The stack order can not be changed in the middle so the
    min value of each node is not updated after pushes
*/

type MinStack struct {
    stack  []int
    minVal []int
}


func Constructor() MinStack {
    return MinStack{
    }
}

func (this *MinStack) Push(val int)  {
    this.stack = append(this.stack, val)
    
    if len(this.minVal) == 0 || this.minVal[len(this.minVal) - 1] > val {
        this.minVal = append(this.minVal, val)
        return
    }
    
    this.minVal = append(this.minVal, this.minVal[len(this.minVal) - 1])
}


func (this *MinStack) Pop()  {
    if len(this.stack) == 0 {
        return
    }
    
    this.stack = this.stack[:len(this.stack) - 1]
    this.minVal = this.minVal[:len(this.minVal) - 1]
}


func (this *MinStack) Top() int {
    if len(this.stack) == 0 {
        return -1
    }
    
    return this.stack[len(this.stack)-1]
}


func (this *MinStack) GetMin() int {
    if len(this.minVal) == 0 {
        return -1
    }    
   
    return this.minVal[len(this.minVal) - 1]
}


/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(val);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
```