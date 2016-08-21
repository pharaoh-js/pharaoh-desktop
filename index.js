#!/usr/bin/env node

const
  nw = require('nw')
, { spawn } = require('child_process')
, { dirname } = require('path')
, here = dirname(require.main.filename)
, child = spawn(nw, [here]) // eslint-disable-line no-unused-vars
