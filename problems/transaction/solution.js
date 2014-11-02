var bitcoin = require('bitcoinjs-lib')

module.exports = function buildTx(wif, unspent, toAddress, amount, fee) {
  if(fee == null) fee = 0

  var txBuilder = new bitcoin.TransactionBuilder()
  txBuilder.addInput(unspent.txId, unspent.vout)
  txBuilder.addOutput(toAddress, amount)

  // deserialize private key
  var privKey = bitcoin.ECKey.fromWIF(wif)

  // add change output
  var changeAddress = privKey.pub.getAddress(getNetwork(toAddress)).toString()
  var changeAmount = unspent.value - amount - fee
  txBuilder.addOutput(changeAddress, changeAmount)

  // sign
  txBuilder.sign(0, privKey)

  return txBuilder.build().toHex()
}

function getNetwork(address) {
  var version = bitcoin.Address.fromBase58Check(address).version

  for (var networkName in bitcoin.networks) {
    var network = bitcoin.networks[networkName]

    if (version === network.pubKeyHash || version === network.scriptHash) return network
  }
}
