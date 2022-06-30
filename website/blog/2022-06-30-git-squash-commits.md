---
slug: squash-all-commits
title: Squash all commits
authors: thanhpp
tags: [git]
---

## Instruction

Go to current branch
```git
git checkout feature_branch
```

Soft reset don't delete all of your work
```git
git reset --soft main
````

Commit the current change to the repo
```git
git add .
git commit -s -m <your message>
```

## Ref

- https://docs.github.com/en/authentication/managing-commit-signature-verification/checking-for-existing-gpg-keys
