#!/usr/bin/env node

const
  spawn = require('child_process').spawn
, args  = ['-r', '.']
, arg   = args.concat(process.argv.slice(2))

spawn('./node_modules/.bin/nwbuild', arg, {cwd : __dirname, stdio : [0, 1, 2]})

