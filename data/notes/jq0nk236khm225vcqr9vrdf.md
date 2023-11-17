# Advanced Traits

> https://doc.rust-lang.org/book/ch19-03-advanced-traits.html

## Associated Types

- Associated types connect a type placeholder with a trait such that the trait method definitions can **use these placeholder types in their signature**.

```rust
// Iterator trait
pub trait Iterator {
    type Item; // specify the concrete type

    fn next(&mut self) -> Option<Self::Item>;
}

// Implement the iterator trait for the counter
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // --snip--
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}
```

```rust
// we must annotate the types in each implement
// the trait can be implemented for a type multiple times, changing the concrete types of the generic parameters each time. 
// We must provide type annotations to indicate which implementation of Iterator we want to use
pub trait Iterator<T> {
    fn next(&mut self) -> Option<T>;
}
```

## Default Generic Type parameters and Operator Overloading

- We can specify a default type when declaring a generic type with the `<PlaceholderType=ConcreteType>` syntax
- Operator overloading: customize the behavior of an operator (such as `+`)
- Default type parameters can be used in 2 ways
    - To extend a type without breaking existing code
    - To allow customization in specific cases most user won't need

```rust
// add trait
trait Add<Rhs=Self> { // default tupe parameter; Rhs = right hand side
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}

// operator overloading
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

// add stands for + operation
impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(
        // overload the + operator
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    );
}
```

```rust
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

// implement the + operator that works with Milimeters and Meters
impl Add<Meters> for Millimeters {  // specify the Rhs type
    type Output = Millimeters;      // specify the associated type, returns type

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

## Calling Methos with the same name

```rust
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}

fn main() {
    let person = Human;
    // need to specify which fly method we mean
    Pilot::fly(&person);
    Wizard::fly(&person);
    person.fly(); // call directly to the fly function of the Human type
}

/*
This is your captain speaking.
Up!
*waving arms furiously*
*/
```

- full qualified syntax
    ```
    <Type as Trait>::function(receiver_if_method, next_arg, ...);
    ```

```rust
trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}

fn main() {
    println!("A baby dog is called a {}", Dog::baby_name()); // A baby dog is called a Spot

    println!("A baby dog is called a {}", Animal::baby_name()); // error
    // because Animal::baby_name doesn't have a self paramter (to reference), 
    // and there could be other types that implement the Animal trait

    println!("A baby dog is called a {}", <Dog as Animal>::baby_name()); // A baby dog is called a puppy
}
```

## Using **Supertraits** to require one trait's functionality within another trait

- Write a trait definition that **depends on another trait**.

```rust
use std::fmt;

// types implement the outside trait need to implement the Display trait
trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output); // using the display trait
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}

struct Point {
    x: i32,
    y: i32,
}

// must implement the display trait first
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

// then implement the OutlinePrint trait
impl OutlinePrint for Point {}
```

## Using the **Newtype Pattern** to implement external traits on external types

- In Rust, the orphan rule that states `we're only allowed to implement a trait on a type if either the trait or the type are local to our crate` (both of the trait and the type implement it are local to our crate)
- The downside of the **Newtype Pattern** is that, we have to implement all the methods of the inner type direcly to the wrapper type (or just the methods we want).

```rust
use std::fmt;

// We can't implement the display type for the Vec<String> directly in this crate
// so we wrap it in a new type that local to this crate
struct Wrapper(Vec<String>); // a tuple that has 1 element

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // self.0 -> access the inner Vec<String>
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}
```