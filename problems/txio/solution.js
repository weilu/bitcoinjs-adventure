var bitcoin = require('bitcoinjs-lib')

module.exports = function buildTx(prevTxId, prevTxOutIndex, toAddress, amount) {
  var txBuilder = new bitcoin.TransactionBuilder()
  txBuilder.addInput(prevTxId, prevTxOutIndex)
  txBuilder.addOutput(toAddress, amount)
  return txBuilder.buildIncomplete().toHex()
}
