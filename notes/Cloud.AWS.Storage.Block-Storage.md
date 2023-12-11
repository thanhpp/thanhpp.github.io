---
id: b88890isj8synonrv58xvn5
title: Block-Storage
desc: ''
updated: 1702308837068
created: 1702303089094
---

## Types

- 2 types
    - Instance storage
    - EBS (Elastic block storage)

## Amazon EC2 instance storage

- **Temporary** block-level storage for an instance
    - located on disk
    - **physically attached** to the host computer
- Latency: submillisecond
- Use cases
    - Temporary storage (buffer, caches, scratch data)
    - Data is replicated across a fleet of instances
- Nonpersistent & it is terminated if the associated EC2 instance is terminated. Also includes:
    - Disk drive fails
    - Instance stops/hibernates/terminates

## Amazon EBS

- High throughput & transaction-intensive workloads at any scale
- Quickly accessible & **long-term persistence**
- EBS
    - behave like raw, unformatter block devices
    - Can be mounted to an EC2 instance
- Types:
    - trade off: price vs performance
    - Can change the EBS volume type, update configs without disrupting the applications
- Backup
    - EBS are replicated within an AZ
    - Can use the EBS snapshot service to back up the volume

### Features

- Single AZ
    - EBS is a AZ specific service
    - Attached to an EC2 instance in the same AZ -> low latency & high performance
    - Copy, moving: create a snapshot & restore that snapshot to a new volume
- Persistent:
    - Not terminated with the EC2 instance
    - Can attach to different EC2 instance
- Volume types
    - 2 major categories: SSD-based & HDD-based
    - SSD-based
        - general purpose: balance price & performance
        - provisioned IOPS: highest performance
    - HDD-based:
        - Throughput optimized
        - Cold HDD: less frequently accessed data
- Elastic Volumes
    - Update the capacity, performance without any downtime
- High avalability & high durability
    - replicated accress multiple servers in the same AZ
    - support snapshot features => back up
- Data encryption
    - The encryption occurs on the servers that host EC2 instances -> encryption of data in transit
- Native snapshot support
    - can create point-in-time snapshots (persisted to Amz S3)
- Aws Backup support
    - AWS Backup: centralize & automate data protection across multiple EBS volumes
- Performance monitoring
    - Monitor performance metrics through the AWS Management Console

### Use cases

- Enterprise applications
- Database enignes
- Big data engine
- File system