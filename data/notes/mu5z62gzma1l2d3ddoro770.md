# Implementing an Objet-Oriented Design Pattern

> https://doc.rust-lang.org/book/ch17-03-oo-design-patterns.html

- The state pattern: we define a set of states a value can have internally.
    - advantage: when the business requirements of the program change, we won't need to change the code of the value holding the state or the code that uses the value.

## Implementation

- Final functionality
    - A blog post starts as an empty draft
    - When the draft is done, a review of the post is requested
    - When the post is approved, it gets published
    - Only published blog posts return content to print, so unapproved post can't accidentally be published
    - **Any other changes attempted on a post should have no effect**

```rust
pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post { // new post will have the Draft state
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }

    // add_text: alter the inner content
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }

    // a draft post should returns empty content
    pub fn content(&self) -> &str {
        ""
    }

    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve())
        }
    }
}

trait State {
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        "" // default -> don't need to implement on the Draft & PendingReview
    }
}

struct Draft {}

impl State for Draft {
    // update state
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview {})
    }

    // do nothing
    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}

struct PendingReview {}

impl State for PendingReview {
    // do nothing
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    // update state
    fn approve(self: Box<Self>) -> Box<dyn State> {
        Box::new(Published {})
    }
}

struct Published {}

impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }

    // returns the content if a post is approved
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        &post.content
    }
}
```

## Trade-off of the State Pattern

- Alternative implementation that didn't use the state pattern, we might instead use `match` expression to checks and changes the behavior.
- Pro: Easy to add a new state without conflict the olds.
- Cons: States are coupled to each other -> need to change if a state is added between 2 existing state