# Threads

> https://doc.rust-lang.org/book/ch16-01-threads.html

- Rust standard library uses a **1:1 model** of thread implementation
    - 1 OS thread / 1 language thread
- Some crates that implement other models of threading -> different tradeoffs


## Create & Wait a New Thread

```rust
use std::thread;
use std::time::Duration;

// This code doesn't guarantee the program exits after the thread is finished
fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}

/*
hi number 1 from the main thread!
hi number 1 from the spawned thread!
hi number 2 from the main thread!
hi number 2 from the spawned thread!
hi number 3 from the main thread!
hi number 3 from the spawned thread!
hi number 4 from the main thread!
hi number 4 from the spawned thread!
*/
```

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // thread::spawn -> JoinHandle
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap(); // wait for the thread to be finished
}

/*
hi number 1 from the main thread!
hi number 1 from the spawned thread!
hi number 2 from the spawned thread!
hi number 2 from the main thread!
hi number 3 from the spawned thread!
hi number 3 from the main thread!
hi number 4 from the spawned thread!
hi number 4 from the main thread!
hi number 5 from the spawned thread!
hi number 6 from the spawned thread!
hi number 7 from the spawned thread!
hi number 8 from the spawned thread!
hi number 9 from the spawned thread!
*/
```

## Using move Closures

- [[programing.rust.Closures]]
- The thread closure has no arguments -> TO use data from the main thread, the spawned thread's closure must capture the value it needs.

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    // if we don't use move, Rust can not know how long the thread will run
    // -> we move the ownership of v to the thread
    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```