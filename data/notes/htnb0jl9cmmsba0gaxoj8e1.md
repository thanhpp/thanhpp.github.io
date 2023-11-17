# Deploy smartcontract

## Install hardhat

- Install NodeJs: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-3-installing-node-using-the-node-version-manager
    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`
    - `source ~/.bashrc`
        - ```
          export NVM_DIR="$HOME/.nvm"  
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm 
            [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion 
          ``` 
    - `nvm install v16.18.0`
    - `nvm use v16.18.0`
- Ref: https://hardhat.org/hardhat-runner/docs/getting-started#installation
    - `npm install --save-dev hardhat` 

## Deploy contract

### Create onchain account

- https://vanity-eth.tk/

### Install dependencies

```
npm install --save-dev @openzeppelin/contracts
npm install --save-dev dotenv`
npm install --save-dev @nomiclabs/hardhat-ethers 
npm install --save-dev @nomiclabs/hardhat-etherscan
```

### Get fund

- faucet:
  - https://faucet.polygon.technology/
  - https://mumbaifaucet.com/ 

### Deploy

- Rename contract
  - update the Contract.deploy(<name>, <symbol>, <uri>) 
- Update ENV value
  - API_URL: node API URL
  - PRIVATE_KEY: deploy private key
  - ETHERSCAN_API: etherscan's API_KEY of deploying network 
- RUN
  - `npx hardhat run --network mumbai scripts/deploy.js` 
  - Output: `Contract deployed to address: <contract address>`

### Verify

- Add ETHERSCAN_API (api_key)
- Update `args.js` to match the deployed contract constructor's value
- `npx hardhat verify ----constructor-args ./scripts/args.js --network mumbai <address>`
- Ref: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#complex-arguments