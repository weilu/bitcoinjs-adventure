# Task

Write a program that creates a signed transaction. The input of the transaction should be built from the given unspent transaction output (UTXO) and signed with the given private key. The transaction should define two outputs - one to satisfy the transfer of the given amount to the given address, the other to direct the remaining amount of the given UTXO to the address that corresponds to the given private key.

Bonus: allow user specified fees

## Input & Output Formats

Input arguments:
1. WIF is a string representation of a private key
2. an unspent transaction output (UTXO) of the given private key. It has the following properties:
* txId: transaction id is a string
* vout: index is an integer
* value: amount is an integer
3. toAddress is a base58check encoded string
4. amount is an integer that represent the satoshi value to be sent to the above address
5. optional fee in satoshi, integer. Default to 0 if not specified

The program should return a hex serialized string of the constructed transaction.

You may safely assume that the sum of amount and fee is less than the available value in unspent.

## Sample Inputs & Outputs

```js
var unspent = {
  txId: '5009195b864d9d5f225b8b39f8c20bc6a30c7c0a4d8bcd125c0a7c2e4dc44a44',
  vout: 0,
  value: 100000
}

buildTx('91odkeyBwr2HUXtdtEyRUMVNJ35gU1GhYA1PGU8XrWSMgwgB7wD', unspent, 'mmXZrgYeyHsJmGGes9EzdbL2Eza2cqNndF', 60000)

// 0100000001444ac44d2e7c0a5c12cd8b4d0a7c0ca3c60bc2f8398b5b225f9d4d865b190950000000008a47304402202bc9f0474bf245cffd2f9a5e0b85f581b22267e417c9461dca9eb19563c4528c022011de0da6bf5fb11547f0e88362fc169eef136850613b9394899f295a3062daa701410467f62d293ff91016f0b312fd57ea082bf155387737ca4b68de28562c4ab4df9530aeff871247797c27459fbd3a26e5b0bcf1d13103de88bf5a6790d71534316affffffff0260ea0000000000001976a91441ee70da8c3d0899ea9a38db973228c879b4f0ae88ac409c0000000000001976a914c6ba3f66dbd84c830385bf68c98bd9ba56eedf8788ac00000000


buildTx('91odkeyBwr2HUXtdtEyRUMVNJ35gU1GhYA1PGU8XrWSMgwgB7wD', unspent, 'mmXZrgYeyHsJmGGes9EzdbL2Eza2cqNndF', 60000, 10000)

// 0100000001444ac44d2e7c0a5c12cd8b4d0a7c0ca3c60bc2f8398b5b225f9d4d865b190950000000008b483045022100c5789c0d26a5dbf9755ebc9e0ae53c4be8046a99cfa2fb983271711d831264b602203428ea7866ed859a88a71ce2d1a6e3f6f74e465958bc7609ad3f53b6bf214a9901410467f62d293ff91016f0b312fd57ea082bf155387737ca4b68de28562c4ab4df9530aeff871247797c27459fbd3a26e5b0bcf1d13103de88bf5a6790d71534316affffffff0260ea0000000000001976a91441ee70da8c3d0899ea9a38db973228c879b4f0ae88ac30750000000000001976a914c6ba3f66dbd84c830385bf68c98bd9ba56eedf8788ac00000000
```

## Boilerplate

```js
var blockcoin = require('blockcoinjs-lib')

module.exports = function buildTx(wif, unspent, toAddress, amount, fee) {
  // ...
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hints

In blockcoinjs-lib, check out TransactionBuilder and Transaction.
TODO: address version

## Read more

- [Bitcoin Transaction](https://en.blockcoin.it/wiki/Transaction)
- [Transaction Fees](https://en.blockcoin.it/wiki/Transaction_fees)
