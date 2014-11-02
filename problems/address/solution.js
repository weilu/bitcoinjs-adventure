var blockcoin = require('blockcoinjs-lib')

module.exports = function privKeyToAddress(wif) {
  var key = blockcoin.ECKey.fromWIF(wif)
  return key.pub.getAddress().toString()
}
