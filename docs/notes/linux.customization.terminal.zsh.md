---
id: sngth9ps6y3uky4x6k8zpbu
title: Zsh
desc: ''
updated: 1662139490532
created: 1661057988414
---

## Install zsh

- through [oh my zsh](https://github.com/ohmyzsh/ohmyzsh)

```
sudo apt install zsh
```

- change default shell `chsh -s $(which zsh)`

## Install Omz

> https://github.com/ohmyzsh/ohmyzsh

`sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

## Config

- the .omz folder is a git repository 
    - Not suitable for creating soft link
    - just creating soft link for neccesary files
- `.zshrc`: replacement for `.bashrc`
    - move additional commands from `bash.rc` -> `zsh.rc`

### Themes

- place custome theme **files** in `$HOME/.oh-my-zsh/custom/themes`

### Scripts & Aliases

- `$HOME/.oh-my-zsh/custom`
- each file must have the `.zsh` extension


### Completions

- `$HOME/.oh-my-zsh/completions`