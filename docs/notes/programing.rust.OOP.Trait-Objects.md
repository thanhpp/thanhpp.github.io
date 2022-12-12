---
id: oc8gik1ujqpi3kzjx7fbo6p
title: Trait-Objects
desc: ''
updated: 1670841445193
created: 1670840408579
---
# Trait Objects - Allow for Values of Different Types

## Trait for Common Behavior

- A trait object point to both an instance of a type implementing our specified trait and a table used to look up trait method on that type at runtume.
    - We create a trait object by specifying **some sort of pointer**
    - Rust's type system will ensure at compile time that any value used a trait object will implement the trait object's trait.
    - We can't add data to a trait object

```rust
pub trait Draw {
    fn draw(&self);
}

pub struct Screen {
    pub components: Vec<Box<dyn Draw>>, // vector of values that implement the Draw trait
}

// use the draw trait
impl<T> Screen<T>
where
    T: Draw,
{
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

## Implementing the Trait

```rust
use gui::Draw;

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

// implement trait for a struct
impl Draw for SelectBox {
    fn draw(&self) {
        // code to actually draw a select box
    }
}
```

## Dynamic dispatch

- When we use trait objects, Rust must use **dynamic dispatch**. The compiler doesn't know all the types that might be used -> at runtime, Rust uses the **pointers** inside the trait object to know which method to call.
- This lookup incurs a runtime cost.
- Trade-off: Performance vs Flexibility