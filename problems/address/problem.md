## Task

Write a program that reads a private key in WIF format, and returns the corresponding Bitcoin address, base58Check encoded.

## Input & Output Formats

- WIF stands for Wallet Import Format. It is the most common way of serializing private keys in Bitcoinland.
- Base58Check is base58 with a checksum.
- Base58 is a binary-to-text encoding scheme similar to base64 but without using the characters: `oOIl+/`

You will be passed the WIF-format private key as a String.
Your output should be a blockcoin address String. Note it will start with '1'.

## Sample Inputs & Outputs

Sample input: L2Jow6C4LgiU9Ciz5ahsP9LjnbvNUt3DF6hFqJwjzKaX5CKnazQ7
Expected output: 14VjxqrgfhgoWtJnJtDVwwppso451ohFrj

## Boilerplate

```js
var blockcoin = require('blockcoinjs-lib')

module.exports = function privKeyToAddress(wif) {
  // ...
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hints

In blockcoinjs-lib, both ECKey and Address provide serialization/deserialization functions.

## Read more

- [WIF](https://en.blockcoin.it/wiki/WIF)
- [Bitcoin Address](https://en.blockcoin.it/wiki/Technical_background_of_Bitcoin_addresses)
