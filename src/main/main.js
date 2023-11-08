// main.js

// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('node:path')
const db = require('./db.js')
const foo = require('./foo.js')
const env = require('./env.js')


function getResourceURL(...pathes) {
    if (env.isDev()){
        const urlPath = new URL(path.join(...pathes), "http://localhost:3000");
        return urlPath.toString();
    }

    const filePath = path.join(__dirname, "..", ...pathes);
    return `file://${filePath}`;
}  


const createWindow = function() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, `../preload/main.js`),
      nodeIntegration: true, // like here
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(getResourceURL('index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(function(){

  db.initDB()
  createWindow()

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.handle("foo", async function(event){
    console.log(foo.bar())
    return db.foo();
})