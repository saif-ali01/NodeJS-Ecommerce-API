const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../verify/verifyToken")
const User = require("../modals/user")
const bcrypt = require("bcrypt");


//Update
router.patch("/:id",async(req,res)=>{
   // res.status(200).json(req.params.id)
    if(req.body.password){
        req.body.password =bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null)
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        { new :true}
        )
         res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err)

    }
})


//Delete

router.delete("/:id",async(req,res)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User delete.....");

    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get User
router.get("/find/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others}=user._doc;
        res.status(200).json(others);

    }
    catch(err){
        res.status(500).json(err)

    }
})

//Get ALL User
router.get("/",async(req,res)=>{
    const query = req.query.new
    try{
        const users = query
        ? await User.find().sort({_id:-1}).limit(5) 
        : await User.find();
        res.status(200).json(users);

    }
    catch(err){
        res.status(500).json(err)

    }
})


//Get  User stats
router.get("/stats",async(req,res)=>{

    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear()-1)) 
    try{
        const data = await User.aggregate([
            {$match: {createdAt:{$gte:lastyear}}},
            {
                $project:{
                 month :{$month: "$createdAt" }
                },
            },
            {
                $group:{
                _id:"$month",
                total:{$sum:1},
              }
            }
        ])
        res.status(200).json(data);

    }
    catch(err){
        res.status(500).json(err)

    }
})

module.exports =router;