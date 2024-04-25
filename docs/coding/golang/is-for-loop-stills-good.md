# Is for loop still good

## Question: O(n) vs O(1)

- We all know that accessing a hashmap element costs O(1) of time and finding an element inside an array costs O(n) of time.
- But
    - O(1) is the hashing function cost 
    - O(n) is the number of elements
- How large of an array must be, that the finding loop cost exceeds the cost of the hashing function?

## Benchmark in Golang

- Code: [https://github.com/thanhpp/gopher/blob/main/cmd/bench-hashmap/bench-hashmap_test.go](https://github.com/thanhpp/gopher/blob/main/cmd/bench-hashmap/bench-hashmap_test.go)
- Method: create slices and methods with different sizes, then choose a random number to search.
- Result

```
go test -bench=. -benchmem
goos: linux
goarch: amd64
pkg: github.com/thanhpp/gopher/bench-hashmap
cpu: AMD Ryzen 5 5600G with Radeon Graphics
BenchmarkSliceInt/size_1-12             125404327                9.605 ns/op           0 B/op          0 allocs/op
BenchmarkSliceInt/size_5-12             69207064                17.54 ns/op            0 B/op          0 allocs/op
BenchmarkSliceInt/size_10-12            63447366                18.60 ns/op            0 B/op          0 allocs/op
BenchmarkSliceInt/size_20-12            58960952                20.43 ns/op            0 B/op          0 allocs/op
BenchmarkSliceInt/size_30-12            54392230                21.73 ns/op            0 B/op          0 allocs/op
BenchmarkSliceInt/size_40-12            53013524                23.26 ns/op            0 B/op          0 allocs/op
BenchmarkSliceInt/size_50-12            49305501                24.35 ns/op            0 B/op          0 allocs/op

BenchmarkMapInt/size_1-12               106518439               11.28 ns/op            0 B/op          0 allocs/op
BenchmarkMapInt/size_5-12               67979809                18.07 ns/op            0 B/op          0 allocs/op
BenchmarkMapInt/size_10-12              47070580                26.61 ns/op            0 B/op          0 allocs/op
BenchmarkMapInt/size_20-12              45591961                26.35 ns/op            0 B/op          0 allocs/op
BenchmarkMapInt/size_30-12              44955747                27.24 ns/op            0 B/op          0 allocs/op
BenchmarkMapInt/size_40-12              46008104                25.74 ns/op            0 B/op          0 allocs/op
BenchmarkMapInt/size_50-12              42991318                27.75 ns/op            0 B/op          0 allocs/op

BenchmarkSliceString/size_1-12          94805643                12.54 ns/op            0 B/op          0 allocs/op
BenchmarkSliceString/size_5-12          53173370                22.47 ns/op            0 B/op          0 allocs/op
BenchmarkSliceString/size_10-12         42057357                28.63 ns/op            0 B/op          0 allocs/op
BenchmarkSliceString/size_20-12         34653843                34.05 ns/op            0 B/op          0 allocs/op
BenchmarkSliceString/size_30-12         28817215                41.65 ns/op            0 B/op          0 allocs/op
BenchmarkSliceString/size_40-12         23304921                52.29 ns/op            0 B/op          0 allocs/op
BenchmarkSliceString/size_50-12         19114158                62.58 ns/op            0 B/op          0 allocs/op

BenchmarkMapString/size_1-12            93007335                13.08 ns/op            0 B/op          0 allocs/op
BenchmarkMapString/size_5-12            52409577                23.35 ns/op            0 B/op          0 allocs/op
BenchmarkMapString/size_10-12           42127460                26.81 ns/op            0 B/op          0 allocs/op
BenchmarkMapString/size_20-12           39925528                30.12 ns/op            0 B/op          0 allocs/op
BenchmarkMapString/size_30-12           43890310                27.75 ns/op            0 B/op          0 allocs/op
BenchmarkMapString/size_40-12           39024145                31.18 ns/op            0 B/op          0 allocs/op
BenchmarkMapString/size_50-12           37039489                32.53 ns/op            0 B/op          0 allocs/op
PASS
ok      github.com/thanhpp/gopher/bench-hashmap 45.370s
```

- Analytic: 
    - The slice loop cost increases with the size of the slice (of course ^^).
    - When the sizes are small enough (1, 5, 10): the cost of searching in a slice is cheaper.
    - The cost of accessing a map in Golang is not a constant
        - When the size reaches a threshold, the cost increases significantly. (1 -> 5/10)
        - https://github.com/golang/go/blob/master/src/runtime/map.go
    - With different types
        - For slices, searching for integers is faster than searching for strings (which might be caused by the compare cost).
        - For maps, searching for both types shows similar results.
