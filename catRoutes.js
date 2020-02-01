const express = require('express');
const { Router } = require('express')
const routes1 = Router()

/*
const path = require('path')
const sqlite = require('sqlite')
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite') , { Promise })
*/

const dbConnection = require('./connection')

//------------- Categorias 
routes1.get('/admin/categorias',  async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')

    res.render('admin/categorias' , { categorias })
    
})

routes1.get('/admin/categorias/nova',  async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    res.render('admin/nova-categoria')
})

routes1.post('/admin/categorias/nova',  async (req, res) => {
    const { categoria } = req.body
    const db = await dbConnection
    await db.run(`insert into categorias(categoria) values('${categoria}')`)    
    res.redirect('/admin/categorias')
})

routes1.get('/admin/categorias/editar/:id',  async (req, res) => {
    const db = await dbConnection
    const categoria = await db.get('select * from categorias where id = ' +  req.params.id)
    //console.log('enviando vaga ???????' , vaga)
    res.render('admin/editar-categoria', { 
        categoria 
    })

})

routes1.post('/admin/categorias/editar/:id',  async (req, res) => {
    const { id } = req.params
    const { categoria } = req.body
    console.log('ESTOU NO POST POST POSTPOST ', id, categoria)
    const db = await dbConnection
    await db.run(`update categorias set
        categoria = '${categoria}' 
        where id = ${id}`)    
    res.redirect('/admin/categorias')
})
routes1.get('/admin/categorias/delete/:id', async (req, res) =>  {
    const db = await dbConnection
    await db.run(' delete from categorias where categorias.id = '  +  req.params.id ) 
    res.redirect('/admin/categorias')

})  
//--------------

module.exports = routes1
