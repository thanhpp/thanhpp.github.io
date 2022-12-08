---
id: eqju4noqr2500qc4z1p2cga
title: Shared-State
desc: ''
updated: 1670486296144
created: 1670485208993
---
# Shared-State Concurrency

> https://doc.rust-lang.org/book/ch16-03-shared-state.html

- Shared memory concurrency is like multiple ownership possible

## Using mutexes

- Mutex: Mutual exclusion
- To access a data in a mutex, a thread must acquire the mutex's lock. When you're done with the data, you must unlock the data for other threads can acquire the lock.

## `Mutex<T>`

```rust
// single thread context
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        // m.lock() -> LockResult<MutexGuard,...>
        // MutexGuard is a smart pointer that implement the Drop trait to release the lock
        let mut num = m.lock().unwrap(); 
        *num = 6;
    }

    println!("m = {:?}", m); // m = Mutex { data: 6, poisoned: false, .. }
}
```

## Mutiple Ownership with Multiple Threads using `Arc<T>`

- `Arc<T>` = atomic `Rc<T>`
- Thread safe = performance penalty -> should use non-atomic

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // counter is immutable, but we could get a mutable reference to the value inside it
    // -> **Mutex<T> provides interior mutability**
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter); // clone the reference
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap()); // Result: 10
}
```