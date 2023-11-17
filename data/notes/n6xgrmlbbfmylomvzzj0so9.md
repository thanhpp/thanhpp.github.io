
# API Gateway

> Ref: https://youtu.be/6ULyxuHKxg8

## Def

- A middle layer stands between the client and backend services

## Functions

- Authentication & security enhancement
- routing & service discovery
- Optional:
    - protocol conversion (HTTP -> UDP/gRPC/TCP) 
    - logging
    - monitoring
        - analytics 
    - error handling
        - circuit breaker (Prevent overloaded service)
        - default error handler
```
Parameter validation -> allow/deny list -> authen/author -> rate-limit ->
-> service discovery -> protocol conversion ->
-> BackEnd services
```         
