---
id: valid-anagram
title: "[EASY] Valid Anagram"
tags:
    - Array
    - HashTable
---

## Info
- Link: https://leetcode.com/problems/valid-anagram/
- Level: Easy
- Tags: String, HashTable

## Solution
```go
func isAnagram(s string, t string) bool {
    /*
        Time: O(n) | O(2n) => 2 loop & map add & get are O(1)
        Space: O(n) => 1 extra map, the number of keys <= len(s)
    */
    
    if len(s) != len(t) {
        return false
    }
    
    charMap := make(map[byte]int)
    
    for i := 0; i < len(s); i++ {
        if _, ok := charMap[s[i]]; ok {
            charMap[s[i]]++
            continue
        }
        charMap[s[i]] = 1
    }
    
    for i := 0; i < len(t); i++ {
        if _, ok := charMap[t[i]]; ok {
            charMap[t[i]]--
            if charMap[t[i]] < 0 {
                return false
            }
            continue
        }
        return false
    }
    
    return true
}
```
