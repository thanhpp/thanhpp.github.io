
# Async/.await Primer

> https://rust-lang.github.io/async-book/01_getting_started/04_async_await_primer.html

## Why?

- Run multiple asynchronous functions
- Sync between them using .await 

## What?

- Built-in tool for writng asynchronous functions
- async:
    - A block of code -> a state machine (implements `Future trait`)

> Blocked `Future` will yeild control of the thread, allowing other `Future` to run
> `Future` acts as a interupt whenever a determined event is received -> able to run multiple `Future`

> **`Future` needs to be run on an executor**.

## How?

- dependencies: Cargo.toml
    ```toml
    [dependencies]
    futures = "0.3"
    ```
- Create an asynchronous function
    ```rust
    async fn do_sth() {}
    ```
    - Returned a `Future`
- Runs **async fn** on an executor
    ```rust
    /*
    blocks the current thread until the provided future has run to completion
    */
    use futures::executor::block_on; 

    async fn hello_world() {
        println!("hello, world");
    }

    fn main() {
        let future = hello_world() // assign a function
        block_on(future); // runs future
    }
    ``` 
- using `.await` to wait for the `Future` trait
    - waits for the `future` to complete
    - allows other tasks to run if the future is currently unable to make progress
        ```rust
        // dance can be executed at the same time as learn & sing song
        // sing_song must wait for learn_song to complete
        async fn learn_song() -> Song { /**/ }
        async fn sing_song(song: Song) { /**/ }
        async fn dance() { /**/ }

        async fn learn_and_sing() {
            // using block_on blocks an entire thread
            let song = learn_song().await;
            sing_song(song).await;
        }

        async fn async_main() {
            let f1 = learn_and_sing();
            let f2 = dance();
            
            // join! waits for multiple futures concurrently
            futures::join!(f1, f2);
        }

        fn main() {
            block_on(async_main());
        }
        ``` 