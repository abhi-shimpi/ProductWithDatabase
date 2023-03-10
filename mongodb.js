const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8800;
var db = require('./database');

app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Welcme");
})

app.get('/api/products',(req,res)=>{
    db.collection('newProduct').find({}).toArray((err,result)=>{  // to convert it into array
        if(err) throw err
        res.send(resut);
    })
})

app.get('/api/products/:_id',(req,res)=>{
    let query = {_id :ObjectId(req.params._id)}
    db.collection('newProduct').find(query).toArray((err,result)=>{
        if(err)throw err
        res.send(result)
    })
})

app.delete('/api/products/deleteProduct/:_id',(req,res)=>{
    let query = {_id :ObjectId(req.params._id)}
    let present = db.collection('newProduct').find(query)
    console.log(present)
    if(present){
        db.collection('newProduct').deleteOne(query,(err,result)=>{
        if(err)throw err
        res.send("Deleted Successfully")
    })}
    else{
        res.send("Product Not Present")
    }
})
app.put('/api/products/:_id',(req,res)=>{
    let query = {_id :ObjectId(req.params._id)}
    console.log(query)
    let product = {
        product : req.body.product,
        price : req.body.price,
        prodId:req.body.prodId
    }
    let dataset = {
        $set : product 
    }

    db.collection('newProduct').updateOne(query,dataset, (err,result)=>{
        if(err)throw err
        res.send(product)
    })
})

app.post('/api/products/addProduct',(req,res)=>{
    let temp = db.collection('newProduct').find({})
    let resp = db.collection('newProduct').find({}).limit(1)
    resp.forEach(obj =>{
        let product ={
            product : req.body.product,
            price : req.body.price,
            prodId:req.body.prodId
        }
        db.collection('newProduct').insertOne(product,(err,result)=>{
            if(err) res.status(500).send(err)
            res.send("Added successfully")
        })
    })
})

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log("Server is running on port:",port);
})