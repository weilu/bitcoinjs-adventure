"use strict"

var fs = require('fs')
var path = require('path')
var blockcoin = require('blockcoinjs-lib')
var assert = require('assert')
var crypto = require('crypto')
var prompt = require('prompt')
var buildTx = require('./solution')

function verify(args, cb) {
  var fn = require(path.resolve(args[0]))
  verifyWithoutFee(fn, function(pass) {
    if(!pass) return cb(false)

    verifyWithFee(fn, function(passBonus) {
      if(passBonus) {
        console.log('\nIt works with user specified fees too. Good work!\n')
        cb(true)
      } else {
        prompt.message = "Your solution works, but transaction fees are always zero. Would you like to try implementing a solution that allows user specified fees?"
        prompt.start()

        prompt.get('(y/n)', function (err, result) {
          var answer = result['(y/n)'].toLowerCase()
          cb(answer !== 'yes' && answer !== 'y')
        })
      }
    })
  })
}

function verifyWithFee(fn, cb) { _verify(fn, 80000, cb) }
function verifyWithoutFee(fn, cb) { _verify(fn, 0, cb) }

function _verify(fn, fee, cb) {
  var wif = "91hpDGhyKRC6APdhSSMkis6gKijKhqRhiYjYAobww53C7fB5KVz"
  var unspent = {
    txId: 'e598eb5502d8a94c3a8cf2cb1bdf4508d355f9da71ea296244157dee148a4a74',
    vout: 1,
    value: 200000
  }
  var address = "mmtEeP9vnksyCWbA3crPJNH12bePVvs7iW"
  var amount = 120000

  var actualTxHex = fn(wif, unspent, address, amount, fee)
  var expectedTxHex1 = buildTx(wif, unspent, address, amount, fee)
  var expectedTxHex2 = buildTxSwapOutputsOrder(wif, unspent, address, amount, fee)

  if(expectedTxHex1 === actualTxHex || expectedTxHex2 === actualTxHex) {
    return cb(true)
  }

  if(actualTxHex instanceof blockcoin.Transaction) {
    console.log('\nLooks like you are returning a transaction object. Try serializing it into a hex string\n')
    return cb(false)
  }

  if(typeof actualTxHex != 'string') {
    console.log('\nExpect a string, but got', actualTxHex, '\n')
    return cb(false)
  }

  try {
    var tx = blockcoin.Transaction.fromHex(actualTxHex)
  } catch (e) {
    console.log('\nReturned string does not deserialize into a valid transaction:', actualTxHex)
    console.log('Try again :)\n')
    return cb(false)
  }

  var expectedTx1 = blockcoin.Transaction.fromHex(expectedTxHex1)
  var expectedTx2 = blockcoin.Transaction.fromHex(expectedTxHex2)

  var inputCount = tx.ins == null ? 0 : tx.ins.length
  if(inputCount !== expectedTx1.ins.length) {
    console.log('\nExpect the transaction to have', expectedTx1.ins.length, 'input, found', inputCount, '\n')
    return cb(false)
  }

  var outputCount = tx.outs == null ? 0 : tx.outs.length
  if(outputCount !== 2) {
    console.log('\nExpect the transaction to have', expectedTx1.outs.length, 'outputs, found', outputCount, '\n')
    return cb(false)
  }

  try {
    var expected1Input = expectedTx1.ins[0]
    var expected2Input = expectedTx2.ins[0]
    var input = tx.ins[0]

    assert.deepEqual(input.hash, expected1Input.hash, 'Your transaction input does not have the expected transaction id')
    assert.equal(input.sequence, expected1Input.sequence, 'Your transaction input does not have the expected sequence')
    assert.equal(input.index, expected1Input.index, 'Your transaction input does not have the expected output index')

    var scriptHex = input.script.toHex()
    if(scriptHex !== expected1Input.script.toHex() && scriptHex !== expected2Input.script.toHex) {
      throw new Error('Your transaction input does not have the expected signature')
    }
  } catch(e) {
    console.log("\n", e.message , "\n")
    return cb(false)
  }

  try {
    assert.deepEqual(tx.outs, expectedTx1.outs)
  } catch(e1) {
    try {
      assert.deepEqual(tx.outs, expectedTx2.outs)
    } catch (e2) {
      console.log("\nYour transaction outputs don't look right. Try again.\n")
      return cb(false)
    }
  }

  return cb(false)
}

function buildTxSwapOutputsOrder(wif, unspent, toAddress, amount, fee) {
  if(fee == null) fee = 0

  var txBuilder = new blockcoin.TransactionBuilder()
  txBuilder.addInput(unspent.txId, unspent.vout)

  var privKey = blockcoin.ECKey.fromWIF(wif)
  var changeAddress = privKey.pub.getAddress(getNetwork(toAddress)).toString()
  var changeAmount = unspent.value - amount - fee
  txBuilder.addOutput(changeAddress, changeAmount)
  txBuilder.addOutput(toAddress, amount)

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

module.exports = {
  problem: fs.readFileSync(__dirname + '/problem.md', 'utf8'),
  solution: fs.readFileSync(__dirname + '/solution.js', 'utf8'),
  boilerplate: fs.readFileSync(__dirname + '/boilerplate.js', 'utf8'),
  verify: verify
}
