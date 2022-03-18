---
slug: go-empty-ticker
title: Golang ticker rỗng
authors: thanhpp
tags: [golang]
---


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
