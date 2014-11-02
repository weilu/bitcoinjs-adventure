"use strict"

var fs = require('fs')
var path = require('path')
var blockcoin = require('blockcoinjs-lib')
var assert = require('assert')
var crypto = require('crypto')

function verify(args, cb) {
  var fn = require(path.resolve(args[0]))
  var prevTxId = crypto.randomBytes(32).toString('hex')
  var prevTxIndex = 1
  var address = blockcoin.ECKey.makeRandom().pub.getAddress().toString()
  var amount = 12000

  var txBuilder = new blockcoin.TransactionBuilder()
  txBuilder.addInput(prevTxId, prevTxIndex)
  txBuilder.addOutput(address, amount)
  var expectedTx = txBuilder.buildIncomplete()

  var txHex = fn(prevTxId, prevTxIndex, address, amount)
  console.log(txHex)

  if(txHex === expectedTx.toHex()) {
    return cb(true)
  }

  if(txHex instanceof blockcoin.Transaction) {
    console.log('\nLooks like you are returning a transaction object. Try serializing it into a hex string\n')
    return cb(false)
  }

  var tx = blockcoin.Transaction.fromHex(txHex)
  var inputCount = tx.ins == null ? 0 : tx.ins.length
  if(inputCount !== 1) {
    console.log('\nExpect the transaction to have 1 input, found', inputCount, '\n')
    return cb(false)
  }

  var outputCount = tx.outs == null ? 0 : tx.outs.length
  if(outputCount !== 1) {
    console.log('\nExpect the transaction to have 1 output, found', outputCount, '\n')
    return cb(false)
  }

  try {
    assert.deepEqual(tx.ins, expectedTx.ins)
  } catch(e) {
    console.log("\nYour transaction input doesn't look right. Try again.\n")
    return cb(false)
  }

  try {
    assert.deepEqual(tx.outs, expectedTx.outs)
  } catch(e) {
    console.log("\nYour transaction outputs doesn't look right. Try again.\n")
    return cb(false)
  }
}

module.exports = {
  problem: fs.readFileSync(__dirname + '/problem.md', 'utf8'),
  solution: fs.readFileSync(__dirname + '/solution.js', 'utf8'),
  boilerplate: fs.readFileSync(__dirname + '/boilerplate.js', 'utf8'),
  verify: verify
}
