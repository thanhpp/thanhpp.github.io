---
id: 76o29ju0my8sp2h2t9rohsy
title: Object-Storage
desc: ''
updated: 1702741060554
created: 1702740095991
---

## Overview

- Data is storaged inside a bucket
- A single object max size ~ 5 TB
- Flat, non-hierachical architecture

## Storage classes

- Classes
    - Multiples, based on the access frequency & redundancy
        - Lower cost -> longer retrieval time
    - Inteligent: Auto changing between classes
    - Outpost: satisfy data residency requirements
- S3 Lifecycle Policies: Can set the data lifecycle to auto moving data to lower classes

## Features

- Management & monitoring
    - Storage management
    - Version control -> prevent accident data updates
    - Replication
        - Copy data to another bucket -> reduce latency, risks
    - Retention & compliance
        - Retention: Keeping data rather than losing it
            - Object Lock ~ Write-once-read-many(WORM): Block object deletion during a customer retention period
    - Storage monitoring
- Analytics & insight
    - Storage Lens: shows metrics & recommendations
    - Storage class analysis: analyzes the access patten -> help to decide the suitable storage class
- Access management & secutiry
- Data processing & query
    - S3 Object Lambda: process output of a S3 GET request
    - Query in place: execute the query without copying the data to the local storage

## Pricing

- Storage
- Request & data retrieval
- Data transfer
- Data management & analytic
- S3 object lambda
- Based on the Region

