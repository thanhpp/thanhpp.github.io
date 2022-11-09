---
id: 6g647fy4ijl714fmsg6hl3z
title: Multiple Accounts
desc: ''
updated: 1662568538052
created: 1662568186611
---

# Set up multiple git accounts

## Using includeIf

- Edit the global git config (~/.gitconfig)
  ```
  [includeIf "gitdir:<path to top level directory>"]
    path = <git config path>
  ```
- **only available for sub folders of the top level directory**
- Must below all config
- Global apply
  ```
  [include]
    path = <global git config>
  ```

## Using insteadOf

- set multiple insteadOf based on pattern matching
  ```
    [url "https://<accessToken1>@github.com/<org1>"]
            insteadOf = https://github.com/<org1>
    [url "https://<accessToken2>@github.com"]
            insteadOf = https://github.com
  ```
- useful for [[programing.golang]] modules