const {
  app,
  Menu,
  BrowserWindow
} = require('electron')
const { join } = require('path')
const { open } = require('zeelib')
const appUrl = 'http://127.0.0.1:9876'

// reporting crashes to server
// require('crash-reporter').start()

// allows for remote devtools, in the browser (or whatever)
// app.commandLine.appendSwitch('remote-debugging-port', '9191')
// app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')
// show devtools if we're in dev
// if(process.env.NODE_ENV === 'dev'){
//   require('electron-debug')({
//     showDevTools: true
//   })
// devHelper.setDevMenu()
// }

// basics of a menu
const menuTemplate = [{
  label   : 'Pharaoh'
, submenu : [{
    label       : 'Quit'
  , accelerator : 'CmdOrCtrl+Q'
  , role        : 'quit'
  , click       : () => app.quit()
  }]
}, {
  label   : 'Edit'
, submenu : [{
    label       : 'Cut'
  , accelerator : 'CmdOrCtrl+X'
  , role        : 'cut'
}, {
    label       : 'Copy'
  , accelerator : 'CmdOrCtrl+C'
  , role        : 'copy'
}, {
    label       : 'Paste'
  , accelerator : 'CmdOrCtrl+V'
  , role        : 'paste'
  }]
}]

let mainWindow = null

const createWindow = () => {
  // load up that menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))

  // create the window, with its options
  mainWindow = new BrowserWindow({
    width                : 1200
  , height               : 800
  , 'accept-first-mouse' : true
  , 'title-bar-style'    : 'hidden'
  , 'node-integration'   : true
  , 'auto-hide-menu-bar' : true
  , 'icon'               : join(__dirname, 'public', 'images', 'icon.png')
  })

  // open links externally
  mainWindow.webContents.on('will-navigate', (e, url) => {
    if (!url.includes(appUrl)) {
      e.preventDefault()
      open(url)
    }
  })

  mainWindow.webContents.on('new-window', (e, url) => {
    if (!url.includes(appUrl)) {
      e.preventDefault()
      open(url)
    }
  })

  // load our app
  mainWindow.loadURL(appUrl)

  // open devtools
  mainWindow.openDevTools()

  // mainWindow.setMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// stuff below is because OS X is fucking weird
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) createWindow()
})
