# BitLike

![Licence](https://img.shields.io/npm/l/bitlike?style=flat)
[![NPM Package](https://img.shields.io/npm/v/bitlike?style=flat)](https://www.npmjs.com/package/bitlike)
![Last commit](https://img.shields.io/github/last-commit/RenzoDD/bitlike?style=flat)
![Release](https://img.shields.io/github/release-date/RenzoDD/bitlike?style=flat)

**A pure and powerful JavaScript library for Bitcoin like coins** forked from Bitpay's [Bitcore Lib](https://github.com/bitpay/bitcore/tree/master/packages/bitcore-lib) library.

Bitcoin is a powerful peer-to-peer platform for the next generation of financial technology. The decentralized nature of the Bitcoin network allows for highly resilient software infrastructure, and the developer community needs reliable, open-source tools to implement Bitcoin apps and services.

## Get Started 📦

```sh
npm install bitlike
```

## Documentation & Examples 📖

You can find all the documentation [here](https://github.com/RenzoDD/bitlike/tree/develop/docs)

- [Generate a random address](docs/examples.md#generate-a-random-address)
- [Generate a address from a SHA256 hash](docs/examples.md#generate-a-address-from-a-sha256-hash)
- [Generate a random mnemonic](docs/examples.md#generate-address-from-mnemonic)
- [Import an address via WIF](docs/examples.md#import-an-address-via-wif)
- [Create a Transaction](docs/examples.md#create-a-transaction)
- [Sign a DigiByte message](docs/examples.md#sign-a-digibyte-message)
- [Verify a DigiByte message](docs/examples.md#verify-a-digibyte-message)
- [Create an OP RETURN transaction](docs/examples.md#create-an-op-return-transaction)
- [Create a 2-of-3 multisig P2SH address](docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
- [Spend from a 2-of-2 multisig P2SH address](docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)

## Recent Changes 🧙

Last modifications to the packages since v1.0.0

- Change package name from bitcore

## Development 🛠️

```sh
git clone https://github.com/RenzoDD/bitlike
cd bitlike
npm install
```

## Building the Browser Bundle ✨

To build a bitlike full bundle for the browser:

```sh
npm install -g browserify
npm run build
```

This will generate a file named `digibyte.js`.

## Security 🛡️

We're using BitLike in production, as are many others, but please use common sense when doing anything related to finances! We take no responsibility for your implementation decisions.

If you find any flaw or trouble please submit a new thread on [Github Issues](https://github.com/RenzoDD/bitlike/issues)

## Developers ✒️

[![GitHub](https://img.shields.io/badge/Follow-RenzoDD-blue?logo=github&style=social)](https://github.com/RenzoDD)

[![GitHub](https://img.shields.io/badge/Follow-bitpay-blue?logo=github&style=social)](https://github.com/bitpay)

## License 📄

Code released under the [MIT License](./LICENSE).