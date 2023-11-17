
# Use gpg key to sign commit

> https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification


## [Genrate GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)

## Import exsiting gpg key

![[linux.command.export-gpg#import]]

## Set up git gpg key

- Show current gpg keys
  ```
  gpg --list-secret-keys --keyid-format=long
  ```
- add gpg key to Github
    - Settings
    - Access
    - SSH & GPG keys
    - New GPG key
    - Paste the key
    - Add GPG Key
- Add gpg key to Git
    - list existing key
    ```
    $ gpg --list-secret-keys --keyid-format=long

    ### EXAMPLE RESPONSE
    /Users/hubot/.gnupg/secring.gpg
    ------------------------------------
    sec   4096R/<em>3AA5C34371567BD2</em> 2016-03-10 [expires: 2017-03-10]
    uid                          Hubot <hubot@example.com>
    ssb   4096R/42B317FD4BA89E7A 2016-03-10
    ```
    => key id: **3AA5C34371567BD2**
    - Add to Git
      ```
      git config --global user.signingkey <key id>
      git config --global commit.gpgsign true
      ```
    - Add to `.bashrc` for startup setting
      ```
      $ [ -f ~/.bashrc ] && echo 'export GPG_TTY=$(tty)' >> ~/.bashrc
      ```

## Set up VS Code

- Enable auto signing
  ```
  # settings.json
  "git.enableCommitSigning": true
  ```