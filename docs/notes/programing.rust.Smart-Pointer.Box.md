---
id: 5irsjg77tl67tytvpuvff8b
title: Box
desc: ''
updated: 1668800580443
created: 1668796776558
---
# Box <T> -  Point to data on the Heap

> https://doc.rust-lang.org/book/ch15-01-box.html

## Definition & Use cases

- Definition: allow user to store data on the heap instead of the stack
    - no overhead performance
    - doesn't have many extra capabilitites
- Usecases
    - type's size can't be known at `compile time`, use want to use a value of that type in a context that requires the exact size
    - transfer ownership without copying
    - own a value that implements **a particular trait** instead of a specific type

## Traits

- `Box<T>` implements
    - Deref: treated like a reference
    - Drop: clean up 

## Recursive type

- A type that can have another value of the **same type** as **part of itself**.
    - problem: the compiler needs to know how much space a type takes up
    - solution: using box (boxes have a known size)

### The cons list
- The cons list (cons = construct function)
- Example: `(1, (2, (3, Nil)))`
    - 1 pair: value + next pair  
- Computing the Size of a **Non-Recursive Type**
    - Space of a value = largest variants
- `Box<T>` is a pointer
    - Has a fixed space (only the pointer is located on the Stack)
    - ```rust
        // example of using Box to create a recursive type 
        enum List {
            Cons(i32, Box<List>),
            Nil,
        }

        use crate::List::{Cons, Nil};

        fn main() {
            let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
        }
      ```