---
id: r5ee5da2e9ccswia2nes0fs
title: Redis
desc: ''
updated: 1697425370049
created: 1697424929954
---

## Redis

> https://blog.bytebytego.com/p/the-6-most-impactful-ways-redis-is

### Redis is fast

- In-mem storage & Single threaded

### Caching

- Shortcut access to hot data (high frequent access)
- More complexity to manage cache coherence ("is the uniformity of shared resource data that ends up stored in multiple local caches")
- Tradeoff: Space vs time. Duplicate data -> faster access

### Session store

- Store session in redis instead of in app -> better for load rebalancing
    - No "sticky-session"
- Support expiration