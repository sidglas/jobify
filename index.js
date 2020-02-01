const express = require('express') 
//import express from "express"
const app = express()
const BodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
console.log('teima teima')
app.use(BodyParser.urlencoded({ extended: true }))

//

const routes = require('./routes')
app.use(routes)
const routes1 = require('./catRoutes')
app.use(routes1)


app.listen(port, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor do Jobify')
    }else{
        console.log('Servidor do Jobify Rodando...')
    }
})