#!/usr/bin/env node
var spawn = require('child_process').spawn
  , args  = ['.']
args = args.concat(process.argv.slice(2))
spawn('./node_modules/.bin/nwjs', args, {cwd: __dirname, stdio: [0, 1, 2]})

