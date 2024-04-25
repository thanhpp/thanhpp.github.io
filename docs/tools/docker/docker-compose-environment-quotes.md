## Docker compose environment quotes

- Do not use the `"` mark in the docker-compose while setting the environment values.
- Docker compose adds the `"` into ENV values
    - Eg: A="VALUE_A", the application when reading the env A will get `"VALUE_A"` instead of `VALUE_A` 
