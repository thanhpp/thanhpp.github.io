---
id: 3amoxlza8d4xi7i41azkvb1
title: Chat Gpt
desc: ''
updated: 1699525838994
created: 1699524259819
---

## ChatGPT?

### Text Generative Models

- ML algo to create coherent & contextually relevant text based on learned patterns
- Predict the next sequence token using **probability**
  - => hallucunation: unexpected or illogical outputs 
- Probabilities
    - Word to vector
    - Context: Vectors for a sequence of words are adjusted -> **contextualized vectors**
- Predicting the Next word
    - contextualized vectors -> estimate the **likelihood** of what the next word might be
    - How to end: 
        - Readched the end token

### Intro

- RLHF: Reinforcement Learning from **Human Feedback**
    - collect large datasets -> Supervieed policy
    - collect comparision data -> reward model
    - policy + reward model -> auto training
- Number of params: 
    - GPT 3/3.5: 175 B
    - GPT 4: 1_000 B

### What ChatGPT doing

- Tokenize question -> predict the next words based on probability

## Prompts

- Prompts: instructions & context passed
    - Elements
        - **Instruction**
        - **Context**
        - Input data
        - Output indicator

## Basic tasks

- Text summarization
- Text generation
- Code generation
- Role playing

## Risks

- No reasoning ability: 
    - GPT 4 reasoning ability >> 3/3.5
- Data/prompt leaking
    - Hijak LM's output

## Tips

- English: larger dataset
- Reasoning
    - Alias to common knowing: eat ~ subtract
- Chain-of-thought
    - Instructions step by step
    - Zero-shot: **let's think step by step**
- Self-Consistency
    - sample multiple, diverse reasoning paths -> most consisten answer
- GPT 4: Advanced Data Analysis
    - Use code to cover **reasoning skills**
    - Datasheet, image analysis
    - Image generation
    - Browser: Browsing data