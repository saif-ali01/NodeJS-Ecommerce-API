const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../verify/verifyToken")
const Order= require("../modals/Order")
const bcrypt = require("bcrypt");

// CREATE 
router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)

    }  catch(err){
        res.status(500).json(err)

    }
})


//Update
router.patch("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new :true}
        )
        
         res.status(200).json(updatedOrder);
    }
    catch(err){
        res.status(500).json(err)

    }
})


//Delete 

router.delete("/:id", verifyTokenAndAdmin,async(req,res)=>{
    try{
        const deleteOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("order delete.....");

    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get
router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const Orders = await Order.find({userId: req.params.userId});
        res.status(200).json(Orders);
    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get ALL PRODUCT
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const Order = await Order.find();
        res.status(200).json(Order);
        
    }
    catch(err){
        res.status(500).json(err)

    }
})

//GET MONTHLY INCOME
router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income =await Order.aggregate([
            {$match: {createdAt:{$gte:previousMonth}}},
            {
                $project:{ 

                    month:{$month : "$createdAt"},
                    sales:"$amount",
                },
                
               
                
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum : "$sales"}
                }
            }
        ]);
        res.status(200).json(income)        
    }
    catch(err){
        res.status(500).json(err)

    }

})



module.exports =router;