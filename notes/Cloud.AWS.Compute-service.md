---
id: whci6ekx73cghoy9y5xp4f4
title: Compute-service
desc: ''
updated: 1701274885350
created: 1701274349237
---

## Definitions

- Compute ~ resources required for a program to success fully run
- Cloud computing: 
    - Delivering resources across the internet
    - Elastic: scale up/down based on demands
    - Pay for what you use

## Options

- Compute
    - Measurable quantities of compute power (e.g CPU, Mem)
    - EC2 ~ Virtual machine ~ Physical machine
- Containter services
    - Container: package application & its dependencies
        - Share the OS kernel
    - EKS (Elastic k8s service): Run K8s on AWS without managing the worker nodes
    - ECS (Elastic container service): Run containerzied workloads on a managed EC2 cluster
        - AWS manage the cluster infrastructure 
- Serverless services
    - Build & run the application without thinking about the server
    - Lambda: Run code without provisioning & managing the server
        - Pay for the compute time
        - Can be automatically invoked from calls