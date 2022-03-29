---
id: valid-parentheses
title: "[EASY] Valid Parentheses"
sidebar_position: 1
tags:
    - String
    - Stack
---

## Info

- Leetcode: https://leetcode.com/problems/valid-parentheses/
- Level: Easy
- Tags: String, Stack

## Solution 

```go
func isValid(s string) bool {
    var stack = make([]byte,0 , len(s))
    for i := range s {
        switch s[i] {
            case '(':
            stack = append(stack, '(')
            case '{':
            stack = append(stack, '{')
            case '[':
            stack = append(stack, '[')
            case ')':
            if !check(&stack, '(') {
                return false
            }
            case '}':
            if !check(&stack, '{') {
                return false
            }
            case ']':
            if !check(&stack, '[') {
                return false
            }
        }
    }
    
    return len(stack) == 0
}

func check(stack *[]byte, p byte) bool {
    if len(*stack) == 0 || (*stack)[len(*stack) - 1] != p {
        return false
    }
    *stack = (*stack)[:len(*stack)-1]
    return true
}
```

```rust
pub fn is_valid(s: String) -> bool {
    /*
    Time: O(n) => loop through all of the characters
    Space: O(n) => 1 stack size s
    */

    let mut stack: Vec<char> = Vec::new();
    for c in s.chars() {
        match c {
            '(' => stack.push(c),
            '{' => stack.push(c),
            '[' => stack.push(c),
            ')' => {
                let val = stack.pop();
                match val {
                    Some(v) => {
                        if v != '(' {
                            return false;
                        }
                    }
                    None => return false,
                }
            }
            '}' => {
                let val = stack.pop();
                match val {
                    Some(v) => {
                        if v != '{' {
                            return false;
                        }
                    }
                    None => return false,
                }
            }
            ']' => {
                let val = stack.pop();
                match val {
                    Some(v) => {
                        if v != '[' {
                            return false;
                        }
                    }
                    None => return false,
                }
            }
            _ => return false,
        }
    }

    return stack.len() == 0;
}
```