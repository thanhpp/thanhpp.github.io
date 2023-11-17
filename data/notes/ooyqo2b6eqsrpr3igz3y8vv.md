
# Repository pattern

> https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design#the-repository-pattern

## TLDR

- Encapsules the logic required to access data

## Definition

- Mapping domain models with data presentations
- Encapsulates a set of object stored in the database and the operation can perform on them
- Separate the dependency between the work domain and the data allocation or mapping