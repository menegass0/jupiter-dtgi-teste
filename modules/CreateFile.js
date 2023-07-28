let os = require('os');
let fs = require('fs');

const createFile = {

    write(fileName, ext, content, teste, sobreEscrita){
        const dir = teste ? './script' : "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
        //Verifica se não existe
        if (!fs.existsSync(dir)){
            //Efetua a criação do diretório
            fs.mkdirSync(dir);
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
        const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const dir = teste ? './script' : "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
        //Verifica se não exist
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
             
        fs.appendFile(filePath, content+`\t ${time}\n\n`, (err) => {
        if (err) {
            console.error('(append)Erro ao salvar o arquivo:', err);
            return;
        }
        
        console.log('Arquivo salvo com sucesso em:'+filePath+'\n')// Fecha o aplicativo após salvar o arquivo (opcional)
        });
    }
}

module.exports = createFile;