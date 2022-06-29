---
slug: resign-old-commits
title: Resign old commits
authors: thanhpp
tags: [git]
---

## Command 

```
git rebase --exec 'git commit --amend --no-edit -n -S' -i <commitHash>
```

- This command will resign all commit **from the commit after commitHash to the latest commit**
