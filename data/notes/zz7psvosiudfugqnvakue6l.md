# Deref trait - Smart pointer as reference

> https://doc.rust-lang.org/book/ch15-02-deref.html

## Intro

-  `Deref` trait: customize the behavior of the dereference operatio `*`

## Box<T> Like a reference

```rust
fn main() {
    let x = 5;
    let y = Box::new(x);

    assert_eq!(5, x);   // pass
    assert_eq!(5, *y);  // pass -> *y == 5 -> deref(y) = 5
}
```

## Define a smart pointer

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> { // Mybox::new(T)
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T; // define an associated type for the Deref trait to use

    // borrows `self` -> returns a reference to the inner data
    fn deref(&self) -> &Self::Target {
        &self.0 // first value of the tuple struct
        // *y -> *(y.deref())
        // NOTE: returning the value directly would transfer the ownership of the innter value
    }
}
```

## Implicit Deref Coercions

- **Deref coercion**: converts a reference to a type that implements the `Deref` trait into a reference to a reference to another type
    - force the `Deref` type to another reference type
    - `&String` -> `str` (String implements the `Deref` trait)
- Rust automatically call the `defef()` function to convert the input type to the parameter type

## Deref Coercion with Mutability

- `Deref`: override the `*` operator on immutable references
- `DerefMut`: override the `*` operator on mutable references
- Rust does deref coercions when
    - `&T` => `&U`: `T: Deref<Target=U>`
    - `&mut T` => `&mut U`: `T: DerferMut<Target=U>`
    - `&mut T` => `&U`: `T:Deref<Target=U>` 

> Rust will also coerce a mutable reference to an immutable one

### Vocab

- coercion `/kəʊˈɜː.ʃən//`: the practice of persuading someone to do something by using force or threats.
    - sự bắt buộc || sự cưỡng bách