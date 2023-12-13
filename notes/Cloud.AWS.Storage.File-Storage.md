---
id: vn6493stya02z5l0igcatcb
title: File-Storage
desc: ''
updated: 1702481280535
created: 1702479363072
---

## Types

- EFS (elastic file system): suitable for Linux, supprts the Network file system protocol
- FSx
    - Supports: Lustre, NetApp ONTAP, OpenZFS, Windows File Server
    - AWS fully managed
- EC2 and EBS also support creating your own file system

## EFS

- Overview
    - The services manages all the file storage infrastructure
    - Allow parallel access from compute instances
    - Supports the NFSv4 protocol
    - Pay only for used storage
    - Storage class
        - Standard: Multiple AZ resilience
        - One Zone: cost saving by storing data in 1 AZ

## Features

- Fully managed: Amz handles the file servers, storages, hardwars, backups...
- Performance modes: General Purpose & Max I/O
- Throughput modes: 
    - Bursting throughput: the throughput scales with the size of the file system
    - Provisioned Throughput: Higher dedicated throughput than the default Bursting mode