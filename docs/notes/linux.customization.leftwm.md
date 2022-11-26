---
id: r0wj411y1iqdz8n8ecseh06
title: Leftwm
desc: ''
updated: 1669456475817
created: 1669455858355
---
# LeftWM - ubuntu

> https://leftwm.org/
> https://github.com/leftwm/leftwm

## Install - Ubuntu (install from source)

- [Install Rust & Cargo](https://rustup.rs/)
    ```
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
- Get source code
    ```bash
    $ git clone https://github.com/leftwm/leftwm
    $ cd leftwm
    ```
- Build
    ```
    cargo build --profile optimized
    ```
- Make leftwm executable
    ```
    sudo install -s -Dm755 ./target/release/leftwm ./target/release/leftwm-worker ./target/release/lefthk-worker ./target/release/leftwm-state ./target/release/leftwm-check ./target/release/leftwm-command -t /usr/bin
    ```
- Create a desktop file
    ```
    sudo cp leftwm.desktop /usr/share/xsessions/
    ```

## Config

> https://github.com/leftwm/leftwm#configuring

- Location: ~/.config/leftwm/config.ron