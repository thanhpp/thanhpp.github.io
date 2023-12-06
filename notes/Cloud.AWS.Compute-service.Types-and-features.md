---
id: 2frrk1xf10wcbul6zci865c
title: Types-and-features
desc: ''
updated: 1701613008799
created: 1701612380236
---

## EC2

- Granular control -> Control almost everything
- Options: CPU, Storages, OSs, Networkings
    - has optimized instances for performance demands (Compute, Caching, Graphic processing...)
- Benefits
    - Quickly get a server without hardware setups
    - Scale as needed
    - High availability (99.99%)
    - Different pricing options
    - Suitable for long running applications

## Containers

- Package apps, dependencies, configs into 1 **single object**
- Rapid deployments, patching & scaling,...
- Benefits
    - The application is packaged -> Control the applications & all associated resources
    - Portable -> move between OS easily
    - No time-out limit
    - No startup latency
    - No size limit
    - Suitable for micro-services

## Serverless

- Hide the infrastructure layer
- AWS handle everything: hardware, infra, scale
- Benefits
    - Fast development: focus on the code
    - Pay for value: pay for the run time only
    - Short-lived applications: < 15mins
    - Event-driven
    - Automatic-scaling
    - Redundancy & Resilience: Lambda runs the code on multiple AZs
        - Resilience: versioning, reserved resources, retries,...

