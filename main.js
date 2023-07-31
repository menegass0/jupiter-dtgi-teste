const createFile = require('./modules/CreateFile');
const PCInfo = require('./modules/PCInfo');

const config = require('./config.json');

const { app, ipcMain } = require("electron");
const Globals = require("./globals");
const { autoUpdater, AppUpdater } = require("electron-updater");
const MainScreen = require('./screens/main/mainScreen');
const ConfirmationScreen = require('./screens/confirmationScreen/confirmationScreen');

let curWindow;
let telaTeste = false;


//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;



app.whenReady().then(() => {
  curWindow = new ConfirmationScreen();
  if(telaTeste){
    curWindow.window.show();
  }
  
  if(telaTeste){
    curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
    curWindow.handleMessages(); 
  }
  
  createFile.write('info-status', 'txt', `Checking for updates. Current version ${app.getVersion()}`, config.teste, false);
});

/*---------------------------APP READY------------------------------------------*/ 

app.on('ready', () => {
  autoUpdater.checkForUpdates();
  PCInfo.getSerialNumber();
  createFile.write('jupiter-script', 'vbs', config.scripts['vbs-fecha-abre'].replaceAll("'", '"'),  config.teste, false);
  createFile.write('config', 'json', config.scripts['config-script'], true, false);

  // const configExterna = require('./script/config');

  setInterval(async()=>{
    PCInfo.fetchInfo(app.getVersion());

  }, config.teste ? config.IPIntervalTeste : config.IPInterval);

  // setInterval(async()=>{
  //   await PCInfo.getScreenCapture();
  // }, config.printInterval);
});

/*--------------------------------------AutoUpdater Events--------------------------------------------*/

autoUpdater.on("update-available", (info) => {
  let pth = autoUpdater.downloadUpdate();
  if(telaTeste){
    curWindow.showMessage(`Update available. Current version`);
    curWindow.showMessage(pth);
  }

  createFile.write('update-info', 'txt', 'update available\n'+pth, config.teste, false)
});

autoUpdater.on("update-not-available", (info) => {
  if(telaTeste){
    curWindow.showMessage(`No update available. Current version ${app.getVersion()}  ${JSON.stringify(info)} aaaaaaaa`);
    // errorMessageToFront(info);
  }
  createFile.write('update-info', 'txt', 'update not available\n'+JSON.stringify(info), config.teste, false)
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  setTimeout(() => {

    if(telaTeste){
      curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
    }
    
    createFile.write('update-info', 'txt', 'update downloaded\n'+JSON.stringify(info), config.teste, false);

    autoUpdater.quitAndInstall();
  }, 10000);

});

autoUpdater.on("error", (info) => {
  
  if(telaTeste){
    curWindow.showMessage(info);
  }
  createFile.write('update-info', 'txt', 'update error'+info, config.teste, false)
});

/*-----------------------------Eventos gerais-------------------------------------------*/

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function (event) {
  event.preventDefault()
});

ipcMain.on('teste', ()=>{
  curWindow.close();
})



