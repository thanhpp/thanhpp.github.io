---
id: r4amwibqnkrt67hs7yg11sl
title: Protecting-data
desc: ''
updated: 1704554656694
created: 1704553576629
---

## Intro

- AWS offer 3 types
    - recovery point objectives
    - recovery time objectives
    - compliance
- Data backup
    - Data can be copied to one or more locations
    - predetermined frequencies
- Snashots
    - Incremental, point-in-time copies
- Disaster recovery services
    - Use the AWS Cloud as a disaster recovery mechanism
    - CloundEndure Disaster Recover keeps an updated **copy of application servers**
    for failover **rediness**

## AWS Backup

- **Fully managed** data protection service
- Overview
    - Centralize & automate data protection across AWS Services
- Supported resources
    - Compute: EC2, VSS (Windows Volume Shadow Copy Service)
    - Storage: EBS, EFT, S3, FSx, AWS Storage Gateway volumes
- Database service: RDS, Aurora, DynamoDB, Neptune, DocumentDB

## Native Service Snapshots

- Snapshots
    - create backup copies of your data in your storage or database service
    - integrated into individual service
    - Provide point-in-time copies
    - Supported services: FSx for Lustre & EBS
- EBS snapthots
    - Incremental: only the blocks that have changed  after the most recent snapshot are saved
    - Delete a snapshot
        - Only the data unique to that snapshot is removed
        - Information required by other snapshots remains available
    - Tracked through CloudWatch events
- FSx For Lustre snapshots
    - Stores backups in S3
    - Supports: manual & scheduling backups (only 1 backup can occur at a time)
- CloudEndure Disaster Recovery
    - Replicates on-premises machines into a low-cost staging area in the target AWS account & preferred Region
    - Relicas: OS, System state configurations, DBs, applicaionts & files
    - Can instruct the service to re-launch the whole system
    - The services updates back to the on-premises systems when they are restored
    - Store data using EBS