---
id: 2-valid-palindrome
title: "[EASY] Valid Palindrome"
sidebar_position: 2
tags:
    - String
    - Two Pointers
---

## Info
- https://leetcode.com/problems/valid-palindrome/

```go
func isPalindrome(s string) bool {
    /*
        Time: O(n) -> convert loop
        Space: O(n) -> 1 extra variable to stores the converted string
    */
    
    // convert
    s = strings.ToLower(s)
    
    var newSB = new(strings.Builder)
    
    for i := range s { // O(n)
        if s[i] >= 'a' && s[i] <= 'z' ||
            s[i] >= '0' && s[i] <= '9' {
            newSB.WriteByte(s[i])
        }
    }
    
    var newS = newSB.String()
    
    // check
    var (
        l = 0
        h = len(newS) - 1
    )
    
    for l < h { // O(n/2)
        if newS[l] != newS[h] {
            return false
        }
        
        l++
        h--
    }
    
    return true
}
```
