---
id: k0eosn94e6nyw26apgcrm6b
title: Process-and-Thread
desc: ''
updated: 1671684531621
created: 1671683921505
---
# Process vs Thread

> https://youtube.com/watch?v=4rLW7zg21gI&feature=shares

- A program: **code** (a set of of processor instructions), that is stored as a file on disk.
- A process: an executing program
    - the program code is loaded into the memory, and executed by the processor
    - the process **resources** is managed by the Operating System
    - each process has it own **memory address space**.
- A thread: the **unit of execution** within a process
    - Main thread: a process has at least 1 thread (1 process ~ 1 thread)
    - A thread has stack, register, program counters
    - Threads within a process share the **same address space**
        - -> communication
        - -> no isolation
- Context switching:
    - The OS saves the current state of a process
    - Then the OS switches to run another process (resume at the running point)
    - between process: expensive (save/load data)
    - between thread: much cheaper
        - fewer states to track
        - no need to save/load virtual pages
- Reduce context switching cost (trade complexity vs context-switching cost)
    - fiber: application manage the task scheduling
    - co-routines