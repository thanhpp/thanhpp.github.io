# Scuba - Meta's monitoring system

> https://research.facebook.com/file/2964294030497318/scuba-diving-into-data-at-facebook.pdf
> https://www.facebook.com/notes/10158791569947200
> https://news.ycombinator.com/item?id=13463016

## Intro

- Scuba
    - Realtime database: fast & scalable
    - Ingestion framework: low latency 
    - Detectors framework: set up alert & detect metrics
    - Query tools
- Trade-offs
    - no joins, no global sorting -> need to use another tool
    - flat schema (no nested)
    - no consistency (best effort)
    - Time partition only
    - Time & Space retention limits (only serve in a limited range of time)
    - not 4 high traffic

## Architecture

![](assets/2022-11-23_15-11-scube-architecture.png)

- Scuba UI: using SQL

- Fast query
    - ![Fast Query](assets/2022-11-23_15-13-scuba-fast-query.png)
    - Divide a query to multiple nodes, data is splitted by levels

## UI

- Usecase: Monitor code performance 
    - compares latency by weeks 
- Each diagram is built from a single table (no joins supported)

## Integration

- Scuba: Realtime database + UI + ingestion framework
- Strong point: pre-built supported metrics (created by the data team)
- Profiling: 
    - dump linux stack trace -> data
    - the service team doesn't need to update their code