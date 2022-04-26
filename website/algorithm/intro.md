---
sidebar_position: 1
---

- [Các dạng thuật toán](#các-dạng-thuật-toán)
- [Tổng hợp các câu hỏi](#tổng-hợp-các-câu-hỏi)
- [Tracking](#tracking)
  - [Array & Hashing](#array--hashing)
  - [Two Pointers](#two-pointers)
  - [Sliding Windows](#sliding-windows)
  - [Stack](#stack)
  - [Binary Search](#binary-search)
  - [Linked List](#linked-list)
  - [Trees](#trees)
  - [Tries](#tries)
  - [Heap / Priority Queue](#heap--priority-queue)
  - [Backtracking](#backtracking)
  - [Graphs](#graphs)
  - [Advanced Graphs](#advanced-graphs)
  - [1-D Dynamic Programming](#1-d-dynamic-programming)
  - [2-D Dynamic Programming](#2-d-dynamic-programming)
  - [Greedy](#greedy)
  - [Intervals](#intervals)
  - [Math & Geometry](#math--geometry)
  - [Bit Manipulation](#bit-manipulation)
- [References](#references)

# Các dạng thuật toán
- Theo như trang [Algo.monster](https://algo.monster/problems/stats), các topic thuật toán được phân loại theo độ khó và ROI như bảng sau
    - | Topic               | Difficulty | ROI    |
      |---------------------|------------|--------|
      | LinkedList          | Low        | High   |
      | Tree BFS            | Low        | High   |
      | 2 Pointers          | Medium     | High   |
      | Graph BFS           | Medium     | High   |
      | Hash                | Medium     | High   |
      | Tree DFS            | Medium     | High   |
      | Binary Search       | Medium     | Medium |
      | Combinatorial DFS   | Medium     | Medium |
      | Graph DFS           | Medium     | Medium |
      | Heap                | Medium     | Medium |
      | Trie                | Medium     | Medium |
      | Union Find          | Medium     | Low    |
      | Divide and Conquer  | High       | Low    |
      | Dynamic Programming | High       | Low    |
      | Greedy              | High       | Low    |

# Tổng hợp các câu hỏi
- Một danh sách câu hỏi nổi tiếng để ôn thuật toán thường được nhắc đến là [Curated List of Top 75 LeetCode Questions](https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU)
  - [Leetcode version](https://leetcode.com/list/xoqag3yj/)

# Tracking

## Array & Hashing 

| NAME                         | LINK                                                       | DIFFICULTY | Golang |  Rust   |
|------------------------------|------------------------------------------------------------|:----------:|:------:|:-------:|
| Contains Duplicate           | https://leetcode.com/problems/contains-duplicate           |    Easy    |    x   |   x     |
| Valid Anagram                | https://leetcode.com/problems/valid-anagram                |    Easy    |    x   |   x     |
| Two Sum                      | https://leetcode.com/problems/two-sum                      |    Easy    |    x   |   x     |
| Group Anagrams               | https://leetcode.com/problems/group-anagrams               |   Medium   |        |         |
| Top K Frequent Elements      | https://leetcode.com/problems/top-k-frequent-elements      |   Medium   |        |         |
| Product of Array Except Self | https://leetcode.com/problems/product-of-array-except-self |   Medium   |        |         |
| Valid Sudoku                 | https://leetcode.com/problems/valid-sudoku                 |   Medium   |        |         |
| Encode and Decode Strings    | https://leetcode.com/problems/encode-and-decode-strings    |   Medium   |        |         |
| Longest Consecutive Sequence | https://leetcode.com/problems/longest-consecutive-sequence |   Medium   |        |         |

## Two Pointers

| NAME                      | LINK                                                    | DIFFICULTY | Golang  | Rust |
|---------------------------|---------------------------------------------------------|:----------:|:-------:|------|
| Valid Palindrome          | https://leetcode.com/problems/valid-palindrome          |    Easy    |    x    |      |
| Two Sum II                | https://leetcode.com/problems/two-sum-ii                |    Easy    |    x    |      |
| 3Sum                      | https://leetcode.com/problems/3sum                      |   Medium   |         |      |
| Container with Most Water | https://leetcode.com/problems/container-with-most-water |   Medium   |         |      |
| Trapping Rain Water       | https://leetcode.com/problems/trapping-rain-water       |    Hard    |         |      |

## Sliding Windows

| NAME                                           | LINK                                                                         | DIFFICULTY | Golang | Rust |
|------------------------------------------------|------------------------------------------------------------------------------|:----------:|:------:|:----:|
| Best Time to Buy & Sell Stock                  | https://leetcode.com/problems/best-time-to-buy-&-sell-stock                  | Easy       |        |      |
| Longest Substring Without Repeating Characters | https://leetcode.com/problems/longest-substring-without-repeating-characters | Medium     |        |      |
| Longest Repeating Character Replacement        | https://leetcode.com/problems/longest-repeating-character-replacement        | Medium     |        |      |
| Permutation in String                          | https://leetcode.com/problems/permutation-in-string                          | Medium     |        |      |
| Minimum Window Substring                       | https://leetcode.com/problems/minimum-window-substring                       | Hard       |        |      |
| Sliding Window Maximum                         | https://leetcode.com/problems/sliding-window-maximum                         | Hard       |        |      |

## Stack

| NAME                             | LINK                                                           | DIFFICULTY |  Golang  | Rust  |
|----------------------------------|----------------------------------------------------------------|:----------:|:--------:|:-----:|
| Valid Parentheses                | https://leetcode.com/problems/valid-parentheses                | Easy       |    x     |   x   |
| Min Stack                        | https://leetcode.com/problems/min-stack                        | Easy       |          |       |
| Evaluate Reverse Polish Notation | https://leetcode.com/problems/evaluate-reverse-polish-notation | Medium     |          |       |
| Generate Parentheses             | https://leetcode.com/problems/generate-parentheses             | Medium     |          |       |
| Daily Temperatures               | https://leetcode.com/problems/daily-temperatures               | Medium     |          |       |
| Car Fleet                        | https://leetcode.com/problems/car-fleet                        | Medium     |          |       |
| Largest Rectangle in Histogram   | https://leetcode.com/problems/largest-rectangle-in-histogram   | Hard       |          |       |

## Binary Search

| NAME                                 | LINK                                                               | DIFFICULTY | Golang | Rust |
|--------------------------------------|--------------------------------------------------------------------|:----------:|:------:|:----:|
| Binary Search                        | https://leetcode.com/problems/binary-search                        | Easy       |    x   |      |
| Search a 2D Matrix                   | https://leetcode.com/problems/search-a-2d-matrix                   | Medium     |        |      |
| Koko Eating Bananas                  | https://leetcode.com/problems/koko-eating-bananas                  | Medium     |        |      |
| Search Rotated Sorted Array          | https://leetcode.com/problems/search-rotated-sorted-array          | Medium     |        |      |
| Find Minimum in Rotated Sorted Array | https://leetcode.com/problems/find-minimum-in-rotated-sorted-array | Medium     |        |      |
| Time Based Key-Value Store           | https://leetcode.com/problems/time-based-key-value-store           | Medium     |        |      |
| Find Median of Two Sorted Arrays     | https://leetcode.com/problems/find-median-of-two-sorted-arrays     | Hard       |        |      |

## Linked List

| NAME                             | LINK                                                           | DIFFICULTY | Golang | Rust |
|----------------------------------|----------------------------------------------------------------|:----------:|:------:|:----:|
| Reverse Linked List              | https://leetcode.com/problems/reverse-linked-list              | Easy       |    x   |   -  |
| Merge Two Linked Lists           | https://leetcode.com/problems/merge-two-linked-lists           | Easy       |    x   |      |
| Reorder List                     | https://leetcode.com/problems/reorder-list                     | Medium     |        |      |
| Remove Nth Node from End of List | https://leetcode.com/problems/remove-nth-node-from-end-of-list | Medium     |        |      |
| Copy List with Random Pointer    | https://leetcode.com/problems/copy-list-with-random-pointer    | Medium     |        |      |
| Add Two Numbers                  | https://leetcode.com/problems/add-two-numbers                  | Medium     |        |      |
| Linked List Cycle                | https://leetcode.com/problems/linked-list-cycle                | Medium     |        |      |
| Find the Duplicate Number        | https://leetcode.com/problems/find-the-duplicate-number        | Medium     |        |      |
| LRU Cache                        | https://leetcode.com/problems/lru-cache                        | Medium     |        |      |
| Merge K Sorted Lists             | https://leetcode.com/problems/merge-k-sorted-lists             | Hard       |        |      |
| Reverse Nodes in K-Group         | https://leetcode.com/problems/reverse-nodes-in-k-group         | Hard       |        |      |

## Trees

| NAME                                               | LINK                                                                             | DIFFICULTY | Golang | Rust |
|----------------------------------------------------|----------------------------------------------------------------------------------|:----------:|:------:|:----:|
| Invert Binary Tree                                 | https://leetcode.com/problems/invert-binary-tree                                 | Easy       |    x   |   -  |
| Maximum Depth of Binary Tree                       | https://leetcode.com/problems/maximum-depth-of-binary-tree                       | Easy       |        |      |
| Diameter of a Binary Tree                          | https://leetcode.com/problems/diameter-of-a-binary-tree                          | Easy       |        |      |
| Balanced Binary Tree                               | https://leetcode.com/problems/balanced-binary-tree                               | Easy       |        |      |
| Same Tree                                          | https://leetcode.com/problems/same-tree                                          | Easy       |        |      |
| Subtree of Another Tree                            | https://leetcode.com/problems/subtree-of-another-tree                            | Easy       |        |      |
| Lowest Common Ancestor of a BST                    | https://leetcode.com/problems/lowest-common-ancestor-of-a-bst                    | Medium     |        |      |
| Binary Tree Level Order Traversal                  | https://leetcode.com/problems/binary-tree-level-order-traversal                  | Medium     |        |      |
| Binary Tree Right Side View                        | https://leetcode.com/problems/binary-tree-right-side-view                        | Medium     |        |      |
| Count Good Nodes in a Binary Tree                  | https://leetcode.com/problems/count-good-nodes-in-a-binary-tree                  | Medium     |        |      |
| Validate Binary Search Tree                        | https://leetcode.com/problems/validate-binary-search-tree                        | Medium     |        |      |
| Kth Smallest Element in a BST                      | https://leetcode.com/problems/kth-smallest-element-in-a-bst                      | Medium     |        |      |
| Construct Tree from Preorder and Inorder Traversal | https://leetcode.com/problems/construct-tree-from-preorder-and-inorder-traversal | Medium     |        |      |
| Binary Tree Max Path Sum                           | https://leetcode.com/problems/binary-tree-max-path-sum                           | Hard       |        |      |

## Tries

| NAME                                      | LINK                                                                    | DIFFICULTY | Golang | Rust |
|-------------------------------------------|-------------------------------------------------------------------------|:----------:|:------:|:----:|
| Implement Trie                            | https://leetcode.com/problems/implement-trie                            | Medium     |    x   |   -  |
| Design Add and Search Word Data Structure | https://leetcode.com/problems/design-add-and-search-word-data-structure | Medium     |        |      |
| Word Search II                            | https://leetcode.com/problems/word-search-ii                            | Easy       |        |      |

## Heap / Priority Queue

| NAME                            | LINK                                                          | DIFFICULTY | Golang | Rust |
|---------------------------------|---------------------------------------------------------------|:----------:|:------:|:----:|
| Kth Largest Element in a Stream | https://leetcode.com/problems/kth-largest-element-in-a-stream | Easy       |    -   |   -  |
| Last Stone Weight               | https://leetcode.com/problems/last-stone-weight               | Easy       |        |      |
| K Closest Points to Origin      | https://leetcode.com/problems/k-closest-points-to-origin      | Medium     |        |      |
| Kth Largest Element in an Array | https://leetcode.com/problems/kth-largest-element-in-an-array | Medium     |        |      |
| Task Scheduler                  | https://leetcode.com/problems/task-scheduler                  | Medium     |        |      |
| Design Twitter                  | https://leetcode.com/problems/design-twitter                  | Medium     |        |      |
| Find Median from Data Stream    | https://leetcode.com/problems/find-median-from-data-stream    | Medium     |        |      |

## Backtracking

| NAME                                  | LINK                                                                | DIFFICULTY | Golang | Rust |
|---------------------------------------|---------------------------------------------------------------------|:----------:|:------:|:----:|
| Subsets                               | https://leetcode.com/problems/subsets                               | Medium     |    -   |   -  |
| Combination Sum                       | https://leetcode.com/problems/combination-sum                       | Medium     |        |      |
| Permutations                          | https://leetcode.com/problems/permutations                          | Medium     |        |      |
| Subsets II                            | https://leetcode.com/problems/subsets-ii                            | Medium     |        |      |
| Combination Sum II                    | https://leetcode.com/problems/combination-sum-ii                    | Medium     |        |      |
| Word Search                           | https://leetcode.com/problems/word-search                           | Medium     |        |      |
| Palindrome Partitioning               | https://leetcode.com/problems/palindrome-partitioning               | Medium     |        |      |
| Letter Combinations of a Phone Number | https://leetcode.com/problems/letter-combinations-of-a-phone-number | Medium     |        |      |
| N-Queens                              | https://leetcode.com/problems/n-queens                              | Medium     |        |      |

## Graphs

| NAME                                      | LINK                                                                    | DIFFICULTY | Golang | Rust |
|-------------------------------------------|-------------------------------------------------------------------------|:----------:|:------:|:----:|
| Number of Islands                         | https://leetcode.com/problems/number-of-islands                         | Medium     |    -   |   -  |
| Clone Graph                               | https://leetcode.com/problems/clone-graph                               | Medium     |        |      |
| Max Area of Island                        | https://leetcode.com/problems/max-area-of-island                        | Medium     |        |      |
| Pacific Atlantic Waterflow                | https://leetcode.com/problems/pacific-atlantic-waterflow                | Medium     |        |      |
| Surrounded Regions                        | https://leetcode.com/problems/surrounded-regions                        | Medium     |        |      |
| Rotting Oranges                           | https://leetcode.com/problems/rotting-oranges                           | Medium     |        |      |
| Walls and Gates                           | https://leetcode.com/problems/walls-and-gates                           | Medium     |        |      |
| Course Schedule                           | https://leetcode.com/problems/course-schedule                           | Medium     |        |      |
| Course Schedule II                        | https://leetcode.com/problems/course-schedule-ii                        | Medium     |        |      |
| Redundant Connection                      | https://leetcode.com/problems/redundant-connection                      | Medium     |        |      |
| Number of Connected Componenents in Graph | https://leetcode.com/problems/number-of-connected-componenents-in-graph | Medium     |        |      |
| Graph Valid Tree                          | https://leetcode.com/problems/graph-valid-tree                          | Medium     |        |      |
| Word Ladder                               | https://leetcode.com/problems/word-ladder                               | Medium     |        |      |

## Advanced Graphs

| NAME                            | LINK                                                          | DIFFICULTY | Golang | Rust |
|---------------------------------|---------------------------------------------------------------|:----------:|:------:|:----:|
| Reconstruct Itinerary           | https://leetcode.com/problems/reconstruct-itinerary           | Hard       |    -   |   -  |
| Min Cost to Connect all Points  | https://leetcode.com/problems/min-cost-to-connect-all-points  | Medium     |        |      |
| Network Delay Time              | https://leetcode.com/problems/network-delay-time              | Medium     |        |      |
| Swim in Rising Water            | https://leetcode.com/problems/swim-in-rising-water            | Hard       |        |      |
| Alien Dictionary                | https://leetcode.com/problems/alien-dictionary                | Hard       |        |      |
| Cheapest Flights Within K Stops | https://leetcode.com/problems/cheapest-flights-within-k-stops | Medium     |        |      |

## 1-D Dynamic Programming

| NAME                           | LINK                                                         | DIFFICULTY | Golang | Rust |
|--------------------------------|--------------------------------------------------------------|:----------:|:------:|:----:|
| Climbing Stairs                | https://leetcode.com/problems/climbing-stairs                | Easy       |    -   |   -  |
| Min Cost Climbing Stairs       | https://leetcode.com/problems/min-cost-climbing-stairs       | Easy       |        |      |
| House Robber                   | https://leetcode.com/problems/house-robber                   | Medium     |        |      |
| House Robber II                | https://leetcode.com/problems/house-robber-ii                | Medium     |        |      |
| Longest Palindromic Substring  | https://leetcode.com/problems/longest-palindromic-substring  | Medium     |        |      |
| Palindromic Substrings         | https://leetcode.com/problems/palindromic-substrings         | Medium     |        |      |
| Decode Ways                    | https://leetcode.com/problems/decode-ways                    | Medium     |        |      |
| Coin Change                    | https://leetcode.com/problems/coin-change                    | Medium     |        |      |
| Maximum Product Subarray       | https://leetcode.com/problems/maximum-product-subarray       | Medium     |        |      |
| Word Break                     | https://leetcode.com/problems/word-break                     | Medium     |        |      |
| Longest Increasing Subsequence | https://leetcode.com/problems/longest-increasing-subsequence | Medium     |        |      |
| Partition Equal Subset Sum     | https://leetcode.com/problems/partition-equal-subset-sum     | Medium     |        |      |

## 2-D Dynamic Programming

| NAME                                      | LINK                                                                    | DIFFICULTY | Golang | Rust |
|-------------------------------------------|-------------------------------------------------------------------------|:----------:|:------:|:----:|
| Unique Paths                              | https://leetcode.com/problems/unique-paths                              | Medium     |    -   |   -  |
| Longest Common Subsequence                | https://leetcode.com/problems/longest-common-subsequence                | Medium     |        |      |
| Best Time to Buy/Sell Stock With Cooldown | https://leetcode.com/problems/best-time-to-buy/sell-stock-with-cooldown | Medium     |        |      |
| Coin Change II                            | https://leetcode.com/problems/coin-change-ii                            | Medium     |        |      |
| Target Sum                                | https://leetcode.com/problems/target-sum                                | Medium     |        |      |
| Interleaving String                       | https://leetcode.com/problems/interleaving-string                       | Medium     |        |      |
| Longest Increasing Path in a Matrix       | https://leetcode.com/problems/longest-increasing-path-in-a-matrix       | Medium     |        |      |
| Distinct Subsequences                     | https://leetcode.com/problems/distinct-subsequences                     | Hard       |        |      |
| Edit Distance                             | https://leetcode.com/problems/edit-distance                             | Hard       |        |      |
| Burst Balloons                            | https://leetcode.com/problems/burst-balloons                            | Hard       |        |      |
| Regular Expression Matching               | https://leetcode.com/problems/regular-expression-matching               | Medium     |        |      |

## Greedy

| NAME                                  | LINK                                                                | DIFFICULTY | Golang | Rust |
|---------------------------------------|---------------------------------------------------------------------|:----------:|:------:|:----:|
| Maximum Subarray                      | https://leetcode.com/problems/maximum-subarray                      | Easy       |    -   |   -  |
| Jump Game                             | https://leetcode.com/problems/jump-game                             | Medium     |        |      |
| Jump Game II                          | https://leetcode.com/problems/jump-game-ii                          | Medium     |        |      |
| Gas Station                           | https://leetcode.com/problems/gas-station                           | Medium     |        |      |
| Hand of Straights                     | https://leetcode.com/problems/hand-of-straights                     | Medium     |        |      |
| Merge Triplets to Form Target Triplet | https://leetcode.com/problems/merge-triplets-to-form-target-triplet | Medium     |        |      |
| Partition Labels                      | https://leetcode.com/problems/partition-labels                      | Medium     |        |      |
| Valid Parenthesis String              | https://leetcode.com/problems/valid-parenthesis-string              | Hard       |        |      |

## Intervals

| NAME                                   | LINK                                                                 | DIFFICULTY | Golang | Rust |
|----------------------------------------|----------------------------------------------------------------------|:----------:|:------:|:----:|
| Insert Interval                        | https://leetcode.com/problems/insert-interval                        | Medium     |    -   |   -  |
| Merge Intervals                        | https://leetcode.com/problems/merge-intervals                        | Medium     |        |      |
| Non-Overlapping Intervals              | https://leetcode.com/problems/non-overlapping-intervals              | Medium     |        |      |
| Meeting Rooms                          | https://leetcode.com/problems/meeting-rooms                          | Easy       |        |      |
| Meeting Rooms II                       | https://leetcode.com/problems/meeting-rooms-ii                       | Medium     |        |      |
| Minimum Interval to Include Each Query | https://leetcode.com/problems/minimum-interval-to-include-each-query | Medium     |        |      |

## Math & Geometry

| NAME              | LINK                                            | DIFFICULTY | Golang | Rust |
|-------------------|-------------------------------------------------|:----------:|:------:|:----:|
| Rotate Image      | https://leetcode.com/problems/rotate-image      | Medium     |    -   |   -  |
| Spiral Matrix     | https://leetcode.com/problems/spiral-matrix     | Medium     |        |      |
| Set Matrix Zeroes | https://leetcode.com/problems/set-matrix-zeroes | Medium     |        |      |
| Happy Number      | https://leetcode.com/problems/happy-number      | Easy       |        |      |
| Plus One          | https://leetcode.com/problems/plus-one          | Easy       |        |      |
| Pow(x, n)         | https://leetcode.com/problems/pow(x,-n)         | Medium     |        |      |
| Multiply Strings  | https://leetcode.com/problems/multiply-strings  | Medium     |        |      |
| Detect Squares    | https://leetcode.com/problems/detect-squares    | Hard       |        |      |

## Bit Manipulation

| NAME                | LINK                                              | DIFFICULTY | Golang | Rust |
|---------------------|---------------------------------------------------|:----------:|:------:|:----:|
| Single Number       | https://leetcode.com/problems/single-number       | Easy       |    -   |   -  |
| Number of 1 Bits    | https://leetcode.com/problems/number-of-1-bits    | Easy       |        |      |
| Counting Bits       | https://leetcode.com/problems/counting-bits       | Easy       |        |      |
| Reverse Bits        | https://leetcode.com/problems/reverse-bits        | Easy       |        |      |
| Missing Number      | https://leetcode.com/problems/missing-number      | Easy       |        |      |
| Sum of Two Integers | https://leetcode.com/problems/sum-of-two-integers | Medium     |        |      |
| Reverse Integer     | https://leetcode.com/problems/reverse-integer     | Medium     |        |      |

# References

- https://neetcode.io/
