var bitcoin = require('bitcoinjs-lib')

module.exports = function keygen() {
  return bitcoin.ECKey.makeRandom().toWIF()
}
