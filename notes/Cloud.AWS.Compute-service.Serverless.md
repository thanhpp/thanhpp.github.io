---
id: y7hzw9qn73gomrfjzryr4u3
title: Serverless
desc: ''
updated: 1701275438095
created: 1701274894300
---

## What?

- Infrastructure is managed by someone else (Server, OS, networks...)

## Compare

|         | Lambda               | EC2                         | ECS & EKS                         |
| ------- | -------------------- | --------------------------- | --------------------------------- |
| User    | Code                 | CPU, Mem, Storage, OS       | Containers                        |
| AWS     | Server instances     | Hardwares                   | Fargate: infrastructures, scaling |
| Payment | Compute time consume | For the instance's capacity |                                   |