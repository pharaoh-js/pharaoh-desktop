var app           = require('app')
  , BrowserWindow = require('browser-window')
  , path          = require('path')
  , menu          = require('menu') // reporting crashes to server
require('crash-reporter').start()

// allows for remote devtools, in the browser (or whatever)
app.commandLine.appendSwitch('remote-debugging-port', '9191')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

// show devtools if we're in dev
// if(process.env.NODE_ENV === 'dev'){
//   require('electron-debug')({
//     showDevTools: true
//   })
// devHelper.setDevMenu()
// }

// basics of a menu
var menuTemplate = [{
  label   : 'Pharaoh'
, submenu : [{
    label        : 'Quit'
  , accelerator : 'CmdOrCtrl+Q'
  , click        : function(){app.quit}
  }]
},{
  label   : 'Edit'
, submenu : [{
    label       : 'Cut'
  , accelerator : 'CmdOrCtrl+X'
  , selector    : 'cut:'
},{
    label       : 'Copy'
  , accelerator : 'CmdOrCtrl+C'
  , selector    : 'copy:'
},{
    label       : 'Paste'
  , accelerator : 'CmdOrCtrl+V'
  , selector    : 'paste:'
  }]
}]

var mainWindow = null

// in os x, it's normal for applications to stay running
// even after all windows are closed
app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit()
  }
})

// and now we're ready for an electron window!
app.on('ready', function(){
  // load up that menu
  menu.setApplicationMenu(menu.buildFromTemplate(menuTemplate))

  // create the window, with its options
  mainWindow = new BrowserWindow({
    width                : 1200
  , height               : 800
  , 'accept-first-mouse' : true
  , 'title-bar-style'    : 'hidden'
  , 'node-integration'   : true
  , 'auto-hide-menu-bar' : true
  , 'icon'               : path.join(__dirname, 'icon.png')
  })

  // open links externally
  mainWindow.webContents.on('will-navigate', function(e, url){
    if(url.indexOf('127.0.0.1:9090') === -1){
      e.preventDefault()
      require('open')(url)
    }
  })
  mainWindow.webContents.on('new-window', function(e, url){
    if(url.indexOf('127.0.0.1:9090') === -1){
      e.preventDefault()
      require('open')(url)
    }
  })

  // load our app
  mainWindow.loadUrl('http://127.0.0.1:9090')

  // open devtools
  mainWindow.openDevTools()

  // emitted when window is closed
  // if we have multiple windows, we'd be storing them in an array;
  // this is where we'd delete those elements
  mainWindow.on('closed', function(){
    mainWindow = null
  })
})

