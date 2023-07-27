const { contextBridge, ipcRenderer } = require("electron");

let bridge = {
    fecharJanela: () => ipcRenderer.send('teste', {}),
  };
  
  contextBridge.exposeInMainWorld("bridge", bridge);