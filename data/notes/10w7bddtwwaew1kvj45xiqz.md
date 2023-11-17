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

## Write a custom derive Macro

- The first step is to make a new library crate 
    ```
    $ cargo new hello_macro --lib
    ```
- Next, we'll define the `HelloMacro` trait and its associated function
    ```rust
    // src/lib.rs
    pub trait HelloMacro {
        fn hello_macro();
    }
    ```
- Define the procedural macro, it need to be in its own crate. Let's start a new crate called `hello_macro_derive` inside the project
    ```
    $ cargo new hello_macro_derive --lib
    ```
- Manage the procedural macro crate dependencies
    ```toml
    # hello_macro_derive/Cargo.toml
    [lib]
    proc-macro = true

    [dependencies]
    syn = "1.0"
    quote = "1.0"
    ```
- Define the procedural macro
    ```rust
    // hello_macro_derive/src/lib.rs
    
    use proc_macro::TokenStream; // the compiler API that allow us to read and manipulate Rust code
    use quote::quote; // turns syn data structures back into Rust code
    use syn; // parse Rust code from a string into a data structure

    #[proc_macro_derive(HelloMacro)]
    pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
        // Construct a representation of Rust code as a syntax tree
        // that we can manipulate
        let ast = syn::parse(input).unwrap(); // panic if fail

        // Build the trait implementation
        impl_hello_macro(&ast)
    }
    /*
    DeriveInput {
        // --snip--

        ident: Ident {
            ident: "Pancakes", // -> identifier ~ name
            span: #0 bytes(95..103)
        },
        data: Struct(
            DataStruct {
                struct_token: Struct,
                fields: Unit,
                semi_token: Some(
                    Semi
                )
            }
        )
    }
    */
    fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
        let name = &ast.ident; // get struct name
        // quote! macro let us define the Rust code
        let gen = quote! {
            impl HelloMacro for #name { // #name -> templating mechanic (replace with the variable name)
                fn hello_macro() {
                    // stringtify!: at compile time turns the expression into a string
                    println!("Hello, Macro! My name is {}!", stringify!(#name));
                }
            }
        };
        gen.into() // convert to a TokenStream
    }
    ```

## Atribute-like macros

- Allow us to create new attributes
- Can apply to structs, enums and other items (functions,...)
    ```rust
    #[route(GET, "/")]
    fn index() {}

    // macro
    #[proc_macro_attribute]
    pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {}
    // takes 2 parameters
    ```

## Function-like macros

- Look like function calls
- Thay can take unknown number of arguments
    ```rust
    let sql = sql!(SELECT * FROM posts WHERE id=1);

    // macro
    #[proc_macro]
    pub fn sql(input: TokenStream) -> TokenStream {}
    // we receive the tokens and return the code we wnat to generate
    ```

## Vocab

- procedural /prəˈsiːdʒərəl/: involving or following a formal procedure
- precede /prɪˈsiːd/: to happen before something or come before something/somebody in order (đứng trước)