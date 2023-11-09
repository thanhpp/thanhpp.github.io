---
id: 2y5rbgw6i5ub5wwea98oc7d
title: Account Abstraction
desc: ''
updated: 1699526187433
created: 1699351544536
---

> https://docs.google.com/presentation/d/1iyrEmDsbUCpxIPEFPQEgsyyULRuQXnbFHj9srnlNmFk

## Accounts in Ethereum

- Externally Owned: Private key -> originated transaction
    - Limitations
        - verification logic: Signature, Gas, Nonce
        - Signature:
            - User must sign
            - User must secure private key
- Smart Contract Account: Controlled by code -> Cannot originate tx (must be executed from a Externally Owned)
- **Account abstraction goals**
    - Smart contract account
        - originate txs
        - controlled by code
    - Specify arbitrary verificaion logic
        - use EVM code for verification

## ERC-4337

### Intro

- Mutual invalidation -> lead to node stress
- ERC-4337:
    - Create another layer
    - Doesn't modify the Ethereum core (maintain security)

### Key concepts

- Creates a new mempool for **UserOperation**
- UserOperation packages up user intent & data for verification
- **Bundler** aggregates UserOperation into 1 single tx
- **Bundler**:
      -  powerful nodes
      -  Handle the UserOperation mempool

### Verification & Execution Sequence

- EntryPoint contract: verifies & executes the UserOperations bundles
- Paymaster Contract: repay tokens for the Bundler
    - Users don't need tokens to interact with the Ethereum

### UserOperation

- User intent + data for verifications
- Signature: can be customize

### Why?

- Decentralizes the private bundler
- Saandardlizes AA -> annovation & adoption

## Use cases

### Wallet management

- Classical
    - Multi-sig
    - Social Recovery
    - Tiered Permissions
- Novel
    - Custom signing scheme
    - Device Primary Authentication: FaceID, TouchID,...
    - Multi-factor
- Regulative wallet
    - comply regulations
        - whitelist tokens & owners

### Defi

- Gas fee payment: use other tokens
- Sponsored transaction: Paymaster
- Batch tx
    - Batch tx: sign once
- Access control:
    - Session key: 
        - allow permissions in a limited time
        - set max allowances, txs,....
    - Transaction Guard
        - 3rd parties to monitor txs
    - Locking/Vesting
        - Lock token owned by the account contract
- AA & PBS
    - PBS: Proposer Builder Separation
    - Combine many operations into 1 tx
        - Off-chain computation:
            - User delegate builder to query from an input source
        - Off-chain storage:
            - move parts of Smart Contract storage to off-chain storage
            - -> users need to include proof of storage each tx
            - => Builder can provide proof of storage & storage itself

