---
slug: go-empty-ticker
title: Golang ticker rỗng
authors: thanhpp
tags: [golang]
---

## Zero value ticker

```go
// You can edit this code!
// Click here and start typing.
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	var (
		tk          time.Ticker
		ctx, cancel = context.WithCancel(context.Background())
	)
	go func() {
		for {
			select {
			case <-tk.C:
				fmt.Println("Hello")
			case <-ctx.Done():
				tk.Stop()
				fmt.Println("ctx Done")
				return
			}
		}
	}()
	time.Sleep(time.Second)
	cancel()
	time.Sleep(time.Second)
  
  // output: ctx Done
}

```

## Ticker pointer

```go
// You can edit this code!
// Click here and start typing.
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	var (
		tk          *time.Ticker
		ctx, cancel = context.WithCancel(context.Background())
	)

	go func() {
		for {
			select {
			case <-tk.C: //  invalid memory address or nil pointer dereference
				fmt.Println("Hello")
			case <-ctx.Done():
				tk.Stop()
				fmt.Println("ctx Done")
				return
			}
		}
	}()
	time.Sleep(time.Second)
	cancel()
	time.Sleep(time.Second)
	
	// Nil pointer Error
}
```

```go
import (
	"context"
	"fmt"
	"time"
)

func main() {
	var (
		tk          = new(time.Ticker)
		ctx, cancel = context.WithCancel(context.Background())
	)

	go func() {
		for {
			select {
			case <-tk.C:
				fmt.Println("Hello")
			case <-ctx.Done():
				tk.Stop()
				fmt.Println("ctx Done")
				return
			}
		}
	}()
	time.Sleep(time.Second)
	cancel()
	time.Sleep(time.Second)  
	// output: ctx Done
}
```

## 0 duration ticker

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	var (
		tk          *time.Ticker
		ctx, cancel = context.WithCancel(context.Background())
	)
	tk = time.NewTicker(0 * time.Second) // panic: non-positive interval for NewTicker
	go func() {
		for {
			select {
			case <-tk.C:
				fmt.Println("Hello")
			case <-ctx.Done():
				tk.Stop()
				fmt.Println("ctx Done")
				return
			}
		}
	}()
	time.Sleep(time.Second)
	cancel()
	time.Sleep(time.Second)
}
```
