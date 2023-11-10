---
id: 6e2ho1hbe3wrt78uo63bkix
title: Docker
desc: ''
updated: 1699585576527
created: 1699585243723
---

> https://blog.bytebytego.com/p/a-crash-course-in-docker

## Lightweight containerization

- The Docker engine does not virtualize OS resources
    - container achieve isolation through **Linux namespaces & control groups**
- Namespaces: separation for processes, networking, mounts,...
- cgroups (control groups): limit & meter usages of resources
- => Sharing the OS kernel, not the host physical resources

## Application packaging

- Docker is solving 
    - Bundling the app, configs, dependencies & OS -> single image
    - Remain the environments (dev, runtime)

## Kubernetes (K8s)

- Cluster management taking advantages of the Docker engine
