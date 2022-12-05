---
id: wa8w1rh78h3wyeuab62brso
title: RPC-gRPC
desc: ''
updated: 1670214387962
created: 1670213980267
---
# RPC & gRPC

> https://youtu.be/gnchfOojMk4

## RPC - Remote Procedure Call

- RPC: 
    - 1 machine invoke some code on another machine
    - as a local function from user perspective 

## gRPC

- **Protobuf**: protocol buffer
    - binanry encoding format
    - strongly typed (using a proto type)
        - has tools: proto -> code
    - Support many languages
        - => easy to choose
- High performance
    - Protobuf: efficient binanry encoding format
    - Build on HTTP/2 steams
        - multiple streams of message / TCP connection
    - ~ 5 times faster than JSON
- gRPC client/Server -> Encoding/Decoding -> (stub) -> gRPC runtime -> transport layer
- Cons
    - not supported from the browser 

