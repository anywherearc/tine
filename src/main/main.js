// main.js
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
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, `../preload/main.js`),
      nodeIntegration: true, //must set true, if you want use bytenode 
    }
  })

  mainWindow.loadURL(getResourceURL('index.html'));
}

app.whenReady().then(function(){

  db.initDB()
  createWindow()

  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})


ipcMain.handle("foo", async function(event){
    console.log(foo.bar())
    return db.foo();
})