
# Github Analyze

## Why?

- Need to analyze github PRs & commits in a range of time

## How?

- Authorize Github request
    - Use `Authorization: Bearer <Token>` 
- Get github information in a time range
    - https://docs.github.com/en/rest/commits/commits#list-commits
    - per owner, per repo => need to list repos & owners 
- List all Pull request
    - https://docs.github.com/en/rest/pulls/pulls#list-pull-requests
    - per owner, per repo => config

## Todo

- Create a HTTP client
    - basic client: https://hyper.rs/guides/client/basic/
    -  
