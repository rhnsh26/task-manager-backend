const express= require('express');
const bodyParser = require('body-parser');

const {mongoose}=require('../db/mongoose');
const {newTodo} = require('../db/todo')

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body)
    newTodo(req.body.text).then(data=>{
        res.status(200).send(data)
    },err=>{
        res.status(400).send(err)
    })
})

app.listen(8080,()=>{
    console.log("SERVER STARTED AT 8080");
})