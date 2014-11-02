"use strict"

var fs = require('fs')
var path = require('path')
var request = require('superagent')
var buildTx = require('../transaction/solution')
var API = require('cb-blockr')
var blockcoin = require('blockcoinjs-lib')

function requestNewUnspent(callback) {
  console.info('fetching an unspent transaction output for testing...')
  request
  .get('https://testnet.helloblock.io/v1/faucet?type=1')
  .end(function(err, res) {
    if (err) return callback(err)
    var data = res.body.data
    var unspent = data.unspents[0]
    var address = unspent.address
    unspent = {
      txId: unspent.txHash,
      vout: unspent.index,
      value: unspent.value
    }
    callback(null, data.privateKeyWIF, unspent, address)
  })
}

function verify(args, cb) {
  console.info('This test run requires network calls therefore may take a while. Go grab some coffee :)')
  requestNewUnspent(function(err, wif, unspent, address) {
    if(err) return logError(err)
    console.info('obtained unspent', unspent, 'for WIF', wif)

    var fn = require(path.resolve(args[0]))
    var txHex = buildTx(wif, unspent, address, unspent.value)
    fn(txHex, 'testnet', function(err) {
      if(err) return console.error(err.stack)

      var tx = blockcoin.Transaction.fromHex(txHex)
      var txId = tx.getId()
      console.info('Your program indicates that transaction:', txHex, 'has been successfully propagated')
      console.info('verifying...')

      var api = new API('testnet')
      api.transactions.summary(txId, function(err, txs) {
        if(err) {
          if(err.message.indexOf('No records found') >= 0) {
            console.log('Unable to find the transaction with id', txId, 'on the test network')
            return cb(false)
          }
          return logError(err)
        }

        if(txs == null || txs[0] == null) {
          console.log('Unable to find the transaction with id', txId, 'on the test network')
          return cb(false)
        }

        cb(true)
      })
    })
  })
}

function logError(err) {
  console.error("An error occured. It doesn't seem like your fault. Make sure that you have Internet connection.")
  console.error(err.stack)
}

module.exports = {
  problem: fs.readFileSync(__dirname + '/problem.md', 'utf8'),
  solution: fs.readFileSync(__dirname + '/solution.js', 'utf8'),
  boilerplate: fs.readFileSync(__dirname + '/boilerplate.js', 'utf8'),
  verify: verify
}
