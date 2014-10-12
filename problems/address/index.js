var fs = require('fs')
var path = require('path')
var bitcoin = require('bitcoinjs-lib')

exports.problem = fs.createReadStream(__dirname + '/problem.txt')
exports.solution = fs.createReadStream(__dirname + '/solution.js')

exports.verify = function(args, cb) {
  var fn = require(path.resolve(args[0]));
  var key = bitcoin.ECKey.makeRandom()
  cb(fn(key.toWIF()) === key.pub.getAddress().toString());
}
