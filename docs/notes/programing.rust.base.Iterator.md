---
id: 4sslaiv02e24j98fkj9n725
title: Iterator
desc: ''
updated: 1668103830013
created: 1668099415947
---
# Iterator

> https://doc.rust-lang.org/book/ch13-02-iterators.html

## Processing a Series of Items

- An iterator is the logic of iterating over each item & detemining when the sequence has finished.
- Iterators have no effect until you **call methods** that consume the iterator to use it up.

```rust
// print a vector using iterator
let v1 = vec![1, 2, 3];

let v1_iter = v1.iter(); // generate iterator

for val in v1_iter {
    println!("Got: {}", val);
}
```

## The Iterator Trait & the `next` Method

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>; // returns Some(Item) or None. None == over

    // methods with default implementations elided
}
```

```rust
// using the next method
#[test]
fn iterator_demonstration() {
    let v1 = vec![1, 2, 3];

    let mut v1_iter = v1.iter();

    // the next method changes the internal state that the iterator uses to keep track
    // this code consumes or uses up the iterator
    // each `next` eats up an item from the iterator
    assert_eq!(v1_iter.next(), Some(&1)); // the `next` method returns immutable refercences
    assert_eq!(v1_iter.next(), Some(&2));
    assert_eq!(v1_iter.next(), Some(&3));
    assert_eq!(v1_iter.next(), None);
}
```

## Consume the Iterator

- **Consuming adaptors**: Method that call `next`, uses up the iterator

```rust
#[test]
fn iterator_sum() {
    let v1 = vec![1, 2, 3];

    let v1_iter = v1.iter();

    let total: i32 = v1_iter.sum(); // sum takes ownership of the iterator

    assert_eq!(total, 6);
}
```

## Produce other iterators

- **Iterator adaptors**:
    - defined on the iterator
    - don't consume the iterator
    - produce differente iterators (changing some aspect of the orginal iterator)

```rust
let v1: Vec<i32> = vec![1, 2, 3];

let v2: Vec<_> = v1.iter()
    .map(|x| x + 1) // produce a new iterator
    .collect(); // consumes & collects the result values into a collection data type

assert_eq!(v2, vec![2, 3, 4]);
```

## Using closures that capture the environment

```rust
#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

//
fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes
        .into_iter()
        .filter(|s| s.size == shoe_size) // check if shoe size == target size, then add it into the returns value
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn filters_by_size() {
        let shoes = vec![
            Shoe {
                size: 10,
                style: String::from("sneaker"),
            },
            Shoe {
                size: 13,
                style: String::from("sandal"),
            },
            Shoe {
                size: 10,
                style: String::from("boot"),
            },
        ];

        let in_my_size = shoes_in_size(shoes, 10);

        assert_eq!(
            in_my_size,
            vec![
                Shoe {
                    size: 10,
                    style: String::from("sneaker")
                },
                Shoe {
                    size: 10,
                    style: String::from("boot")
                },
            ]
        );
    }
}
```
