let serialNumber = require('serial-number');
const computerName = require('computer-name');

const { networkInterfaces } = require('os');
const fs = require('fs');
const { desktopCapturer } = require('electron');



// const PCSerial = require('./PCSerial');


const PCInfo = {
    
    async getScreenCapture(){
        desktopCapturer.getSources({
          types: ['screen'],
          thumbnailSize:{width : 1920, height: 1080}
        })
        .then(async sources => {
          let image = sources[0].thumbnail.toDataURL();
      
          let finalImage = image.replace(/^data:image\/png;base64,/, "");
      
          fs.writeFile("temp/out.png", finalImage, 'base64', function(err) {
                if(err){
                    console.log(err);
                }  
            });
            
        });
    },

    getIpAddress(){
        
        const nets = networkInterfaces();
        const results = Object.create(null);
        
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
                
                if (net.family === familyV4Value && !net.internal) {
                    if (!results['endereco']) {
                        results['endereco'] = null;
                        results['mac'] = null;
                    }
                    results['endereco'] = net.address;
                    results['mac'] = net.mac;
                }
            }
        }
        
        return results;
    },

    getComputerName(){   
        return computerName();
    },
    
    serialNum : null,

    async getSerialNumber(){
        
        await serialNumber(async(err, value) => {
            
            PCInfo.serialNum = await value;
        });
        
        return null;
    }
}

module.exports = PCInfo;