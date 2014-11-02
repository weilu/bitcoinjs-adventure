# Task

Write a program that broadcasts a given transaction to the given network.

## Input & Output Formats

Input arguments:
1. a hex seriazlied transaction string
2. network string, it will be either 'blockcoin' or 'testnet'
3. callback is a function that has a single argument: err is an Error object if there is any. If err is `null` or `undefined` we take it as the transaction has been successfully propagated

## Sample Inputs & Outputs

```js
var tx = '0100000001444ac44d2e7c0a5c12cd8b4d0a7c0ca3c60bc2f8398b5b225f9d4d865b190950000000008b483045022100c5789c0d26a5dbf9755ebc9e0ae53c4be8046a99cfa2fb983271711d831264b602203428ea7866ed859a88a71ce2d1a6e3f6f74e465958bc7609ad3f53b6bf214a9901410467f62d293ff91016f0b312fd57ea082bf155387737ca4b68de28562c4ab4df9530aeff871247797c27459fbd3a26e5b0bcf1d13103de88bf5a6790d71534316affffffff0260ea0000000000001976a91441ee70da8c3d0899ea9a38db973228c879b4f0ae88ac30750000000000001976a914c6ba3f66dbd84c830385bf68c98bd9ba56eedf8788ac00000000'

sendTx(tx, 'testnet', function(err) {
  if(err) return console.error(err.stack)
  console.log('Transaction successfully propagated!')
  // Transaction successfully propagated!
})

```

## Boilerplate

```js
var API = require('cb-blockr') // or cb-helloblock

module.exports = function sendTx(txHex, network, callback) {
  // ...
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hints

Like the unspent problem, your program will need to ask a blockchain API to propagate a transaction for you.

## Read more

- [cb-blockr](https://github.com/weilu/cb-blockr)
- [cb-helloblock](https://github.com/dcousens/cb-helloblock)
