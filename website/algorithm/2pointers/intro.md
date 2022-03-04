---
id: two-pointers-intro
title: Two Pointers Intro
sidebar_position: 1
tags:
  - TwoPointers
---

## Giới thiệu
- Kỹ thuật này được áp dụng bằng cách tạo ra 2 con trỏ trên cùng một mảng, và với mỗi vòng lặp vị trí các con trỏ này sẽ được thay đổi theo các điều kiện đặt sẵn.
- Các cách áp dụng thường thấy:
  - 2 con trỏ được đặt ở đầu và cuối
  - 2 con trỏ cùng được đặt tại 1 vị trí nhưng điều kiện thay đổi là khác nhau
- Có thể giảm độ phức tạp thuật toán từ O(n^2) xuống thành O(n)
  - Thay vì 2 vòng for lòng nhau 
  - Ta có thể xét cùng lúc 2 phần từ trong 1 vòng lặp