/*

const temporiza =  async (tempo) => {
   await setTimeout((tempo) => {
      console.log('olá da temporiza em ', tempo, ' milisegundos')
    }, tempo)

}

async function geral () {
console.log('x')    
 await temporiza(3000)
 console.log('y')

}
geral()

*/



const fs = require('fs')

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

const setTimeoutPromise = (tempo) => new Promise((resolve, reject) => {
    setTimeout((tempo) => {
        resolve (console.log('olá em 5 segundos'))
    }, tempo)
})




//.then(console.log('vim do then da promise'))

setTimeout(() => {
     console.log('olá em 2 segundos')
 }, 16000)
 console.log('2')

 console.log(3)


 const setTimeoutPromiseGabarito = (tempo) => new Promise((resolve) => {
    setTimeout(resolve, tempo) 
    console.log('eu pertenço a esta função, vou junto sou assíncrono tanto quanto ela')
})

 const testando = async () => {
    console.log('0')

     console.log ('************** olá setTimeoutPromiseGabarito')
     await setTimeoutPromiseGabarito(1000)
     console.log('************* depois de UM segundos')


     console.log('1')
     await setTimeoutPromiseGabarito(15000)
     .then(readFile('temporizadores.js')
         .then( data => (console.log(data))))
         .catch(err=> console.log(err))

     console.log('20')         

 }

 testando()




 


