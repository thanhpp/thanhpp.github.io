# Object-Oriented Programming

> https://doc.rust-lang.org/book/ch17-00-oop.html
> https://doc.rust-lang.org/book/ch17-01-what-is-oo.html

## Objects contain data & behavior

- Structs & enums have data, and `iplm` blocks provide methods on them.

## Encapsulation - Hides implementation details

- Use `pub` keyword to decide which modules, type, functions & methods in our code should be public.

## Inheritance - type system & code sharing

- Inheritance: an object can inherit elements from another object's definition.
- Reuse code: using default trait method implementations
- Polymorphism: substitute multiple objects for each other at runtime if they share certain characteristics.
    - Rust use **generics** to abstract over different possible types & trait bounds to impose contraints on what those types must provide (bounded parametric polymorphism)