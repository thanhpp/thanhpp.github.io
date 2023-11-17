
## Reference Cycle

```rust
use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>), // an element contains its value & the reference to the next value
    Nil,
}

impl List {
    // tail: returns the reference to the next element
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}

fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a)); // 1
    println!("a next item = {:?}", a.tail()); // Some(RefCell { value: Nil })

    // b -> a
    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a)); // 2
    println!("b initial rc count = {}", Rc::strong_count(&b)); // 1
    println!("b next item = {:?}", b.tail()); // a = Some(RefCell { value: Cons(5, RefCell { value: Nil }) })

    // point from a -> b => b -> a -> b
    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b)); // 2
    println!("a rc count after changing a = {}", Rc::strong_count(&a)); // 2

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack <- while printing a, it links to b, then links to a => the value need to be printed is infinite
    // println!("a next item = {:?}", a.tail());
}
// at the end of the main function
// drops b -> strong_count(&b) = 1 -> can not un-allocate
// drops a -> strong_count(&a) = 1 -> can not un-allocate
```

- Reogranize data structures: some references express ownership relationship & some references don't

## Using Weak<T> instead of Rc<T>

- Create a _weak references_ to the value within an `Rc<T>` instance by calling `Rc::downgrade`, then passing a reference to the `Rc<T>`
- Weak references don't express ownership relationship
- `Rc::downgrade -> Weak<T>`: increase the **weak_count**, but the **weak_count** doesn't need to be 0 for the `Rc<T>` to be cleaned up

```rust
// Creating a tree using Weak<T> to refers a Node's parent

use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    // assign the left's parent = branch
    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}

```