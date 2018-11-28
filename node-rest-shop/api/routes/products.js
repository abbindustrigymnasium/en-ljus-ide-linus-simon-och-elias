const express = require("express");
const router = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "store"
});

connection.connect(function(error) {
    if (error){
        throw error;
    }
    else
    console.log("Thats all there is to it");
});

router.get("/", (req, res, next) => {
    connection.query("SELECT * FROM products", function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            message: "Getter",
            result: results});
        console.log("The solution is: ", results[0].name);
    });
});

router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    
    var createdProduct = function() {
        return new Promise(function(resolve, reject){
            var theProduct = [product.name, product.price];
            console.log(theProduct);

            connection.query("INSERT INTO products (name,price) VALUES ?", [[theProduct]], function (error, results) { //hade fields
                if (error)
                return reject(error);
                else
                return resolve(theProduct);
            });
        });
    }

createdProduct().then(theProduct => {
    res.status(201).json({
        message: "Successfully added",
        Product: theProduct
    });
}).catch(error => {
    res.status(500).json({
        error: error
    });
});
});

router.get("/:productName", (req, res, next) => {
    const name = req.params.productName;

    var getProducts = function(){
        return new Promise(function(resolve, reject){

            connection.query("SELECT * FROM products WHERE name = ?", [name], function (error, results) {
                if(error)                
                return reject(error);
                else             
                return resolve(results);
        });
    });
}

getProducts().then(results => {
    if (results.length!=0){
        res.status(200).json (results);
    }
    else
        res.status(404).json({message:"Error 404"});

}).catch(error => {
    res.status(500).json({
        error: error
        });
    });
});

router.patch('/:productName',(req, res, next) => {        
    const product = {
        name: req.body.name,            
        price: req.body.price
    };

    var UpdateProducts = function(){
        return new Promise(function(resolve, reject){    
        connection.query("UPDATE `products` SET `price`= ? WHERE `name` =  ?", [product.price, product.name], function (error, results) {  
        if(error)                
        return reject(error);
        else              
        return resolve(results);
      });
    });
  }

UpdateProducts().then(results => {
    if (results.affectedRows>0){
        res.status(200).json (results);
    }
    else
        res.status(404).json({message: "Error 404"}); 
        }).catch(error => {
        res.status(500).json({
        error: error
    });
});
});

router.delete('/:productName',(req, res, next) => {
    const name = req.params.productName;

    var deleteProducts = function(){
        return new Promise(function(resolve, reject){
            console.log(name)
            connection.query("DELETE FROM products WHERE name = ?", [name], function (error, results) {      
                if(error)                
                return reject(error);
                else              
                return resolve(results);
            });
        });
    }
  
    deleteProducts().then(results => {
        if (results.length!=0){
            res.status(200).json(results);
        }
        else
        res.status(404).json({message: "Error 404"}); 
        }).catch(error => {
            res.status(500).json({
                error: error
        });
    });
});

module.exports = router;