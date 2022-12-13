---
id: tacck847l0nk93b1abmioe0
title: Where-to-use
desc: ''
updated: 1670946061700
created: 1670943361659
---
# All the Places Patterns can be used

> https://doc.rust-lang.org/book/ch18-01-all-the-places-for-patterns.html

## `match` Arms

```rust
/*
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
*/

match x { // Option<i32>
    None => None,
    Some(i) => Some(i + 1),
}
```

- `match` expressions need to be exhausive = all possibilities for the value must be accounted for
- We can use the `_` catchall pattern for the last arm

## `if let` expressions

- `if let` expressions is a shorter way to write the equivalent of a `match` that only **matches one case**.
- we can have a corresponding `else` containing code to run the pattern in the `if let` doesn't match

```rust
fn main() {
    let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();

    if let Some(color) = favorite_color {
        println!("Using your favorite color, {color}, as the background");
    } else if is_tuesday { // if let - else if
        println!("Tuesday is green day!");
    } else if let Ok(age) = age { // if let - else if let
        if age > 30 {
            println!("Using purple as the background color");
        } else {
            println!("Using orange as the background color");
        }
    } else {
        println!("Using blue as the background color");
    }
}
```

- The compiler **doesn't check for the exhaustiveness** of the `if let` expression .

## `while let` Conditional Loops

- the `while let` conditional loop allows a `while` loop to run for as long as a pattern continues to match.

```rust
fn main() {
    let mut stack = Vec::new();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    // returns None if there is no element left.
    while let Some(top) = stack.pop() {
        println!("{}", top);
    }
}

/*
3
2
1
*/
```

## `for` Loops

```rust
fn main() {
    let v = vec!['a', 'b', 'c'];

    // enumerate produces a value and the index for that value
    // this will match the pattern (index, value)
    for (index, value) in v.iter().enumerate() {
        println!("{} is at index {}", value, index);
    }
}

/*
a is at index 0
b is at index 1
c is at index 2
*/
```

## `let` Statements

```rust
/*
let PATTERN = EXPRESSION;
*/

let x = 5; // “bind everything to the variable x, whatever the value is.”
let (x, y, z) = (1, 2, 3);
let (x, y, _) = (1, 2, 3); // we could use _ or .. to ignore or more of the values in the tuple
```

- Rust compares the expression against the pattern and assigns any names it finds.

## Function parameters

```rust
fn print_coordinates(&(x, y): &(i32, i32)) {
    println!("Current location: ({}, {})", x, y);
}

fn main() {
    let point = (3, 5);
    print_coordinates(&point); // Current location: (3, 5)
}
```

- We can match a tuple in a function's arguments to the pattern. 
- We can also use patterns in closure parameter lists in the same way as in function parameter lists.