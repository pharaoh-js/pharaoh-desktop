#!/usr/bin/env node

'use strict'

// ./compress.sh codemirror addon mode --local /path/to/UglifyJS
// or
// ./compress.sh codemirror addon addon mode mode
// uses online compression thing on marijn's site
//
// you can skip the path and the .js for these files. you don't
// HAVE to skip those, but you might as well. why not, y'know?
// makes things either. and easier is better. right? right.

var fs = require('fs')

function help (ok) {
  console.log('usage: ' + process.argv[1] + ' [--local /path/to/uglifyjs] files (libs addons modes)')
  process.exit(ok ? 0 : 1)
}

var local = null, args = [], extraArgs = null, files = [], blob = ''

for (var i = 2; i < process.argv.length; ++i) {
  var arg = process.argv[i]
  if (arg == '--local' && i + 1 < process.argv.length) {
    var parts = process.argv[++i].split(/\s+/)
    local = parts[0]
    extraArgs = parts.slice(1)
    if (!extraArgs.length) extraArgs = ['-c', '-m']
  } else if (arg == '--help') {
    help(true)
  } else if (arg[0] != '-') {
    files.push({name: arg, re: new RegExp('(?:\\/|^)' + arg + (/\.js$/.test(arg) ? '$' : '\\.js$'))})
  } else help(false)
}

function walk (dir) {
  fs.readdirSync(dir).forEach(function (fname) {
    if (/^[_\.]/.test(fname)) return
    var file = dir + fname
    if (fs.statSync(file).isDirectory()) return walk(file + '/')
    if (files.some(function (spec, i) {
        var match = spec.re.test(file)
        if (match) files.splice(i, 1)
        return match
      })) {
      if (local) args.push(file)
      else blob += fs.readFileSync(file, 'utf8')
    }
  })
}

walk('lib/')
walk('addon/')
walk('mode/')

if (!local && !blob) help(false)

if (files.length) {
  console.log('Some speficied files were not found: ' +
    files.map(function (a) {return a.name;}).join(', '))
  process.exit(1)
}

if (local) {
  require('child_process').spawn(local, args.concat(extraArgs), {stdio: ['ignore', process.stdout, process.stderr]})
} else {
  var data = new Buffer('js_code=' + require('querystring').escape(blob), 'utf8')
  var req = require('http').request({
    host: 'marijnhaverbeke.nl',
    port: 80,
    method: 'POST',
    path: '/uglifyjs',
    headers: {'content-type': 'application/x-www-form-urlencoded',
    'content-length': data.length}
  })
  req.on('response', function (resp) {
    resp.on('data', function (chunk) { process.stdout.write(chunk); })
  })
  req.end(data)
}

