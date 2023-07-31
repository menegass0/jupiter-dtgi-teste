const createFile = require('./modules/CreateFile');
const PCInfo = require('./modules/PCInfo');

const MainScreen = require('./screens/main/mainScreen');
const ConfirmationScreen = require('./screens/confirmationScreen/confirmationScreen');

const config = require('./config.json');
const externalConfig = require('./externalConfig.json');

const exec = require('child_process').exec;
const fs = require('fs');
const { app, ipcMain } = require("electron");
const Globals = require("./globals");
const { autoUpdater, AppUpdater } = require("electron-updater");

let curWindow;
let telaTeste = false;


//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

if(externalConfig.firsTimeOpen){
  createFile.initalScriptsAndFiles();

  exec(`schtasks -f /create /sc minute /mo 30 /tn "jupiter-dtgi" /tr "C:\Users\%USERNAME%\AppData\Local\Programs\jupiter-script\jupiter-script.vbs" /st 00:00`, (error)=>{
    if(error){
      console.log('nao foi possivel criar a schedule de task');
    }
  })
}

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
  
  
  setInterval(async()=>{
    PCInfo.fetchInfo(app.getVersion());
    
  }, config.teste ? config.IPIntervalTeste : config.IPInterval);

  // setInterval(async()=>{
  //   await PCInfo.getScreenCapture();
  // }, config.printInterval);

  if(externalConfig.firsTimeOpen && !config.teste){
    let timeout = setTimeout(() => {
      let rawJson = fs.readFileSync('./externalConfig.json');
      let configFile = JSON.parse(rawJson);
      configFile.firsTimeOpen = false;
      
      fs.writeFileSync('./externalConfig.json', JSON.stringify(configFile))

      clearTimeout(timeout);  
    }, 600000);    
  } 
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





