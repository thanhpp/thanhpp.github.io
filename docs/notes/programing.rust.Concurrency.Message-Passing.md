---
id: cofclxctdof873vlzv6psfy
title: Message-Passing
desc: ''
updated: 1670436869348
created: 1670410147689
---
# Message passing 

> https://doc.rust-lang.org/book/ch16-02-message-passing.html

## Channels

- A channel
    - has 2 halves: a transmitter & a receiver
    - transmitter: send messages
    - receiver: consume messages 

```rust
use std::sync::mpsc; // multiple producer, single consumer.
use std::thread;

fn main() {
    // (transmitter, receiver)
    let (tx, rx) = mpsc::channel();

    // create a thread
    // move the ownership of tx to the new thread
    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap(); // Result<T, E>, error = nowhere to send a value
    });

    // receiver has 2 methods: recv and try_recv
    // recv: returns an error when no more values will be coming
    // try_recv: returns immediately
    let received = rx.recv().unwrap();
    println!("Got: {}", received); // Got: hi
}
```

## Channels & Ownership Transference

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
        println!("val is {}", val); // the value is moved to another function/thread -> no longer valid
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

## Sending multiple values

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
/*
Got: hi
Got: from
Got: the
Got: thread
*/
```

## Multiple Producers

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    // --snip--

    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone(); // create 2 producers
    
    // use 2 threads for 2 transmitters
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx1.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    thread::spawn(move || {
        let vals = vec![
            String::from("more"),
            String::from("messages"),
            String::from("for"),
            String::from("you"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }

    // --snip--
}

/*
Got: hi
Got: more
Got: from
Got: messages
Got: for
Got: the
Got: thread
Got: you
*/

```