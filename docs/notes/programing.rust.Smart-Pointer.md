---
id: xpd7irdmeinvljufhfbgq6a
title: Smart-Pointer
desc: ''
updated: 1668621128714
created: 1668620581077
---
# Smart Pointer

> https://doc.rust-lang.org/book/ch15-00-smart-pointers.html

## Definition

- **Pointer:** A variable that contains an address in memory
- **Smart pointer**: A data structure 
    - Act like a pointer
    - Has metadata & other capabilities
    - Can own the data that it points to (references don't own the data)

## Implementation

- Using traits:
    - `Deref`: behave like a reference
    - `Drop`: custom code that run when an instance is 

## Famous smart pointers

- `Box<T>`: allocation value on the heap
- `Rc<T>`: a reference couting -> enable multiple ownership
- `Ref<T>` & `RefMut<T>`, accessed through `RefCell<T>`, a type that **enforce the borrowing rules at runtime instead of compile time**
