const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

class ConfirmationScreen {
  window;

  position = {
    width: 420,
    height: 620,
    maximized: false,
  };

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      title: "Confirmação",
      show: false,
      frame: false,
      alwaysOnTop: false,
      resizable: false,
      closable: false,
      removeMenu: true,
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "./confirmationPreload.js"),
      },
    });

    this.handleMessages();
    this.window.loadFile("./screens/confirmationScreen/confirmation.html");
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


module.exports = ConfirmationScreen;
