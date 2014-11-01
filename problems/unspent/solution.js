var API = require('cb-blockr')

module.exports = function getUnspents(address, network, callback) {
  var api = new API(network)
  api.addresses.unspents(address, function(err, results) {
    if(err) return callback(err)

    var unspents = results.map(function(r) {
      return {
        txId: r.txId,
        vout: r.vout,
        value: r.value
      }
    })
    callback(null, unspents)
  })
}
