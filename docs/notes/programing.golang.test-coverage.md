---
id: zjr5i3yyqo3to9mwfsx4f6k
title: Test Coverage
desc: ''
updated: 1669357976228
created: 1669357101811
---
# Golang test coverage

> https://eloquentcode.com/create-an-html-test-coverage-report-in-go
> https://blog.seriesci.com/how-to-measure-code-coverage-in-go/

- Run all tests
    ```
    go test -covermode=count -coverpkg=./... -coverprofile cover.out -v ./...
    ```
- Show coverage
    ```
    go tool cover -func cover.out
    ```
- Show html page
    ```
    go tool cover -html cover.out -o cover.html
    ```