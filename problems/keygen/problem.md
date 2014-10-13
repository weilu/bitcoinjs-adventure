## Task

Write a program that __securely__ generates a private key and returns the generated key in WIF format

## Sample Input & Output

Sample input: no input
Sample output: L2Jow6C4LgiU9Ciz5ahsP9LjnbvNUt3DF6hFqJwjzKaX5CKnazQ7

## Boilerplate

  var bitcoin = require('bitcoinjs-lib')

  module.exports = function keygen() {
    // ...
  }

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

## Hint

In bitcoinjs-lib, ECKey provides a keygen function.

## Read more

- [Elliptic Curve Digital Signature Algorithm (ECDSA)](http://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)
- [Bitcoin Private Key](https://en.bitcoin.it/wiki/Private_key)
