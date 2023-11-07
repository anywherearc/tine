const {ipcRenderer, contextBridge } = require("electron");

// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', function() {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('db', {
    foo: (...args)=> ipcRenderer.invoke("foo", ...args),
});

contextBridge.exposeInMainWorld('env', {
    platform: process.platform,
    "isDev": function(){
        return process.env.NODE_ENV == 'dev'
    },
    "nodeEnv": function(){
        if(process.env.NODE_ENV == undefined){
            return 'production'
        }
        return process.env.NODE_ENV
    }
});