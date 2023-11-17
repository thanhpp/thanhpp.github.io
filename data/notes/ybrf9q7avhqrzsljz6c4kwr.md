# Unsafe Rust

> https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html

- If the Rust compiler doesn't have enough information, it will reject the code. You can use **unsafe** code to tell the compiler "Trust me, I know what I'm doing"
- Unsafe Rust allow developers to do low-level system programming (underlying computer hardware is inherently unsafe)

## Powers

- _Unsafe superpowers_:
    - Dereference a raw pointer
    - Call an unsafe function or method
    - Access or modify a mutable static variable
    - Implement an unsafe trait
    - Access fields of `union` S
- unsafe doesn't turn off the **borrow checker** or disable any other of **Rust's safety** checks.
- Keep `unsafe` blocks small.

## Dereferencing a Raw Pointer

- Unsafe Rust has 2 new types called
    - raw pointers (simillar to references): can be immutable `*const T` and mutable `*mut T`
        - immutable: the pointer can't be directly assigned to after being dereferenced.
    - the `*` isn't the dereference operator; it's part of the type name
- Raw pointers
    - Are allowed to **ignore the borrowing rules**: having both immutable & mutable pointers or multiple mutable pointers to the same location
    - Aren't guaranteed to point to valid memomry (**might be invalid**)
    - Are allowed to be **null**
    - Don't implement any automatic cleanup (**manual cleanup**)

```rust
fn main() {
    let mut num = 5;

    let r1 = &num as *const i32;    // immutable raw pointer
    let r2 = &mut num as *mut i32;  // mutable raw pointer

    unsafe {
        println!("r1 is: {}", *r1);
        println!("r2 is: {}", *r2);
    }
    /*
    r1 is: 5
    r2 is: 5
    */
}
```

## Calling unsafe function or method

- The unsafe function has **requirements** we need to uphold when we call this function, because Rust can't guarantee we've met these requirements

```rust
fn main() {
    // we can perform other unsafe operations within an unsafe function
    unsafe fn dangerous() {}

    unsafe {
        dangerous();
    }
}
```

### Creating a **safe abstraction** over unsafe code

- Wrapping unsafe code in a safe function is a common abstraction

```rust
use std::slice;

// returns 2 mutable slices in a tuple
fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();
    let ptr = values.as_mut_ptr(); // ptr = *mut i32 - immutable raw pointer

    assert!(mid <= len);

    // return (&mut values[..mid], &mut values[mid..]);
    // the borrow checker would raise an error that we're borrowing from the same slice twice,
    // and it can't know that we're borrowing different parts of the slice
    unsafe {
        (
            // from_raw_parts_mut must trust that the ptr is valid
            slice::from_raw_parts_mut(ptr, mid), // creates a slice from the start of the ptr, length = mid
            slice::from_raw_parts_mut(ptr.add(mid), len - mid), // creates a slice from (ptr + mid), length (len - mid)
        )
    }
}

fn main() {
    let mut vector = vec![1, 2, 3, 4, 5, 6];
    let (left, right) = split_at_mut(&mut vector, 3);
}
```

## Using `extern` functions to call external code

- the keyword `extern` that facilitates the creation and use of a _Foreign Function Interface (FFI)_
    - FFI: is a way for programming language to define functions and enable a different (foreign) programming language to call those functions

```rust
// set up an integration with the `abs` function from the C standard library
// lists the names and signatures of external functions from another language we want to call
// "C": which ABI (application binary interface - how to call the function at the assembly level) the external function uses
extern "C" {    
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
// Absolute value of -3 according to C: 3
```

- `extern` can also create an interface that allows other languages to call Rust functions

```rust
#[no_mangle] // tells rust compiler not to mangle the name of the function
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

## Accessing or Modifying a Mutable Static Variable

- In Rust, **global variables are called static variables**.
- Static variable have a **fixed address** in memory, using the value will always access thee same data
    - static variable can be mutable
    - a constant is allowed to duplicate their data whenever they are used
- Rust consider a mutable global data is unsafe because it's difficult to ensure there are no data race.

```rust
static mut COUNTER: u32 = 0; // mutable static variable

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER); // COUNTER: 3
    }
}
```

## Implementing an Unsafe Trait

- A trait is unsafe when at least one of its methos has some invariant that **the compiler can't verify**.

```rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}

fn main() {}
```

## Access Fields of a Union

- A union: 
    - similar to a struct
    - only one declared field is used in a particular instance at one time
    - Rust can't guarantee the type of the data currently being stored in the union instance
- Unions are primarily used to **interface with unions in C code**.

## Keywords

- Mangling: when a compiler changes the name we've given a function to a **different name that contains more information** for other parts of the compilation process to consume