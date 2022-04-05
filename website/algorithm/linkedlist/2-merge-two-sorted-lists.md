## Info

- Link: https://leetcode.com/problems/merge-two-sorted-lists/

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    /*
        Time: O(n) -> Visit each node once
        Space: O(1) -> 2 extra variables
    */
    
    var (
        newHead = new(ListNode)
        curr = newHead
    )
    
    for list1 != nil && list2 != nil {
        if list1.Val < list2.Val {
            next := list1.Next
            
            curr.Next = list1
            curr = curr.Next
            
            list1 = next
            
            continue
        }
        
        next := list2.Next

        curr.Next = list2
        curr = curr.Next

        list2 = next
    }
    
    for list1 != nil {
        next := list1.Next
        
        curr.Next = list1
        curr = curr.Next
        
        list1 = next
    }
    
    for list2 != nil {
        next := list2.Next
        
        curr.Next = list2
        curr = curr.Next
        
        list2 = next
    }

    return newHead.Next
}
```
