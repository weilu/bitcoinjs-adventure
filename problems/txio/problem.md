Bitcoin's blockchain is made of blocks. Every block can be considered an ordered bundle of transactions. A transaction consists of inputs and outputs. One may think of a transaction as a record of money changed hands, where an input is a reference to where the money comes from and an output declares where the money is going.

----

# Task

Write a program that creates a transaction with one input and one output.

To specify the input, we need
1. the id of the transaction to be used as the source of funds (aka. the previous transaction id)
2. the index of the output we want to spend from (aka. the output index of the previous transaction)

The output includes:
1. the address we are sending to
2. the amount in satoshi (1 BTC = 100,000,000 satoshi)

## Input & Output Formats

Input arguments:
1. previous transaction id is a string
2. index is an integer
3. address is a base58check encoded string
4. amount is an integer

The program should return a hex serialized string of the constructed transaction

## Sample Inputs & Outputs

```js
buildTx('7ec210fe647ddfd6b5f05c3efafa9a5b65519d7d6b7462fe6f47d4f326efc8fd', 0, 'mmXZrgYeyHsJmGGes9EzdbL2Eza2cqNndF', 12000)

// 0100000001fdc8ef26f3d4476ffe62746b7d9d51655b9afafa3e5cf0b5d6df7d64fe10c27e0100000000ffffffff01e02e0000000000001976a91441ee70da8c3d0899ea9a38db973228c879b4f0ae88ac00000000
```

## Boilerplate

```js
var bitcoin = require('bitcoinjs-lib')

module.exports = function buildTx(prevTxId, prevTxOutIndex, toAddress, amount) {
  // ...
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hints

In bitcoinjs-lib, check out TransactionBuilder and Transaction.

## Read more

- [Bitcoin Transaction](https://en.bitcoin.it/wiki/Transaction)
- [Bitcoin Units](https://en.bitcoin.it/wiki/Units)
