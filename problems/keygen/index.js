var fs = require('fs')
var path = require('path')
var bitcoin = require('bitcoinjs-lib')

exports.problem = fs.createReadStream(__dirname + '/problem.txt')
exports.solution = fs.createReadStream(__dirname + '/solution.js')

exports.verify = function(args, cb) {
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
