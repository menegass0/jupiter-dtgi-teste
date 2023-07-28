let os = require('os');
let fs = require('fs');

const createFile = {
    // write(fileName, ext, content){
    //     const dir = "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
    //     //Verifica se não existe
    //     if (!fs.existsSync(dir)){
    //         //Efetua a criação do diretório
    //         fs.mkdirSync(dir);
    //     }
        
    //     const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
        
    //     //const filePath = path.join(process.cwd(), 'teste/jupiter-script.vbs'); // Define o caminho e nome do arquivo de texto
    //     // Define o conteúdo do arquivo de texto
        
    //     fs.writeFile(filePath, content, (err) => {
    //     if (err) {
    //         console.error('Erro ao salvar o arquivo:', err);
    //         return;
    //     }
        
    //     console.log('Arquivo salvo com sucesso em:'+filePath+'\n')// Fecha o aplicativo após salvar o arquivo (opcional)
    //     });
    // },

    write(fileName, ext, content, teste, sobreEscrita){
        const date = new Date()
        const time = date.getHours() + ':' + get.getMinutes();
        const dir = teste ? './script' : "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
        //Verifica se não existe
        if (!fs.existsSync(dir)){
            //Efetua a criação do diretório
            fs.mkdirSync(dir);
        }
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
        
        if(!fs.existsSync(filePath)){
            if(sobreEscrita){
                this.append(fileName, ext, content, teste)
            }else{
                fs.writeFile(filePath, content+`\t ${time}`, (err) => {
                    if (err) {
                        console.error('Erro ao salvar o arquivo:', err);
                        return;
                    }
                });
            }
        }
    },
    
    append(fileName, ext, content, teste){
        const date = new Date()
        const time = date.getHours() + ':' + get.getMinutes();
        const dir = teste ? './script' : "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
        //Verifica se não existe
        if (!fs.existsSync(dir+'/'+fileName)){
            this.mkdirSync(dir+'/'+fileName+'.'+ext);
        }
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
             
        fs.appendFile(filePath, content+`\t ${time}`, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return;
        }
        
        console.log('Arquivo salvo com sucesso em:'+filePath+'\n')// Fecha o aplicativo após salvar o arquivo (opcional)
        });
    }
}

module.exports = createFile;