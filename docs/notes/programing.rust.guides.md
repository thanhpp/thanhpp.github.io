---
id: oh5egsjgrfha84o768262hu
title: Guides
desc: ''
updated: 1670227729147
created: 1664273232760
---

# Guides

## HTTP

### HTTP Request

> hyper: https://hyper.rs/guides/client/basic/
> reqwest: https://rust-lang-nursery.github.io/rust-cookbook/web/clients/requests.html

- Reqwest
    - Build failed: could not find system library 'openssl'
        - https://github.com/sfackler/rust-openssl/issues/855 
        - `sudo apt-get install pkg-config libssl-dev`


# Cargo

## Import dependencies

- version only
    - edit the Cargo.toml file
        ```toml
        [dependencies]
        reqwest= "0.11"
        ```