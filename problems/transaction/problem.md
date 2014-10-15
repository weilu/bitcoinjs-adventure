Bitcoin's blockchain is made of blocks. Every block can be considered an ordered bundle of transactions. A transaction consists of inputs and outputs. I think of a transaction as a record of money changed hands, where an input is a reference to where the money comes from and an output declares where the money is going.

----

# Task

Write a program that creates a transaction with one input and one output.

To specify the input, we need
1. the transaction to be used as the source of funds (aka. the previous transaction)
2. the index of the output we want to spend from (aka. the output index of the previous transaction)

The output includes:
1. the address we are sending to
2. the amount in satoshi

## Input & Output Formats

- previous transaction is a Transaction object
- index is an integer
- address is a base58check encoded string
- amount is an integer
- the program should return a hex serialized string of the constructed transaction

## Boilerplate

```js
var bitcoin = require('bitcoinjs-lib')

module.exports = function buildTx(prevTx, prevTxOutIndex, toAddress, amount) {
  // ...
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hints

In bitcoinjs-lib, check out TransactionBuilder and Transaction.

## Read more

- [Bitcoin Transaction](https://en.bitcoin.it/wiki/Transaction)
