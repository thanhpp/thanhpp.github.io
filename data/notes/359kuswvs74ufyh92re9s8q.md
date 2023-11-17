
# OpenVPN3

- used to access the [[kyber]] dev environment

## Install

> https://community.openvpn.net/openvpn/wiki/OpenVPN3Linux?__cf_chl_jschl_tk__=8242c8ca4f6aec5ca5596d45ae0208a68ad5edc0-1616667818-0-ATzy_Y6a7l84X7ALx0iFoIW9DWpak-xag5ue93rFf57I8zEVYY353f0q-pZUnQsRxCJGtYQAz-ov3JCP_qZrVMJDgJzZaSbZPPvDn4EOLDRyqSfIWY8QIWGAVBd-BHYirKKgZ7FPkASeg8gQwH1tPEJ58Zb3sZeNTP6N9xUjM4fZAkHHElPlQzI8mLUevwCnAID9jQpzeyshpp2rOP6avmnIPk1_nj0obWnB53LrT75Wy0v-E9mouaUhkRulzkK3k41ZCDLzXpMzvLpsikjb97ZK1jXq7P4UoGfJjgcvAN_i4KIjCnqAOC_UReoEGZni_uTkCSuvLq_0dOD_qzgy5OYu3Wml3Q3MlPDqEG-rNM3N
> https://github.com/OpenVPN/openvpn3-linux/issues/113

- Ubuntu
    - https transport: `sudo apt install apt-transport-https` 
    - add source key
      ```
      sudo wget https://swupdate.openvpn.net/repos/openvpn-repo-pkg-key.pub
      sudo apt-key add openvpn-repo-pkg-key.pub
      ``` 
    - set up source
      ```
      sudo bash -c 'curl -fsSL https://swupdate.openvpn.net/community/openvpn3/repos/openvpn3-focal.list > /etc/apt/sources.list.d/openvpn3.list'
      ```
        - focal: Ubuntu 20.04
    - update & install: `sudo apt update && sudo apt install openvpn3`

## Simple start

```
openvpn3 session-start --config ${MY_CONFIGURATION_FILE}
```

## Commands

- show sessions
  ```
  openvpn3 session-list
  ```
- disconnet
  ```
  openvpn3 session-manage --config ${MY_CONFIGURATION_FILE} --disconnect
  ```