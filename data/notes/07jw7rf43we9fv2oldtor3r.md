# Reference Counted Smart Pointer `Rc<T>`

- There are cases when a single value might have **multiple owners**.
- The `Rc<T>` keeps track of the **number of references** -> if the value is still on use
- The `Rc<T>` is only use for **single-threaded** scenarios.

## Share data

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a)); // increasing the number of references (1 -> 2)
    let c = Cons(4, Rc::clone(&a)); // increasing the number of references (2 -> 3)
}
```

- The `Rc::clone` doesn't make a deep copy of all the data like the `clone`
    - Save time & space

## Cloning an `Rc<T>` increases the Reference Count

```rust
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil))))); // inital = 1
    println!("count after creating a = {}", Rc::strong_count(&a)); // count after creating a = 1
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a)); // count after creating b = 2
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a)); // count after creating c = 3
    } // c goes out of scope here
    println!("count after c goes out of scope = {}", Rc::strong_count(&a)); // count after c goes out of scope = 2
}
```
