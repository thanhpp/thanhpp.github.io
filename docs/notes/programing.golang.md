---
id: z70kjoz28s8p41pgxrounpu
title: Golang
desc: ''
updated: 1680756053883
created: 1680749074288
---
## slice modify

```go
func TestModifySlice(t *testing.T) {
	fn1 := func(a []int) {
		a = append(a, 1)
	}

	a1 := []int{0}
	fn1(a1)

	assert.NotEqual(t, a1, []int{0, 1})

	fn2 := func(a *[]int) {
		*a = append(*a, 1)
	}
	a2 := []int{0}
	fn2(&a2)

	assert.Equal(t, a2, []int{0, 1})
}

```