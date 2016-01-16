#!/usr/bin/env node

const electroner = require('electroner')
const luvi = require('luvi')
const { resolve } = require('path')

luvi({
  root: resolve(__dirname, 'public')
, port: 9876
, noOpen: true
, onListen: () => {
    console.log('Welcome to Pharaoh.')
    return electroner(
      resolve(__dirname, 'app.js')
    , () => {
      console.log('Goodbye.')
      return process.exit(0)
    })
  }
})
