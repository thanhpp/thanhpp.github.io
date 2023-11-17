
# Sign messagee

## Standard EIP-712

- Easier to read & sign
- Fields
    - Domain: Prevent relay
- How to compose a `Request` message to sign

## abi.Encode vs abi.Pack

- Encode: has separator between fields
- Pack: no separator

## Usecase

- LimitOrder
- RFQOrder