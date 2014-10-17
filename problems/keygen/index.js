"use strict"

var fs = require('fs')
var path = require('path')
var bitcoin = require('bitcoinjs-lib')

function verify(args, cb) {
  var fn = require(path.resolve(args[0]))

  try {
    var key1 = fn()
    bitcoin.ECKey.fromWIF(key1)

    if(key1 === fn()) {
      console.error("\nSmartpants, let's try again with a better RNG! http://xkcd.com/221/\n")
      cb(false)
    } else {
      cb(true)
    }
  } catch(e) {
    console.error(e.stack)
    cb(false)
  }
}

module.exports = {
  problem: fs.readFileSync(__dirname + '/problem.md', 'utf8'),
  solution: fs.readFileSync(__dirname + '/solution.js', 'utf8'),
  boilerplate: fs.readFileSync(__dirname + '/boilerplate.js', 'utf8'),
  verify: verify
}

