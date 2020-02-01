const express = require('express');
const sqlite = require('sqlite')
const path = require('path')
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite') , { Promise })

module.exports = dbConnection
