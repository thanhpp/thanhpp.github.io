
# Github setup

> https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git

## Basic information

Username, email

```
$ git config --global user.name "<username>"
$ git config --global user.email "<user@email.com>"
```

## Auth

```
git config --global url."https://<github personal access token>@github.com".insteadOf "https://github.com"
```