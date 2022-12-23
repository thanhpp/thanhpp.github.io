---
id: iptyzetmct98konuehjlmc3
title: Types
desc: ''
updated: 1671814716487
created: 1671811133127
---
# Advanced Types

> https://doc.rust-lang.org/book/ch19-04-advanced-types.html

## Using the Newtype Pattern for Type Safety and Abstraction

- We can use the newtype pattern to abstract away some implementation details of a type: the new type can **expose a public API** that is different from the API of the private inner type.
- Newtypes can also hide internal implementation

## Creating Type Synonyms with Type Aliases

- Type alias: to give an **exising type another name**.

```rust
fn main() {
    type Kilometers = i32; // the type Kilometers will be treated the same as values of type i32

    let x: i32 = 5;
    let y: Kilometers = 5;

    println!("x + y = {}", x + y); // the compiler will not give us an error when we mix up 2 types
}
```

```rust
fn main() {
    // Thunk can be used as an alias for the type Box<dyn Fn() + Send + 'static>
    type Thunk = Box<dyn Fn() + Send + 'static>;

    let f: Thunk = Box::new(|| println!("hi"));

    fn takes_long_type(f: Thunk) {
        // --snip--
    }

    fn returns_long_type() -> Thunk {
        // --snip--
        Box::new(|| ())
    }
}
```

- Common alias for the `Result`:
    ```rust
    // We can use any methods that work on Result<T, E>, as well as special syntax like the ? operator
    type Result<T> = std::result::Result<T, std::io::Error>;
    ```

## The Never Type that Never Return

- `!` ~ _empty type_ because it has no values, or the _never type_ because it stands in the place of the return type when a function will **never return**.
- Functions that return never are called _diverging functions_.  
    ```rust
    // we can't create values of the type ! -> bar can never possibly return
    fn bar() -> ! {
        // --snip--
        panic!();
    }
    ```

## Dynamically Sized Types and the Sized Trait

- Rust needs to know certain details about its types, such as **how much space to allocate** for a value of a particular type.
- Dynamically sized types (unsized types): let us write code using values whose size we can know only at **runtime**.
- Dynamically sized types in Rust have an extra bit of **metadata that stores the size** of the dynamic information. (we must always put values of dynamically sized types **behind a pointer** of some kind)
- The `Sized` trait to determine whether or not a type's size is **known at compile time**. 
    - ```rust
      fn generic<T>(t: T)
      ~
      fn generic<T: Sized>(t: T)
      ```
    - relax the restriction
      ```rust
      fn generic<T: ?Sized>(t &T) // T may or may not be Sized
      ```
    - The `?Trait` syntax with this meaning is only available for `Sized`

### The `str` type

- `str` is a _dynamically sized type_. We can't know how long the string until runtime

```rust
fn main() {
    // this will cause a compiler error
    // Rust need to know the data size of the str type, but s1 and s2 have different length
    let s1: str = "Hello there!";
    let s2: str = "How's it going?";
}
```

- `&T`: is a single value that **stores the memory address** of where the `T` is located.
- `&str` has 2 value
    - the address if the str
    - its length