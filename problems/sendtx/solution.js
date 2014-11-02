var API = require('cb-blockr')

module.exports = function sendTx(txHex, network, callback) {
  var api = new API(network)
  api.transactions.propagate(txHex, callback)
}
