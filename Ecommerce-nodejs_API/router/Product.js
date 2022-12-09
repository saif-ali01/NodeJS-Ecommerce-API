const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../verify/verifyToken")
const Product = require("../modals/Product")
const bcrypt = require("bcrypt");

// CREATE 
router.post("/",async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)

    }  catch(err){
        res.status(500).json(err)

    }
})


//Update
router.patch("/:id",async(req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new :true}
        )
        
         res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).json(err)

    }
})


//Delete Product

router.delete("/:id",async(req,res)=>{
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product delete.....");

    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get Product
router.get("/find/:id",async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get ALL PRODUCT
router.get("/",async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try{
        let products;
        if(qNew){
            products = await Product.find().sort({_id:-1}).limit(5); 
        }else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory],
                },
            });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products)

    }
    catch(err){
        res.status(500).json(err)

    }
})


module.exports =router;