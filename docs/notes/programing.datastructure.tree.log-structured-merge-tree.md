---
id: rzzcdejvex294ozjezmr7n3
title: Log Structured Merge Tree
desc: ''
updated: 1662347805055
created: 1662346854641
---

# Log structured merge tree (LSMT)

> https://www.youtube.com/watch?v=I6jB0nM9SKU

## Overview

- Used for [[database.no-sql]]
- Optimized for **fast writes**

## Write operation

- **Writes are batched in memory** using the memtable
    - memtable: ordered by object key
        - implemented as a Balanced Binary tree
- When the memtable reach a size, it will be sort & flush to the Sorted String Table (SSTable)
    - K-V in a sorted sequence => sequential I/O
    - Most recent segment of the LSMT
    - immutable

## Update existing keys

- new entry is written to the most recent SSTable => Suspendes entries in the old SSTable

## Delete

- Add a **marker (a tombstone)** to the most recent SSTable for the object key

## Read

- Find in the Memtable => Find in the SSTable sequentially

## Save disk space

- Periodical merges & compact
    - delete unused
- Sorted => Fast

## Merges & Compaction

- The SSTables are organized into levels
- Strategies
    - Size Tiered Compaction: Write (Cassandra)
    - Leveld Compaction: Read (RocksDB)

## Optimization

- Summary table: skip 
- Bloom filter: prevent searching for non existing key