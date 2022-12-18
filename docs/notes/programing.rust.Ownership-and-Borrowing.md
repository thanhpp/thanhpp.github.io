---
id: fo825y6yvodbes7udn8hv43
title: Ownership-and-Borrowing
desc: ''
updated: 1671364199622
created: 1671363315924
---
# Ownership and Borrowing

> https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html
> https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html

## Ownership

- Ownership is a set of rules that govern how Rust program **manage memory**.
- Rust language checks these rules during compile time. If any of the rules are violated, the program won't compile. (Not affecting run-time)
- Rules
    - Each value in Rust has an owner
    - There can only be 1 owner at a time
    - When the owner goes out of scope, the value will be dropped.

## References and Borrowing

- **A reference is like a pointer** in that it's an address we can follow to access the data stored at that address.
- 2 types of Rust references
    - immutable reference: `&T`
    - mutable reference: `&mut T` -> can modify the data
- Data race
    - **2 or more pointers** access the same data at the same time
    - At least one of the pointers is being used to **write to the data**
    - There's no mechanism being used to **synchronize** access to the data.  
- Dangling pointer: a pointer that references a location in memory that may have been **given to someone else**. 
    - The Rust compiler guarantees: if you have a reference to some data, the compiler will ensure that the data will not go out of scope before the reference to the data does.
- The rules of References
    - At any given time, you can have either **one mutable** reference or **any number of immutable** references
    - References must **always be valid**