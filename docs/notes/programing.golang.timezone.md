---
id: 7olrlk5xigyzi2r1umkjte0
title: Timezone
desc: ''
updated: 1661741468958
created: 1661653208669
---

## Show available timezone

> https://stackoverflow.com/questions/40120056/get-a-list-of-valid-time-zones-in-go

```go
import (
    "fmt"
    "io/ioutil"
    "strings"
)

var zoneDirs = []string{
    // Update path according to your OS
    "/usr/share/zoneinfo/",
    "/usr/share/lib/zoneinfo/",
    "/usr/lib/locale/TZ/",
}

var zoneDir string

func main() {
    for _, zoneDir = range zoneDirs {
        ReadFile("")
    }
}

func ReadFile(path string) {
    files, _ := ioutil.ReadDir(zoneDir + path)
    for _, f := range files {
        if f.Name() != strings.ToUpper(f.Name()[:1]) + f.Name()[1:] {
            continue
        }
        if f.IsDir() {
            ReadFile(path + "/" + f.Name())
        } else {
            fmt.Println((path + "/" + f.Name())[1:])
        }
    }
}
```