## Info

- Link: https://leetcode.com/problems/reverse-linked-list/

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
    /*
    	Time: O(n) -> visit each ListNode once
    	Space: O(1) -> 1 newHead variable
    */
    
    if head == nil {
        return nil
    }
    
    var (
        newHead = new(ListNode)
        curr = head
    )
    
    for curr != nil {
        next := curr.Next
        
        curr.Next = newHead.Next
        newHead.Next = curr
        
        curr = next
    }
    
    return newHead.Next
}
```
