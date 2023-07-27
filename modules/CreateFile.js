let os = require('os');
let fs = require('fs');

const createFile = {
    write(fileName, ext, content){
        const dir = "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
        //Verifica se não existe
        if (!fs.existsSync(dir)){
            //Efetua a criação do diretório
            fs.mkdirSync(dir);
        }
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
        
        //const filePath = path.join(process.cwd(), 'teste/jupiter-script.vbs'); // Define o caminho e nome do arquivo de texto
        // Define o conteúdo do arquivo de texto
        
        fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return;
        }
        
        console.log('Arquivo salvo com sucesso em:'+filePath+'\n')// Fecha o aplicativo após salvar o arquivo (opcional)
        });
    },
    
    append(fileName, ext, content){
        const dir = "C:/Users/"+os.userInfo().username+"/AppData/Local/Programs/jupiter-script";
        //Verifica se não existe
        if (!fs.existsSync(dir)){
            this.createFile(fileName, ext, content);
        }
        
        const filePath = dir+'/'+fileName+'.'+ext; // Define o caminho e nome do arquivo de texto
             
        fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return;
        }
        
        console.log('Arquivo salvo com sucesso em:'+filePath+'\n')// Fecha o aplicativo após salvar o arquivo (opcional)
        });
    }
}

module.exports = createFile;