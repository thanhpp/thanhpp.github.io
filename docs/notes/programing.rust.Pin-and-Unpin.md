---
id: ig9bn8datv3s83u9g4a56tv
title: Pin-and-Unpin
desc: ''
updated: 1678359954645
created: 1678356408632
---

> https://blog.cloudflare.com/pin-and-unpin-in-rust/

# Pin, Unpin, and why Rust needs them 

## Future

- The future trait
    - Can be polled
    - When it's polled -> returns "Pending" || "Ready"
        - Pending -> Poll it later
        - Ready -> Respond with a value ("resolving")

## Self-reference in method receivers

- Method receiver types:
    - "self": take ownership of self
    - "&self": borrow self
    - "&mut self": mutably borrow self
- The Rust compiler often move values around in memory
    - So the struct's fields can change their address, but not their value
    - -> a pointer can be pointed to an invalid data

## Unpin and !Unpin

- Rust types
    - (1) Safe to move around in memory: most of the types
    - (2) Self-referential types: not safe to move around in memory
    - The Rust compiler (>= 1.33): automatically figure out which category any type is in.
- Types in (1) implement the `Unpin` trait
- Types in (2) are named `!Unpin` (does not implement Unpin)
    - We can't use regular pointers for self-reference
    - Need to use special pointers that **"pin" their values into place**
    - We can write self-referential structs safely

## Using Pin & pin-project

- Access to a pinned struct: write a helper function which give you references to the fields ("projection")
- The pin-project crate: generates safe projections

```rust
#[pin_project::pin_project] // This generates a `project` method
pub struct TimedWrapper<Fut: Future> {
	// For each field, we need to choose whether `project` returns an
	// unpinned (&mut T) or pinned (Pin<&mut T>) reference to the field.
	// By default, it assumes unpinned:
	start: Option<Instant>,
	// Opt into pinned references with this attribute:
	#[pin]
	future: Fut,
}
```