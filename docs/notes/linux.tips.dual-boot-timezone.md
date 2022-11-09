---
id: lsdowxbs8rosa1s8qxolpe3
title: Dual Boot Timezone
desc: ''
updated: 1662141275866
created: 1662140885186
---

# Fix wrong time dual boot between Ubuntu & Windows

> https://itsfoss.com/wrong-time-dual-boot/

```
timedatectl set-local-rtc 1
```

=> Update the Ubuntu clock to use the local time for the hardware clock (RTC)

## Explain

- A computer has 2 clocks: hardware & system
    - hardware clock == RTC clock == CMOS/BIOS clock == motherboard's clock
    - system clock: operating system clock
- Linux assumes the hardware clock is **the UTC** 
- Windows assumes the hardware clock is **the local time**