# Pattern Syntax

## Matching literals

```rust
let x = 1;

match x {
    1 => println!("one"), 
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("anything"),
}

// one
```

## Matching named variables

- `match` starts a **new scope**, variables declared as part of a pattern inside the `match` expression will **shadow** those with the same name outside the `match` construct, as is the case with all variables.

``` rust
let x = Some(5);
let y = 10;

match x {
    Some(50) => println!("Got 50"),
    Some(y) => println!("Matched, y = {y}"),    // shadow y = x (matching type)
    _ => println!("Default case, x = {:?}", x),
}

println!("at the end: x = {:?}, y = {y}", x);

/*
Matched, y = 5
at the end: x = Some(5), y = 10
*/
```

## Multiple Patterns

```rust
let x = 1;

match x {
    1 | 2 => println!("one or two"), // 1 or 2
    3 => println!("three"),
    _ => println!("anything"),
}
```

## Matching Rages of Values

```rust
let x = 5;

match x {
    1..=5 => println!("one through five"), // 1 | 2 | 3 | 4 | 5
    _ => println!("something else"),
}
```

```rust
let x = 'c';

// char values (ASCII?)
match x {
    'a'..='j' => println!("early ASCII letter"),
    'k'..='z' => println!("late ASCII letter"),
    _ => println!("something else"),
}
```

## Destructuring

### Structs

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;   // matching a, b -> p.x, p.y
    // let Point { x, y } = p;      // alternative
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

```rust
fn main() {
    let p = Point { x: 0, y: 7 };

    // matching by fixing 1 value of the struct
    match p {
        Point { x, y: 0 } => println!("On the x axis at {x}"),
        Point { x: 0, y } => println!("On the y axis at {y}"),
        Point { x, y } => {
            println!("On neither axis: ({x}, {y})");
        }
    } // On the y axis at 7
}
```

### Enums

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);
    
    // match by enum types & define variables that the matched enum contains
    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.");
        }
        Message::Move { x, y } => {
            println!(
                "Move in the x direction {x} and in the y direction {y}"
            );
        }
        Message::Write(text) => {
            println!("Text message: {text}");
        }
        Message::ChangeColor(r, g, b) => println!(
            "Change the color to red {r}, green {g}, and blue {b}",
        ),
    } // Change the color to red 0, green 160, and blue 255
}
```

### Nested Structs and Enums

```rust
enum Color {
    Rgb(i32, i32, i32),
    Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    // match nested enums. Message -> Color
    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => println!(
            "Change color to hue {h}, saturation {s}, value {v}"
        ),
        _ => (),
    }
}
```

### Structs and Tuples

```rust
// matching a tuple of a tuple and a struct
let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
```

## Ignoring Values

### Entire Value with `_`

```rust
// ignore the first parameter
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}

fn main() {
    foo(3, 4);
}
```

### Parts of a Value with a Nested `_`

```rust
let mut setting_value = Some(5);
let new_setting_value = Some(10);

match (setting_value, new_setting_value) {
    // matched by type, but not using the inner value
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    }
}

println!("setting is {:?}", setting_value);

/*
Can't overwrite an existing customized value
setting is Some(5)
*/
```

### An unsed variable by starting its name with `_`

```rust
fn main() {
    let _x = 5; // no warning unused
    let y = 10; // get warning unused
}
```

- The syntax `_x` still binds the value to the variable, whereas `_` doens't bind at all.

```rust
fn main() {
    let s = Some(String::from("Hello!"));

    // if let Some(_) = s -> s doesn't get moved into _
    if let Some(_s) = s { // the s value has been moved into _s
        println!("found a string");
    }

    println!("{:?}", s);  // error
}
```

### Remaining parts of a value with `..`

```rust
fn main() {
    struct Point {
        x: i32,
        y: i32,
        z: i32,
    }

    let origin = Point { x: 0, y: 0, z: 0 };

    match origin {
        // skips y and z - the remaining
        Point { x, .. } => println!("x is {}", x), // x is 0
    }
}
```

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        // ignore the middle value
        (first, .., last) => {
            println!("Some numbers: {first}, {last}");
        }
    }
}
```

## Extra conditionals with Match Guards

```rust
let num = Some(4);

// the compiler doesn't try to check for exhaustiveness when match guard expressions are involved
match num {
    Some(x) if x % 2 == 0 => println!("The number {} is even", x),
    Some(x) => println!("The number {} is odd", x), // Some(5) will matches this arm
    None => (),
} // The number 4 is even
```

```rust
fn main() {
    let x = Some(10);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        // the guard condition doesn't introduce a new variable, so y still keeping its value
        Some(n) if n == y => println!("Matched, n = {n}"),
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {y}", x);
}

/*
Matched, n = 10
at the end: x = Some(10), y = 10
*/
```

```rust
fn main() {
    let x = 4;
    let y = false;

    match x {
        // (4 | 5 | 6) if y => ...
        4 | 5 | 6 if y => println!("yes"),
        _ => println!("no"),
    }
}

// prints no
```

## @ (at) Bindings 

```rust
fn main() {
    enum Message {
        Hello { id: i32 },
    }

    let msg = Message::Hello { id: 5 };

    match msg {
        Message::Hello {
            // check if id in range [3, 7], then bind the value to id_variable
            id: id_variable @ 3..=7,
        } => println!("Found an id in range: {}", id_variable),
        // doesn't bind the id value to use, only checks its value
        Message::Hello { id: 10..=12 } => {
            println!("Found an id in another range")
        }
        // shorthand syntax -> bind to the id varO
        Message::Hello { id } => println!("Found some other id: {}", id),
    } // Found an id in range: 5
}
```