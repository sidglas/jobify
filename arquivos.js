const fs = require('fs')
fs.readFile('temporizadores.js', (err, data) => {
    fs.writeFile('temporizador-copy', data,  (err) => {
        console.log('Arquivo Copiado por função comum')
    })
})

/* promises + async/await */

const readFile = path => new Promise((resolve, reject) => {
    /* aqui vai o código assincrono */
    fs.readFile(path, (err, data) => {
        if (err) {
            reject(err)
        }else{
            resolve(data) 
        }
    })
})

const writeFile = (path, data) => new Promise((resolve, reject) => {
    fs.writeFile(path, data,  (err) => {
        if (err) {
            reject(err)
        }else{
            resolve() /* sem data, pois se consegui gravar o arquivo ta tudo bem*/
        }        
    })
})


/* com a promise feita, em vez de callback teremos o .then */

readFile('temporizadores.js')
    .then( data => writeFile('copia-promise.js', data))
    .then(() => console.log('arquivo copiado'))
    .catch( err => console.log(err))



const readdir = (path) => new Promise((resolve, reject) =>  {
    fs.readdir(path, (err, files) => {
        if (err) {
            reject(err)
        }else{
             resolve(files)
         }
    })
})


readdir('./').then(files => console.log(files))


const testeReaddir = async () => {
    console.log('vou testar readdir')
    let arquivos = await readdir('./')
    console.log(arquivos)
    console.log('Testei......')

}
let a = testeReaddir()

