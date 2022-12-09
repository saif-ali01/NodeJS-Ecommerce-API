const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../verify/verifyToken")
const Cart= require("../modals/Cart")
const bcrypt = require("bcrypt");

// CREATE 
router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)

    }  catch(err){
        res.status(500).json(err)

    }
})


//Update
router.patch("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new :true}
        )
        
         res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(500).json(err)

    }
})


//Delete Product

router.delete("/:id", verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("product delete.....");

    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const Cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(Cart);
    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get ALL PRODUCT
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
        
    }
    catch(err){
        res.status(500).json(err)

    }
})


module.exports =router;