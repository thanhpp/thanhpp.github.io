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

```rust
pub fn is_anagram(s: String, t: String) -> bool {
    /*
        Time: O(n) | O(2n) => 2 loop & map add & get are O(1)
        Space: O(n) => 1 extra map, the number of keys <= len(s)
    */
    
    if s.len() != t.len() {
        return false;
    }

    let mut m: std::collections::HashMap<char, i32> = std::collections::HashMap::new();

    for c in s.chars() {
        let counter = m.entry(c).or_insert(0);
        *counter += 1;
    }

    for c in t.chars() {
        if !m.contains_key(&c) {
            return false;
        }
        let counter = m.get_mut(&c).unwrap();
        *counter -= 1;
    }

    for (k, v) in &m {
        print!("{} {}", k, v)
    }

    for elem in m.iter() {
        if !elem.1 != 0 {
            return false;
        }
    }

    return true;
}
```
