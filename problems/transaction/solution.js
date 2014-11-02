var blockcoin = require('blockcoinjs-lib')

module.exports = function buildTx(wif, unspent, toAddress, amount, fee) {
  if(fee == null) fee = 0

  var txBuilder = new blockcoin.TransactionBuilder()
  txBuilder.addInput(unspent.txId, unspent.vout)
  txBuilder.addOutput(toAddress, amount)

  // deserialize private key
  var privKey = blockcoin.ECKey.fromWIF(wif)

  // add change output
  var changeAddress = privKey.pub.getAddress(getNetwork(toAddress)).toString()
  var changeAmount = unspent.value - amount - fee
  txBuilder.addOutput(changeAddress, changeAmount)

  // sign
  txBuilder.sign(0, privKey)

  return txBuilder.build().toHex()
}

function getNetwork(address) {
  var version = blockcoin.Address.fromBase58Check(address).version

  for (var networkName in blockcoin.networks) {
    var network = blockcoin.networks[networkName]

    if (version === network.pubKeyHash || version === network.scriptHash) return network
  }
}
