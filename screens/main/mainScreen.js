const { app, BrowserWindow, ipcMain, ipcRenderer, globalShortcut } = require("electron");
const path = require("path");

class MainScreen {
  window;

  position = {
    width: 1000,
    height: 600,
    maximized: true,
  };

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      title: "This is a test application",
      frame: true,
      show: false,
      removeMenu: true,
      acceptFirstMouse: true,
      alwaysOnTop: false,    
      closable: false,
      autoHideMenuBar: true,
      resizable: false,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "./mainPreload.js"),
      },
    });

    this.handleMessages();

    let wc = this.window.webContents;
    wc.openDevTools({ mode: "undocked" });

    this.window.loadFile("./screens/main/main.html");
  }

  showMessage(message) {
    console.log("showMessage trapped");
    console.log(message);
    this.window.webContents.send("updateMessage", message);
  }

  close() {
    this.window.destroy();
    ipcMain.removeAllListeners();
  }

  hide() {
    this.window.hide();
  }
  
  handleMessages() {
    
  }

}


module.exports = MainScreen;
