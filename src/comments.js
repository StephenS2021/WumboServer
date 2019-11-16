const knex = require('knex');
require('dotenv').config()
const commentService = require('./comments-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

const msg = { 
    username: 'Chase',
    content: 'AAAA'
}

// commentService.getAllComments(knexInstance).then(result => {console.log(result)});
// commentService.getByID(knexInstance, 8).then(result => {console.log(result)});

// commentService.insertComment(knexInstance, {username:'aaCAaa', content:'AAAAAAAAA'}).then(result => {console.log(result)});
commentService.updateComment(knexInstance, 11, msg).then(result => {console.log(result)});

// commentService.deleteComment(knexInstance, 12).then(result => {console.log(result)});
commentService.getByID(knexInstance, 11).then(result => {console.log(result)});
