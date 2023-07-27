const { contextBridge, ipcRenderer } = require("electron");

let bridge = {
    updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
    mandarPrint: () => ipcRenderer.send('screenshot:capture', {}),
    receberImagem: (imagem) => ipcRenderer.on('screenshot:captured', imagem),
    fecharJanela: () => ipcRenderer.send('teste', {}),
  };
  
  contextBridge.exposeInMainWorld("bridge", bridge);