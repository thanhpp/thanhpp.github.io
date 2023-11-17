# Refutability: Whether a Pattern Might fail to Match

> https://doc.rust-lang.org/book/ch18-02-refutability.html

- Patterns come in 2 forms:
    - refutable: Patterns that can **fail to match for some possible value**.
    - inrrefutable: Patterns that will **match for any possible value passed** 
- Irrefutable patterns
    - `let` statements
    - `for` loops
    - function parameters
- Refutable (with compiler warns) & irrefutable 
    - `if let`
    - `while let` 
- `match` arms must be refutable patterns, except for the last arm (any remaining values with an irrefutable pattern)


## Translate

- Refute /rɪˈfyut/: có thể bác bỏ (refute something to prove that something is wrong)