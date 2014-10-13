var fs = require('fs')
var path = require('path')
var bitcoin = require('bitcoinjs-lib')

function verify(args, cb) {
    var fn = require(path.resolve(args[0]))
    var key = bitcoin.ECKey.makeRandom()
    cb(fn(key.toWIF()) === key.pub.getAddress().toString())
}

module.exports = {
  problem: fs.readFileSync(__dirname + '/problem.md', 'utf8'),
  solution: fs.readFileSync(__dirname + '/solution.js', 'utf8'),
  boilerplate: fs.readFileSync(__dirname + '/boilerplate.js', 'utf8'),
  verify: verify
}

