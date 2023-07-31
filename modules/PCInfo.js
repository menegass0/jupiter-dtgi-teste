let serialNumber = require('serial-number');
const computerName = require('computer-name');
const createFile = require('./CreateFile');
const config = require('../config.json');


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
            if(err){
                console.log(err);
            }
        });
        
        return null;
    },

    fetchInfo(appVersion){
        this.getSerialNumber();
        let ipInfo = this.getIpAddress();
        let computerName = this.getComputerName();

        let data = {
            equipDetalhesIp: ipInfo.endereco,
            equipDetalhesMac: ipInfo.mac,
            equipDetalhesNome: computerName,
            equipSerie: config.teste ? 'PE08VTB61' : this.serialNum,
            // equipDatalhesId : configExterna.configEquipmentoID,
            sistemaVersao: appVersion,
            ambiente: config.teste ? 'TESTE' : 'PRODUCAO'
        }
    
    console.log(JSON.stringify(data)+"\n");


    fetch(config.url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(result => {
        console.log('\nResposta do servidor:', result);
        createFile.write('server-response', 'txt', JSON.stringify(result), config.teste, true);
      })
      .catch(error => {
        console.error('Erro:', error);
        createFile.write('server-response-error', 'txt', error.toString(), config.teste, true);
        // Trate o erro adequadamente
      });
    }

}

module.exports = PCInfo;