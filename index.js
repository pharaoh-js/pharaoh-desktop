#!/usr/bin/env node

const
  spawn = require('child_process').spawn
, nw    = require('nwjs')
, path  = require('path')
, where = path.dirname(require.main.filename)
, child = spawn(nw, [where])

