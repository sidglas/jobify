const express = require('express') 
//import express from "express"
const app = express()
const BodyParser = require('body-parser')

const path = require('path')

const sqlite = require('sqlite')
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite') , { Promise })

//const dbConnection = sqlite.open('banco.sqlite' , { Promise })

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
console.log('teima teima')
app.use(BodyParser.urlencoded({ extended: true }))

//
app.get('/', async (request, response) =>  {
    const db = await dbConnection
    const categoriasDb = await db.all('select * from categorias;')
    const vagas = await db.all('select * from vagas;')
    const categorias = categoriasDb.map( cat => {
        return {
            ...cat,
            vagas: vagas.filter(vaga => vaga.categoria === cat.id)
        }
    })
    
    response.render('home', {
        categorias: categorias
    })
})  
app.get('/vaga/:id', async (request, response) =>  {
    const db = await dbConnection
    const vaga = await db.get('select * from vagas where id = ' +  request.params.id)
    response.render('vaga',  {
        vaga
    })
})  

app.get('/admin',  (req, res) => {

    res.render('admin/home')
    
})

app.get('/admin/vagas/delete/:id', async (req, res) =>  {
    const db = await dbConnection
    await db.run(' delete from vagas where vagas.id = '  +  req.params.id ) 
    //const vaga = await db.get('select * from vagas where id = ' +  req.params.id)
    res.redirect('/admin/vagas')



 //   const vagas = await db.all('select * from vagas;')
 //   res.render('admin/vagas' , { vagas })
})  

app.get('/admin/vagas',  async (req, res) => {
    const db = await dbConnection
    const vagas = await db.all('select * from vagas;')
    res.render('admin/vagas' , { vagas })
    
})

app.get('/admin/vagas/nova',  async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    res.render('admin/nova-vaga', { 
        categorias 
    })
})
app.post('/admin/vagas/nova',  async (req, res) => {
    const { categoria, titulo, descricao} = req.body
    const db = await dbConnection
    await db.run(`insert into vagas(categoria, titulo, descricao) values('${categoria}','${titulo}', '${descricao}')`)    
    res.redirect('/admin/vagas')
})

app.get('/admin/vagas/editar/:id',  async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    const vaga = await db.get('select * from vagas where id = ' +  req.params.id)
    //console.log('enviando vaga ???????' , vaga)
    res.render('admin/editar-vaga', { 
        categorias , vaga
    })

})

app.post('/admin/vagas/editar/:id',  async (req, res) => {
    const { id } = req.params
    const { categoria, titulo, descricao} = req.body
    const db = await dbConnection
    await db.run(`update vagas set
        categoria = ${categoria}, 
        titulo = '${titulo}' , 
        descricao = '${descricao}' 
        where id = ${id}`)    
    res.redirect('/admin/vagas')
})

//------------- Categorias 
app.get('/admin/categorias',  async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')

    res.render('admin/categorias' , { categorias })
    
})

app.get('/admin/categorias/nova',  async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    res.render('admin/nova-categoria')
})

app.post('/admin/categorias/nova',  async (req, res) => {
    const { categoria } = req.body
    const db = await dbConnection
    await db.run(`insert into categorias(categoria) values('${categoria}')`)    
    res.redirect('/admin/categorias')
})

app.get('/admin/categorias/editar/:id',  async (req, res) => {
    const db = await dbConnection
    const categoria = await db.get('select * from categorias where id = ' +  req.params.id)
    //console.log('enviando vaga ???????' , vaga)
    res.render('admin/editar-categoria', { 
        categoria 
    })

})

app.post('/admin/categorias/editar/:id',  async (req, res) => {
    const { id } = req.params
    const { categoria } = req.body
    console.log('ESTOU NO POST POST POSTPOST ', id, categoria)
    const db = await dbConnection
    await db.run(`update categorias set
        categoria = '${categoria}' 
        where id = ${id}`)    
    res.redirect('/admin/categorias')
})
//--------------

//

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);')   
    await db.run('create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')   
    /*
    //Categorias
    let categoria ='Engineering team'
    await db.run(`insert into categorias(categoria) values('${categoria}')`) 
    categoria ='Marketing team'
    await db.run(`insert into categorias(categoria) values('${categoria}')`)    
    */
    //Vagas
    /*
    let vaga ='Fullstack Developer (Remote)'
    let descricao = 'vaga para fullstack developper que fez o fsmaster'
    */
   
  // let vaga ='Social Media (San Francisco)'
  // let descricao = 'vaga para Social media developper que fez o fsmaster'

  //  await db.run(`insert into vagas(categoria, titulo, descricao) values(2,'${vaga}', '${descricao}')`)      
    
}
init()

app.listen(port, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor do Jobify')
    }else{
        console.log('Servidor do Jobify Rodando...')
    }
})