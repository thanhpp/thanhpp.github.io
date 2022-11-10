---
id: 3gkgsu91j38lgc8300cqfxk
title: Closures
desc: ''
updated: 1668002934780
created: 1667989119566
---

# Closures

> https://doc.rust-lang.org/book/ch13-01-closures.html

## Definition

- Anonymous functions that can be save in a variable or pass as arguments to other functions.
- Can capture value from the scope that they are defined

## Capturing the environment

- Capture values from the environment they're defined in for **later use**.
- the [unwrap_or_else](https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or_else) method
    - input: 1 closure without any arguments that returns a value `T`

## Inference & annotation

- closures vs functions
    - clousures: 
        - don't usually require you to annotate the types
        - short & relevant only within a narrow context -> the compiler can inter the types of the parameters & the return type

```rust
let expensive_closure = |num: u32| -> u32 {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    num
};
```

```rust
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x|             { x + 1 }; // requires the closure to be evaluated to be able to compile
let add_one_v4 = |x|               x + 1  ; // requires the closure to be evaluated to be able to compile
```

- The first time a closure is called, the compiler infers the type of arguments & return values, then locked it into the closure

## Capturing References or Moving Ownership

- 3 ways to capture values from their environment
    - borrowing immutably
    - borrowing mutably
    - taking ownership

```rust
// CAPTURE IMMUTABLE REFERENCE
fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    let only_borrows = || println!("From closure: {:?}", list); // bind a variable to a closure definition

    println!("Before calling closure: {:?}", list);
    only_borrows();
    println!("After calling closure: {:?}", list);
}
```

```rust
// CAPTURE MUTABLE REFERENCE
fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    let mut borrows_mutably = || list.push(7); // alternate the variable

    // println!("Before calling closure: {:?}", list); this will cause an error because the `borrows_mutably` is borrowing the mut `list` variable, the variable is only returned after the closure is called
    borrows_mutably();
    // mutable borrow end here
    
    println!("After calling closure: {:?}", list); // [1, 2, 3, 7]
}
```

```rust
// use move keyword to take ownership

use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    // move the list owner to the new thread
    // list will be moved into the closure using the `move` keyword
    thread::spawn(move || println!("From thread: {:?}", list))
        .join()
        .unwrap();
}
```

## Moving captured values **out of closures**

- A closure body can do
    - move a captured value out of the closure
    - mutate the captured value

- Fn traits
    - `FnOnce`:
        - implemented for all closure 
        - applies to closures that can be called once
        - the closure that move captured values out of it body will not implement other `Fn` trait
    - `FnMut`:
        - don't move captured values out of their body + mutate the captured value  
        - can be called more than once
    - `Fn`:
        - don't move the captured values out of their body + don't mutate it
        - capture nothing from the environment
        - can be called more than once without mutating their environment (concurrently)   

```rust
// example of the unwrap_or_else fn
impl<T> Option<T> {
    pub fn unwrap_or_else<F>(self, f: F) -> T
    where
        F: FnOnce() -> T
    {
        match self {
            Some(x) => x,
            None => f(),
        }
    }
}
```

```rust
// Using FnMut but move the captured value out of the environment
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    let mut sort_operations = vec![];
    let value = String::from("by key called");

    /*
    pub fn sort_by_key<K, F>(&mut self, f: F)
    where
        F: FnMut(&T) -> K,
        K: Ord,
    */
    list.sort_by_key(|r| {
        sort_operations.push(value); // capture the `value` and moves it out of the closure by transfering it to the `sort_operations`
        r.width
    });
    // `sort_by_key` can be called once
    // but in the 2nd time, the value would no longer be in the environment
    
    println!("{:#?}", list);
}
```


# Translate

- Inference: Sự suy luận
