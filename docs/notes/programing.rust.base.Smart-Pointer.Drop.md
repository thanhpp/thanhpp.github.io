---
id: eudq6211w4eat9r7c73smm9
title: Drop
desc: ''
updated: 1669044223732
created: 1669043079584
---
# Cleanup with the **Drop trait**

> https://doc.rust-lang.org/book/ch15-03-drop.html

## Intro

- Customize the behaviour when a value is about to **go out of scope**.
    - In the `Smart Pointer` context: **deallocate** the space on the heap 

## The Drop traot

- implement 1 method named `drop`, that takes a mutable reference to `self`
    ```rust
    struct CustomSmartPointer {
        data: String,
    }

    impl Drop for CustomSmartPointer {
        fn drop(&mut self) {
            println!("Dropping CustomSmartPointer with data `{}`!", self.data);
        }
    }

    fn main() {
        let c = CustomSmartPointer {
            data: String::from("my stuff"),
        };
        let d = CustomSmartPointer {
            data: String::from("other stuff"),
        };
        println!("CustomSmartPointers created.");

        // print
        // Dropping CustomSmartPointer with data `other stuff`! --> d.drop()
        // Dropping CustomSmartPointer with data `my stuff`! --> c.drop()
    }
    ```
- Variables are dropped in the reverse order of their creation

## Dropping a value early `std::mem::drop`

- Can not call the `drop` function explicitly --> Might lead to a **double free error**
    ```rust
    fn main() {
        let c = CustomSmartPointer {
            data: String::from("some data"),
        };
        println!("CustomSmartPointer created.");
        drop(c); // Dropping CustomSmartPointer with data `some data`! --> c.drop()
        println!("CustomSmartPointer dropped before the end of main.");
    }
    ```
- References are always valid
    - -> drop gets called only once when the value is no longer being used  