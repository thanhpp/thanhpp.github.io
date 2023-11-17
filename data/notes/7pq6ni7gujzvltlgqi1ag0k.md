# Advanced Functions and Closures

> https://doc.rust-lang.org/book/ch19-05-advanced-functions-and-closures.html

## Function Pointers

- In rust, we can pass regular functions to functions rather than defining a new closure.
- The `fn` type is called a _function pointer_
- Function pointer implement all three of the closure trait
    - Fn
    - FnMut
    - FnOnce

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}

// execute the f twice 
fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    // (5 + 1) + (5 + 1)
    let answer = do_twice(add_one, 5);

    println!("The answer is: {}", answer); // The answer is: 12
}
```

## Returning Closures

- Closures are represented by traits -> can't return closures _directly_. 
- If we want to returns a trait, we can use the concrete type that implements the trait as the return value. But closures don't have a concrete type that is returnable.

```rust
// Rust doesn't know how much space to store closure.
// -> use Box to stores the closures (alloc at run-time)
fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}
```