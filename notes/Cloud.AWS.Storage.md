---
id: 2ku1l067i7zdbkqb6u55c5p
title: Storage
desc: ''
updated: 1701882690333
created: 1701881376619
---

> https://explore.skillbuilder.aws/learn/course/6233/play/62145

## Types

- Block storage
    - Format: continuos segments (blocks) on the storage device 
    - a block = fixed storage unit
    - Usages: OS or application that has the capabilities to **manage the block storage directly**
- File storage
    - Built on top of the block storage
    - **Using an OS** that formats & manages the reading & writing data
    - Primary use: directory tree **hierarchy**
    - Protocols
        - SMB - Server Message Block
        - NFS - Network file system
- Object storage
    - Built on top of the block storage
    - Using an OS to mangages the reading & writing
    - Primary use: storing data within a **binary object**
        - An object = a larger set of blocks
        - Smaller than the object size: stored at a binary level within the object
        - Larger than the object size: spreading the data across multiple objects
    - Object storage doesn't differentiate between types of data

## Edge & Hybrid cloud storage services

- Edge - local compute & storage
    - Can disconnected from the AWS Cloud
    - Have a data transfer platform to copy the data in/out the AWS Cloud
    - AWS Snow Family: physical devices & services
- Hybrid
    - On-premieses cloud storage: part of an AWS Outposts implementation
        - AWS Outposts: fully managed service that offer the same AWS Cloud abilities -> **virtuallize any data center**
    - On-premieses gate-way
        - AWS Storage Gatweay: connects on-premieses users & applications using a software appliance with cloud-based storage
            - On-premieses IT environment + AWS storage

## Data protection services

- Backup & archive
    - AWS Backup: Centralize & automate data protection across AWS services
- Snapshot
    - Create incremental copies of data
        - only saves the most recent changes between 2 snapshots
    - Stored in a protected part of Amazon S3
- Replication
    - Creating addtional copies -> increase availability
- Disaster recovery services
    - Recovery option for on-premises servers & applications
    - Replicates machines (OS, state, db, apps, files,...) -> AWS