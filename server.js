'use strict';
const express = require('express');

const cors = require('cors');

const axios = require('axios');

require('dotenv').config();

const server = express();
const PORT =3001;

server.use(cors());

server.use(express.json());

let friutmodal

const mongoose = require('mongoose');
const { request } = require('express');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://marwan:marwan@book-shard-00-00.dqttt.mongodb.net:27017,book-shard-00-01.dqttt.mongodb.net:27017,book-shard-00-02.dqttt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-l7w2xl-shard-0&authSource=admin&retryWrites=true&w=majority');
}

const friutSchema = new mongoose.Schema({
    name: String,
    email: String,
    image:String,
    price:String

  });
   friutmodal = mongoose.model('friut', friutSchema);

server.get('/fruit',(req, res) => {
    let url ='https://fruit-api-301.herokuapp.com/getFruit'
    axios.get(url).then((data) => {
res.send(data.data.fruits)
    })

})
server.post('/addfruit',(req, res) => {
    let{name,image,price,email}=req.body;
    friutmodal.create({
        name: name,
        image:image,
        price: price,
        email :email 
    })


})
server.get('/favfruit',(req, res) => {
    let email = req.query.email;

    friutmodal.find({email: email},(err, result) => {
        if (err) {console.log(err)}
        else{res.send(result)}
    })

})
server.delete('/deletefruit/:id',(req, res) => {
let email= req.query.email;
let id = req.params.id;
friutmodal.deleteOne({ _id: id},(err, result) => {
friutmodal.find({ email: email},(err, result) => {
    if (err) {console.log(err)}
    else{res.send(result)}
})


})
})

server.put('/updatefruit/:id',(req, res) => {
    let{name,image,price,email}=req.body;
    let id = req.params.id;
    friutmodal.findByIdAndUpdate(id,{name,image,price},(err, result) => {
        friutmodal.find({ email: email},(err, result) => {
            if (err) {console.log(err)}
            else{res.send(result)}
        })
})
})







server.get('*',  (request,response) => {
    console.log('this my home')
})

server.get('/',  (request,response) => {
    console.log('this my home')
})


  server.listen(3001,console.log(PORT))