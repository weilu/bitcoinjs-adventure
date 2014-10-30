# Task

Write a program that takes an address and the network, and returns an array of objects each representing an unspent transaction output associated with the given address. To represent an unspent transaction output of an address, we need the transaction id to identify the transaction, the output index to identify the specific output in that transaction we care about, and last but not least, the amount transfered to our address by the above-mentioned transaction and its output.

## Input & Output Formats

Input:

- address is a base58check encoded string
- network is a string. Assume the value can be either 'bitcoin' or 'testnet'

The expected output is an array of unspent transaction output objects:

- txId: transaction id is a string
- vout: index is an integer
- value: amount is an integer

## Sample Inputs & Outputs

```js
getUnspent('mijTkG8nYpN57CZNPqmGUZamqyspoxtxd4')

// [
//   {
//     txId: "d37d8d34bb0a5e309fc365da1d860d2fc13131f3d8955dcaec89bf502e58f23b",
//     vout: 0,
//     value: 100000
//   }
// ]
```

## Boilerplate

```js
var API = require('cb-blockr') // or cb-helloblock

module.exports = function getUnspent(address, network) {
  // ...
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hints

You will need to talk to a blockchain API for such information. There are many out there:

- [blockchain.info](https://blockchain.info/api/blockchain_api)
- [blockr.io](http://btc.blockr.io/documentation/api)
- [chain.com](https://chain.com/docs)
- [chain.so](https://chain.so/api)
- [helloblock.io](https://helloblock.io/)

Common Blockchain is an ongoing project aims at providing a common interface for blockchain API providers, therefore making it easy to set up fallback APIs and switch API providers. So far blockr.io and helloblock.io are wrapped with the Common Blockchain interfaces:

- [cb-blockr](https://github.com/weilu/cb-blockr)
- [cb-helloblock](https://github.com/dcousens/cb-helloblock)

You are free to use whichever for this exercise.

## Read more

- [Bitcoin Address Prefixes](https://en.bitcoin.it/wiki/List_of_address_prefixes)
