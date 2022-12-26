---
id: 10w7bddtwwaew1kvj45xiqz
title: Macros
desc: ''
updated: 1672053852029
created: 1672049225370
---
# Macros

> https://doc.rust-lang.org/book/ch19-06-macros.html

- The term _macro_ refers to a family of features in Rust: 
    - _declarive macros_ with `macro_rules!`
    - 3 kinds of _procedural_ macros
        - Custom `#[derive]` macros: that specify **code added** with the derive attribute used on structs and enums
        - Attribute-like macros: that define **custom attributes** usable on any item
        - Function-like macros: that **look like function calls** but operate on the tokens specified as their argument
- macros are a way of writing code that writes other code (metaprogramming)

## Macros vs Functions

- A function signature must declare the number and type of parameters tha function has.
- Macros can take a variable number of parameters.
- Marcos are expanded **before the compiler interprets the meaning of code**. A functions gets called at runtime & a trait needs to be implemented at compile time.
- Macros are more complex than function definitions.

## Declarative Macros with `macro_rules!` for General Metaprogramming

- declarative ~ `macro_rules!` ~ macros by example ~ macros
- declarative macros allow you to write something similar to a Rust `match` expression
    - compare a value to patterns that are associated with particular code: the value iis the literal **Rust source code** passed to the macro
    - the **patterns are compared with the structure** of that source code
    - when matched, **replaces the code passed to the macro**.

```rust
let v: Vec<u32> = vec![1, 2, 3];
/*
{
    let mut temp_vec = Vec::new();
    temp_vec.push(1);
    temp_vec.push(2);
    temp_vec.push(3);
    temp_vec
}
*/

// vec! macro: remove the preallocate the amount of memory upfront
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => { // like a match arm ( $( $x:expr ),* ) is the pattern
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

// ( $( $x:expr ),* )
// $: declare a variable in the macro system that will contain the Rust code matching the pattern
// ( $x:expr ): captures values that match the pattern within the parentheses
// $x:expr: matches any Rust expression and gives the expression the name $x
// *: the pattern matches zero or more of whatever precedes the *
```

## Procedural Macros for Generating Code from Attributes

- Procedural macros accept some code as input, operate on that code, and produce some code as an output.
- The procedural definitions must reside in their own crate with a **special crate type**.

```rust
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
    // this function defines a procedural macro takes a TokenStream as an input and produces a TokenStream as an output
    // the TokenStream type represents a sequence of tokens
    // The source code that the macro is operating on makes up the input TokenStream
    // The code the macro produces is the output TokenStream
    // the function also has an attribute attached to it that specifies with kind of procedural macro we're creating
}
```

## Vocab

- procedural /prəˈsiːdʒərəl/: involving or following a formal procedure
- precede /prɪˈsiːd/: to happen before something or come before something/somebody in order (đứng trước)