var bitcoin = require('bitcoinjs-lib')

module.exports = function privKeyToAddress(wif) {
  var key = bitcoin.ECKey.fromWIF(wif)
  return key.pub.getAddress().toString()
}
