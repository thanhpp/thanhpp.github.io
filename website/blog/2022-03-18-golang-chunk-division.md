---
slug: go-chunk-division
title: Golang chunk
authors: thanhpp
tags: [golang]
---


```go
// https://go.dev/play/p/cI2Omh2RPA3
package main

import "fmt"

func main() {
	var (
		actual    = 9
		limit     = 301
		chunkSize = 100
	)

	if limit < chunkSize {
		if actual < limit {
			fmt.Println("actual < limit", actual)
			return
		}
		fmt.Println("actual >= limit", limit)
	}

	chunkNo := limit/chunkSize + 1
	fmt.Println("Got chunk number:", chunkNo)
	for i := 0; i < chunkNo; i++ {
		var (
			start = i * chunkSize
			end   = (i + 1) * chunkSize
		)

		if i == chunkNo-1 {
			// process the last chunk
			if leftOver := limit % chunkSize; leftOver != 0 {
				end = (i)*chunkSize + leftOver
			}
		}
		if actual < 0 { // nothing more
			break
		}
		fmt.Println("chunk", i, "Actual =", actual)
		actual -= chunkSize

		fmt.Printf("chunk %d: %d -> %d \n", i, start, end)
	}
}

```
