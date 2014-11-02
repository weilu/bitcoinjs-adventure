var blockcoin = require('blockcoinjs-lib')

module.exports = function keygen() {
  return blockcoin.ECKey.makeRandom().toWIF()
}
