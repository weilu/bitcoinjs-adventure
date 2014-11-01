"use strict"

var fs = require('fs')
var path = require('path')
var bitcoin = require('bitcoinjs-lib')
var assert = require('assert')
var crypto = require('crypto')
var request = require('superagent')
var getUnspents = require('./solution')

function requestNewUnspents(callback) {
  console.info('fetching an address for testing...')
  request
  .get('https://testnet.helloblock.io/v1/faucet?type=1')
  .end(function(err, res) {
    if (err) return callback(err)
    callback(null, res.body.data.unspents[0].address)
  })
}

function verify(args, cb) {
  console.info('This test run requires network calls therefore may take a while. Go grab some coffee :)')
  requestNewUnspents(function(err, address) {
    if(err) return logError(err)
    console.info('obtained address', address)

    var counter = 2
    var actualUnspents, expectedUnspents

    var fn = require(path.resolve(args[0]))
    fn(address, 'testnet', function(err, results) {
      if(err) return console.error(err.stack)
      console.info('obtained unspents from your solution')

      actualUnspents = results
      maybeCompareResults()
    })

    getUnspents(address, 'testnet', function(err, results) {
      if(err) return logError(err)
      console.info('obtained unspents from the sample solution')

      expectedUnspents = results
      maybeCompareResults()
    })

    function maybeCompareResults() {
      counter--
      if(counter > 0) return

      try {
        assert.deepEqual(actualUnspents, expectedUnspents)
        return cb(true)
      } catch(e) {
        console.log('\nExpect:')
        expectedUnspents.forEach(function(unspent) { console.log(unspent) })
        console.log('Got: ' +  actualUnspents + '\n')
        return cb(false)
      }
    }
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
