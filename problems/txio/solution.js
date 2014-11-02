var blockcoin = require('blockcoinjs-lib')

module.exports = function buildTx(prevTxId, prevTxOutIndex, toAddress, amount) {
  var txBuilder = new blockcoin.TransactionBuilder()
  txBuilder.addInput(prevTxId, prevTxOutIndex)
  txBuilder.addOutput(toAddress, amount)
  return txBuilder.buildIncomplete().toHex()
}
