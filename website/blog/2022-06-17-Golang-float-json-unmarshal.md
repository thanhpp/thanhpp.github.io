---
slug: golang-json-float64-unmarshal
title: Cách unmarshal float64 từ JSON
authors: thanhpp
tags: [golang]
---

Thêm **,string** trong tag json ở struct giúp unmarshal float64 từ string mà không cần convert (pkg json của golang tự parse)

Golang struct

```go
type Example struct {
  F64Num float64 `json:"number,string"` 
}
```

JSON (example.json)

```json
{
  "number": "1.23"
}
```

Code

```go
data, _ := ioutil.ReadFile("example.json")
exp := new(Example)

if err := json.Unmarshal(data, exp); err != nil {
  panic(err) 
}

fmt.Println(exp.F64Num) // 1.23
```
