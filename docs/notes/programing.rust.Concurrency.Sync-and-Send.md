---
id: 4qfbc1w17nlx6arb6djhxx2
title: Sync-and-Send
desc: ''
updated: 1670569908647
created: 1670568874758
---
# Sync and Send Traits

> https://doc.rust-lang.org/book/ch16-04-extensible-concurrency-sync-and-send.html

## Send - Transfering ownership between threads

- The `Send` _marker trait_ indicates that ownership of values of the type implementing it can be **transfered between threads**.
- Any type composed entirely of `Send` types is automatically marked as `Send`
- Almost all primitive types are `Send` (aside from raw pointers)

## Sync - Allowing access from multiple threads

- The `Sync` _market trait_ indicates that it is safe for the type implementing it to be **referenced from multiple threads**.
- Any type `T` is `Sync` if `&T` (immutable reference) is `Send`
- Primitive types are `Sync`
- Types composed entirely of types that are `Sync` are also `Sync`

> Implementing Send & Sync manually is Unsafe