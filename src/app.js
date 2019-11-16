require('dotenv').config()
const knex = require('knex');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, PORT } = require('./config')
const commentService = require('./comments-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req,res)=>{//run when acessed home, on react this runs for "return fetch('http://localhost:8000').then(result => result.json())""
  commentService.getAllComments(knexInstance).then(result => {res.send(result)})
})

app.post('/comments', (req, res) =>{
  commentService.insertComment(knexInstance, req.body)//req.body = information that was sent over in comments-service.js.postComments in the react app
  .then(result => result.json())
})

app.use(function errorHandler(error,req,res,next){
  let response;
  if (NODE_ENV === 'production'){
    response = {error: {message: 'server error'}}
  }else{
    reponse = {message: error.message, error}
  }
  res.status(500).json(response)
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = app