let os = require('os');
let fs = require('fs');
const config =  require('../config.json');
const exec = require('child_process').exec;

let dir = null;

const createFile = {

    write(fileName, ext, content, teste, sobreEscrita){
        dir = "C:/Users/"+os.userInfo().username+"/AppData";//

        if (!fs.existsSync(dir)){
            dir = "C:/Users/Usuario/AppData/Local/Programs/"+config.dir+"/script"
        }else{
            dir = "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/"+config.dir+"/script"
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
        }
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
        
        if(sobreEscrita){
            if(!fs.existsSync(filePath)){
                fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        console.error('(write)Erro ao salvar o arquivo:', err);
                        return;
                    }
                });
            }

            this.append(fileName, ext, content, teste)
            return;
        }

        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('(write)Erro ao salvar o arquivo:', err);
                return;
            }
        });

    },
    
    append(fileName, ext, content, teste){
        const date = new Date()
        const time = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+'-'+date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        //"C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script"
        //Verifica se não exist
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
             
        fs.appendFile(filePath,`[${time}]\t`+content+`\n\n`, (err) => {
        if (err) {
            console.error('(append)Erro ao salvar o arquivo:', err);
            return;
        }
        
        console.log('Arquivo salvo com sucesso em:'+filePath+'\n')// Fecha o aplicativo após salvar o arquivo (opcional)
        });
    },

    initalScriptsAndFiles(){
        this.write(`jupiter-script`, 'vbs', config.scripts['vbs-fecha-abre'].replaceAll("'", '"'),  config.teste, false);   

        if(!fs.existsSync(dir+'/config.json')){
            this.write('config', 'json', config.scripts.configJSON, config.teste, false);
        }

        exec(`schtasks -f /create /sc minute /mo ${config.taskTime} /tn "${config.dir}" /tr "${dir}\\jupiter-script.vbs" /st 00:00`, (error)=>{
            if(error){
              console.log('nao foi possivel criar a schedule de task');
              createFile.write('schedule-error', 'txt', error, config.teste, true);
            }
            
          })

    }
}

module.exports = createFile;